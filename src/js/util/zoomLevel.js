var _ = require('underscore');

var setupZoomPoll = function(callback, context) {
  var currentZoom = 0;

  setInterval(function() {
    var newZoom = window.outerWidth / window.innerWidth;
    if (newZoom !== currentZoom) {
      currentZoom = newZoom;
      callback.apply(context, [newZoom]);
    }
  }, 100);
};

exports.setupZoomPoll = setupZoomPoll;

