module.exports = function(func, time, immediate) {
    var timeout;
    return function() {
      var later = function() {
        timeout = null;
        if (!immediate) {
          func.apply(this, arguments);
        }
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, time);
      if (callNow) {
        func.apply(this, arguments);
      }
    };
  };
