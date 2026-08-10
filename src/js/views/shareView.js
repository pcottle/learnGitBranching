var intl = require('../intl');
var LevelStore = require('../stores/LevelStore');

var SITE_URL = 'https://learngitbranching.js.org';

// Brand glyphs (single-path SVGs, viewBox 0 0 24 24) so we stay self
// contained and do not depend on any icon font being present.
var BRAND_ICONS = {
  twitter: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z',
  linkedin: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
  facebook: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z',
  threads: 'M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.964-.065-1.191.408-2.285 1.323-3.079.878-.766 2.116-1.216 3.677-1.336a13.4 13.4 0 013.023.104c-.145-.867-.436-1.554-.869-2.05-.599-.68-1.526-1.028-2.751-1.036h-.037c-.981 0-2.311.276-3.16 1.5l-1.684-1.14c1.132-1.639 2.964-2.543 5.152-2.543h.056c3.66.023 5.837 2.267 6.052 6.181.123.052.246.106.365.163 1.694.799 2.934 2.009 3.586 3.5.909 2.081.996 5.474-1.72 8.13-2.077 2.034-4.591 2.951-8.13 2.977z'
};

var NETWORKS = [
  { key: 'twitter', name: 'X', color: '#000000' },
  { key: 'linkedin', name: 'LinkedIn', color: '#0a66c2' },
  { key: 'facebook', name: 'Facebook', color: '#1877f2' },
  { key: 'threads', name: 'Threads', color: '#000000' }
];

/**
 * Walk every level in every sequence and figure out how many the
 * user has solved so far. Returns the numbers used both for the
 * generated image and the share text.
 */
function getProgressInfo() {
  var seqToLevels = LevelStore.getSequenceToLevels();
  var total = 0;
  var solved = 0;
  Object.keys(seqToLevels).forEach(function(sequenceName) {
    seqToLevels[sequenceName].forEach(function(level) {
      total++;
      if (LevelStore.isLevelSolved(level.id)) {
        solved++;
      }
    });
  });
  var percent = total > 0 ? Math.round((solved / total) * 100) : 0;
  return { total: total, solved: solved, percent: percent };
}

function buildDeeplinks(shareText, url) {
  var encodedText = encodeURIComponent(shareText);
  var encodedUrl = encodeURIComponent(url);
  return {
    // X / Twitter takes text + url as separate params
    twitter: 'https://twitter.com/intent/tweet?text=' + encodedText +
      '&url=' + encodedUrl,
    // LinkedIn's reliable composer only takes the url and pulls in the
    // page preview; the user pastes the copied image on top of that
    linkedin: 'https://www.linkedin.com/sharing/share-offsite/?url=' + encodedUrl,
    // Facebook sharer accepts the url plus a suggested quote
    facebook: 'https://www.facebook.com/sharer/sharer.php?u=' + encodedUrl +
      '&quote=' + encodedText,
    // Threads only takes text, so fold the url into it
    threads: 'https://www.threads.net/intent/post?text=' +
      encodeURIComponent(shareText + '\n' + url)
  };
}

class ShareView {
  constructor(options) {
    options = options || {};
    this.destination = options.destination;
    this.levelName = options.levelName || '';
    this.info = getProgressInfo();
    this.shareText = intl.str('share-progress-text', {
      levelName: this.levelName,
      solved: this.info.solved,
      total: this.info.total
    });
    this.deeplinks = buildDeeplinks(this.shareText, SITE_URL);

    this.render();
    this.drawCard();
  }

  render() {
    var networksHTML = NETWORKS.map(function(network) {
      return '<a class="shareNetworkButton" data-network="' + network.key + '"' +
        ' style="background:' + network.color + ';" title="' + network.name + '">' +
        '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">' +
        '<path fill="#ffffff" d="' + BRAND_ICONS[network.key] + '"/></svg>' +
        '<span>' + network.name + '</span>' +
        '</a>';
    }).join('');

    var html =
      '<div class="shareViewInner">' +
        '<canvas class="shareCardCanvas" width="1200" height="630"></canvas>' +
        '<p class="shareHint">' + intl.str('share-progress-hint') + '</p>' +
        '<div class="shareImageActions">' +
          '<a class="uiButton uiButtonWhite shareCopyButton">' +
            intl.str('share-progress-copy') + '</a>' +
          '<a class="uiButton shareDownloadButton">' +
            intl.str('share-progress-download') + '</a>' +
        '</div>' +
        '<div class="shareNetworks">' + networksHTML + '</div>' +
      '</div>';

    this.$el = $(html);
    $(this.destination).append(this.$el);

    this.canvas = this.$el.find('.shareCardCanvas')[0];
    this.$el.find('.shareCopyButton').on('click', this.copyImage.bind(this));
    this.$el.find('.shareDownloadButton').on('click', this.downloadImage.bind(this));
    this.$el.find('.shareNetworkButton').on('click', this.onNetworkClick.bind(this));
  }

  onNetworkClick(event) {
    var network = $(event.currentTarget).attr('data-network');
    var link = this.deeplinks[network];
    if (link) {
      window.open(link, '_blank', 'noopener,noreferrer');
    }
  }

  roundRect(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.arcTo(x + width, y, x + width, y + height, radius);
    ctx.arcTo(x + width, y + height, x, y + height, radius);
    ctx.arcTo(x, y + height, x, y, radius);
    ctx.arcTo(x, y, x + width, y, radius);
    ctx.closePath();
  }

  wrapText(ctx, text, maxWidth) {
    var words = String(text).split(' ');
    var lines = [];
    var current = '';
    for (var i = 0; i < words.length; i++) {
      var candidate = current ? current + ' ' + words[i] : words[i];
      if (ctx.measureText(candidate).width > maxWidth && current) {
        lines.push(current);
        current = words[i];
      } else {
        current = candidate;
      }
    }
    if (current) {
      lines.push(current);
    }
    // don't let a runaway title blow out the card
    if (lines.length > 2) {
      lines = lines.slice(0, 2);
      lines[1] = lines[1].replace(/\.*$/, '') + '…';
    }
    return lines;
  }

  drawCard() {
    var canvas = this.canvas;
    if (!canvas || !canvas.getContext) {
      return;
    }
    var ctx = canvas.getContext('2d');
    var W = canvas.width;
    var H = canvas.height;

    // background gradient
    var bg = ctx.createLinearGradient(0, 0, W, H);
    bg.addColorStop(0, '#1b2b3a');
    bg.addColorStop(1, '#0d1620');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    // subtle commit-graph decoration in the background
    this.drawCommitGraph(ctx, W, H);

    var margin = 80;

    // header
    ctx.textBaseline = 'alphabetic';
    ctx.fillStyle = '#9fd0ff';
    ctx.font = '600 40px "Helvetica Neue", Helvetica, Arial, sans-serif';
    ctx.fillText('Learn Git Branching', margin, margin + 20);

    // little branch icon accent
    ctx.strokeStyle = '#f9a825';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(margin, margin + 48);
    ctx.lineTo(margin + 120, margin + 48);
    ctx.stroke();

    // "Level complete!" eyebrow
    ctx.fillStyle = '#7bd88f';
    ctx.font = '700 44px "Helvetica Neue", Helvetica, Arial, sans-serif';
    ctx.fillText(intl.str('share-progress-card-complete'), margin, 250);

    // level name (wrapped)
    ctx.fillStyle = '#ffffff';
    ctx.font = '700 76px "Helvetica Neue", Helvetica, Arial, sans-serif';
    var lines = this.wrapText(ctx, '"' + this.levelName + '"', W - margin * 2);
    var lineY = 340;
    for (var i = 0; i < lines.length; i++) {
      ctx.fillText(lines[i], margin, lineY);
      lineY += 86;
    }

    // progress bar
    var barY = 500;
    var barW = W - margin * 2;
    var barH = 34;
    ctx.fillStyle = 'rgba(255,255,255,0.12)';
    this.roundRect(ctx, margin, barY, barW, barH, barH / 2);
    ctx.fill();

    var filled = Math.max(barH, barW * (this.info.percent / 100));
    var fillGrad = ctx.createLinearGradient(margin, 0, margin + barW, 0);
    fillGrad.addColorStop(0, '#3e779d');
    fillGrad.addColorStop(1, '#7bd88f');
    ctx.fillStyle = fillGrad;
    this.roundRect(ctx, margin, barY, filled, barH, barH / 2);
    ctx.fill();

    // progress label
    ctx.fillStyle = '#cfe3f5';
    ctx.font = '500 34px "Helvetica Neue", Helvetica, Arial, sans-serif';
    ctx.fillText(
      intl.str('share-progress-card-levels', {
        solved: this.info.solved,
        total: this.info.total,
        percent: this.info.percent
      }),
      margin,
      barY + barH + 52
    );

    // footer url
    ctx.fillStyle = '#7f9bb3';
    ctx.font = '500 30px "Helvetica Neue", Helvetica, Arial, sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText('learngitbranching.js.org', W - margin, H - 60);
    ctx.textAlign = 'left';
  }

  drawCommitGraph(ctx, W, H) {
    // a faint row of connected commits along the bottom-right
    ctx.save();
    ctx.globalAlpha = 0.18;
    var nodes = [
      { x: W - 470, y: 150 },
      { x: W - 350, y: 150 },
      { x: W - 230, y: 150 },
      { x: W - 170, y: 90 },
      { x: W - 110, y: 150 }
    ];
    ctx.strokeStyle = '#65a9d7';
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.moveTo(nodes[0].x, nodes[0].y);
    ctx.lineTo(nodes[1].x, nodes[1].y);
    ctx.lineTo(nodes[2].x, nodes[2].y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(nodes[2].x, nodes[2].y);
    ctx.lineTo(nodes[3].x, nodes[3].y);
    ctx.lineTo(nodes[4].x, nodes[4].y);
    ctx.stroke();
    var colors = ['#65a9d7', '#65a9d7', '#65a9d7', '#f9a825', '#7bd88f'];
    for (var i = 0; i < nodes.length; i++) {
      ctx.fillStyle = colors[i];
      ctx.beginPath();
      ctx.arc(nodes[i].x, nodes[i].y, 26, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  flashButton($button, messageKey) {
    var original = $button.text();
    $button.text(intl.str(messageKey));
    setTimeout(function() {
      $button.text(original);
    }, 2200);
  }

  copyImage() {
    var self = this;
    var $button = this.$el.find('.shareCopyButton');
    var canvas = this.canvas;

    var canUseClipboard = typeof window.ClipboardItem !== 'undefined' &&
      navigator.clipboard &&
      typeof navigator.clipboard.write === 'function';

    if (!canUseClipboard) {
      // browsers without image clipboard support just get a download
      this.downloadImage();
      this.flashButton($button, 'share-progress-copy-unsupported');
      return;
    }

    try {
      var blobPromise = new Promise(function(resolve, reject) {
        canvas.toBlob(function(blob) {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('toBlob returned null'));
          }
        }, 'image/png');
      });

      var item = new window.ClipboardItem({ 'image/png': blobPromise });
      navigator.clipboard.write([item]).then(function() {
        self.flashButton($button, 'share-progress-copied');
      }).catch(function() {
        self.downloadImage();
        self.flashButton($button, 'share-progress-copy-unsupported');
      });
    } catch (e) {
      this.downloadImage();
      this.flashButton($button, 'share-progress-copy-unsupported');
    }
  }

  downloadImage() {
    var canvas = this.canvas;
    var dataURL;
    try {
      dataURL = canvas.toDataURL('image/png');
    } catch (e) {
      return;
    }
    var link = document.createElement('a');
    link.href = dataURL;
    link.download = 'learn-git-branching-progress.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

exports.ShareView = ShareView;
exports.getProgressInfo = getProgressInfo;
exports.buildDeeplinks = buildDeeplinks;
