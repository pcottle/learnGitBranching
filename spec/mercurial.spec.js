var base = require('./base');
var expectTreeAsync = base.expectTreeAsync;

describe('Mercurial', function() {
  var assert = function(msg, command, tree) {
    it(msg, function() {
      expectTreeAsync(command, tree);
    });
  };

  assert(
    'Commits',
    'hg commit',
    base.ONE_COMMIT_TREE
  );

  assert(
    'Makes a bookmark',
    'hg book;hg book foo;hg ci;hg book -r C0 asd;',
    '{"branches":{"master":{"target":"C1","id":"master"},"foo":{"target":"C2","id":"foo"},"asd":{"target":"C0","id":"asd"}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"}},"HEAD":{"target":"foo","id":"HEAD"}}'
  );

  assert(
    'updates to bookmarks',
    'hg book;hg book foo;hg ci;hg book -r C0 asd; hg update asd',
    '{"branches":{"master":{"target":"C1","id":"master"},"foo":{"target":"C2","id":"foo"},"asd":{"target":"C0","id":"asd"}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"}},"HEAD":{"target":"asd","id":"HEAD"}}'
  );

  assert(
    'updates to revisions',
    'hg update -r C0',
    '{"branches":{"master":{"target":"C1","id":"master"}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"}},"HEAD":{"target":"C0","id":"HEAD"}}'
  );

  assert(
    'backs out revisions and bookmarks',
    'hg book -r C0 foo;hg ci;hg backout foo;hg backout -r C1 C2;',
    '%7B%22branches%22%3A%7B%22master%22%3A%7B%22target%22%3A%22C2%27%22%2C%22id%22%3A%22master%22%7D%2C%22foo%22%3A%7B%22target%22%3A%22C0%22%2C%22id%22%3A%22foo%22%7D%7D%2C%22commits%22%3A%7B%22C0%22%3A%7B%22parents%22%3A%5B%5D%2C%22id%22%3A%22C0%22%2C%22rootCommit%22%3Atrue%7D%2C%22C1%22%3A%7B%22parents%22%3A%5B%22C0%22%5D%2C%22id%22%3A%22C1%22%7D%2C%22C2%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C2%22%7D%2C%22C0%27%22%3A%7B%22parents%22%3A%5B%22C2%22%5D%2C%22id%22%3A%22C0%27%22%7D%2C%22C1%27%22%3A%7B%22parents%22%3A%5B%22C0%27%22%5D%2C%22id%22%3A%22C1%27%22%7D%2C%22C2%27%22%3A%7B%22parents%22%3A%5B%22C1%27%22%5D%2C%22id%22%3A%22C2%27%22%7D%7D%2C%22HEAD%22%3A%7B%22target%22%3A%22master%22%2C%22id%22%3A%22HEAD%22%7D%7D'
  );

  assert(
    'commits and amends',
    'hg commit -A; hg commit --amend',
    '%7B%22branches%22%3A%7B%22master%22%3A%7B%22target%22%3A%22C2%27%22%2C%22id%22%3A%22master%22%7D%7D%2C%22commits%22%3A%7B%22C0%22%3A%7B%22parents%22%3A%5B%5D%2C%22id%22%3A%22C0%22%2C%22rootCommit%22%3Atrue%7D%2C%22C1%22%3A%7B%22parents%22%3A%5B%22C0%22%5D%2C%22id%22%3A%22C1%22%7D%2C%22C2%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C2%22%7D%2C%22C2%27%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C2%27%22%7D%7D%2C%22HEAD%22%3A%7B%22target%22%3A%22master%22%2C%22id%22%3A%22HEAD%22%7D%7D'
  );

  assert(
    'rebases with -d',
    'hg ci; hg book -r C1 feature; hg update feature; hg ci;hg book debug;hg ci;hg rebase -d master;',
    '%7B%22branches%22%3A%7B%22master%22%3A%7B%22target%22%3A%22C2%22%2C%22id%22%3A%22master%22%7D%2C%22feature%22%3A%7B%22target%22%3A%22C3%27%22%2C%22id%22%3A%22feature%22%7D%2C%22debug%22%3A%7B%22target%22%3A%22C4%27%22%2C%22id%22%3A%22debug%22%7D%7D%2C%22commits%22%3A%7B%22C0%22%3A%7B%22parents%22%3A%5B%5D%2C%22id%22%3A%22C0%22%2C%22rootCommit%22%3Atrue%7D%2C%22C1%22%3A%7B%22parents%22%3A%5B%22C0%22%5D%2C%22id%22%3A%22C1%22%7D%2C%22C2%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C2%22%7D%2C%22C3%27%22%3A%7B%22parents%22%3A%5B%22C2%22%5D%2C%22id%22%3A%22C3%27%22%7D%2C%22C4%27%22%3A%7B%22parents%22%3A%5B%22C3%27%22%5D%2C%22id%22%3A%22C4%27%22%7D%7D%2C%22HEAD%22%3A%7B%22target%22%3A%22debug%22%2C%22id%22%3A%22HEAD%22%7D%7D'
  );

  assert(
    'rebases with -d below stuff',
    'hg ci; hg book -r C1 feature; hg update feature; hg ci;hg book -r C3 debug;hg ci;hg up debug;hg rebase -d master -b .;',
    '%7B%22branches%22%3A%7B%22master%22%3A%7B%22target%22%3A%22C2%22%2C%22id%22%3A%22master%22%7D%2C%22feature%22%3A%7B%22target%22%3A%22C4%22%2C%22id%22%3A%22feature%22%7D%2C%22debug%22%3A%7B%22target%22%3A%22C3%27%22%2C%22id%22%3A%22debug%22%7D%7D%2C%22commits%22%3A%7B%22C0%22%3A%7B%22parents%22%3A%5B%5D%2C%22id%22%3A%22C0%22%2C%22rootCommit%22%3Atrue%7D%2C%22C1%22%3A%7B%22parents%22%3A%5B%22C0%22%5D%2C%22id%22%3A%22C1%22%7D%2C%22C2%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C2%22%7D%2C%22C4%22%3A%7B%22parents%22%3A%5B%22C3%27%22%5D%2C%22id%22%3A%22C4%22%7D%2C%22C3%27%22%3A%7B%22parents%22%3A%5B%22C2%22%5D%2C%22id%22%3A%22C3%27%22%7D%7D%2C%22HEAD%22%3A%7B%22target%22%3A%22debug%22%2C%22id%22%3A%22HEAD%22%7D%7D'
  );

  assert(
    'grafts commits down',
    'hg book foo;hg commit; hg update master; hg commit;hg graft -r C2;hg update foo; hg graft -r C3',
    '%7B%22branches%22%3A%7B%22master%22%3A%7B%22target%22%3A%22C2%27%22%2C%22id%22%3A%22master%22%2C%22remoteTrackingBranchID%22%3Anull%7D%2C%22foo%22%3A%7B%22target%22%3A%22C3%27%22%2C%22id%22%3A%22foo%22%2C%22remoteTrackingBranchID%22%3Anull%7D%7D%2C%22commits%22%3A%7B%22C0%22%3A%7B%22parents%22%3A%5B%5D%2C%22id%22%3A%22C0%22%2C%22rootCommit%22%3Atrue%7D%2C%22C1%22%3A%7B%22parents%22%3A%5B%22C0%22%5D%2C%22id%22%3A%22C1%22%7D%2C%22C2%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C2%22%7D%2C%22C3%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C3%22%7D%2C%22C2%27%22%3A%7B%22parents%22%3A%5B%22C3%22%5D%2C%22id%22%3A%22C2%27%22%7D%2C%22C3%27%22%3A%7B%22parents%22%3A%5B%22C2%22%5D%2C%22id%22%3A%22C3%27%22%7D%7D%2C%22tags%22%3A%7B%7D%2C%22HEAD%22%3A%7B%22target%22%3A%22foo%22%2C%22id%22%3A%22HEAD%22%7D%7D'
  );

});

