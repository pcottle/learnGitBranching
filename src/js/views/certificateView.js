/**
 * The "you finished every level" certificate modal.
 *
 * Shows a live-rendered certificate, lets you type your name onto it, and
 * offers copy-to-clipboard / download-as-PNG plus the usual social share
 * buttons.
 */

var intl = require('../intl');
var util = require('../util');
var Views = require('../views');
var ContainedBase = Views.ContainedBase;
var ModalTerminal = Views.ModalTerminal;
var KeyboardListener = require('../util/keyboard').KeyboardListener;
var { createEvents } = require('../util/eventEmitter');
var createDeferred = require('../util/promise').createDeferred;
var LevelStore = require('../stores/LevelStore');
var sharing = require('../util/sharing');
var certificate = require('../util/certificate');

var NAME_STORAGE_KEY = 'certificateName';
var STATUS_TIMEOUT = 3500;

/**
 * The name typed onto the certificate is remembered between visits so people
 * do not have to retype it. Storage can throw (private browsing, disabled
 * cookies), hence the try/catch on both sides.
 * @returns {string}
 */
function readStoredName() {
  if (!util.isBrowser()) { return ''; }
  try {
    return window.localStorage.getItem(NAME_STORAGE_KEY) || '';
  } catch (e) {
    return '';
  }
}

/**
 * @param {string} name
 */
function writeStoredName(name) {
  if (!util.isBrowser()) { return; }
  try {
    window.localStorage.setItem(NAME_STORAGE_KEY, name);
  } catch (e) {
    // Not being able to remember the name is not worth bothering anyone about.
  }
}

/**
 * Escape a string for use inside a double-quoted HTML attribute.
 * @param {string} value
 * @returns {string}
 */
function escapeAttr(value) {
  return String(value === undefined || value === null ? '' : value)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/**
 * Collect the translated strings that get baked into the SVG itself.
 * @param {number} levelsTotal
 * @returns {Object}
 */
function certificateStrings(levelsTotal) {
  return {
    title: intl.str('certificate-svg-title'),
    namePlaceholder: intl.str('certificate-svg-name-placeholder'),
    achievement: intl.str('certificate-svg-achievement', {
      levels: levelsTotal
    }),
    topicsLabel: intl.str('certificate-svg-topics-label'),
    topicsFirst: intl.str('certificate-svg-topics-first'),
    topicsSecond: intl.str('certificate-svg-topics-second'),
    issued: intl.str('certificate-svg-issued'),
  };
}

class CertificateView extends ContainedBase {
  constructor(options) {
    options = options || {};
    options.tagName = 'div';
    options.className = 'certificateView box vertical';
    super(options);

    this.deferred = options.deferred || createDeferred();
    this.levelsTotal = options.levelsTotal || LevelStore.getTotalLevelCount();
    this.recipientName = options.name === undefined ?
      readStoredName() :
      String(options.name);
    this.statusTimeout = null;

    this.container = options.container || new ModalTerminal({
      title: intl.str('certificate-title')
    });

    this.render(this.buildHTML());
    this.updatePreview();

    this.$('.certificateNameInput').on('input', this.onNameInput.bind(this));
    this.$('.certificateCopy').on('click', this.onCopy.bind(this));
    this.$('.certificateDownload').on('click', this.onDownload.bind(this));
    this.$('.certificateClose').on('click', this.close.bind(this));
    sharing.bindShareButtons(this.$el);

    // Closing happens through the terminal window's own close control or the
    // esc key, both of which the keyboard listener funnels into 'esc'. Enter
    // deliberately does nothing so it stays harmless while typing a name.
    this.navEvents = createEvents();
    this.navEvents.on('esc', this.close, this);
    this.keyboardListener = new KeyboardListener({
      events: this.navEvents,
      aliasMap: {}
    });

    if (!options.wait) {
      this.show();
      // Nudge focus into the name field so people can just start typing.
      window.setTimeout(function() {
        this.$('.certificateNameInput').focus();
      }.bind(this), this.getAnimationTime());
    }
  }

  /**
   * @returns {string}
   */
  buildHTML() {
    var shareText = sharing.buildAllLevelsShareText(this.levelsTotal);
    var canCopy = certificate.canCopyImage();

    return [
      '<h2 class="certificateHeadline">' +
        escapeAttr(intl.str('certificate-headline')) +
      '</h2>',
      '<p class="certificateSubhead">' +
        escapeAttr(intl.str('certificate-subhead', {
          levels: this.levelsTotal
        })) +
      '</p>',
      '<div class="certificateNameRow">',
      '  <label class="certificateNameLabel" for="certificateNameInput">' +
          escapeAttr(intl.str('certificate-name-label')) +
        '</label>',
      '  <input id="certificateNameInput" class="certificateNameInput"' +
        ' type="text" maxlength="60" autocomplete="name" spellcheck="false"' +
        ' placeholder="' + escapeAttr(intl.str('certificate-name-placeholder')) + '"' +
        ' value="' + escapeAttr(this.recipientName) + '"/>',
      '</div>',
      '<div class="certificatePreview"></div>',
      '<div class="certificateActions">',
      '  <button type="button" class="certificateButton certificateCopy"' +
          (canCopy ? '' : ' disabled') + '>' +
          escapeAttr(intl.str('certificate-copy')) +
        '</button>',
      '  <button type="button" class="certificateButton certificateDownload">' +
          escapeAttr(intl.str('certificate-download')) +
        '</button>',
      '  <button type="button" class="certificateButton certificateClose">' +
          escapeAttr(intl.str('certificate-close')) +
        '</button>',
      '</div>',
      '<p class="certificateStatus" role="status" aria-live="polite"></p>',
      sharing.buildShareSectionHTML(shareText, {
        label: intl.str('certificate-share')
      })
    ].join('\n');
  }

  /**
   * The certificate SVG for the currently typed name.
   * @returns {string}
   */
  currentSVG() {
    return certificate.buildCertificateSVG({
      name: this.recipientName,
      levelsTotal: this.levelsTotal,
      dateString: certificate.formatDate(new Date()),
      strings: certificateStrings(this.levelsTotal)
    });
  }

  updatePreview() {
    this.$('.certificatePreview').html(this.currentSVG());
  }

  onNameInput() {
    this.recipientName = this.$('.certificateNameInput').val() || '';
    writeStoredName(this.recipientName);
    this.updatePreview();
  }

  /**
   * @param {string} message
   * @param {boolean} [isError]
   */
  setStatus(message, isError) {
    var $status = this.$('.certificateStatus');
    $status.text(message || '');
    $status.toggleClass('certificateStatusError', !!isError);

    window.clearTimeout(this.statusTimeout);
    if (message) {
      this.statusTimeout = window.setTimeout(function() {
        $status.text('');
        $status.removeClass('certificateStatusError');
      }, STATUS_TIMEOUT);
    }
  }

  onCopy() {
    if (!certificate.canCopyImage()) {
      this.setStatus(intl.str('certificate-copy-unsupported'), true);
      return;
    }

    // Safari requires the ClipboardItem to be built synchronously inside the
    // click handler, so we hand it the promise of a blob rather than awaiting.
    var blobPromise = certificate.svgToPngBlob(this.currentSVG());
    certificate.copyPngToClipboard(blobPromise)
    .then(function() {
      this.setStatus(intl.str('certificate-copied'));
    }.bind(this))
    .catch(function() {
      this.setStatus(intl.str('certificate-copy-failed'), true);
    }.bind(this));
  }

  onDownload() {
    certificate.svgToPngBlob(this.currentSVG())
    .then(function(blob) {
      certificate.downloadBlob(
        blob,
        certificate.filenameForName(this.recipientName)
      );
      this.setStatus(intl.str('certificate-downloaded'));
    }.bind(this))
    .catch(function() {
      this.setStatus(intl.str('certificate-download-failed'), true);
    }.bind(this));
  }

  close() {
    if (this.closed) { return; }
    this.closed = true;

    window.clearTimeout(this.statusTimeout);
    this.keyboardListener.mute();
    this.die();
    this.deferred.resolve();
  }

  /**
   * @returns {Promise}
   */
  getPromise() {
    return this.deferred.promise;
  }
}

exports.CertificateView = CertificateView;
