var base = require('./base');
var expectTreeAsync = base.expectTreeAsync;

describe('Git Remote simple', function() {
  it('clones', function() {
    return expectTreeAsync(
      'git clone',
      '{"branches":{"main":{"target":"C1","id":"main","remoteTrackingBranchID":"o/main"},"o/main":{"target":"C1","id":"o/main","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"}},"HEAD":{"target":"main","id":"HEAD"},"originTree":{"branches":{"main":{"target":"C1","id":"main","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"}},"HEAD":{"target":"main","id":"HEAD"}}}'
    );
  });
});
