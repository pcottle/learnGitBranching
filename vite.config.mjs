import { defineConfig } from 'vite';
import { viteCommonjs } from '@originjs/vite-plugin-commonjs';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

// This codebase is CommonJS (`require`) with JSX living in `.js` files, which
// browserify + babelify used to handle. Vite transforms the JSX;
// @originjs/vite-plugin-commonjs handles application `require` calls; and nodePolyfills
// replaces the node builtins browserify auto-polyfilled (events, process, ...).

/**
 * The dev-time CJS interop emitted by @originjs/vite-plugin-commonjs reads
 * `ns.default || ns` eagerly. With circular requires (this codebase has many;
 * they used to work under browserify's partial-exports semantics) the
 * `default` binding may still be uninitialized at that point and the read
 * throws a TDZ ReferenceError. Rewrite the interop so that it only falls back
 * to a lazy proxy when the eager read fails; the lazy proxy defers resolving
 * `module.exports` to the first property access, which matches browserify.
 */
export function cjsLazyInterop() {
  const pattern = /(__require_for_vite_\w+)\.default \|\| \1\b/g;
  return {
    name: 'lgb-cjs-lazy-interop',
    enforce: 'post',
    transform(code) {
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
        '  function resolvePath(path) {\n' +
        '    var value = resolve();\n' +
        '    if (!value) { return null; }\n' +
        '    for (var i = 0; i < path.length; i++) {\n' +
        '      value = value[path[i]];\n' +
        '      if (value === undefined || value === null) { return value; }\n' +
        '    }\n' +
        '    return value;\n' +
        '  }\n' +
        '  function lazy(path) {\n' +
        '    return new Proxy(function () {}, {\n' +
        '      get: function (target, prop) {\n' +
        '        var value = resolvePath(path);\n' +
        '        if (!value) { return lazy(path.concat([prop])); }\n' +
        '        return value[prop];\n' +
        '      },\n' +
        '      set: function (target, prop, value) {\n' +
        '        var parent = resolvePath(path);\n' +
        '        if (parent) { parent[prop] = value; }\n' +
        '        return true;\n' +
        '      },\n' +
        '      apply: function (target, thisArg, args) {\n' +
        '        var value = resolvePath(path);\n' +
        '        if (!value) { throw new Error("Circular require of root." + path.join(".") + " used before initialization"); }\n' +
        '        return Reflect.apply(value, thisArg, args);\n' +
        '      },\n' +
        '      construct: function (target, args, newTarget) {\n' +
        '        var value = resolvePath(path);\n' +
        '        if (!value) { throw new Error("Circular require of root." + path.join(".") + " used before initialization"); }\n' +
        '        return Reflect.construct(value, args, newTarget);\n' +
        '      },\n' +
        '    });\n' +
        '  }\n' +
        '  return lazy([]);\n' +
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
    // nothing. Serve it as-is after setupJQueryGlobals initializes the
    // window.jQuery binding.
    exclude: ['jquery-ui'],
    rolldownOptions: {
      moduleTypes: {
        '.js': 'jsx',
      },
    },
  },
  build: {
    outDir: 'build',
    // Vite 8's default Lightning CSS minifier collapses the legacy vendor
    // fallbacks in main.css (dropping `display: flex`, `-webkit-box-flex`,
    // ...), which breaks the page layout. esbuild keeps them intact.
    cssMinify: 'esbuild',
    rollupOptions: {
      output: {
        // Keep third-party code in a stable chunk. This does not shrink the
        // first load (the vendor chunk is still a static import) but an
        // app-only deploy no longer invalidates the ~143 KB (gzip) vendor
        // bundle, so repeat visitors re-download far less.
        manualChunks: function(id) {
          if (id.indexOf('node_modules') !== -1) {
            return 'vendor';
          }
          return undefined;
        },
      },
    },
  },
});
