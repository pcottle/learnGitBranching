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

  it('maps sequences to their tab', function() {
    expect(sequenceInfo.getTabForSequence('intro')).toEqual('main');
    expect(sequenceInfo.getTabForSequence('remote')).toEqual('remote');
  });
});
