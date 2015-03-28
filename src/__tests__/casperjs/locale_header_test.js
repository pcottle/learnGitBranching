//var LocaleStore = require('../../js/stores/LocaleStore');
var CasperUtils = require('./casperUtils').CasperUtils;

var intl = require('../../js/intl/index.js');

var langLocaleMap = intl.langLocaleMap;

casper.start(
  CasperUtils.getUrl(),
  function() {
    this.test.assertTitle('Learn Git Branching');

    casper.waitFor(CasperUtils.waits.jsMount)
    .then(CasperUtils.asserts.visibleIDs([
      'commandLineHistory',
    ]))
    .then(function() {

      Object.keys(langLocaleMap).forEach(function(lang) {
        var locale = langLocaleMap[lang];
        this.test.assertEvalEquals(function(lang) {
          debug_App_changeLocaleFromHeaders(lang);
          return debug_Intl_getLocale();
        },
          locale,
          'Testing changing the locale from ' + lang + 
              ' to ' + locale,
          { lang: lang }
        );

        this.test.assertEvalEquals(function(lang) {
          debug_LocaleActions_changeLocaleFromHeader(lang);
          return debug_LocaleStore_getLocale();
        },
          locale,
          'Testing changing store locale from ' + lang + 
              ' to ' + locale,
          { lang: lang }
        );
      }.bind(this));
    })
    .then(CasperUtils.testDone);

}).run();
