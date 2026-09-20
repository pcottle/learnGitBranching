/**
 * Fetch and unwrap a dynamically imported locale string table.
 *
 * Kept pure so the interop shapes and the failure path are unit-testable
 * without a bundler or a network. Resolves `null` (never rejects) if the
 * loader throws or the import fails, so callers can fall back to en_US.
 */
exports.fetchLocale = function(loader) {
  return Promise.resolve().then(loader).then(function(mod) {
    return (mod && (mod.strings || (mod.default && mod.default.strings))) || null;
  }).catch(function(err) {
    console.warn('failed to load locale', err);
    return null;
  });
};
