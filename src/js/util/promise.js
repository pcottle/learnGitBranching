function createDeferred() {
  var resolve;
  var reject;
  var promise = new Promise(function(innerResolve, innerReject) {
    resolve = innerResolve;
    reject = innerReject;
  });
  return { promise: promise, resolve: resolve, reject: reject };
}

function delay(ms) {
  return new Promise(function(resolve) {
    setTimeout(resolve, ms);
  });
}

module.exports = {
  createDeferred: createDeferred,
  delay: delay
};
