exports.isBrowser = function() {
  var inBrowser = String(typeof window) !== 'undefined';
  return inBrowser;
};

