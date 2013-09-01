var base = require('./base');
var expectTreeAsync = base.expectTreeAsync;

describe('Git Remotes', function() {
  it('clones', function() {
    expectTreeAsync(
      'git clone',
      '{"branches":{"master":{"target":"C1","id":"master"},"o/master":{"target":"C1","id":"o/master"}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"}},"HEAD":{"target":"master","id":"HEAD"},"originTree":{"branches":{"master":{"remoteTrackingBranchID":null,"localBranchesThatTrackThis":null,"remote":false,"target":"C1","id":"master","type":"branch"}},"commits":{"C0":{"type":"commit","parents":[],"author":"Peter Cottle","createTime":"Sun Sep 01 2013 11:59:29 GMT-0700 (PDT)","commitMessage":"Quick commit. Go Bears!","id":"C0","rootCommit":true},"C1":{"type":"commit","parents":["C0"],"author":"Peter Cottle","createTime":"Sun Sep 01 2013 11:59:29 GMT-0700 (PDT)","commitMessage":"Quick commit. Go Bears!","id":"C1"}},"HEAD":{"target":"master","id":"HEAD","type":"general ref"}}}'
    );
  });

});

