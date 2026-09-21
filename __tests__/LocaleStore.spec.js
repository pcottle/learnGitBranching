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

  it('reads a supported stored locale and ignores invalid, expired or blocked storage', function() {
    var hadWindow = 'window' in global;
    var originalWindow = global.window;
    function withStored(value) {
      global.window = { localStorage: { getItem: function() { return value; } } };
      return LocaleStore.getStoredLocale();
    }
    try {
      // legacy plain-string format
      expect(withStored('fr_FR')).toEqual('fr_FR');
      // current format
      expect(withStored(JSON.stringify({ loc: 'de_DE', at: Date.now() }))).toEqual('de_DE');
      // expired
      expect(withStored(JSON.stringify({ loc: 'de_DE', at: Date.now() - (1000 * 60 * 60 * 24 * 365) }))).toEqual(null);
      // unsupported
      expect(withStored(JSON.stringify({ loc: 'xx_YY', at: Date.now() }))).toEqual(null);
      // blocked storage
      global.window = { get localStorage() { throw new Error('storage blocked'); } };
      expect(LocaleStore.getStoredLocale()).toEqual(null);
    } finally {
      if (hadWindow) {
        global.window = originalWindow;
      } else {
        delete global.window;
      }
    }
  });

  it('persists the locale with a timestamp and updates the URL on change', function() {
    var storage = {};
    var replaced = null;
    var hadWindow = 'window' in global;
    var hadDocument = 'document' in global;
    var originalWindow = global.window;
    var originalDocument = global.document;

    LocaleActions.changeLocale('en_US');
    try {
      global.window = {
        localStorage: {
          setItem: function(key, value) { storage[key] = value; },
          getItem: function(key) { return storage[key] || null; }
        },
        history: {
          replaceState: function(state, title, href) { replaced = href; }
        }
      };
      global.document = { location: { href: 'http://localhost/?existing=1' } };

      LocaleActions.changeLocale('de_DE');

      var persisted = JSON.parse(storage.locale);
      expect(persisted.loc).toEqual('de_DE');
      expect(typeof persisted.at).toEqual('number');
      expect(replaced).toContain('locale=de_DE');
    } finally {
      if (hadWindow) { global.window = originalWindow; } else { delete global.window; }
      if (hadDocument) { global.document = originalDocument; } else { delete global.document; }
      LocaleActions.changeLocale('en_US');
    }
  });

  it('exposes the supported locales list as a copy', function() {
    var locales = LocaleStore.getSupportedLocales();
    expect(locales).toContain('en_US');
    expect(locales).toContain('fr_FR');
    locales.push('fake');
    expect(LocaleStore.getSupportedLocales()).not.toContain('fake');
  });
});
