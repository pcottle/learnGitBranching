var manifest = require('../src/levels/generated/manifest');
var loaders = require('../src/js/intl/generated/loaders').loaders;
var enStrings = require('../src/js/intl/generated/en_US').strings;
var sequenceInfo = require('../src/levels/sequenceInfo');

describe('generated artifacts', function() {
  it('level manifest has metadata and a loader for every level', function() {
    var total = 0;
    Object.keys(manifest.sequences).forEach(function(sequenceName) {
      var entries = manifest.sequences[sequenceName];
      expect(entries.length).toBeGreaterThan(0);
      entries.forEach(function(entry, index) {
        expect(entry.id).toEqual(sequenceName + (index + 1));
        expect(entry.index).toEqual(index);
        expect(entry.sequenceName).toEqual(sequenceName);
        expect(typeof entry.name.en_US).toEqual('string');
        expect(typeof entry.load).toEqual('function');
        total += 1;
      });
    });
    expect(total).toEqual(36);
  });

  it('generates an en_US table and a loader for every locale', function() {
    expect(typeof enStrings['learn-git-branching']).toEqual('string');
    var locales = Object.keys(loaders);
    expect(locales.indexOf('en_US')).toBeGreaterThan(-1);
    expect(locales.indexOf('fr_FR')).toBeGreaterThan(-1);
    locales.forEach(function(locale) {
      expect(typeof loaders[locale]).toEqual('function');
    });
  });

  it('routes node_modules into the vendor chunk', function() {
    return import('../vite.config.mjs').then(function(mod) {
      var manualChunks = mod.default.build.rollupOptions.output.manualChunks;
      expect(manualChunks('/app/src/js/app/index.js')).toBeUndefined();
      expect(manualChunks('/app/node_modules/react/index.js')).toEqual('vendor');
    });
  });

  it('supports delayed function and constructor exports in dev CJS cycles', function() {
    return import('../vite.config.mjs').then(function(mod) {
      var plugin = mod.cjsLazyInterop();
      var source = [
        'var DelayedBase = (__require_for_vite_cycle.default || __require_for_vite_cycle).Base;',
        'var delayedFunction = (__require_for_vite_cycle.default || __require_for_vite_cycle).fn;',
        'class Derived extends DelayedBase {',
        '  initialize() { this.wasInitializedAsDerived = true; }',
        '}',
        'exports.Derived = Derived;',
        'exports.create = function(value) { return new Derived(value); };',
        'exports.call = function(value) { return delayedFunction(value); };'
      ].join('\n');
      var transformed = plugin.transform(source).code;
      var ready = false;
      var namespace = {};
      class DelayedBase {
        constructor(value) {
          this.value = value;
          this.initialize();
        }
        initialize() { this.wasInitializedAsBase = true; }
      }
      var actual = {
        Base: DelayedBase,
        fn: function(value) { return value + 1; }
      };
      Object.defineProperty(namespace, 'default', {
        get: function() {
          if (!ready) { throw new ReferenceError('not initialized'); }
          return actual;
        }
      });
      var result = {};

      Function('__require_for_vite_cycle', 'exports', transformed)(namespace, result);
      ready = true;

      var instance = result.create(41);
      expect(instance instanceof result.Derived).toBe(true);
      expect(instance.constructor).toBe(result.Derived);
      expect(instance.wasInitializedAsDerived).toBe(true);
      expect(instance.wasInitializedAsBase).toBeUndefined();
      expect(instance.value).toEqual(41);
      expect(result.call(41)).toEqual(42);
    });
  });

  it('maps sequences to their tab', function() {
    expect(sequenceInfo.getTabForSequence('intro')).toEqual('main');
    expect(sequenceInfo.getTabForSequence('remote')).toEqual('remote');
  });
});
