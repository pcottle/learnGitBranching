var _ = require('underscore');

var warnOnce = true;

function detectZoom() {
  /**
   * Note: this method has only been tested on Chrome
   * but seems to work. A much more elaborate library is available here:
   * https://github.com/yonran/detect-zoom
   * but seems to return a "2" zoom level for my computer (who knows)
   * so I can't use it. The ecosystem for zoom level detection is a mess
   */
  if (!window.outerWidth || !window.innerWidth) {
    if (warnOnce) {
      console.warn("Can't detect zoom level correctly :-/");
      warnOnce = false;
    }
    return 1;
  }

  return window.outerWidth / window.innerWidth;
}

var locked = true;
var setupZoomPoll = function(callback, context) {
  var currentZoom = 0;

  setInterval(function() {
    var newZoom = detectZoom();

    if (newZoom !== currentZoom) {
      // we need to wait one more before issuing callback
      // to avoid window resize issues
      if (locked) {
        locked = false;
        return;
      }

      currentZoom = newZoom;
      callback.apply(context, [newZoom]);
    } else {
      locked = true;
    }
  }, 500);
};

exports.setupZoomPoll = setupZoomPoll;
exports.detectZoom = detectZoom;

