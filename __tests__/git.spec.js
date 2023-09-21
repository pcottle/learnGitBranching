var intl = require('../src/js/intl')
var base = require('./base');
var expectTreeAsync = base.expectTreeAsync;
var runCommand = base.runCommand;

describe('Git', function() {
  it('Commits', function() {
    return expectTreeAsync(
      'git commit',
      base.ONE_COMMIT_TREE
    );
  });

  it('handles commit options', function() {
    return expectTreeAsync(
      'git commit; git commit --amend;',
      '%7B%22branches%22%3A%7B%22main%22%3A%7B%22target%22%3A%22C2%27%22%2C%22id%22%3A%22main%22%7D%7D%2C%22commits%22%3A%7B%22C0%22%3A%7B%22parents%22%3A%5B%5D%2C%22id%22%3A%22C0%22%2C%22rootCommit%22%3Atrue%7D%2C%22C1%22%3A%7B%22parents%22%3A%5B%22C0%22%5D%2C%22id%22%3A%22C1%22%7D%2C%22C2%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C2%22%7D%2C%22C2%27%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C2%27%22%7D%7D%2C%22HEAD%22%3A%7B%22target%22%3A%22main%22%2C%22id%22%3A%22HEAD%22%7D%7D'
    );
  });

  it('throws with bad arg options', function() {
    return expectTreeAsync(
      'git commit foo; git commit -am -m; git commit -am -a; git commit -am "hi" "ho"; git commit',
      base.ONE_COMMIT_TREE
    );
  });

  it('handles lower case branch options', function() {
    return expectTreeAsync(
      'git branch banana c0; git commit; git checkout -b side banana; git branch -d banana;git branch -f another c1; git commit',
      '{"branches":{"main":{"target":"C2","id":"main"},"side":{"target":"C3","id":"side"},"another":{"target":"C1","id":"another"}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"},"C3":{"parents":["C0"],"id":"C3"}},"HEAD":{"target":"side","id":"HEAD"}}'
    );
  });

  it('handles branch options', function() {
    return expectTreeAsync(
      'git branch banana C0; git commit; git checkout -b side banana; git branch -d banana;git branch -f another C1; git commit',
      '{"branches":{"main":{"target":"C2","id":"main"},"side":{"target":"C3","id":"side"},"another":{"target":"C1","id":"another"}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"},"C3":{"parents":["C0"],"id":"C3"}},"HEAD":{"target":"side","id":"HEAD"}}'
    );
  });

  it('does add', function() {
    return expectTreeAsync(
      'git add; git commit',
      base.ONE_COMMIT_TREE
    );
  });

  it('resets with all options', function() {
    return expectTreeAsync(
      'git commit;git reset --soft HEAD~1;git reset --hard HEAD~1;gc;go C1;git reset --hard C3;',
      '{"branches":{"main":{"target":"C3","id":"main"}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"},"C3":{"parents":["C1"],"id":"C3"}},"HEAD":{"target":"C1","id":"HEAD"}}'
    );
  });

  it('Checkouts', function() {
    return expectTreeAsync(
      'git checkout -b side',
      '{"branches":{"main":{"target":"C1","id":"main"},"side":{"target":"C1","id":"side"}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"}},"HEAD":{"target":"side","id":"HEAD"}}'
    );
  });

  describe('Switches', function() {
    it("to a commit", function () {
      return expectTreeAsync(
        'git switch C0',
        '{"branches":{"main":{"target":"C1","id":"main"}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"}},"HEAD":{"target":"C0","id":"HEAD"}}'
      );
    });

    it("to a branch", function () {
      return expectTreeAsync(
        'git switch side',
        '{"branches":{"main":{"target":"C1","id":"main"},"side":{"target":"C1","id":"side"}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"}},"HEAD":{"target":"side","id":"HEAD"}}',
        '{"branches":{"main":{"target":"C1","id":"main"},"side":{"target":"C1","id":"side"}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"}},"HEAD":{"target":"main","id":"HEAD"}}'
      );
    });

    it('to a branch with -c option', function() {
      return expectTreeAsync(
        'git switch -c side',
        '{"branches":{"main":{"target":"C1","id":"main"},"side":{"target":"C1","id":"side"}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"}},"HEAD":{"target":"side","id":"HEAD"}}'
      );
    });

    it('to a branch with --create option', function() {
      return expectTreeAsync(
        'git switch --create side',
        '{"branches":{"main":{"target":"C1","id":"main"},"side":{"target":"C1","id":"side"}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"}},"HEAD":{"target":"side","id":"HEAD"}}'
      );
    });

    it('to a branch with -C option', function() {
      return expectTreeAsync(
        'git switch -C side',
        '{"branches":{"main":{"target":"C1","id":"main"},"side":{"target":"C1","id":"side"}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"}},"HEAD":{"target":"side","id":"HEAD"}}',
        '{"branches":{"main":{"target":"C1","id":"main"},"side":{"target":"C0","id":"side"}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"}},"HEAD":{"target":"main","id":"HEAD"}}'
      );
    });

    it('to a branch with -C option and given base branch', function() {
      return expectTreeAsync(
        'git switch -C side main',
        '{"branches":{"main":{"target":"C1","id":"main"},"side":{"target":"C1","id":"side"}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"}},"HEAD":{"target":"side","id":"HEAD"}}',
        '{"branches":{"main":{"target":"C1","id":"main"},"side":{"target":"C0","id":"side"}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"}},"HEAD":{"target":"C0","id":"HEAD"}}'
      );
    });

    it('to a branch with --force-create option', function() {
      return expectTreeAsync(
        'git switch --force-create side',
        '{"branches":{"main":{"target":"C1","id":"main"},"side":{"target":"C1","id":"side"}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"}},"HEAD":{"target":"side","id":"HEAD"}}',
        '{"branches":{"main":{"target":"C1","id":"main"},"side":{"target":"C0","id":"side"}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"}},"HEAD":{"target":"main","id":"HEAD"}}'
      );
    });

    it('to a branch with --force-create option and given base branch', function() {
      return expectTreeAsync(
        'git switch --force-create side main',
        '{"branches":{"main":{"target":"C1","id":"main"},"side":{"target":"C1","id":"side"}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"}},"HEAD":{"target":"side","id":"HEAD"}}',
        '{"branches":{"main":{"target":"C1","id":"main"},"side":{"target":"C0","id":"side"}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"}},"HEAD":{"target":"C0","id":"HEAD"}}'
      );
    });
  });

  it('Rebases', function() {
    return expectTreeAsync(
      'gc; git checkout -b side C1; gc; git rebase main',
      '%7B%22branches%22%3A%7B%22main%22%3A%7B%22target%22%3A%22C2%22%2C%22id%22%3A%22main%22%7D%2C%22side%22%3A%7B%22target%22%3A%22C3%27%22%2C%22id%22%3A%22side%22%7D%7D%2C%22commits%22%3A%7B%22C0%22%3A%7B%22parents%22%3A%5B%5D%2C%22id%22%3A%22C0%22%2C%22rootCommit%22%3Atrue%7D%2C%22C1%22%3A%7B%22parents%22%3A%5B%22C0%22%5D%2C%22id%22%3A%22C1%22%7D%2C%22C2%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C2%22%7D%2C%22C3%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C3%22%7D%2C%22C3%27%22%3A%7B%22parents%22%3A%5B%22C2%22%5D%2C%22id%22%3A%22C3%27%22%7D%7D%2C%22HEAD%22%3A%7B%22target%22%3A%22side%22%2C%22id%22%3A%22HEAD%22%7D%7D'
    );
  });

  it('Interactive rebase', function() {
    return expectTreeAsync(
      'gc; git checkout -b side C1; gc; git rebase -i main --interactive-test',
      '%7B%22branches%22%3A%7B%22main%22%3A%7B%22target%22%3A%22C2%22%2C%22id%22%3A%22main%22%7D%2C%22side%22%3A%7B%22target%22%3A%22C3%27%22%2C%22id%22%3A%22side%22%7D%7D%2C%22commits%22%3A%7B%22C0%22%3A%7B%22parents%22%3A%5B%5D%2C%22id%22%3A%22C0%22%2C%22rootCommit%22%3Atrue%7D%2C%22C1%22%3A%7B%22parents%22%3A%5B%22C0%22%5D%2C%22id%22%3A%22C1%22%7D%2C%22C2%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C2%22%7D%2C%22C3%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C3%22%7D%2C%22C3%27%22%3A%7B%22parents%22%3A%5B%22C2%22%5D%2C%22id%22%3A%22C3%27%22%7D%7D%2C%22HEAD%22%3A%7B%22target%22%3A%22side%22%2C%22id%22%3A%22HEAD%22%7D%7D'
    );
  });

  it('Interactive rebases with commit re-ordering', function() {
    return expectTreeAsync(
      'gc;gc;git rebase -i C0 --interactive-test C3,C1',
      '%7B%22branches%22%3A%7B%22main%22%3A%7B%22target%22%3A%22C1%27%22%2C%22id%22%3A%22main%22%7D%7D%2C%22commits%22%3A%7B%22C0%22%3A%7B%22parents%22%3A%5B%5D%2C%22id%22%3A%22C0%22%2C%22rootCommit%22%3Atrue%7D%2C%22C1%22%3A%7B%22parents%22%3A%5B%22C0%22%5D%2C%22id%22%3A%22C1%22%7D%2C%22C2%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C2%22%7D%2C%22C3%22%3A%7B%22parents%22%3A%5B%22C2%22%5D%2C%22id%22%3A%22C3%22%7D%2C%22C3%27%22%3A%7B%22parents%22%3A%5B%22C0%22%5D%2C%22id%22%3A%22C3%27%22%7D%2C%22C1%27%22%3A%7B%22parents%22%3A%5B%22C3%27%22%5D%2C%22id%22%3A%22C1%27%22%7D%7D%2C%22tags%22%3A%7B%7D%2C%22HEAD%22%3A%7B%22id%22%3A%22HEAD%22%2C%22target%22%3A%22main%22%7D%7D'
    );
  });

  it('Rebases reordered commits in their new order', function() {
    return expectTreeAsync(
      'gc;gc;gc;gc;git branch one C1;git branch two C1;git branch three C1;git rebase C2 three;git checkout one;git cherry-pick C4 C3 C2; git checkout two; git cherry-pick C5; git rebase two one',
      '%7B%22branches%22%3A%7B%22main%22%3A%7B%22target%22%3A%22C5%22%2C%22id%22%3A%22main%22%2C%22remoteTrackingBranchID%22%3Anull%7D%2C%22one%22%3A%7B%22target%22%3A%22C2%27%27%22%2C%22id%22%3A%22one%22%2C%22remoteTrackingBranchID%22%3Anull%7D%2C%22two%22%3A%7B%22target%22%3A%22C5%27%22%2C%22id%22%3A%22two%22%2C%22remoteTrackingBranchID%22%3Anull%7D%2C%22three%22%3A%7B%22target%22%3A%22C2%22%2C%22id%22%3A%22three%22%2C%22remoteTrackingBranchID%22%3Anull%7D%7D%2C%22commits%22%3A%7B%22C0%22%3A%7B%22parents%22%3A%5B%5D%2C%22id%22%3A%22C0%22%2C%22rootCommit%22%3Atrue%7D%2C%22C1%22%3A%7B%22parents%22%3A%5B%22C0%22%5D%2C%22id%22%3A%22C1%22%7D%2C%22C2%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C2%22%7D%2C%22C3%22%3A%7B%22parents%22%3A%5B%22C2%22%5D%2C%22id%22%3A%22C3%22%7D%2C%22C4%22%3A%7B%22parents%22%3A%5B%22C3%22%5D%2C%22id%22%3A%22C4%22%7D%2C%22C5%22%3A%7B%22parents%22%3A%5B%22C4%22%5D%2C%22id%22%3A%22C5%22%7D%2C%22C4%27%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C4%27%22%7D%2C%22C3%27%22%3A%7B%22parents%22%3A%5B%22C4%27%22%5D%2C%22id%22%3A%22C3%27%22%7D%2C%22C2%27%22%3A%7B%22parents%22%3A%5B%22C3%27%22%5D%2C%22id%22%3A%22C2%27%22%7D%2C%22C5%27%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C5%27%22%7D%2C%22C4%27%27%22%3A%7B%22parents%22%3A%5B%22C5%27%22%5D%2C%22id%22%3A%22C4%27%27%22%7D%2C%22C3%27%27%22%3A%7B%22parents%22%3A%5B%22C4%27%27%22%5D%2C%22id%22%3A%22C3%27%27%22%7D%2C%22C2%27%27%22%3A%7B%22parents%22%3A%5B%22C3%27%27%22%5D%2C%22id%22%3A%22C2%27%27%22%7D%7D%2C%22tags%22%3A%7B%7D%2C%22HEAD%22%3A%7B%22target%22%3A%22one%22%2C%22id%22%3A%22HEAD%22%7D%7D'
    );
  })

  it('Switch branch and execute interactive rebase', function() {
    return expectTreeAsync(
      'git branch test;git rebase -i C0 test --interactive-test',
      '%7B%22branches%22%3A%7B%22main%22%3A%7B%22target%22%3A%22C1%22%2C%22id%22%3A%22main%22%7D%2C%22test%22%3A%7B%22target%22%3A%22C1%27%22%2C%22id%22%3A%22test%22%7D%7D%2C%22commits%22%3A%7B%22C0%22%3A%7B%22parents%22%3A%5B%5D%2C%22id%22%3A%22C0%22%2C%22rootCommit%22%3Atrue%7D%2C%22C1%22%3A%7B%22parents%22%3A%5B%22C0%22%5D%2C%22id%22%3A%22C1%22%7D%2C%22C1%27%22%3A%7B%22parents%22%3A%5B%22C0%22%5D%2C%22id%22%3A%22C1%27%22%7D%7D%2C%22tags%22%3A%7B%7D%2C%22HEAD%22%3A%7B%22id%22%3A%22HEAD%22%2C%22target%22%3A%22test%22%7D%7D'
    );
  });

  it('Reverts', function() {
    return expectTreeAsync(
      'git revert HEAD',
      '%7B%22branches%22%3A%7B%22main%22%3A%7B%22target%22%3A%22C1%27%22%2C%22id%22%3A%22main%22%7D%7D%2C%22commits%22%3A%7B%22C0%22%3A%7B%22parents%22%3A%5B%5D%2C%22id%22%3A%22C0%22%2C%22rootCommit%22%3Atrue%7D%2C%22C1%22%3A%7B%22parents%22%3A%5B%22C0%22%5D%2C%22id%22%3A%22C1%22%7D%2C%22C1%27%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C1%27%22%7D%7D%2C%22HEAD%22%3A%7B%22target%22%3A%22main%22%2C%22id%22%3A%22HEAD%22%7D%7D'
    );
  });

  it('Merges', function() {
    return expectTreeAsync(
      'gc; git checkout -b side C1; gc; git merge main',
      '{"branches":{"main":{"target":"C2","id":"main"},"side":{"target":"C4","id":"side"}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"},"C3":{"parents":["C1"],"id":"C3"},"C4":{"parents":["C2","C3"],"id":"C4"}},"HEAD":{"target":"side","id":"HEAD"}}'
    );
  });

  it('Resets', function() {
    return expectTreeAsync(
      'git commit; git reset HEAD~1',
      '{"branches":{"main":{"target":"C1","id":"main"}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"}},"HEAD":{"target":"main","id":"HEAD"}}'
    );
  });

  it('Branches', function() {
    return expectTreeAsync(
      'git branch side C0',
      '{"branches":{"main":{"target":"C1","id":"main"},"side":{"target":"C0","id":"side"}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"}},"HEAD":{"target":"main","id":"HEAD"}}'
    );
  });

  it('Branches lowercase', function() {
    return expectTreeAsync(
      'git branch side c0',
      '{"branches":{"main":{"target":"C1","id":"main"},"side":{"target":"C0","id":"side"}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"}},"HEAD":{"target":"main","id":"HEAD"}}'
    );
  });

  it('Deletes branches', function() {
    return expectTreeAsync(
      'git branch side; git branch -d side',
      '{"branches":{"main":{"target":"C1","id":"main"}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"}},"HEAD":{"target":"main","id":"HEAD"}}'
    );
  });

  it('Amends commits', function() {
    return expectTreeAsync(
      'git commit --amend',
      '%7B%22branches%22%3A%7B%22main%22%3A%7B%22target%22%3A%22C1%27%22%2C%22id%22%3A%22main%22%7D%7D%2C%22commits%22%3A%7B%22C0%22%3A%7B%22parents%22%3A%5B%5D%2C%22id%22%3A%22C0%22%2C%22rootCommit%22%3Atrue%7D%2C%22C1%22%3A%7B%22parents%22%3A%5B%22C0%22%5D%2C%22id%22%3A%22C1%22%7D%2C%22C1%27%22%3A%7B%22parents%22%3A%5B%22C0%22%5D%2C%22id%22%3A%22C1%27%22%7D%7D%2C%22HEAD%22%3A%7B%22target%22%3A%22main%22%2C%22id%22%3A%22HEAD%22%7D%7D'
    );
  });

  it('Cherry picks', function() {
    return expectTreeAsync(
      'git checkout -b side C0; gc; git cherry-pick C11; git cherry-pick C1',
      '%7B%22branches%22%3A%7B%22main%22%3A%7B%22target%22%3A%22C1%22%2C%22id%22%3A%22main%22%7D%2C%22side%22%3A%7B%22target%22%3A%22C1%27%22%2C%22id%22%3A%22side%22%7D%7D%2C%22commits%22%3A%7B%22C0%22%3A%7B%22parents%22%3A%5B%5D%2C%22id%22%3A%22C0%22%2C%22rootCommit%22%3Atrue%7D%2C%22C1%22%3A%7B%22parents%22%3A%5B%22C0%22%5D%2C%22id%22%3A%22C1%22%7D%2C%22C2%22%3A%7B%22parents%22%3A%5B%22C0%22%5D%2C%22id%22%3A%22C2%22%7D%2C%22C1%27%22%3A%7B%22parents%22%3A%5B%22C2%22%5D%2C%22id%22%3A%22C1%27%22%7D%7D%2C%22HEAD%22%3A%7B%22target%22%3A%22side%22%2C%22id%22%3A%22HEAD%22%7D%7D'
    );
  });

  it('Range operator is not supported', function() {
    return expectTreeAsync(
      'git checkout -b side C0; git cherry-pick C1..C0',
      '{"branches":{"main":{"target": "C1","id": "main"},"side":{"target":"C0","id": "side"}},"commits":{"C0":{"parents":[],"id": "C0","rootCommit": true},"C1":{"parents":["C0"],"id": "C1"}},"HEAD":{"id": "HEAD","target":"side"}}'
    );
  });

  it('Forces branches', function() {
    return expectTreeAsync(
      'git checkout -b side; git branch -f side C0',
      '{"branches":{"main":{"target":"C1","id":"main"},"side":{"target":"C0","id":"side"}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"}},"HEAD":{"target":"side","id":"HEAD"}}'
    );
  });

  it('Rebases only new commits to destination', function() {
    return expectTreeAsync(
      'git checkout -b side C0; gc; gc;git cherry-pick C1;git rebase main',
      '%7B%22branches%22%3A%7B%22main%22%3A%7B%22target%22%3A%22C1%22%2C%22id%22%3A%22main%22%7D%2C%22side%22%3A%7B%22target%22%3A%22C3%27%22%2C%22id%22%3A%22side%22%7D%7D%2C%22commits%22%3A%7B%22C0%22%3A%7B%22parents%22%3A%5B%5D%2C%22id%22%3A%22C0%22%2C%22rootCommit%22%3Atrue%7D%2C%22C1%22%3A%7B%22parents%22%3A%5B%22C0%22%5D%2C%22id%22%3A%22C1%22%7D%2C%22C2%22%3A%7B%22parents%22%3A%5B%22C0%22%5D%2C%22id%22%3A%22C2%22%7D%2C%22C3%22%3A%7B%22parents%22%3A%5B%22C2%22%5D%2C%22id%22%3A%22C3%22%7D%2C%22C1%27%22%3A%7B%22parents%22%3A%5B%22C3%22%5D%2C%22id%22%3A%22C1%27%22%7D%2C%22C2%27%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C2%27%22%7D%2C%22C3%27%22%3A%7B%22parents%22%3A%5B%22C2%27%22%5D%2C%22id%22%3A%22C3%27%22%7D%7D%2C%22HEAD%22%3A%7B%22target%22%3A%22side%22%2C%22id%22%3A%22HEAD%22%7D%7D'
    );
  });

  it('checks out after a rebase', function() {
    return expectTreeAsync(
      'git commit; git checkout -b bugFix C1; git commit; git rebase main;git checkout main',
      '%7B%22branches%22%3A%7B%22main%22%3A%7B%22target%22%3A%22C2%22%2C%22id%22%3A%22main%22%7D%2C%22bugFix%22%3A%7B%22target%22%3A%22C3%27%22%2C%22id%22%3A%22bugFix%22%7D%7D%2C%22commits%22%3A%7B%22C0%22%3A%7B%22parents%22%3A%5B%5D%2C%22id%22%3A%22C0%22%2C%22rootCommit%22%3Atrue%7D%2C%22C1%22%3A%7B%22parents%22%3A%5B%22C0%22%5D%2C%22id%22%3A%22C1%22%7D%2C%22C2%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C2%22%7D%2C%22C3%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C3%22%7D%2C%22C3%27%22%3A%7B%22parents%22%3A%5B%22C2%22%5D%2C%22id%22%3A%22C3%27%22%7D%7D%2C%22HEAD%22%3A%7B%22target%22%3A%22main%22%2C%22id%22%3A%22HEAD%22%7D%7D'
    );
  });

  it('switches after a rebase ', function() {
    return expectTreeAsync(
      'git commit; git switch -c bugFix C1; git commit; git rebase main;git switch main',
      '%7B%22branches%22%3A%7B%22main%22%3A%7B%22target%22%3A%22C2%22%2C%22id%22%3A%22main%22%7D%2C%22bugFix%22%3A%7B%22target%22%3A%22C3%27%22%2C%22id%22%3A%22bugFix%22%7D%7D%2C%22commits%22%3A%7B%22C0%22%3A%7B%22parents%22%3A%5B%5D%2C%22id%22%3A%22C0%22%2C%22rootCommit%22%3Atrue%7D%2C%22C1%22%3A%7B%22parents%22%3A%5B%22C0%22%5D%2C%22id%22%3A%22C1%22%7D%2C%22C2%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C2%22%7D%2C%22C3%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C3%22%7D%2C%22C3%27%22%3A%7B%22parents%22%3A%5B%22C2%22%5D%2C%22id%22%3A%22C3%27%22%7D%7D%2C%22HEAD%22%3A%7B%22target%22%3A%22main%22%2C%22id%22%3A%22HEAD%22%7D%7D'
    );
  });

  it('checks out after an interactive rebase', function() {
    return expectTreeAsync(
      'git commit; git checkout -b bugFix C1; git commit; git rebase -i main --interactive-test;git checkout main',
      '%7B%22branches%22%3A%7B%22main%22%3A%7B%22target%22%3A%22C2%22%2C%22id%22%3A%22main%22%7D%2C%22bugFix%22%3A%7B%22target%22%3A%22C3%27%22%2C%22id%22%3A%22bugFix%22%7D%7D%2C%22commits%22%3A%7B%22C0%22%3A%7B%22parents%22%3A%5B%5D%2C%22id%22%3A%22C0%22%2C%22rootCommit%22%3Atrue%7D%2C%22C1%22%3A%7B%22parents%22%3A%5B%22C0%22%5D%2C%22id%22%3A%22C1%22%7D%2C%22C2%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C2%22%7D%2C%22C3%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C3%22%7D%2C%22C3%27%22%3A%7B%22parents%22%3A%5B%22C2%22%5D%2C%22id%22%3A%22C3%27%22%7D%7D%2C%22HEAD%22%3A%7B%22target%22%3A%22main%22%2C%22id%22%3A%22HEAD%22%7D%7D'
    );
  });

  it('solves merging level', function() {
    return expectTreeAsync(
      'git checkout -b bugFix;git commit;git checkout main;git commit;git merge bugFix',
      '%7B%22branches%22%3A%7B%22main%22%3A%7B%22target%22%3A%22C4%22%2C%22id%22%3A%22main%22%2C%22remoteTrackingBranchID%22%3Anull%7D%2C%22bugFix%22%3A%7B%22target%22%3A%22C2%22%2C%22id%22%3A%22bugFix%22%2C%22remoteTrackingBranchID%22%3Anull%7D%7D%2C%22commits%22%3A%7B%22C0%22%3A%7B%22parents%22%3A%5B%5D%2C%22id%22%3A%22C0%22%2C%22rootCommit%22%3Atrue%7D%2C%22C1%22%3A%7B%22parents%22%3A%5B%22C0%22%5D%2C%22id%22%3A%22C1%22%7D%2C%22C2%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C2%22%7D%2C%22C3%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C3%22%7D%2C%22C4%22%3A%7B%22parents%22%3A%5B%22C2%22%2C%22C3%22%5D%2C%22id%22%3A%22C4%22%7D%7D%2C%22tags%22%3A%7B%7D%2C%22HEAD%22%3A%7B%22target%22%3A%22main%22%2C%22id%22%3A%22HEAD%22%7D%7D'
    );
  });

  it('solves rebase level', function() {
    return expectTreeAsync(
      'git checkout -b bugFix;git commit;git checkout main;git commit;git checkout bugFix;git rebase main',
      '%7B%22branches%22%3A%7B%22main%22%3A%7B%22target%22%3A%22C3%22%2C%22id%22%3A%22main%22%2C%22remoteTrackingBranchID%22%3Anull%7D%2C%22bugFix%22%3A%7B%22target%22%3A%22C2%27%22%2C%22id%22%3A%22bugFix%22%2C%22remoteTrackingBranchID%22%3Anull%7D%7D%2C%22commits%22%3A%7B%22C0%22%3A%7B%22parents%22%3A%5B%5D%2C%22id%22%3A%22C0%22%2C%22rootCommit%22%3Atrue%7D%2C%22C1%22%3A%7B%22parents%22%3A%5B%22C0%22%5D%2C%22id%22%3A%22C1%22%7D%2C%22C2%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C2%22%7D%2C%22C3%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C3%22%7D%2C%22C2%27%22%3A%7B%22parents%22%3A%5B%22C3%22%5D%2C%22id%22%3A%22C2%27%22%7D%7D%2C%22tags%22%3A%7B%7D%2C%22HEAD%22%3A%7B%22target%22%3A%22bugFix%22%2C%22id%22%3A%22HEAD%22%7D%7D'
    );
  });

  it('solves rebase level with interactive rebase', function() {
    return expectTreeAsync(
      'git checkout -b bugFix;git commit;git checkout main;git commit;git checkout bugFix;git rebase -i main --interactive-test',
      '%7B%22branches%22%3A%7B%22main%22%3A%7B%22target%22%3A%22C3%22%2C%22id%22%3A%22main%22%2C%22remoteTrackingBranchID%22%3Anull%7D%2C%22bugFix%22%3A%7B%22target%22%3A%22C2%27%22%2C%22id%22%3A%22bugFix%22%2C%22remoteTrackingBranchID%22%3Anull%7D%7D%2C%22commits%22%3A%7B%22C0%22%3A%7B%22parents%22%3A%5B%5D%2C%22id%22%3A%22C0%22%2C%22rootCommit%22%3Atrue%7D%2C%22C1%22%3A%7B%22parents%22%3A%5B%22C0%22%5D%2C%22id%22%3A%22C1%22%7D%2C%22C2%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C2%22%7D%2C%22C3%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C3%22%7D%2C%22C2%27%22%3A%7B%22parents%22%3A%5B%22C3%22%5D%2C%22id%22%3A%22C2%27%22%7D%7D%2C%22tags%22%3A%7B%7D%2C%22HEAD%22%3A%7B%22target%22%3A%22bugFix%22%2C%22id%22%3A%22HEAD%22%7D%7D'
    );
  });

  it('does a whole bunch of crazy merging', function() {
    return expectTreeAsync(
      'gc;go -b side C1;gc;git merge main;go -b bug main;gc;go -b wut C3;git rebase bug;go side;git rebase wut;gc;git rebase wut;git merge C4;go main;git rebase side;go C6;git merge C3\';gb -f wut C8;go bug;git rebase wut',
      '%7B%22branches%22%3A%7B%22main%22%3A%7B%22target%22%3A%22C7%22%2C%22id%22%3A%22main%22%7D%2C%22side%22%3A%7B%22target%22%3A%22C7%22%2C%22id%22%3A%22side%22%7D%2C%22bug%22%3A%7B%22target%22%3A%22C8%22%2C%22id%22%3A%22bug%22%7D%2C%22wut%22%3A%7B%22target%22%3A%22C8%22%2C%22id%22%3A%22wut%22%7D%7D%2C%22commits%22%3A%7B%22C0%22%3A%7B%22parents%22%3A%5B%5D%2C%22id%22%3A%22C0%22%2C%22rootCommit%22%3Atrue%7D%2C%22C1%22%3A%7B%22parents%22%3A%5B%22C0%22%5D%2C%22id%22%3A%22C1%22%7D%2C%22C2%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C2%22%7D%2C%22C3%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C3%22%7D%2C%22C4%22%3A%7B%22parents%22%3A%5B%22C2%22%2C%22C3%22%5D%2C%22id%22%3A%22C4%22%7D%2C%22C5%22%3A%7B%22parents%22%3A%5B%22C2%22%5D%2C%22id%22%3A%22C5%22%7D%2C%22C3%27%22%3A%7B%22parents%22%3A%5B%22C5%22%5D%2C%22id%22%3A%22C3%27%22%7D%2C%22C6%22%3A%7B%22parents%22%3A%5B%22C4%22%5D%2C%22id%22%3A%22C6%22%7D%2C%22C6%27%22%3A%7B%22parents%22%3A%5B%22C3%27%22%5D%2C%22id%22%3A%22C6%27%22%7D%2C%22C7%22%3A%7B%22parents%22%3A%5B%22C4%22%2C%22C6%27%22%5D%2C%22id%22%3A%22C7%22%7D%2C%22C8%22%3A%7B%22parents%22%3A%5B%22C3%27%22%2C%22C6%22%5D%2C%22id%22%3A%22C8%22%7D%7D%2C%22HEAD%22%3A%7B%22target%22%3A%22bug%22%2C%22id%22%3A%22HEAD%22%7D%7D'
    );
  });

  it('if no-ff is specified, will always make a merge commit', function() {
    return expectTreeAsync(
      'git commit; go -b side HEAD~1; git commit; git merge main; go main; git merge side --no-ff',
      '{"branches":{"main":{"target":"C5","id":"main","remoteTrackingBranchID":null},"side":{"target":"C4","id":"side","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"},"C3":{"parents":["C1"],"id":"C3"},"C4":{"parents":["C2","C3"],"id":"C4"},"C5":{"parents":["C2","C4"],"id":"C5"}},"HEAD":{"target":"main","id":"HEAD"}}'
    );
  });

  it('if squash is specified, will always make a squash merge commit', function() {
    return expectTreeAsync(
      'git commit; go -b side HEAD~1; git commit; git merge main; go main; git merge side --squash',
      '{"branches":{"main":{"target":"C5","id":"main","remoteTrackingBranchID":null},"side":{"target":"C4","id":"side","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"},"C3":{"parents":["C1"],"id":"C3"},"C4":{"parents":["C2","C3"],"id":"C4"},"C5":{"parents":["C2"],"id":"C5"}},"HEAD":{"target":"main","id":"HEAD"}}'
    );
  });

  it('makes a tag', function() {
    return expectTreeAsync(
      'git tag v1',
      '{"branches":{"main":{"target":"C1","id":"main","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"}},"tags":{"v1":{"target":"C1","id":"v1","type":"tag"}},"HEAD":{"target":"main","id":"HEAD"}}'
    );
  });

  it('makes a tag and removes a tag', function() {
    return expectTreeAsync(
      'git tag v1; git tag -d v1',
      '{"branches":{"main":{"target":"C1","id":"main","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"}},"tags":{},"HEAD":{"target":"main","id":"HEAD"}}'
    );
  });

  it('makes a tag on another ref', function() {
    return expectTreeAsync(
      'git tag v1 C0',
      '{"branches":{"main":{"target":"C1","id":"main","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"}},"tags":{"v1":{"target":"C0","id":"v1","type":"tag"}},"HEAD":{"target":"main","id":"HEAD"}}'
    );
  });

  it('doesn\'t make a tag if ref doesn\'t resolve', function() {
    return expectTreeAsync(
      'git tag v1 foo',
      '{"branches":{"main":{"target":"C1","id":"main","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"}},"tags":{},"HEAD":{"target":"main","id":"HEAD"}}'
    );
  });

  it('makes tag with relative ref and etc', function() {
    return expectTreeAsync(
      'git tag v1 HEAD~1',
      '{"branches":{"main":{"target":"C1","id":"main","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"}},"tags":{"v1":{"target":"C0","id":"v1","type":"tag"}},"HEAD":{"target":"main","id":"HEAD"}}'
    );
  });

  it('makes tag with 3 letters', function() {
    return expectTreeAsync(
      'git tag foo',
      '{"branches":{"main":{"target":"C1","id":"main","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"}},"tags":{"foo":{"target":"C1","id":"foo","type":"tag"}},"HEAD":{"target":"main","id":"HEAD"}}'
    );
  });

  it('does not make tag if ref does not resolve', function() {
    return expectTreeAsync(
      'git tag foo banana',
      '{"branches":{"main":{"target":"C1","id":"main","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"}},"tags":{},"HEAD":{"target":"main","id":"HEAD"}}'
    );
  });

  it('should respect second command for -B option', function() {
    return expectTreeAsync(
      'git commit; git checkout -B side C1',
      '{"branches":{"main":{"target":"C2","id":"main","remoteTrackingBranchID":null},"side":{"target":"C1","id":"side","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"}},"tags":{},"HEAD":{"target":"side","id":"HEAD"}}'
    );
  });

  it('will throw error if bad commits given to interactive test', function() {
    return expectTreeAsync(
      'gc; git rebase HEAD~2 -i --interactive-test C2,C100; gc',
      '{"branches":{"main":{"target":"C3","id":"main","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"},"C3":{"parents":["C2"],"id":"C3"}},"tags":{},"HEAD":{"target":"main","id":"HEAD"}}'
    );
  });

  it('can handle slashes and dashes in branch names but doesn\'t allow o/', function() {
    return expectTreeAsync(
      'git branch foo/bar; git commit; git checkout foo/bar; gc; go main; git merge foo/bar; go foo/bar; git checkout -b bar-baz; git commit; git branch o/foo',
      '{"branches":{"main":{"target":"C4","id":"main","remoteTrackingBranchID":null},"foo/bar":{"target":"C3","id":"foo/bar","remoteTrackingBranchID":null},"bar-baz":{"target":"C5","id":"bar-baz","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"},"C3":{"parents":["C1"],"id":"C3"},"C4":{"parents":["C2","C3"],"id":"C4"},"C5":{"parents":["C3"],"id":"C5"}},"tags":{},"HEAD":{"target":"bar-baz","id":"HEAD"}}'
    );
  });

  it('the regex allows for multiple dashes but not in a row', function() {
    return expectTreeAsync(
      'git branch foo-bar-banana-baz; gc; git branch foo----bar//baz',
      '{"branches":{"main":{"target":"C2","id":"main","remoteTrackingBranchID":null},"foo-bar-b":{"target":"C1","id":"foo-bar-b","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"}},"tags":{},"HEAD":{"target":"main","id":"HEAD"}}'
    );
  });

  describe('RevList', function() {

    it('requires at least 1 argument', function() {
      return runCommand('git rev-list', function(commandMsg) {
        expect(commandMsg).toEqual(intl.str(
          'git-error-args-few',
          {
            lower: 1,
            what: 'with git rev-list'
          }
        ));
      });
    });

    describe('supports', function() {
      var SETUP = 'git co -b left C0; gc; git merge main; git co -b right C0; gc; git merge main; git co -b all left; git merge right; ';

      it('single included revision', function() {
        return runCommand(SETUP + 'git rev-list all', function(commandMsg) {
          expect(commandMsg).toBe('C6\nC5\nC4\nC3\nC2\nC1\nC0\n');
        });
      });

      it('single excluded revision', function() {
        return runCommand(SETUP + 'git rev-list all ^right', function(commandMsg) {
          expect(commandMsg).toBe('C6\nC3\nC2\n');
        });
      });

      it('multiple included revisions', function() {
        return runCommand(SETUP + 'git rev-list right left', function(commandMsg) {
          expect(commandMsg).toBe('C5\nC4\nC3\nC2\nC1\nC0\n');
        });
      });

      it('multiple excluded revisions', function() {
        return runCommand(SETUP + 'git rev-list all ^right ^left', function(commandMsg) {
          expect(commandMsg).toBe('C6\n');
        });
      });

      it('range between branches', function() {
        return runCommand(SETUP + 'git rev-list left..right', function(commandMsg) {
          expect(commandMsg).toBe('C5\nC4\n');
        });
      });

      it('range between commits', function() {
        return runCommand(SETUP + 'git rev-list C3..C5', function(commandMsg) {
          expect(commandMsg).toBe('C5\nC4\n');
        });
      });
    });
  });

  describe('Log supports', function() {
    var SETUP = 'git co -b left C0; gc; git merge main; git co -b right C0; gc; git merge main; git co -b all left; git merge right; ';

    it('implied HEAD', function() {
      return runCommand(SETUP + '; git co right; git log', function(commandMsg) {
        expect(commandMsg).toContain('Commit: C0\n');
        expect(commandMsg).toContain('Commit: C1\n');
        expect(commandMsg).not.toContain('Commit: C2\n');
        expect(commandMsg).not.toContain('Commit: C3\n');
        expect(commandMsg).toContain('Commit: C4\n');
        expect(commandMsg).toContain('Commit: C5\n');
        expect(commandMsg).not.toContain('Commit: C6\n');
      });
    });

    it('single included revision', function() {
      return runCommand(SETUP + 'git log right', function(commandMsg) {
        expect(commandMsg).toContain('Commit: C0\n');
        expect(commandMsg).toContain('Commit: C1\n');
        expect(commandMsg).not.toContain('Commit: C2\n');
        expect(commandMsg).not.toContain('Commit: C3\n');
        expect(commandMsg).toContain('Commit: C4\n');
        expect(commandMsg).toContain('Commit: C5\n');
        expect(commandMsg).not.toContain('Commit: C6\n');
      });
    });

    it('single excluded revision', function() {
      return runCommand(SETUP + 'git log all ^right', function(commandMsg) {
        expect(commandMsg).not.toContain('Commit: C0\n');
        expect(commandMsg).not.toContain('Commit: C1\n');
        expect(commandMsg).toContain('Commit: C2\n');
        expect(commandMsg).toContain('Commit: C3\n');
        expect(commandMsg).not.toContain('Commit: C4\n');
        expect(commandMsg).not.toContain('Commit: C5\n');
        expect(commandMsg).toContain('Commit: C6\n');
      });
    });

    it('multiple included revisions', function() {
      return runCommand(SETUP + 'git log right left', function(commandMsg) {
        expect(commandMsg).toContain('Commit: C0\n');
        expect(commandMsg).toContain('Commit: C1\n');
        expect(commandMsg).toContain('Commit: C2\n');
        expect(commandMsg).toContain('Commit: C3\n');
        expect(commandMsg).toContain('Commit: C4\n');
        expect(commandMsg).toContain('Commit: C5\n');
        expect(commandMsg).not.toContain('Commit: C6\n');
      });
    });

    it('multiple excluded revisions', function() {
      return runCommand(SETUP + 'git log all ^right ^left', function(commandMsg) {
        expect(commandMsg).not.toContain('Commit: C0\n');
        expect(commandMsg).not.toContain('Commit: C1\n');
        expect(commandMsg).not.toContain('Commit: C2\n');
        expect(commandMsg).not.toContain('Commit: C3\n');
        expect(commandMsg).not.toContain('Commit: C4\n');
        expect(commandMsg).not.toContain('Commit: C5\n');
        expect(commandMsg).toContain('Commit: C6\n');
      });
    });
  });

  describe ('Git rebase onto', function () {
    it('rebase onto with two arguments', function() {
      return expectTreeAsync(
        'git commit; git commit; git switch -c F1 main~2; git commit; git commit; git switch -c F2; git commit; git commit; git rebase --onto main F1;',
        '%7B%22branches%22%3A%7B%22main%22%3A%7B%22target%22%3A%22C3%22%2C%22id%22%3A%22main%22%2C%22remoteTrackingBranchID%22%3Anull%7D%2C%22F1%22%3A%7B%22target%22%3A%22C5%22%2C%22id%22%3A%22F1%22%2C%22remoteTrackingBranchID%22%3Anull%7D%2C%22F2%22%3A%7B%22target%22%3A%22C7%27%22%2C%22id%22%3A%22F2%22%2C%22remoteTrackingBranchID%22%3Anull%7D%7D%2C%22commits%22%3A%7B%22C0%22%3A%7B%22parents%22%3A%5B%5D%2C%22id%22%3A%22C0%22%2C%22rootCommit%22%3Atrue%7D%2C%22C1%22%3A%7B%22parents%22%3A%5B%22C0%22%5D%2C%22id%22%3A%22C1%22%7D%2C%22C2%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C2%22%7D%2C%22C3%22%3A%7B%22parents%22%3A%5B%22C2%22%5D%2C%22id%22%3A%22C3%22%7D%2C%22C4%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C4%22%7D%2C%22C5%22%3A%7B%22parents%22%3A%5B%22C4%22%5D%2C%22id%22%3A%22C5%22%7D%2C%22C6%22%3A%7B%22parents%22%3A%5B%22C5%22%5D%2C%22id%22%3A%22C6%22%7D%2C%22C7%22%3A%7B%22parents%22%3A%5B%22C6%22%5D%2C%22id%22%3A%22C7%22%7D%2C%22C6%27%22%3A%7B%22parents%22%3A%5B%22C3%22%5D%2C%22id%22%3A%22C6%27%22%7D%2C%22C7%27%22%3A%7B%22parents%22%3A%5B%22C6%27%22%5D%2C%22id%22%3A%22C7%27%22%7D%7D%2C%22tags%22%3A%7B%7D%2C%22HEAD%22%3A%7B%22target%22%3A%22F2%22%2C%22id%22%3A%22HEAD%22%7D%7D'
      );
    });

    it('rebase onto with three arguments', function() {
      return expectTreeAsync(
        'git commit; git commit; git switch -c F1 main~2; git commit; git commit; git switch -c F2; git commit; git commit; git checkout C1; git rebase --onto main F1 F2;',
        '%7B%22branches%22%3A%7B%22main%22%3A%7B%22target%22%3A%22C3%22%2C%22id%22%3A%22main%22%2C%22remoteTrackingBranchID%22%3Anull%7D%2C%22F1%22%3A%7B%22target%22%3A%22C5%22%2C%22id%22%3A%22F1%22%2C%22remoteTrackingBranchID%22%3Anull%7D%2C%22F2%22%3A%7B%22target%22%3A%22C7%27%22%2C%22id%22%3A%22F2%22%2C%22remoteTrackingBranchID%22%3Anull%7D%7D%2C%22commits%22%3A%7B%22C0%22%3A%7B%22parents%22%3A%5B%5D%2C%22id%22%3A%22C0%22%2C%22rootCommit%22%3Atrue%7D%2C%22C1%22%3A%7B%22parents%22%3A%5B%22C0%22%5D%2C%22id%22%3A%22C1%22%7D%2C%22C2%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C2%22%7D%2C%22C3%22%3A%7B%22parents%22%3A%5B%22C2%22%5D%2C%22id%22%3A%22C3%22%7D%2C%22C4%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C4%22%7D%2C%22C5%22%3A%7B%22parents%22%3A%5B%22C4%22%5D%2C%22id%22%3A%22C5%22%7D%2C%22C6%22%3A%7B%22parents%22%3A%5B%22C5%22%5D%2C%22id%22%3A%22C6%22%7D%2C%22C7%22%3A%7B%22parents%22%3A%5B%22C6%22%5D%2C%22id%22%3A%22C7%22%7D%2C%22C6%27%22%3A%7B%22parents%22%3A%5B%22C3%22%5D%2C%22id%22%3A%22C6%27%22%7D%2C%22C7%27%22%3A%7B%22parents%22%3A%5B%22C6%27%22%5D%2C%22id%22%3A%22C7%27%22%7D%7D%2C%22tags%22%3A%7B%7D%2C%22HEAD%22%3A%7B%22target%22%3A%22F2%22%2C%22id%22%3A%22HEAD%22%7D%7D'
      );
    });

    it('rebase onto fast forward', function() {
      return expectTreeAsync(
        'git switch -c F1; git commit; git rebase --onto F1 main;',
        '{"branches":{"main":{"target":"C1","id":"main","remoteTrackingBranchID":null},"F1":{"target":"C2","id":"F1","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"}},"tags":{},"HEAD":{"target":"F1","id":"HEAD"}}'
      );
    });
  });
});
