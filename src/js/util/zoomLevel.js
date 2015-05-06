var _warnOnce = true;
function detectZoom() {
  /**
   * Note: this method has only been tested on Chrome
   * but seems to work. A much more elaborate library is available here:
   * https://github.com/yonran/detect-zoom
   * but seems to return a "2" zoom level for my computer (who knows)
   * so I can't use it. The ecosystem for zoom level detection is a mess
   */
  if (!window.outerWidth || !window.innerWidth) {
    if (_warnOnce) {
      console.warn("Can't detect zoom level correctly :-/");
      _warnOnce = false;
    }
    return 1;
  }

  return window.outerWidth / window.innerWidth;
}

exports.detectZoom = detectZoom;

