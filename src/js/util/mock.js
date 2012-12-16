exports.mock = function(Constructor) {
  var dummy = {};
  var stub = function() {};

  for (var key in Constructor.prototype) {
    dummy[key] = stub;
  }
  return dummy;
};

