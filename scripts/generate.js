/**
 * Runs every code-generation step. Hooked into predev/prebuild/pretest so the
 * generated sources always match src/.
 */
require('./generateLevelManifest');
require('./generateIntlStrings');
