# Contributing Translations to learnGitBranching

This guide explains how to add or improve translations for learnGitBranching.

## How the i18n System Works

learnGitBranching stores all translatable text in two places:

1. **UI strings** (`src/js/intl/strings.js`) — button labels, dialog text, error messages (~104 keys)
2. **Level content** (`src/levels/**/*.js`) — level names, hints, and tutorial dialogs (~34 levels)

Each string is stored as an object keyed by locale code:
```js
"some-key": {
  "__desc__": "What this string is used for",
  "en_US": "English text",
  "de_DE": "Deutschsprachiger Text",
  "hu_HU": "Magyar szöveg"
}
```

Locale codes follow the pattern `language_REGION` (e.g., `en_US`, `de_DE`, `hu_HU`) or just `language` for some locales (e.g., `ko`, `ja`).

---

## Step-by-Step: Add a New Language

### Step 1: Register the locale

Edit `src/js/stores/LocaleStore.js`:

```js
// In langLocaleMap, add your language code:
xx: 'xx_XX',

// In headerLocaleMap (optional, for browser Accept-Language header):
'xx-XX': 'xx_XX',
'xx': 'xx_XX',
```

### Step 2: Add the UI button

Edit `src/js/react_views/IntlHelperBarView.jsx` and add an entry to the `getItems()` array:

```js
}, {
  text: 'Your Language Name',
  testID: 'yourlanguage',
  onClick: function() {
    this.fireCommand('locale xx_XX; levels');
  }.bind(this)
}, {
```

### Step 3: Translate UI strings

Edit `src/js/intl/strings.js`. For every entry, add your locale:

```js
"finish-dialog-finished": {
  "en_US": "Wow! You finished the last level, great!",
  // ... other locales ...
  "xx_XX": "Your translation here"
},
```

### Step 4: Translate level content

For each level file in `src/levels/`, add translations to the `name`, `hint`, and `startDialog` fields:

```js
"name": {
  "en_US": "Introduction to Git Commits",
  // ... other locales ...
  "xx_XX": "Your translated level name"
},

"hint": {
  "en_US": "Try using git commit",
  // ... other locales ...
  "xx_XX": "Your translated hint"
},

"startDialog": {
  "en_US": { "childViews": [...] },
  // ... other locales ...
  "xx_XX": {
    "childViews": [
      {
        "type": "ModalAlert",
        "options": {
          "markdowns": [
            "## Your Translated Title",
            "Your translated paragraph text."
          ]
        }
      }
    ]
  }
}
```

---

## Using the Helper Scripts

### Check translation completeness

```bash
node scripts/validate-locale.js xx_XX
```

Output example:
```
Locale validation: hu_HU
══════════════════════════════════════════════════
UI Strings: 104/104
  ✓ All strings translated

Levels: 34/34
  ✓ All levels translated

──────────────────────────────────────────────────
✓ hu_HU is fully translated!
```

### Generate a translation template

To get a JSON file with all English strings and empty target fields:

```bash
node scripts/extract-translation-template.js xx_XX > template_xx.json
```

Fill in all the empty `"xx_XX": ""` fields, then manually apply the translations to the source files following Steps 3 and 4 above.

---

## Translation Style Guidelines

1. **Keep git commands in English**: `commit`, `branch`, `merge`, `rebase`, `cherry-pick`, `fetch`, `push`, `pull`, `tag`, `clone` — these are technical terms that developers recognize in any language.

2. **Keep code examples in English**: Anything in backticks like `` `git commit -m "message"` `` should stay in English.

3. **Preserve markdown formatting**: Keep `##` headers, `*bold*`, `` `code` ``, and newlines exactly as they appear in the English source.

4. **Preserve placeholders**: Variables like `{nextLevel}`, `{branch}`, `{ref}` must not be translated or modified.

5. **Use natural, informal language**: Address the user informally (e.g., "tu" in French, "du" in German, "te" in Hungarian). Avoid overly formal or academic tone.

6. **Be concise**: Dialog text is displayed in small modal windows. Keep translations roughly the same length as the English original.

7. **Translate level names meaningfully**: Level names should be descriptive and help learners understand what they'll practice.

---

## Testing Your Translation Locally

1. Build the app:
   ```bash
   yarn install
   yarn gulp fastBuild
   ```

2. Start the dev server:
   ```bash
   yarn dev
   ```

3. Open the app in your browser and switch to your locale:
   - Click the language selector, or
   - Type in the command line: `locale xx_XX; levels`

4. Navigate through levels and verify all text appears correctly.

5. Run the validation script:
   ```bash
   node scripts/validate-locale.js xx_XX
   ```

6. Run the existing string validation:
   ```bash
   yarn gulp lintStrings
   ```

---

## PR Checklist

Before submitting your translation PR:

- [ ] `src/js/stores/LocaleStore.js` — locale registered in `langLocaleMap` (and `headerLocaleMap` if applicable)
- [ ] `src/js/react_views/IntlHelperBarView.jsx` — language button added
- [ ] `src/js/intl/strings.js` — all 104 UI strings translated
- [ ] All level `name` fields translated (34 levels)
- [ ] All level `hint` fields translated (34 levels)
- [ ] All level `startDialog` fields translated (34 levels)
- [ ] `node scripts/validate-locale.js xx_XX` passes with 0 errors
- [ ] `yarn gulp lintStrings` passes
- [ ] `yarn test` passes
- [ ] Tested locally by switching to the new locale in the UI

---

## Questions?

Open an issue at https://github.com/pcottle/learnGitBranching/issues and tag it with `i18n`.
