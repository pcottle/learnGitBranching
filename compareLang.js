var fs = require('fs');

var allOfString = {
  'en_US': require('./src/js/intl/locales/en_US'),
  'de_DE': require('./src/js/intl/locales/de_DE'),
  'zh_CN': require('./src/js/intl/locales/zh_CN'),
  'zh_TW': require('./src/js/intl/locales/zh_TW'),
  'es_AR': require('./src/js/intl/locales/es_AR'),
  'pt_BR': require('./src/js/intl/locales/pt_BR'),
  'fr_FR': require('./src/js/intl/locales/fr_FR'),
  'ja': require('./src/js/intl/locales/ja'),
  'ru_RU': require('./src/js/intl/locales/ru_RU'),
  'uk': require('./src/js/intl/locales/uk'),
  'ko': require('./src/js/intl/locales/ko'),
};
var defautlLang = allOfString['en_US'];
var prefix = 'module.exports = ';
var suffix = ';\n';

var fallbackMap = {
  'zh_TW': 'zh_CN'
};

var compare = function (lang) {
  var myLang = allOfString[lang];
  var fallback = fallbackMap[lang] || lang;
  var fallbackLang = allOfString[fallback];

  var newLang = {};
  Object.keys(defautlLang).forEach(function (key) {
    newLang[key] = myLang[key] || fallbackLang[key] || defautlLang[key];
  });
  fs.writeFileSync('./src/js/intl/locales/' + lang + '.js',
    prefix + JSON.stringify(newLang, null, 2) + suffix);
};

var listLang = process.argv.slice(2);
listLang.forEach(function (lang) {
  // TODO check available language + option to generate file
  compare(lang);
});

// example: learnGitBranching> node compareLang.js zh_TW
