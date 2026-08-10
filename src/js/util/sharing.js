/**
 * Utility for generating social media sharing URLs.
 * Uses each platform's standard deeplink URL scheme to open the composer.
 */

var SITE_URL = 'https://learngitbranching.js.org';

/**
 * Build the share text for a completed level.
 * @param {string} levelName  Human-readable level name
 * @returns {string}
 */
function buildShareText(levelName) {
  if (levelName) {
    return 'I just completed the "' + levelName + '" level on Learn Git Branching! ' +
      'Learn git interactively at ' + SITE_URL;
  }
  return 'I just completed a level on Learn Git Branching! ' +
    'Learn git interactively at ' + SITE_URL;
}

/**
 * Returns the Twitter/X share URL for a given level.
 * @param {string} levelName
 * @returns {string}
 */
function getTwitterUrl(levelName) {
  var text = buildShareText(levelName);
  return 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(text);
}

/**
 * Returns the LinkedIn share URL for a given level.
 * @param {string} levelName
 * @returns {string}
 */
function getLinkedInUrl(levelName) {
  var text = buildShareText(levelName);
  return 'https://www.linkedin.com/sharing/share-offsite/?url=' +
    encodeURIComponent(SITE_URL) +
    '&summary=' + encodeURIComponent(text);
}

/**
 * Returns the Facebook share URL for a given level.
 * @param {string} levelName
 * @returns {string}
 */
function getFacebookUrl(/* levelName */) {
  return 'https://www.facebook.com/sharer/sharer.php?u=' +
    encodeURIComponent(SITE_URL);
}

/**
 * Open a share URL in a small popup window.
 * @param {string} url
 */
function openShareWindow(url) {
  var width = 600;
  var height = 400;
  var left = Math.round((window.screen.width / 2) - (width / 2));
  var top = Math.round((window.screen.height / 2) - (height / 2));
  window.open(
    url,
    'share',
    'width=' + width + ',height=' + height + ',left=' + left + ',top=' + top +
      ',toolbar=no,menubar=no,scrollbars=yes,resizable=yes'
  );
}

exports.buildShareText = buildShareText;
exports.getTwitterUrl = getTwitterUrl;
exports.getLinkedInUrl = getLinkedInUrl;
exports.getFacebookUrl = getFacebookUrl;
exports.openShareWindow = openShareWindow;
