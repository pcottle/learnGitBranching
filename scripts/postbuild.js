/**
 * Post-build step for the Vite pipeline.
 *
 * Vite emits index.html + hashed assets into ./build. The site (GitHub Pages,
 * Docker/nginx image) additionally expects the static `assets/` and
 * `generatedDocs/` directories to sit alongside index.html, which the old
 * gulp build used to copy over.
 */
const { cpSync, existsSync } = require('fs');
const { join } = require('path');

const buildDir = join(__dirname, '..', 'build');

for (const dir of ['assets', 'generatedDocs']) {
  if (existsSync(join(__dirname, '..', dir))) {
    cpSync(join(__dirname, '..', dir), join(buildDir, dir), { recursive: true });
    console.log(`Copied ${dir}/ into build/`);
  }
}
