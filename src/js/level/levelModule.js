/**
 * Unwrap a dynamically imported level module into its level definition.
 *
 * Level modules are CommonJS (`exports.level = ...`). Depending on the
 * bundler/Node interop the definition lands either on `mod.level` or on
 * `mod.default.level`; anything else is unsupported and yields null (the
 * caller reports that as a load failure).
 *
 * Kept as a pure function so the interop shapes are unit-testable without a
 * bundler or a network.
 */
exports.extractLevel = function(mod) {
  if (!mod) { return null; }
  if (mod.level) { return mod.level; }
  if (mod.default && mod.default.level) { return mod.default.level; }
  return null;
};

/**
 * Like extractLevel, but throws when the module has no level definition.
 * Used by the async loader so a bad import surfaces as a load failure.
 */
exports.requireLevel = function(mod, id) {
  var level = exports.extractLevel(mod);
  if (!level) {
    throw new Error('level module did not export a level: ' + id);
  }
  return level;
};
