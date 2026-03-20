#!/usr/bin/env node
'use strict';

/**
 * Locale completeness validator for learnGitBranching
 *
 * Usage: node scripts/validate-locale.js <locale>
 * Example: node scripts/validate-locale.js hu_HU
 */

const fs = require('fs');
const path = require('path');

const locale = process.argv[2];
if (!locale) {
  console.error('Usage: node scripts/validate-locale.js <locale>');
  console.error('Example: node scripts/validate-locale.js hu_HU');
  process.exit(1);
}

const ROOT = path.join(__dirname, '..');
let errors = 0;
let warnings = 0;

// ── 1. Check strings.js ──────────────────────────────────────────────────────

const stringsPath = path.join(ROOT, 'src/js/intl/strings.js');
const stringsSource = fs.readFileSync(stringsPath, 'utf8');

// Evaluate the file to get the exports object
const stringsModule = { exports: {} };
// Use Function to avoid top-level `require` issues in simple eval
try {
  new Function('exports', stringsSource)(stringsModule.exports);
} catch (e) {
  // Try require instead
  try {
    const strings = require(stringsPath);
    stringsModule.exports = strings;
  } catch (e2) {
    console.error('Could not parse strings.js:', e2.message);
    process.exit(1);
  }
}

const strings = stringsModule.exports.strings || stringsModule.exports;
const allStringKeys = Object.keys(strings);
let translatedStringCount = 0;
const missingStringKeys = [];

for (const key of allStringKeys) {
  const entry = strings[key];
  if (entry[locale] !== undefined) {
    translatedStringCount++;
  } else {
    missingStringKeys.push(key);
  }
}

// ── 2. Check level files ─────────────────────────────────────────────────────

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

let totalLevels = 0;
let translatedLevels = 0;
const levelIssues = [];

function checkLevelFile(filePath) {
  const relPath = path.relative(ROOT, filePath);
  let level;
  try {
    // Clear require cache to get fresh reads
    delete require.cache[require.resolve(filePath)];
    level = require(filePath);
  } catch (e) {
    warnings++;
    levelIssues.push(`  WARN  ${relPath}: Could not parse (${e.message})`);
    return;
  }

  if (!level || typeof level !== 'object') return;

  totalLevels++;
  const issues = [];

  // Check name
  if (level.name && typeof level.name === 'object') {
    if (level.name[locale] === undefined) {
      issues.push('missing name');
    }
  }

  // Check hint
  if (level.hint && typeof level.hint === 'object') {
    if (level.hint[locale] === undefined) {
      issues.push('missing hint');
    }
  }

  // Check startDialog
  if (level.startDialog && typeof level.startDialog === 'object') {
    if (level.startDialog[locale] === undefined) {
      issues.push('missing startDialog');
    }
  }

  if (issues.length === 0) {
    translatedLevels++;
  } else {
    errors++;
    levelIssues.push(`  FAIL  ${relPath}: ${issues.join(', ')}`);
  }
}

for (const dir of levelDirs) {
  const dirPath = path.join(ROOT, dir);
  if (!fs.existsSync(dirPath)) continue;
  const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.js') && f !== 'index.js');
  for (const file of files) {
    checkLevelFile(path.join(dirPath, file));
  }
}

// ── 3. Report ────────────────────────────────────────────────────────────────

console.log(`\nLocale validation: ${locale}`);
console.log('═'.repeat(50));

// Strings report
console.log(`\nUI Strings: ${translatedStringCount}/${allStringKeys.length}`);
if (missingStringKeys.length > 0) {
  console.log(`  Missing (${missingStringKeys.length}):`);
  for (const k of missingStringKeys) {
    console.log(`    - ${k}`);
    errors++;
  }
} else {
  console.log('  ✓ All strings translated');
}

// Levels report
console.log(`\nLevels: ${translatedLevels}/${totalLevels}`);
if (levelIssues.length > 0) {
  console.log('  Issues:');
  for (const issue of levelIssues) {
    console.log(issue);
  }
} else {
  console.log('  ✓ All levels translated');
}

// Summary
console.log('\n' + '─'.repeat(50));
if (errors === 0 && warnings === 0) {
  console.log(`✓ ${locale} is fully translated!`);
  process.exit(0);
} else {
  if (errors > 0) console.log(`✗ ${errors} error(s) found`);
  if (warnings > 0) console.log(`⚠ ${warnings} warning(s) found`);
  process.exit(1);
}
