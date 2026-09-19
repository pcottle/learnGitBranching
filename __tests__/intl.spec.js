var LocaleActions = require('../src/js/actions/LocaleActions');
var intl = require('../src/js/intl');
var fetchLocale = require('../src/js/intl/localeLoader').fetchLocale;

describe('intl locale loading', function() {
  afterEach(function() {
    LocaleActions.changeLocale('en_US');
  });

  it('falls back to English for an unsupported locale', function() {
    LocaleActions.changeLocale('xx_YY');
    expect(intl.str('learn-git-branching')).toEqual('Learn Git Branching');
  });

  it('warns and returns an error string for an unknown key', function() {
    spyOn(console, 'warn');
    expect(intl.str('definitely-not-a-key')).toContain('NO INTL support');
  });

  it('has a distinct string for a failed level load', function() {
    var msg = intl.str('level-load-failed', { id: 'intro1' });
    expect(msg).toContain('intro1');
    expect(msg).not.toContain('NO INTL');
  });

  it('resolves null for a locale with no loader', function(done) {
    intl.loadLocale('xx_YY').then(function(data) {
      expect(data).toBe(null);
      done();
    }).catch(function(err) {
      fail(err);
      done();
    });
  });

  it('loads a locale on demand and translates with it', function(done) {
    LocaleActions.changeLocale('fr_FR');
    intl.loadLocale('fr_FR').then(function() {
      expect(intl.str('learn-git-branching')).toEqual('Apprenez Git Branching');
      done();
    }).catch(function(err) {
      fail(err);
      done();
    });
  });
});

describe('locale loader', function() {
  it('unwraps mod.strings and mod.default.strings', function(done) {
    fetchLocale(function() {
      return Promise.resolve({ strings: { a: '1' } });
    }).then(function(data) {
      expect(data).toEqual({ a: '1' });
      return fetchLocale(function() {
        return Promise.resolve({ default: { strings: { b: '2' } } });
      });
    }).then(function(data) {
      expect(data).toEqual({ b: '2' });
      done();
    }).catch(function(err) {
      fail(err);
      done();
    });
  });

  it('resolves null when the import rejects', function(done) {
    spyOn(console, 'warn');
    fetchLocale(function() {
      return Promise.reject(new Error('boom'));
    }).then(function(data) {
      expect(data).toBe(null);
      done();
    }).catch(function(err) {
      fail(err);
      done();
    });
  });

  it('resolves null when the loader throws synchronously', function(done) {
    spyOn(console, 'warn');
    fetchLocale(function() {
      throw new Error('sync');
    }).then(function(data) {
      expect(data).toBe(null);
      done();
    }).catch(function(err) {
      fail(err);
      done();
    });
  });

  it('resolves null when the module has no string table', function(done) {
    Promise.all([
      fetchLocale(function() { return Promise.resolve(null); }),
      fetchLocale(function() { return Promise.resolve({}); }),
      fetchLocale(function() { return Promise.resolve({ default: {} }); })
    ]).then(function(results) {
      expect(results).toEqual([null, null, null]);
      done();
    }).catch(function(err) {
      fail(err);
      done();
    });
  });
});
