module.exports = function(func, time) {
    var wait = false;
    return function() {
      if (!wait) {
        func.apply(this, arguments);
        wait = true;
        
        setTimeout(function() {
          wait = false;
        }, time);
      }
    };
  };
