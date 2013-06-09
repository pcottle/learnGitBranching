var TreeCompare = require('../src/js/git/treeCompare').TreeCompare;
var _ = require('underscore');

var loadTree = function(json) {
  return JSON.parse(unescape(json));
};

var copyArgs = function(args) {
  return _.map(args, function(arg) {
    return arg;
  });
};

var loadTree = function(treeString) {
  return TreeCompare.convertTreeSafe(treeString);
};

var testMethod = function(compareMethod, goalTreeString /* other trees */) {
  if (arguments.length < 3) {
    throw new Error('not allowed! need at least one tree to compare');
  }

  var toCompare = copyArgs(arguments).slice(2);
  _.each(toCompare, function(actualTree) {
    var isEqual = TreeCompare.dispatch(compareMethod, goalTreeString, actualTree);
    if (!isEqual) {
      console.log('this goal tree', loadTree(goalTreeString));
      console.log('did not match this tree', loadTree(actualTree));
    }
    expect(isEqual).toBe(true);
  });
};

describe('Tree Compare', function() {
  it('can compare only master', function() {

  });
});

