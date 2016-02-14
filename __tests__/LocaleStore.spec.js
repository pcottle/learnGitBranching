var LocaleActions = require('../src/js/actions/LocaleActions');
var LocaleStore = require('../src/js/stores/LocaleStore');

describe('LocaleStore', function() {

  it('has default locale', function() {
    expect(LocaleStore.getLocale())
      .toEqual(LocaleStore.getDefaultLocale());
  });

  it('changes locales', function() {
    expect(LocaleStore.getLocale()).toEqual('en_US');
    LocaleActions.changeLocale('ja_JP');
    expect(LocaleStore.getLocale()).toEqual('ja_JP');
  });

  it('changes locales from headers', function() {
    var headerLocaleMap = LocaleStore.getHeaderLocaleMap();
    Object.keys(headerLocaleMap).forEach(function(header) {
      LocaleActions.changeLocaleFromHeader(header);
      expect(LocaleStore.getLocale()).toEqual(
        headerLocaleMap[header]
      );
    });
  });

  it('changes locales from languages', function() {
    var langLocaleMap = LocaleStore.getLangLocaleMap();
    Object.keys(langLocaleMap).forEach(function(lang) {
      LocaleActions.changeLocaleFromHeader(lang);
      expect(LocaleStore.getLocale()).toEqual(
        langLocaleMap[lang]
      );
    });
  });
});
