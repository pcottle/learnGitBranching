
const fs = require('fs');
const path = require('path');

// This is a placeholder for a real translation API call
async function translate(text, locale) {
  console.log(`Translating "${text}" to ${locale}`);
  // In a real implementation, you would call an API like OpenAI, Google Translate, etc.
  // For now, we'll just return a placeholder.
  return new Promise(resolve => setTimeout(() => resolve(`[AI translated for ${locale}] ${text}`), 200));
}

async function processLevels(locale) {
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

// New function to get translation status for a locale
function getTranslationStatus(locale, levelFiles, verbose = false) {
    let present = 0;
    let missing = 0;
    let total = 0;

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
                        if (verbose) {
                            console.log(`  - Missing '${field}' in ${path.basename(file)}`);
                        }
                        missing++;
                    }
                }
            });
        }
    }
    return { present, missing, total };
}

// Updated function to list all locales with their status
function listLocales() {
    const levelsDir = path.join(__dirname, '../src/levels');
    const levelFiles = getAllLevelFiles(levelsDir);
    const allLocales = new Set();

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

    console.log('Known locales and their translation status:');
    allLocales.forEach(locale => {
        const { present, total } = getTranslationStatus(locale, levelFiles);
        const percentage = total > 0 ? ((present / total) * 100).toFixed(2) : "0.00";
        console.log(`- ${locale}: ${present}/${total} (${percentage}%)`);
    });
}

// Updated function to check translation status
function checkStatus(locale) {
    const levelsDir = path.join(__dirname, '../src/levels');
    const levelFiles = getAllLevelFiles(levelsDir);

    console.log(`Checking translation status for locale: ${locale}`);
    const { present, missing, total } = getTranslationStatus(locale, levelFiles, true);

    console.log(`
--- Status for ${locale} ---`);
    console.log(`Present translations: ${present}`);
    console.log(`Missing translations: ${missing}`);
    console.log(`Total translatable fields: ${total}`);
    if (total > 0) {
        const percentage = ((present / total) * 100).toFixed(2);
        console.log(`Completion: ${percentage}%`);
    }
    console.log('--------------------');
}


const arg = process.argv[2];
const nextArg = process.argv[3];

if (!arg) {
    console.error('Please provide a command.');
    console.error('Usage:');
    console.error('  node scripts/translate.js <locale>              - Translate missing strings for a locale.');
    console.error('  node scripts/translate.js --list-locales        - List all known locales.');
    console.error('  node scripts/translate.js --status <locale>     - Show translation status for a locale.');
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
} else {
    // Default to original behavior
    processLevels(arg);
}
