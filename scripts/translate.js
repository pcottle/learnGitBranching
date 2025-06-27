
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

const locale = process.argv[2];
if (!locale) {
  console.error('Please provide a locale. Example: node scripts/translate.js fr_FR');
  process.exit(1);
}

processLevels(locale);
