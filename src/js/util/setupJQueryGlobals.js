/**
 * Installs the global jQuery/$ bindings.
 *
 * Must be the first module imported from src/js/app/index.js: jquery-ui's
 * UMD build attaches widgets to the *global* jQuery, and jQuery's CJS build
 * does not install the globals itself. Importing this module first
 * guarantees the globals exist before any jquery-ui module evaluates.
 */
var jQuery = require('jquery');

if (typeof window !== 'undefined') {
  window.jQuery = window.jQuery || jQuery;
  window.$ = window.$ || jQuery;
}
