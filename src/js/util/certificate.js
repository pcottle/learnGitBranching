/**
 * Certificate of completion.
 *
 * Renders a shareable "you finished every level" certificate as a single
 * self-contained SVG string, plus helpers to rasterize that SVG into a PNG
 * blob for copying to the clipboard or downloading.
 *
 * This module is deliberately dependency-free (no jQuery, no underscore, no
 * intl) so the SVG and filename behavior can be tested without a browser.
 *
 * Everything user-visible is passed in via options so the caller can supply
 * translated strings; the defaults below are the English copy.
 */

var WIDTH = 1200;
var HEIGHT = 800;

// Monospace everywhere -- it is the house style of the app, and it also makes
// text width estimation (used for underline sizing) reliable.
var MONO = "Menlo, Monaco, Consolas, 'Droid Sans Mono', monospace";

// Roughly the advance width of one glyph in a monospace face, as a fraction
// of the font size. Used only for centering/underline math, so approximate
// is fine.
var MONO_ADVANCE = 0.6;

var COLORS = {
  // Commit node colors, borrowed from the app's own visual language.
  mainCommit: '#47B2B2',
  sideCommit: '#A277D9',
  mergeCommit: '#E3B341',
  branchLabel: '#FF66C4',
  headLabel: '#7278FF',
  tagLabel: '#E6E6E6',
  edge: '#8B949E',
  dim: '#7D8590',
  body: '#C9D1D9',
  bright: '#FFFFFF'
};

var DEFAULT_STRINGS = {
  wordmark: 'LEARN GIT BRANCHING',
  title: 'CERTIFICATE OF COMPLETION',
  certifies: 'This certifies that',
  namePlaceholder: 'YOUR NAME HERE',
  // {levels} is substituted with the level count.
  achievement: 'has completed all {levels} levels of Learn Git Branching',
  flourish: 'from the basic concepts of a branch to mastery of remote pulls',
  topicsLabel: 'TOPICS COVERED',
  topics: 'Commits & Branches  •  Merging & Rebasing  •  ' +
    'Cherry-pick & Relative Refs  •  Undoing Changes  •  ' +
    'Tags & History  •  Fetch, Pull & Push',
  issued: 'ISSUED',
  site: 'learngitbranching.js.org',
  sealTop: 'COMPLETED',
  sealBottom: 'LEVELS'
};

/**
 * Escape a string for inclusion in XML text content or an attribute value.
 * @param {string} str
 * @returns {string}
 */
function escapeXML(str) {
  return String(str === undefined || str === null ? '' : str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * Serialize an attribute map into an SVG attribute string.
 * @param {Object} attrs
 * @returns {string}
 */
function attrs(map) {
  var out = [];
  Object.keys(map).forEach(function(key) {
    var value = map[key];
    if (value === undefined || value === null || value === false) {
      return;
    }
    out.push(key + '="' + escapeXML(value) + '"');
  });
  return out.join(' ');
}

/**
 * Estimated rendered width of a run of monospace text.
 * @param {string} str
 * @param {number} fontSize
 * @param {number} [letterSpacing]
 * @returns {number}
 */
function monoWidth(str, fontSize, letterSpacing) {
  var length = String(str).length;
  if (!length) { return 0; }
  return length * fontSize * MONO_ADVANCE + (length - 1) * (letterSpacing || 0);
}

/**
 * Build an SVG <text> element.
 *
 * @param {string} str    Text content
 * @param {Object} options  x, y, size, fill, weight, anchor, spacing, opacity
 * @returns {string}
 */
function text(str, options) {
  var spacing = options.spacing || 0;
  var anchor = options.anchor || 'middle';

  return '<text ' + attrs({
    x: options.x,
    y: options.y,
    'font-family': options.family || MONO,
    'font-size': options.size,
    'font-weight': options.weight || null,
    'letter-spacing': spacing || null,
    'text-anchor': anchor,
    fill: options.fill,
    opacity: options.opacity === undefined ? null : options.opacity
  }) + '>' + escapeXML(str) + '</text>';
}

/**
 * A commit node: a filled circle with a white ring, matching how commits are
 * drawn in the main visualization.
 * @param {number} x
 * @param {number} y
 * @param {string} fill
 * @param {number} [radius]
 * @returns {string}
 */
function commitNode(x, y, fill, radius) {
  var r = radius || 14;
  return '<circle ' + attrs({
    cx: x, cy: y, r: r + 6, fill: fill, opacity: 0.18
  }) + '/>' +
  '<circle ' + attrs({
    cx: x, cy: y, r: r, fill: fill, stroke: '#FFFFFF', 'stroke-width': 2.5
  }) + '/>';
}

/**
 * An edge between two commits. Horizontal edges are straight lines; edges
 * that change lanes get a gentle S-curve, the way the app draws them.
 * @param {number} x1
 * @param {number} y1
 * @param {number} x2
 * @param {number} y2
 * @returns {string}
 */
function commitEdge(x1, y1, x2, y2) {
  var d;
  if (y1 === y2) {
    d = 'M' + x1 + ',' + y1 + ' L' + x2 + ',' + y2;
  } else {
    var midX = (x1 + x2) / 2;
    d = 'M' + x1 + ',' + y1 +
      ' C' + midX + ',' + y1 + ' ' + midX + ',' + y2 + ' ' + x2 + ',' + y2;
  }
  return '<path ' + attrs({
    d: d,
    fill: 'none',
    stroke: COLORS.edge,
    'stroke-width': 2.5,
    'stroke-linecap': 'round',
    opacity: 0.75
  }) + '/>';
}

/**
 * A branch or tag label: a rounded pill centered on (cx, cy).
 * @param {string} label
 * @param {number} cx
 * @param {number} cy
 * @param {Object} options  fill, textFill, dashed
 * @returns {string}
 */
function refLabel(label, cx, cy, options) {
  options = options || {};
  var fontSize = 15;
  var padding = 13;
  var width = Math.round(monoWidth(label, fontSize) + padding * 2);
  var height = 30;

  return '<rect ' + attrs({
    x: cx - width / 2,
    y: cy - height / 2,
    width: width,
    height: height,
    rx: 6,
    fill: options.fill || COLORS.branchLabel,
    stroke: '#FFFFFF',
    'stroke-width': 2,
    'stroke-dasharray': options.dashed ? '4 3' : null
  }) + '/>' +
  text(label, {
    x: cx,
    y: cy + 5,
    size: fontSize,
    weight: 'bold',
    fill: options.textFill || '#FFFFFF'
  });
}

/**
 * The decorative commit graph across the lower half of the certificate.
 *
 * It is the metaphor of the whole thing: you branched off `life` to go
 * `learning`, put in some commits, and merged the work back in.
 *
 * @param {Object} options  branchName, sideBranchName, tagName
 * @returns {string}
 */
function commitGraph(options) {
  var mainY = 630;
  var sideY = 556;

  // Center the visual bounds of the whole graph, including its ref labels.
  // Centering only the merge commit made the diagram read as left-aligned.
  var main = [300, 390, 480, 570];
  var side = [570, 660];
  var mergeX = 720;
  var tipX = 810;

  var parts = [];

  // Edges first so the nodes paint on top of them.
  parts.push(commitEdge(main[0], mainY, main[1], mainY));
  parts.push(commitEdge(main[1], mainY, main[2], mainY));
  parts.push(commitEdge(main[2], mainY, main[3], mainY));
  parts.push(commitEdge(main[3], mainY, mergeX, mainY));
  parts.push(commitEdge(mergeX, mainY, tipX, mainY));
  parts.push(commitEdge(main[2], mainY, side[0], sideY));
  parts.push(commitEdge(side[0], sideY, side[1], sideY));
  parts.push(commitEdge(side[1], sideY, mergeX, mainY));

  main.forEach(function(x) {
    parts.push(commitNode(x, mainY, COLORS.mainCommit));
  });
  side.forEach(function(x) {
    parts.push(commitNode(x, sideY, COLORS.sideCommit));
  });
  parts.push(commitNode(tipX, mainY, COLORS.mainCommit));

  // The merge commit is the hero of the graph, so it gets the gold treatment.
  parts.push(commitNode(mergeX, mainY, COLORS.mergeCommit, 17));

  // Connector stub from the side branch tip up to its label.
  parts.push('<path ' + attrs({
    d: 'M' + side[1] + ',' + (sideY - 16) + ' L' + side[1] + ',' + (sideY - 30),
    stroke: COLORS.edge,
    'stroke-width': 2,
    opacity: 0.6
  }) + '/>');

  parts.push(refLabel(options.sideBranchName, side[1], sideY - 44, {}));
  parts.push(refLabel(options.branchName, tipX + 72, mainY, {}));
  parts.push(refLabel(options.tagName, mergeX, mainY + 58, {
    fill: COLORS.tagLabel,
    textFill: '#1A1D23'
  }));

  return parts.join('\n    ');
}

/**
 * The wax-seal-ish badge in the lower right corner.
 * @param {Object} options  count, top, bottom
 * @returns {string}
 */
function seal(options) {
  // Leave a comfortable gap beside the now-centered commit graph.
  var cx = 1030;
  var cy = 576;
  var gold = COLORS.mergeCommit;

  return [
    '<circle ' + attrs({
      cx: cx, cy: cy, r: 62, fill: 'rgba(227,179,65,0.07)',
      stroke: gold, 'stroke-width': 2
    }) + '/>',
    '<circle ' + attrs({
      cx: cx, cy: cy, r: 53, fill: 'none', stroke: gold,
      'stroke-width': 1.5, 'stroke-dasharray': '3 6', opacity: 0.7
    }) + '/>',
    '<circle ' + attrs({
      cx: cx, cy: cy, r: 44, fill: 'rgba(0,0,0,0.25)',
      stroke: gold, 'stroke-width': 1, opacity: 0.9
    }) + '/>',
    text(options.top, {
      x: cx, y: cy - 14, size: 10, spacing: 2.5, fill: gold, weight: 'bold'
    }),
    text(options.count, {
      x: cx, y: cy + 12, size: 22, weight: 'bold', fill: COLORS.bright
    }),
    text(options.bottom, {
      x: cx, y: cy + 32, size: 10, spacing: 2.5, fill: gold, weight: 'bold'
    })
  ].join('\n    ');
}

/**
 * Decorative commit nodes tucked into the four corners of the frame.
 * @returns {string}
 */
function cornerOrnaments() {
  var points = [
    [40, 40], [WIDTH - 40, 40], [40, HEIGHT - 40], [WIDTH - 40, HEIGHT - 40]
  ];
  return points.map(function(point) {
    return '<circle ' + attrs({
      cx: point[0], cy: point[1], r: 6,
      fill: '#0E1117', stroke: COLORS.branchLabel, 'stroke-width': 2,
      opacity: 0.85
    }) + '/>';
  }).join('\n    ');
}

/**
 * Pick a font size for the recipient name so that long names still fit
 * inside the certificate.
 * @param {string} name
 * @returns {number}
 */
function nameFontSize(name) {
  var maxWidth = 900;
  var size = 62;
  while (size > 24 && monoWidth(name, size, 2) > maxWidth) {
    size -= 2;
  }
  return size;
}

/**
 * Format a date the way the certificate wants it, e.g. "March 14, 2026".
 * Falls back to an ISO-ish string if toLocaleDateString misbehaves.
 * @param {Date} [date]
 * @param {string} [locale]
 * @returns {string}
 */
function formatDate(date, locale) {
  date = date || new Date();
  try {
    return date.toLocaleDateString(locale || undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch (e) {
    return date.toISOString().slice(0, 10);
  }
}

/**
 * Build the certificate as a standalone SVG document string.
 *
 * @param {Object} [options]
 *   name           {string} recipient name (blank shows a placeholder)
 *   levelsTotal    {number} how many levels exist
 *   dateString     {string} pre-formatted issue date
 *   strings        {Object} overrides for any key in DEFAULT_STRINGS
 *   branchName     {string} label on the main branch in the graph
 *   sideBranchName {string} label on the side branch in the graph
 *   tagName        {string} label on the merge commit
 * @returns {string}
 */
function buildCertificateSVG(options) {
  options = options || {};

  var strings = Object.assign({}, DEFAULT_STRINGS, options.strings || {});
  var levelsTotal = options.levelsTotal || 0;
  var rawName = String(options.name || '').trim();
  var hasName = rawName.length > 0;
  var name = hasName ? rawName : strings.namePlaceholder;
  var dateString = options.dateString || formatDate();

  var achievement = String(strings.achievement)
    .replace('{levels}', String(levelsTotal));

  var nameSize = nameFontSize(name);
  var underlineWidth = Math.max(
    360,
    Math.min(920, monoWidth(name, nameSize, 2) + 90)
  );

  var parts = [];

  parts.push(
    '<svg ' + attrs({
      xmlns: 'http://www.w3.org/2000/svg',
      'xmlns:xlink': 'http://www.w3.org/1999/xlink',
      width: WIDTH,
      height: HEIGHT,
      viewBox: '0 0 ' + WIDTH + ' ' + HEIGHT,
      role: 'img'
    }) + '>'
  );

  parts.push(
    '<title>' + escapeXML(strings.title + ' - ' + name) + '</title>'
  );

  // --- defs -------------------------------------------------------------
  parts.push([
    '<defs>',
    '  <linearGradient id="bg" x1="0" y1="0" x2="0.6" y2="1">',
    '    <stop offset="0%" stop-color="#191D26"/>',
    '    <stop offset="55%" stop-color="#12151C"/>',
    '    <stop offset="100%" stop-color="#0B0D12"/>',
    '  </linearGradient>',
    '  <linearGradient id="titleGrad" x1="0" y1="0" x2="1" y2="0">',
    '    <stop offset="0%" stop-color="#FF66C4"/>',
    '    <stop offset="50%" stop-color="#C084F5"/>',
    '    <stop offset="100%" stop-color="#7278FF"/>',
    '  </linearGradient>',
    '  <linearGradient id="frameGrad" x1="0" y1="0" x2="1" y2="1">',
    '    <stop offset="0%" stop-color="#FF66C4" stop-opacity="0.85"/>',
    '    <stop offset="45%" stop-color="#7278FF" stop-opacity="0.75"/>',
    '    <stop offset="100%" stop-color="#47B2B2" stop-opacity="0.85"/>',
    '  </linearGradient>',
    '  <linearGradient id="ruleGrad" x1="0" y1="0" x2="1" y2="0">',
    '    <stop offset="0%" stop-color="#FF66C4" stop-opacity="0"/>',
    '    <stop offset="50%" stop-color="#C084F5" stop-opacity="0.9"/>',
    '    <stop offset="100%" stop-color="#7278FF" stop-opacity="0"/>',
    '  </linearGradient>',
    '  <radialGradient id="glow" cx="0.5" cy="0.5" r="0.5">',
    '    <stop offset="0%" stop-color="#7278FF" stop-opacity="0.28"/>',
    '    <stop offset="100%" stop-color="#7278FF" stop-opacity="0"/>',
    '  </radialGradient>',
    '  <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">',
    '    <circle cx="1" cy="1" r="1" fill="#FFFFFF" opacity="0.05"/>',
    '  </pattern>',
    '</defs>'
  ].join('\n  '));

  // --- background -------------------------------------------------------
  parts.push('<rect ' + attrs({
    x: 0, y: 0, width: WIDTH, height: HEIGHT, fill: 'url(#bg)'
  }) + '/>');
  parts.push('<rect ' + attrs({
    x: 0, y: 0, width: WIDTH, height: HEIGHT, fill: 'url(#grid)'
  }) + '/>');
  parts.push('<ellipse ' + attrs({
    cx: 600, cy: 180, rx: 620, ry: 300, fill: 'url(#glow)'
  }) + '/>');

  // --- frame ------------------------------------------------------------
  parts.push('<rect ' + attrs({
    x: 28, y: 28, width: WIDTH - 56, height: HEIGHT - 56, rx: 18,
    fill: 'none', stroke: 'url(#frameGrad)', 'stroke-width': 2.5
  }) + '/>');
  parts.push('<rect ' + attrs({
    x: 40, y: 40, width: WIDTH - 80, height: HEIGHT - 80, rx: 12,
    fill: 'none', stroke: '#FFFFFF', 'stroke-opacity': 0.09,
    'stroke-width': 1
  }) + '/>');
  parts.push(cornerOrnaments());

  // --- header -----------------------------------------------------------
  parts.push(text(strings.wordmark, {
    x: 600, y: 106, size: 15, spacing: 8, fill: COLORS.dim, weight: 'bold'
  }));
  parts.push(text(strings.title, {
    x: 600, y: 172, size: 42, spacing: 5, weight: 'bold',
    fill: 'url(#titleGrad)'
  }));

  // Divider with a commit node sitting on it, like a branch point.
  parts.push('<rect ' + attrs({
    x: 330, y: 200, width: 540, height: 2, fill: 'url(#ruleGrad)'
  }) + '/>');
  parts.push(commitNode(600, 201, COLORS.branchLabel, 7));

  // --- body -------------------------------------------------------------
  parts.push(text(strings.certifies, {
    x: 600, y: 262, size: 18, spacing: 1, fill: COLORS.dim
  }));

  parts.push(text(name, {
    // A percentage keeps the intent explicit even if the canvas dimensions
    // change later; text-anchor centers the actual rendered text run.
    x: '50%',
    y: 336,
    size: nameSize,
    spacing: 2,
    weight: 'bold',
    fill: hasName ? COLORS.bright : 'rgba(255,255,255,0.28)'
  }));

  parts.push('<rect ' + attrs({
    x: 600 - underlineWidth / 2, y: 360, width: underlineWidth, height: 1,
    fill: '#FFFFFF', opacity: 0.18
  }) + '/>');

  parts.push(text(achievement, {
    x: 600, y: 406, size: 19, fill: COLORS.body
  }));
  parts.push(text(strings.flourish, {
    x: 600, y: 438, size: 15, fill: COLORS.dim
  }));

  // A compact skills summary adds context without competing with the name or
  // turning the certificate into a syllabus.
  parts.push(text(strings.topicsLabel, {
    x: 600, y: 458, size: 9, spacing: 2, fill: COLORS.mergeCommit,
    weight: 'bold'
  }));
  parts.push(text(strings.topics, {
    x: 600, y: 478, size: 10, fill: COLORS.body
  }));

  // --- decorative graph + seal -----------------------------------------
  parts.push(commitGraph({
    branchName: options.branchName || 'life',
    sideBranchName: options.sideBranchName || 'learning',
    tagName: options.tagName || 'v1.0'
  }));

  parts.push(seal({
    count: levelsTotal + '/' + levelsTotal,
    top: strings.sealTop,
    bottom: strings.sealBottom
  }));

  // --- footer -----------------------------------------------------------
  parts.push('<rect ' + attrs({
    x: 80, y: 716, width: WIDTH - 160, height: 1,
    fill: '#FFFFFF', opacity: 0.1
  }) + '/>');
  parts.push(text(strings.issued + '  ' + dateString, {
    x: 80, y: 750, size: 14, anchor: 'start', fill: COLORS.dim
  }));
  parts.push(text(strings.site, {
    x: 600, y: 750, size: 14, spacing: 1, fill: COLORS.body
  }));
  parts.push(text('git checkout -b career', {
    x: WIDTH - 80, y: 750, size: 14, anchor: 'end', fill: COLORS.dim
  }));

  parts.push('</svg>');

  return parts.join('\n  ');
}

/* ------------------------------------------------------------------ *
 * Rasterization helpers (browser only)
 * ------------------------------------------------------------------ */

/**
 * Encode an SVG string as a data URL. We base64 the UTF-8 bytes so that
 * non-ASCII names (which are very much expected) survive the trip.
 * @param {string} svgString
 * @returns {string}
 */
function svgToDataURL(svgString) {
  var utf8 = window.unescape(window.encodeURIComponent(svgString));
  return 'data:image/svg+xml;base64,' + window.btoa(utf8);
}

/**
 * Rasterize the certificate SVG into a PNG blob.
 *
 * The SVG references no external resources (no web fonts, no images), so the
 * canvas never gets tainted and toBlob() is safe to call.
 *
 * @param {string} svgString
 * @param {Object} [options]  scale (default 2 for retina-ish output)
 * @returns {Promise<Blob>}
 */
function svgToPngBlob(svgString, options) {
  options = options || {};
  var scale = options.scale || 2;

  return new Promise(function(resolve, reject) {
    var image = new window.Image();

    image.onload = function() {
      var canvas = document.createElement('canvas');
      canvas.width = WIDTH * scale;
      canvas.height = HEIGHT * scale;

      var context = canvas.getContext('2d');
      // Paint an opaque backdrop first; PNG transparency around the rounded
      // frame looks broken when pasted into chat apps.
      context.fillStyle = '#0B0D12';
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, 0, 0, canvas.width, canvas.height);

      canvas.toBlob(function(blob) {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error('could not encode the certificate as a PNG'));
        }
      }, 'image/png');
    };

    image.onerror = function() {
      reject(new Error('could not rasterize the certificate SVG'));
    };

    image.src = svgToDataURL(svgString);
  });
}

/**
 * Whether this browser can put an image on the clipboard.
 * @returns {boolean}
 */
function canCopyImage() {
  return !!(
    window.ClipboardItem &&
    window.navigator &&
    window.navigator.clipboard &&
    window.navigator.clipboard.write
  );
}

// Chrome never settles clipboard.write() when the document does not have
// focus, which would otherwise leave the UI waiting forever with no feedback.
var CLIPBOARD_TIMEOUT = 8000;

/**
 * Copy a PNG of the certificate to the clipboard.
 *
 * Safari requires the ClipboardItem to be constructed synchronously inside
 * the user gesture, so we hand it the *promise* of a blob rather than
 * awaiting the blob first.
 *
 * @param {Promise<Blob>|Blob} blobOrPromise
 * @returns {Promise}
 */
function copyPngToClipboard(blobOrPromise) {
  if (!canCopyImage()) {
    return Promise.reject(new Error('clipboard images are not supported here'));
  }

  var write;
  try {
    var item = new window.ClipboardItem({
      'image/png': blobOrPromise
    });
    write = window.navigator.clipboard.write([item]);
  } catch (e) {
    return Promise.reject(e);
  }

  var timeout = new Promise(function(resolve, reject) {
    window.setTimeout(function() {
      reject(new Error('the clipboard did not respond'));
    }, CLIPBOARD_TIMEOUT);
  });

  return Promise.race([write, timeout]);
}

/**
 * Trigger a browser download of a blob.
 * @param {Blob} blob
 * @param {string} filename
 */
function downloadBlob(blob, filename) {
  var url = window.URL.createObjectURL(blob);
  var anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  // Give the download a tick to start before we drop the object URL.
  window.setTimeout(function() {
    window.URL.revokeObjectURL(url);
  }, 1000);
}

/**
 * Turn a recipient name into a safe-ish download filename.
 * @param {string} name
 * @returns {string}
 */
function filenameForName(name) {
  var slug = String(name || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return slug ?
    'learn-git-branching-certificate-' + slug + '.png' :
    'learn-git-branching-certificate.png';
}

var api = {
  WIDTH: WIDTH,
  HEIGHT: HEIGHT,
  DEFAULT_STRINGS: DEFAULT_STRINGS,
  buildCertificateSVG: buildCertificateSVG,
  formatDate: formatDate,
  svgToDataURL: svgToDataURL,
  svgToPngBlob: svgToPngBlob,
  canCopyImage: canCopyImage,
  copyPngToClipboard: copyPngToClipboard,
  downloadBlob: downloadBlob,
  filenameForName: filenameForName
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = api;
}
