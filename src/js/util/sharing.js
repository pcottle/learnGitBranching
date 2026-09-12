/**
 * Utility for generating social media sharing URLs.
 * Uses each platform's standard deeplink URL scheme to open the composer.
 */

var intl = require('../intl');

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
 * Build the share text for finishing every level in the game.
 * @param {number} levelsTotal  How many levels there are
 * @returns {string}
 */
function buildAllLevelsShareText(levelsTotal) {
  return 'I just completed all ' + levelsTotal +
    ' levels of Learn Git Branching and earned my certificate! ' +
    'Learn git interactively at ' + SITE_URL;
}

/**
 * Returns the Twitter/X share URL for a given text.
 * @param {string} text
 * @returns {string}
 */
function getTwitterUrlForText(text) {
  return 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(text);
}

/**
 * Returns the LinkedIn share URL for a given text.
 * The share-offsite endpoint only reads the url param and ignores any
 * text, so we deeplink into the feed composer which supports prefilled text.
 * @param {string} text
 * @returns {string}
 */
function getLinkedInUrlForText(text) {
  return 'https://www.linkedin.com/feed/?shareActive=true&text=' +
    encodeURIComponent(text);
}

/**
 * Returns the Facebook share URL for a given text.
 * Facebook policy prohibits prefilling the composer text itself; the quote
 * param is the only sanctioned way to attach a message (shown as a quote
 * block on the post) and even that is honored inconsistently.
 * @param {string} text
 * @returns {string}
 */
function getFacebookUrlForText(text) {
  return 'https://www.facebook.com/sharer/sharer.php?u=' +
    encodeURIComponent(SITE_URL) +
    '&quote=' + encodeURIComponent(text);
}

/**
 * Returns the Twitter/X share URL for a given level.
 * @param {string} levelName
 * @returns {string}
 */
function getTwitterUrl(levelName) {
  return getTwitterUrlForText(buildShareText(levelName));
}

/**
 * Returns the LinkedIn share URL for a given level.
 * @param {string} levelName
 * @returns {string}
 */
function getLinkedInUrl(levelName) {
  return getLinkedInUrlForText(buildShareText(levelName));
}

/**
 * Returns the Facebook share URL for a given level.
 * @param {string} levelName
 * @returns {string}
 */
function getFacebookUrl(levelName) {
  return getFacebookUrlForText(buildShareText(levelName));
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

var SHARE_ICONS = {
  twitter: '<svg class="share-btn-icon" viewBox="0 0 24 24" aria-hidden="true">' +
    '<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817' +
    'L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833' +
    'L7.084 4.126H5.117z"/></svg>',
  linkedin: '<svg class="share-btn-icon" viewBox="0 0 24 24" aria-hidden="true">' +
    '<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0' +
    '-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 ' +
    '3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063' +
    '-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 ' +
    '0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0' +
    'H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 ' +
    '24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/></svg>',
  facebook: '<svg class="share-btn-icon" viewBox="0 0 24 24" aria-hidden="true">' +
    '<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 ' +
    '10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 ' +
    '4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925' +
    '-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 ' +
    '24 12.073z"/></svg>'
};

/**
 * Escape a string for use inside a double-quoted HTML attribute.
 * @param {string} value
 * @returns {string}
 */
function escapeAttr(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/**
 * Markup for one share button. Clicks are handled by delegation on whatever
 * container the markup ends up in -- see bindShareButtons.
 * @param {string} key  twitter | linkedin | facebook
 * @param {string} url
 * @param {string} label
 * @returns {string}
 */
function shareButtonHTML(key, url, label) {
  return '<button class="share-btn share-btn-' + key + '"' +
    ' data-share-url="' + escapeAttr(url) + '"' +
    ' aria-label="' + escapeAttr(label) + '">' +
    SHARE_ICONS[key] +
    '<span>' + escapeAttr(label) + '</span>' +
  '</button>';
}

/**
 * The whole "share your progress" block: a label plus the three network
 * buttons, all pointing at the same share text.
 *
 * @param {string} shareText  The message to prefill each composer with
 * @param {Object} [options]  label: heading text above the buttons
 * @returns {string}
 */
function buildShareSectionHTML(shareText, options) {
  options = options || {};
  var label = options.label || intl.str('share-progress');

  return '<div class="share-progress-section">' +
    '<p class="share-progress-label">' + escapeAttr(label) + '</p>' +
    '<div class="share-progress-buttons">' +
    shareButtonHTML(
      'twitter',
      getTwitterUrlForText(shareText),
      intl.str('share-progress-twitter')
    ) +
    shareButtonHTML(
      'linkedin',
      getLinkedInUrlForText(shareText),
      intl.str('share-progress-linkedin')
    ) +
    shareButtonHTML(
      'facebook',
      getFacebookUrlForText(shareText),
      intl.str('share-progress-facebook')
    ) +
    '</div>' +
    '</div>';
}

/**
 * Wire up share button clicks inside a container via event delegation.
 * @param {Object} $container  jQuery-wrapped element
 */
function bindShareButtons($container) {
  if (!$container) { return; }
  $container.on('click', '[data-share-url]', function(e) {
    e.preventDefault();
    var url = $(e.currentTarget).attr('data-share-url');
    if (url) {
      openShareWindow(url);
    }
  });
}

exports.buildShareText = buildShareText;
exports.buildAllLevelsShareText = buildAllLevelsShareText;
exports.getTwitterUrl = getTwitterUrl;
exports.getLinkedInUrl = getLinkedInUrl;
exports.getFacebookUrl = getFacebookUrl;
exports.getTwitterUrlForText = getTwitterUrlForText;
exports.getLinkedInUrlForText = getLinkedInUrlForText;
exports.getFacebookUrlForText = getFacebookUrlForText;
exports.openShareWindow = openShareWindow;
exports.buildShareSectionHTML = buildShareSectionHTML;
exports.bindShareButtons = bindShareButtons;
