var allOfString = {
  // __desc__ is description, not language
  '__desc__': require('./locales/__desc__'),
  'en_US': require('./locales/en_US'),
  'de_DE': require('./locales/de_DE'),
  'zh_CN': require('./locales/zh_CN'),
  'zh_TW': require('./locales/zh_TW'),
  'es_AR': require('./locales/es_AR'),
  'pt_BR': require('./locales/pt_BR'),
  'fr_FR': require('./locales/fr_FR'),
  'ja': require('./locales/ja'),
  'ru_RU': require('./locales/ru_RU'),
  'uk': require('./locales/uk'),
  'ko': require('./locales/ko'),
};

var strings = {};

Object.keys(allOfString).forEach(function (lang) {
  var stringLang = allOfString[lang];
  Object.keys(stringLang).forEach(function (key) {
      strings[key] = strings[key] || {};
      strings[key][lang] = stringLang[key];
  });
});

module.exports.strings = strings;
