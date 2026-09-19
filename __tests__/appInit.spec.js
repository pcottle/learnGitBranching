var app = require('../src/js/app');
var LocaleStore = require('../src/js/stores/LocaleStore');
var LocaleActions = require('../src/js/actions/LocaleActions');
var appLoading = require('../src/js/util/appLoading');

function saveGlobal(name) {
  return Object.getOwnPropertyDescriptor(global, name);
}

function setGlobal(name, value) {
  Object.defineProperty(global, name, {
    value: value,
    configurable: true,
    writable: true
  });
}

function restoreGlobal(name, descriptor) {
  if (descriptor) {
    Object.defineProperty(global, name, descriptor);
  } else {
    delete global[name];
  }
}

describe('detectLocale', function() {
  var saved = {};

  beforeEach(function() {
    saved.window = saveGlobal('window');
    saved.document = saveGlobal('document');
    saved.navigator = saveGlobal('navigator');
  });

  afterEach(function() {
    restoreGlobal('window', saved.window);
    restoreGlobal('document', saved.document);
    restoreGlobal('navigator', saved.navigator);
    LocaleActions.changeLocale('en_US');
  });

  function installBrowser(href, storedLocale) {
    setGlobal('window', {
      location: { href: href },
      history: { replaceState: function() {} },
      localStorage: {
        getItem: function() { return storedLocale || null; },
        setItem: function() {}
      }
    });
    setGlobal('document', { location: { href: href } });
    // Node exposes a read-only global `navigator`, so set it via defineProperty.
    setGlobal('navigator', { language: 'fr-FR' });
  }

  it('prefers an explicit ?locale= URL param', function() {
    installBrowser('http://localhost/?locale=de_DE', 'it_IT');
    app.detectLocale();
    expect(LocaleStore.getLocale()).toEqual('de_DE');
  });

  it('falls back to the stored preference over the browser header', function() {
    installBrowser('http://localhost/', 'it_IT');
    app.detectLocale();
    expect(LocaleStore.getLocale()).toEqual('it_IT');
  });

  it('falls back to the browser header', function() {
    installBrowser('http://localhost/', null);
    app.detectLocale();
    expect(LocaleStore.getLocale()).toEqual('fr_FR');
  });

  it('runs init and hides the loader after resolving the locale', function(done) {
    var inited = false;
    var el = { hidden: false, className: 'appLoading-visible' };
    setGlobal('window', {
      location: { href: 'http://localhost/' },
      history: { replaceState: function() {} },
      localStorage: {
        getItem: function() { return null; },
        setItem: function() {}
      }
    });
    setGlobal('document', {
      location: { href: 'http://localhost/' },
      getElementById: function(id) { return id === 'appLoading' ? el : null; }
    });
    setGlobal('navigator', { language: 'en-US' });

    app.bootstrap(function() { inited = true; }).then(function() {
      expect(inited).toBe(true);
      expect(el.hidden).toBe(true);
      expect(el.className).toEqual('');
      done();
    }).catch(function(err) {
      fail(err);
      done();
    });
  });
});

describe('app loading overlay', function() {
  var savedDocument;
  var el;

  beforeEach(function() {
    savedDocument = saveGlobal('document');
    el = { hidden: true, className: '' };
    setGlobal('document', {
      getElementById: function(id) { return id === 'appLoading' ? el : null; }
    });
  });

  afterEach(function() {
    restoreGlobal('document', savedDocument);
  });

  it('shows the overlay immediately', function() {
    appLoading.showAppLoading();
    expect(el.hidden).toBe(false);
    expect(el.className).toEqual('appLoading-visible');
  });

  it('hides the overlay', function() {
    appLoading.showAppLoading();
    appLoading.hideAppLoading();
    expect(el.hidden).toBe(true);
    expect(el.className).toEqual('');
  });

  it('does nothing when the element is absent', function() {
    setGlobal('document', { getElementById: function() { return null; } });
    expect(function() {
      appLoading.showAppLoading();
      appLoading.hideAppLoading();
    }).not.toThrow();
  });
});
