
const fs = require('fs');
const path = require('path');

// This is a placeholder for a real translation API call
async function translate(text, locale) {
  console.log(`Translating "${text}" to ${locale}`);
  // In a real implementation, you would call an API like OpenAI, Google Translate, etc.
  // For now, we'll just return a placeholder.
  return new Promise(resolve => setTimeout(() => resolve(`[AI translated for ${locale}] ${text}`), 200));
}

async function translateLevels(locale) {
  const levelsDir = path.join(__dirname, '../src/levels');
  const levelFiles = getAllLevelFiles(levelsDir);

  for (const file of levelFiles) {
    const levelPath = file;
    const levelData = require(levelPath);

    if (levelData && levelData.level) {
        const level = levelData.level;
        let updated = false;

        // Translate name
        if (level.name && level.name.en_US && !level.name[locale]) {
            level.name[locale] = await translate(level.name.en_US, locale);
            updated = true;
        }

        // Translate hint
        if (level.hint && level.hint.en_US && !level.hint[locale]) {
            level.hint[locale] = await translate(level.hint.en_US, locale);
            updated = true;
        }

        // Translate startDialog
        if (level.startDialog && level.startDialog.en_US && !level.startDialog[locale]) {
            const translatedDialog = await translateDialog(level.startDialog.en_US, locale);
            level.startDialog[locale] = translatedDialog;
            updated = true;
        }

        if (updated) {
            const newContent = `exports.level = ${JSON.stringify(level, null, 2)};`;
            fs.writeFileSync(levelPath, newContent, 'utf8');
            console.log(`Updated ${file} with ${locale} translations.`);
        }
    }
  }
}

async function translateStrings(locale) {
    const stringsPath = path.join(__dirname, '../src/js/intl/strings.js');
    const stringsData = require(stringsPath);
    const allStrings = stringsData.strings;
    let updated = false;

    for (const key in allStrings) {
        if (allStrings[key].en_US && !allStrings[key][locale]) {
            console.log(`Translating string for key '${key}'`);
            const translatedText = await translate(allStrings[key].en_US, locale);
            allStrings[key][locale] = translatedText;
            updated = true;
        }
    }

    if (updated) {
        const newContent = `exports.strings = ${JSON.stringify(allStrings, null, 2)};`;
        fs.writeFileSync(stringsPath, newContent, 'utf8');
        console.log(`Updated ${stringsPath} with ${locale} translations.`);
        console.log('NOTE: Comments and original formatting in strings.js have been removed by this process.');
    } else {
        console.log('All strings for locale ' + locale + ' are already translated.');
    }
}

function getAllLevelFiles(dir) {
    let files = [];
    const items = fs.readdirSync(dir);
    items.forEach(item => {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            files = files.concat(getAllLevelFiles(fullPath));
        } else if (item.endsWith('.js')) {
            files.push(fullPath);
        }
    });
    return files;
}


async function translateDialog(dialog, locale) {
    const newDialog = JSON.parse(JSON.stringify(dialog)); // Deep copy
    for (const view of newDialog.childViews) {
        if (view.options && view.options.markdowns) {
            const translatedMarkdowns = [];
            for (const markdown of view.options.markdowns) {
                translatedMarkdowns.push(await translate(markdown, locale));
            }
            view.options.markdowns = translatedMarkdowns;
        }
    }
    return newDialog;
}

function getLevelTranslationStatus(locale, levelFiles) {
    let present = 0;
    let missing = 0;
    let total = 0;
    const missingDetails = [];

    for (const file of levelFiles) {
        const levelPath = file;
        delete require.cache[require.resolve(levelPath)];
        const levelData = require(levelPath);

        if (levelData && levelData.level) {
            const level = levelData.level;
            const fields = ['name', 'hint', 'startDialog'];
            fields.forEach(field => {
                if (level[field] && level[field].en_US) {
                    total++;
                    if (level[field][locale]) {
                        present++;
                    } else {
                        missing++;
                        missingDetails.push(`  - Missing '${field}' in ${path.basename(file)}`);
                    }
                }
            });
        }
    }
    return { present, missing, total, missingDetails };
}

function getStringsTranslationStatus(locale) {
    const stringsPath = path.join(__dirname, '../src/js/intl/strings.js');
    delete require.cache[require.resolve(stringsPath)];
    const allStrings = require(stringsPath).strings;

    let present = 0;
    let missing = 0;
    let total = 0;
    const missingDetails = [];

    for (const key in allStrings) {
        if (allStrings[key].en_US) {
            total++;
            if (allStrings[key][locale]) {
                present++;
            } else {
                missing++;
                missingDetails.push(`  - Missing string for key '${key}'`);
            }
        }
    }
    return { present, missing, total, missingDetails };
}

function listLocales() {
    const levelsDir = path.join(__dirname, '../src/levels');
    const levelFiles = getAllLevelFiles(levelsDir);
    const allLocales = new Set();

    // From levels
    for (const file of levelFiles) {
        const levelPath = file;
        delete require.cache[require.resolve(levelPath)];
        const levelData = require(levelPath);

        if (levelData && levelData.level) {
            const level = levelData.level;
            if (level.name) Object.keys(level.name).forEach(locale => allLocales.add(locale));
            if (level.hint) Object.keys(level.hint).forEach(locale => allLocales.add(locale));
            if (level.startDialog) Object.keys(level.startDialog).forEach(locale => allLocales.add(locale));
        }
    }

    // From strings
    const stringsPath = path.join(__dirname, '../src/js/intl/strings.js');
    delete require.cache[require.resolve(stringsPath)];
    const allStrings = require(stringsPath).strings;
    for (const key in allStrings) {
        Object.keys(allStrings[key]).forEach(locale => allLocales.add(locale));
    }
    allLocales.delete('__desc__');


    console.log('Known locales and their translation status:');
    allLocales.forEach(locale => {
        const levelStatus = getLevelTranslationStatus(locale, levelFiles);
        const stringsStatus = getStringsTranslationStatus(locale);

        const totalPresent = levelStatus.present + stringsStatus.present;
        const totalTotal = levelStatus.total + stringsStatus.total;
        const percentage = totalTotal > 0 ? ((totalPresent / totalTotal) * 100).toFixed(2) : "0.00";

        console.log(`- ${locale}: ${totalPresent}/${totalTotal} (${percentage}%)`);
        console.log(`  - Levels:  ${levelStatus.present}/${levelStatus.total}`);
        console.log(`  - Strings: ${stringsStatus.present}/${stringsStatus.total}`);
    });
}

function checkStatus(locale) {
    const levelsDir = path.join(__dirname, '../src/levels');
    const levelFiles = getAllLevelFiles(levelsDir);

    console.log(`Checking translation status for locale: ${locale}`);

    const levelStatus = getLevelTranslationStatus(locale, levelFiles);
    const stringsStatus = getStringsTranslationStatus(locale);

    const totalPresent = levelStatus.present + stringsStatus.present;
    const totalMissing = levelStatus.missing + stringsStatus.missing;
    const totalTotal = levelStatus.total + stringsStatus.total;

    const overallPercentage = totalTotal > 0 ? ((totalPresent / totalTotal) * 100).toFixed(2) : "0.00";

    console.log(`
--- Status for ${locale} ---`);
    console.log(`Overall Completion: ${overallPercentage}% (${totalPresent}/${totalTotal})`);
    
    const levelPercentage = levelStatus.total > 0 ? ((levelStatus.present / levelStatus.total) * 100).toFixed(2) : "0.00";
    console.log(`- Levels:  ${levelPercentage}% (${levelStatus.present}/${levelStatus.total})`);

    const stringsPercentage = stringsStatus.total > 0 ? ((stringsStatus.present / stringsStatus.total) * 100).toFixed(2) : "0.00";
    console.log(`- Strings: ${stringsPercentage}% (${stringsStatus.present}/${stringsStatus.total})`);
    
    console.log('--------------------');
    
    if (levelStatus.missing > 0) {
        console.log('\nMissing Level Translations:');
        levelStatus.missingDetails.forEach(line => console.log(line));
    }
    if (stringsStatus.missing > 0) {
        console.log('\nMissing String Translations:');
        stringsStatus.missingDetails.forEach(line => console.log(line));
    }
}


const arg = process.argv[2];
const nextArg = process.argv[3];

async function main() {
    if (!arg) {
        console.error('Please provide a command.');
        console.error('Usage:');
        console.error('  node scripts/translate.js --list-locales');
        console.error('  node scripts/translate.js --status <locale>');
        console.error('  node scripts/translate.js --translate-levels <locale>');
        console.error('  node scripts/translate.js --translate-strings <locale>');
        console.error('  node scripts/translate.js <locale>              (Translates all missing strings for a locale)');
        process.exit(1);
    }

    if (arg === '--list-locales') {
        listLocales();
    } else if (arg === '--status') {
        if (!nextArg) {
            console.error('Please provide a locale for status check. Example: node scripts/translate.js --status fr_FR');
            process.exit(1);
        }
        checkStatus(nextArg);
    } else if (arg === '--translate-levels') {
        if (!nextArg) {
            console.error('Please provide a locale to translate. Example: node scripts/translate.js --translate-levels fr_FR');
            process.exit(1);
        }
        await translateLevels(nextArg);
    } else if (arg === '--translate-strings') {
        if (!nextArg) {
            console.error('Please provide a locale to translate. Example: node scripts/translate.js --translate-strings fr_FR');
            process.exit(1);
        }
        await translateStrings(nextArg);
    } else {
        console.log(`Translating all missing strings for ${arg}...`);
        await translateLevels(arg);
        await translateStrings(arg);
        console.log(`
Finished translating all missing strings for ${arg}.`);
        checkStatus(arg);
    }
}

main();

