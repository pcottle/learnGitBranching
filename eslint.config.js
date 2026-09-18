const globals = require('globals');

const correctnessRules = {
  'constructor-super': 'error',
  'for-direction': 'error',
  'getter-return': 'error',
  'no-async-promise-executor': 'error',
  'no-class-assign': 'error',
  'no-compare-neg-zero': 'error',
  'no-constant-binary-expression': 'error',
  'no-const-assign': 'error',
  'no-control-regex': 'error',
  'no-debugger': 'warn',
  'no-dupe-args': 'error',
  'no-dupe-class-members': 'error',
  'no-dupe-else-if': 'error',
  'no-dupe-keys': 'error',
  'no-duplicate-case': 'error',
  'no-empty-character-class': 'error',
  'no-ex-assign': 'error',
  'no-extra-boolean-cast': 'error',
  'no-fallthrough': 'error',
  'no-func-assign': 'error',
  'no-import-assign': 'error',
  'no-invalid-regexp': 'error',
  'no-irregular-whitespace': 'error',
  'no-loss-of-precision': 'error',
  'no-new-native-nonconstructor': 'error',
  'no-obj-calls': 'error',
  'no-promise-executor-return': 'error',
  // This legacy codebase commonly uses obj.hasOwnProperty(). Migrate those
  // call sites separately rather than obscuring correctness findings here.
  'no-prototype-builtins': 'off',
  'no-self-assign': 'error',
  'no-setter-return': 'error',
  'no-shadow-restricted-names': 'error',
  'no-sparse-arrays': 'error',
  'no-this-before-super': 'error',
  'no-undef': 'error',
  'no-unexpected-multiline': 'error',
  'no-unmodified-loop-condition': 'error',
  'no-unreachable': 'error',
  'no-unreachable-loop': 'error',
  'no-unsafe-finally': 'error',
  'no-unsafe-negation': 'error',
  'no-unsafe-optional-chaining': 'error',
  'no-unused-private-class-members': 'error',
  'no-useless-backreference': 'error',
  'require-atomic-updates': 'error',
  'use-isnan': 'error',
  'valid-typeof': 'error',
};

module.exports = [
  {
    ignores: [
      'build/**',
      'coverage/**',
      'generatedDocs/**',
      'node_modules/**',
      'src/style/all.min.css',
      'src/levels/generated/**',
      'src/js/intl/generated/**',
    ],
  },
  {
    files: ['**/*.js', '**/*.jsx'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'commonjs',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.commonjs,
        $: 'readonly',
        Raphael: 'readonly',
      },
    },
    linterOptions: {
      reportUnusedDisableDirectives: 'error',
    },
    rules: correctnessRules,
  },
  {
    files: ['__tests__/**/*.js'],
    languageOptions: {
      globals: globals.jasmine,
    },
  },
  {
    files: ['src/levels/**/*.js'],
    rules: {
      // Existing locale objects contain shadowed translations. Surface them
      // during sweeps without blocking unrelated work until they are audited.
      'no-dupe-keys': 'warn',
    },
  },
  {
    files: ['vite.config.js'],
    languageOptions: {
      sourceType: 'module',
    },
  },
];
