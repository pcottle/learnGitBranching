var CasperUtils = require('./casperUtils').CasperUtils;

/**
 * TODO(pcottle) -- find a way to get this from
 * LocaleStore but not have the import error
 */
var langLocaleMap = {
  en: 'en_US',
  zh: 'zh_CN',
  ja: 'ja',
  ko: 'ko',
  es: 'es_AR',
  fr: 'fr_FR',
  de: 'de_DE',
  pt: 'pt_BR'
};

var headerLocaleMap = {
  'zh-CN': 'zh_CN',
  'zh-TW': 'zh_TW',
  'pt-BR': 'pt_BR'
};

casper.start(
  CasperUtils.getUrl(),
  function() {
    this.test.assertTitle('Learn Git Branching');

    casper.waitFor(CasperUtils.waits.jsMount)
    .then(function() {
      Object.keys(langLocaleMap).forEach(function(lang) {
          var locale = langLocaleMap[lang];
          this.test.assertEvalEquals(function(lang) {
            debug_LocaleActions_changeLocaleFromHeader(lang);
            return debug_LocaleStore_getLocale();
          },
          locale,
          'Testing changing store locale from ' + lang + 
              ' to ' + locale,
          {lang: lang}
        );
      }.bind(this));
    })
    .then(function() {
      Object.keys(headerLocaleMap).forEach(function(header) {
        var locale = headerLocaleMap[header];
        this.test.assertEvalEquals(function(header) {
            debug_LocaleActions_changeLocaleFromHeader(header);
            return debug_LocaleStore_getLocale();
          },
          locale,
          'Testing changing store locale from ' + header +
            ' to ' + locale,
          {header: header}
        );
      }.bind(this));
    })
    .then(CasperUtils.testDone);

}).run();
