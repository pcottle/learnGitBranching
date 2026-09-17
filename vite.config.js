import { defineConfig } from 'vite';
import { viteCommonjs } from '@originjs/vite-plugin-commonjs';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

// This codebase is CommonJS (`require`) with JSX living in `.js` files, which
// browserify + babelify used to handle. esbuild handles the JSX;
// build.commonjsOptions (rollup-plugin-commonjs) handles the `require` calls
// in the production build and vite-plugin-commonjs does it for the dev
// server; nodePolyfills replaces the node builtins browserify auto-polyfilled
// (events, process, ...).

/**
 * The dev-time CJS interop emitted by @originjs/vite-plugin-commonjs reads
 * `ns.default || ns` eagerly. With circular requires (this codebase has many;
 * they used to work under browserify's partial-exports semantics) the
 * `default` binding may still be uninitialized at that point and the read
 * throws a TDZ ReferenceError. Rewrite the interop so that it only falls back
 * to a lazy proxy when the eager read fails; the lazy proxy defers resolving
 * `module.exports` to the first property access, which matches browserify.
 */
function cjsLazyInterop() {
  const pattern = /(__require_for_vite_\w+)\.default \|\| \1\b/g;
  return {
    name: 'lgb-cjs-lazy-interop',
    enforce: 'post',
    transform(code, id) {
      if (!code.includes('.default || __require_for_vite_')) return null;
      const helper = 'function __lgbCjsLazy(ns) {\n' +
        '  try { return ns.default || ns; }\n' +
        '  catch (e) { return __lgbCjs(ns); }\n' +
        '}\n' +
        'function __lgbCjs(ns) {\n' +
        '  var resolved = null;\n' +
        '  function resolve() {\n' +
        '    if (resolved === null) {\n' +
        '      try { resolved = ns.default !== undefined ? ns.default : ns; }\n' +
        '      catch (e) { resolved = null; }\n' +
        '    }\n' +
        '    return resolved;\n' +
        '  }\n' +
        '  function lazy(path) {\n' +
        '    return new Proxy(function () {}, {\n' +
        '      get: function (target, prop) {\n' +
        '        var mod = resolve();\n' +
        '        if (!mod) { return lazy(path + "." + String(prop)); }\n' +
        '        return mod[prop];\n' +
        '      },\n' +
        '      set: function (target, prop, value) {\n' +
        '        var mod = resolve();\n' +
        '        if (mod) { mod[prop] = value; }\n' +
        '        return true;\n' +
        '      },\n' +
        '      apply: function (target, thisArg, args) {\n' +
        '        var mod = resolve();\n' +
        '        if (!mod) { throw new Error("Circular require of " + path + " used before initialization"); }\n' +
        '        return mod.apply(thisArg, args);\n' +
        '      },\n' +
        '    });\n' +
        '  }\n' +
        '  return lazy("root");\n' +
        '}\n';
      const fixed = code.replace(pattern, '__lgbCjsLazy($1)');
      return { code: helper + fixed, map: null };
    },
  };
}

export default defineConfig({
  base: './',
  plugins: [
    viteCommonjs(),
    cjsLazyInterop(),
    nodePolyfills(),
  ],
  esbuild: {
    loader: 'jsx',
    include: /src\/.*\.jsx?$/,
    jsx: 'transform',
  },
  optimizeDeps: {
    // jquery-ui's UMD build attaches to the global jQuery and exports
    // nothing, which breaks the dev-time prebundle interop (a default
    // import of a module with no exports). Serve it as-is; the app imports
    // src/js/util/setupJQueryGlobals.js first, so window.jQuery exists
    // before any of these modules evaluate.
    exclude: ['jquery-ui'],
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
    },
  },
  build: {
    outDir: 'build',
    commonjsOptions: {
      include: [/src\//, /node_modules/],
      // JSX lives in .jsx files too; without this those modules are skipped
      // and their `require` calls survive into the bundle.
      extensions: ['.js', '.jsx'],
    },
  },
});
