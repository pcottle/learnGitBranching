"use strict";

/**
 * Controls the shared loading overlay.
 *
 * The overlay markup lives in index.html so it can paint before the app
 * bundle loads. It is shown for slow startup and for on-demand level loads,
 * then hidden (not removed) so it can be reused.
 */

function getLoader() {
  if (typeof document === 'undefined') { return null; }
  return document.getElementById('appLoading');
}

exports.showAppLoading = function() {
  var loader = getLoader();
  if (!loader) { return; }
  loader.hidden = false;
  // show immediately (the startup CSS fades in after a delay)
  loader.className = 'appLoading-visible';
};

exports.hideAppLoading = function() {
  var loader = getLoader();
  if (!loader) { return; }
  loader.className = '';
  loader.hidden = true;
};
