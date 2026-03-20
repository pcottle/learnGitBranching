#!/usr/bin/env node
'use strict';

/**
 * Translation template extractor for learnGitBranching
 *
 * Generates a JSON template with all translatable strings and an empty target
 * locale field for contributors to fill in.
 *
 * Usage: node scripts/extract-translation-template.js <locale> > template.json
 * Example: node scripts/extract-translation-template.js hu_HU > template_hu.json
 *
 * After filling in the JSON, use the companion import script:
 *   node scripts/import-translation.js hu_HU template_hu.json
 */

const fs = require('fs');
const path = require('path');

const targetLocale = process.argv[2];
if (!targetLocale) {
  console.error('Usage: node scripts/extract-translation-template.js <locale>');
  console.error('Example: node scripts/extract-translation-template.js hu_HU');
  process.exit(1);
}

const ROOT = path.join(__dirname, '..');

// ── 1. Extract UI strings ────────────────────────────────────────────────────

const stringsPath = path.join(ROOT, 'src/js/intl/strings.js');
const stringsSource = fs.readFileSync(stringsPath, 'utf8');

let strings;
try {
  const m = { exports: {} };
  new Function('exports', stringsSource)(m.exports);
  strings = m.exports.strings || m.exports;
} catch (e) {
  strings = require(stringsPath).strings || require(stringsPath);
}

const uiStrings = {};
for (const [key, entry] of Object.entries(strings)) {
  uiStrings[key] = {
    __desc__: entry.__desc__ || '',
    en_US: entry.en_US || '',
    [targetLocale]: entry[targetLocale] || '',
  };
}

// ── 2. Extract level strings ─────────────────────────────────────────────────

const levelDirs = [
  'src/levels/intro',
  'src/levels/rampup',
  'src/levels/move',
  'src/levels/mixed',
  'src/levels/advanced',
  'src/levels/rebase',
  'src/levels/remote',
  'src/levels/remoteAdvanced',
];

const levels = {};

function extractLevel(filePath) {
  const relPath = path.relative(ROOT, filePath).replace(/\\/g, '/');
  let level;
  try {
    delete require.cache[require.resolve(filePath)];
    level = require(filePath);
  } catch (e) {
    process.stderr.write(`WARN: Could not parse ${relPath}: ${e.message}\n`);
    return;
  }
  if (!level || typeof level !== 'object') return;

  const entry = { file: relPath };

  if (level.name && typeof level.name === 'object') {
    entry.name = {
      en_US: level.name.en_US || '',
      [targetLocale]: level.name[targetLocale] || '',
    };
  }

  if (level.hint && typeof level.hint === 'object') {
    entry.hint = {
      en_US: level.hint.en_US || '',
      [targetLocale]: level.hint[targetLocale] || '',
    };
  }

  if (level.startDialog && typeof level.startDialog === 'object') {
    entry.startDialog = {
      en_US: level.startDialog.en_US || null,
      [targetLocale]: level.startDialog[targetLocale] || null,
    };
  }

  levels[relPath] = entry;
}

for (const dir of levelDirs) {
  const dirPath = path.join(ROOT, dir);
  if (!fs.existsSync(dirPath)) continue;
  const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.js') && f !== 'index.js');
  for (const file of files) {
    extractLevel(path.join(dirPath, file));
  }
}

// ── 3. Output JSON template ──────────────────────────────────────────────────

const template = {
  _meta: {
    targetLocale,
    generatedAt: new Date().toISOString(),
    instructions: [
      `Fill in all empty "${targetLocale}" fields with translations.`,
      'Keep git command names in English (commit, branch, merge, rebase, etc.).',
      'Keep markdown formatting intact (## headers, *bold*, `code`, etc.).',
      'Keep placeholder variables like {nextLevel}, {branch}, etc. unchanged.',
      'After filling in, run: node scripts/import-translation.js ' + targetLocale + ' <this-file>',
    ],
  },
  uiStrings,
  levels,
};

process.stdout.write(JSON.stringify(template, null, 2) + '\n');
