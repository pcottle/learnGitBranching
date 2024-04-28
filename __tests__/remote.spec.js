var base = require('./base');
var intl = require('../src/js/intl');
var Q = require('q');
var expectTreeAsync = base.expectTreeAsync;
var runCommand = base.runCommand;

describe('Git Remotes', function() {
  it('clones', function() {
    return expectTreeAsync(
      'git clone',
      '{"branches":{"main":{"target":"C1","id":"main","remoteTrackingBranchID":"o/main"},"o/main":{"target":"C1","id":"o/main","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"}},"HEAD":{"target":"main","id":"HEAD"},"originTree":{"branches":{"main":{"target":"C1","id":"main","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"}},"HEAD":{"target":"main","id":"HEAD"}}}'
    );
  });

  it('does fake teamwork', function() {
    return expectTreeAsync(
      'git clone; git fakeTeamwork',
      '{"branches":{"main":{"target":"C1","id":"main","remoteTrackingBranchID":"o/main"},"o/main":{"target":"C1","id":"o/main","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"}},"HEAD":{"target":"main","id":"HEAD"},"originTree":{"branches":{"main":{"target":"C2","id":"main","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"}},"HEAD":{"target":"main","id":"HEAD"}}}'
    );
  });

  it('does fake teamwork and then fetches', function() {
    return expectTreeAsync(
      'git clone; git fakeTeamwork; git fetch',
      '{"branches":{"main":{"target":"C1","id":"main","remoteTrackingBranchID":"o/main"},"o/main":{"target":"C2","id":"o/main","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"}},"HEAD":{"target":"main","id":"HEAD"},"originTree":{"branches":{"main":{"target":"C2","id":"main","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"}},"HEAD":{"target":"main","id":"HEAD"}}}'
    );
  });

  it('pulls', function() {
    return expectTreeAsync(
      'git clone; git commit; git fakeTeamwork; git pull',
      '{"branches":{"main":{"target":"C4","id":"main","remoteTrackingBranchID":"o/main"},"o/main":{"target":"C3","id":"o/main","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"},"C3":{"parents":["C1"],"id":"C3"},"C4":{"parents":["C2","C3"],"id":"C4"}},"HEAD":{"target":"main","id":"HEAD"},"originTree":{"branches":{"main":{"target":"C3","id":"main","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C3":{"parents":["C1"],"id":"C3"}},"HEAD":{"target":"main","id":"HEAD"}}}'
    );
  });

  it('pulls with rebase', function() {
    return expectTreeAsync(
      'git clone; git commit; git fakeTeamwork; git pull --rebase',
      '%7B%22branches%22%3A%7B%22main%22%3A%7B%22target%22%3A%22C2%27%22%2C%22id%22%3A%22main%22%2C%22remoteTrackingBranchID%22%3A%22o/main%22%2C%22localBranchesThatTrackThis%22%3Anull%7D%2C%22o/main%22%3A%7B%22target%22%3A%22C3%22%2C%22id%22%3A%22o/main%22%2C%22remoteTrackingBranchID%22%3Anull%2C%22localBranchesThatTrackThis%22%3A%5B%22main%22%5D%7D%7D%2C%22commits%22%3A%7B%22C0%22%3A%7B%22parents%22%3A%5B%5D%2C%22id%22%3A%22C0%22%2C%22rootCommit%22%3Atrue%7D%2C%22C1%22%3A%7B%22parents%22%3A%5B%22C0%22%5D%2C%22id%22%3A%22C1%22%7D%2C%22C2%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C2%22%7D%2C%22C3%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C3%22%7D%2C%22C2%27%22%3A%7B%22parents%22%3A%5B%22C3%22%5D%2C%22id%22%3A%22C2%27%22%7D%7D%2C%22HEAD%22%3A%7B%22target%22%3A%22main%22%2C%22id%22%3A%22HEAD%22%7D%2C%22originTree%22%3A%7B%22branches%22%3A%7B%22main%22%3A%7B%22target%22%3A%22C3%22%2C%22id%22%3A%22main%22%2C%22remoteTrackingBranchID%22%3Anull%2C%22localBranchesThatTrackThis%22%3Anull%7D%7D%2C%22commits%22%3A%7B%22C0%22%3A%7B%22parents%22%3A%5B%5D%2C%22id%22%3A%22C0%22%2C%22rootCommit%22%3Atrue%7D%2C%22C1%22%3A%7B%22parents%22%3A%5B%22C0%22%5D%2C%22id%22%3A%22C1%22%7D%2C%22C3%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C3%22%7D%7D%2C%22HEAD%22%3A%7B%22target%22%3A%22main%22%2C%22id%22%3A%22HEAD%22%7D%7D%7D'
    );
  });

  it('pulls with rebase and arguments', function() {
    return expectTreeAsync(
      'git checkout -b foo; git clone; git fakeTeamwork foo; git commit; git pull --rebase origin foo',
      '%7B%22branches%22%3A%7B%22main%22%3A%7B%22target%22%3A%22C1%22%2C%22id%22%3A%22main%22%2C%22remoteTrackingBranchID%22%3A%22o/main%22%7D%2C%22foo%22%3A%7B%22target%22%3A%22C3%27%22%2C%22id%22%3A%22foo%22%2C%22remoteTrackingBranchID%22%3A%22o/foo%22%7D%2C%22o/main%22%3A%7B%22target%22%3A%22C1%22%2C%22id%22%3A%22o/main%22%2C%22remoteTrackingBranchID%22%3Anull%7D%2C%22o/foo%22%3A%7B%22target%22%3A%22C2%22%2C%22id%22%3A%22o/foo%22%2C%22remoteTrackingBranchID%22%3Anull%7D%7D%2C%22commits%22%3A%7B%22C0%22%3A%7B%22parents%22%3A%5B%5D%2C%22id%22%3A%22C0%22%2C%22rootCommit%22%3Atrue%7D%2C%22C1%22%3A%7B%22parents%22%3A%5B%22C0%22%5D%2C%22id%22%3A%22C1%22%7D%2C%22C3%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C3%22%7D%2C%22C2%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C2%22%7D%2C%22C3%27%22%3A%7B%22parents%22%3A%5B%22C2%22%5D%2C%22id%22%3A%22C3%27%22%7D%7D%2C%22tags%22%3A%7B%7D%2C%22HEAD%22%3A%7B%22target%22%3A%22foo%22%2C%22id%22%3A%22HEAD%22%7D%2C%22originTree%22%3A%7B%22branches%22%3A%7B%22main%22%3A%7B%22target%22%3A%22C1%22%2C%22id%22%3A%22main%22%2C%22remoteTrackingBranchID%22%3Anull%7D%2C%22foo%22%3A%7B%22target%22%3A%22C2%22%2C%22id%22%3A%22foo%22%2C%22remoteTrackingBranchID%22%3Anull%7D%7D%2C%22commits%22%3A%7B%22C0%22%3A%7B%22parents%22%3A%5B%5D%2C%22id%22%3A%22C0%22%2C%22rootCommit%22%3Atrue%7D%2C%22C1%22%3A%7B%22parents%22%3A%5B%22C0%22%5D%2C%22id%22%3A%22C1%22%7D%2C%22C2%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C2%22%7D%7D%2C%22tags%22%3A%7B%7D%2C%22HEAD%22%3A%7B%22target%22%3A%22foo%22%2C%22id%22%3A%22HEAD%22%7D%7D%7D',
    );
  });

  it('pushes', function() {
    return expectTreeAsync(
      'git clone; git commit; git push',
      '{"branches":{"main":{"target":"C2","id":"main","remoteTrackingBranchID":"o/main"},"o/main":{"target":"C2","id":"o/main","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"}},"HEAD":{"target":"main","id":"HEAD"},"originTree":{"branches":{"main":{"target":"C2","id":"main","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"}},"HEAD":{"target":"main","id":"HEAD"}}}'
    );
  });

  it('pulls and then pushes', function() {
    return expectTreeAsync(
      'git clone; git commit; git fakeTeamwork; git pull; git push',
      '{"branches":{"main":{"target":"C4","id":"main","remoteTrackingBranchID":"o/main"},"o/main":{"target":"C4","id":"o/main","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"},"C3":{"parents":["C1"],"id":"C3"},"C4":{"parents":["C2","C3"],"id":"C4"}},"HEAD":{"target":"main","id":"HEAD"},"originTree":{"branches":{"main":{"target":"C4","id":"main","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C3":{"parents":["C1"],"id":"C3"},"C2":{"parents":["C1"],"id":"C2"},"C4":{"parents":["C2","C3"],"id":"C4"}},"HEAD":{"target":"main","id":"HEAD"}}}'
    );
  });

  it('pulls with rebase and then pushes', function() {
    return expectTreeAsync(
      'git clone; git commit; git fakeTeamwork; git pull --rebase; git push',
      '%7B%22branches%22%3A%7B%22main%22%3A%7B%22target%22%3A%22C2%27%22%2C%22id%22%3A%22main%22%2C%22remoteTrackingBranchID%22%3A%22o/main%22%2C%22localBranchesThatTrackThis%22%3Anull%7D%2C%22o/main%22%3A%7B%22target%22%3A%22C2%27%22%2C%22id%22%3A%22o/main%22%2C%22remoteTrackingBranchID%22%3Anull%2C%22localBranchesThatTrackThis%22%3A%5B%22main%22%5D%7D%7D%2C%22commits%22%3A%7B%22C0%22%3A%7B%22parents%22%3A%5B%5D%2C%22id%22%3A%22C0%22%2C%22rootCommit%22%3Atrue%7D%2C%22C1%22%3A%7B%22parents%22%3A%5B%22C0%22%5D%2C%22id%22%3A%22C1%22%7D%2C%22C2%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C2%22%7D%2C%22C3%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C3%22%7D%2C%22C2%27%22%3A%7B%22parents%22%3A%5B%22C3%22%5D%2C%22id%22%3A%22C2%27%22%7D%7D%2C%22HEAD%22%3A%7B%22target%22%3A%22main%22%2C%22id%22%3A%22HEAD%22%7D%2C%22originTree%22%3A%7B%22branches%22%3A%7B%22main%22%3A%7B%22target%22%3A%22C2%27%22%2C%22id%22%3A%22main%22%2C%22remoteTrackingBranchID%22%3Anull%2C%22localBranchesThatTrackThis%22%3Anull%7D%7D%2C%22commits%22%3A%7B%22C0%22%3A%7B%22parents%22%3A%5B%5D%2C%22id%22%3A%22C0%22%2C%22rootCommit%22%3Atrue%7D%2C%22C1%22%3A%7B%22parents%22%3A%5B%22C0%22%5D%2C%22id%22%3A%22C1%22%7D%2C%22C3%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C3%22%7D%2C%22C2%27%22%3A%7B%22parents%22%3A%5B%22C3%22%5D%2C%22id%22%3A%22C2%27%22%7D%7D%2C%22HEAD%22%3A%7B%22target%22%3A%22main%22%2C%22id%22%3A%22HEAD%22%7D%7D%7D'
    );
  });

  it('clones with many branches', function() {
    return expectTreeAsync(
      'git branch bugFix; git clone',
      '{"branches":{"main":{"target":"C1","id":"main","remoteTrackingBranchID":"o/main"},"bugFix":{"target":"C1","id":"bugFix","remoteTrackingBranchID":"o/bugFix"},"o/main":{"target":"C1","id":"o/main","remoteTrackingBranchID":null},"o/bugFix":{"target":"C1","id":"o/bugFix","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"}},"HEAD":{"target":"main","id":"HEAD"},"originTree":{"branches":{"main":{"target":"C1","id":"main","remoteTrackingBranchID":null},"bugFix":{"target":"C1","id":"bugFix","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"}},"HEAD":{"target":"main","id":"HEAD"}}}'
    );
  });

  it('clones with a merge commit, does teamwork, fetches', function() {
    return expectTreeAsync(
      'git branch bugFix; git commit; git checkout bugFix; git commit; git merge main; git clone; git fakeTeamwork bugFix 2',
      '{"branches":{"main":{"target":"C2","id":"main","remoteTrackingBranchID":"o/main"},"bugFix":{"target":"C4","id":"bugFix","remoteTrackingBranchID":"o/bugFix"},"o/main":{"target":"C2","id":"o/main","remoteTrackingBranchID":null},"o/bugFix":{"target":"C4","id":"o/bugFix","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"},"C3":{"parents":["C1"],"id":"C3"},"C4":{"parents":["C2","C3"],"id":"C4"}},"HEAD":{"target":"bugFix","id":"HEAD"},"originTree":{"branches":{"main":{"target":"C2","id":"main","remoteTrackingBranchID":null},"bugFix":{"target":"C6","id":"bugFix","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"},"C3":{"parents":["C1"],"id":"C3"},"C4":{"parents":["C2","C3"],"id":"C4"},"C5":{"parents":["C4"],"id":"C5"},"C6":{"parents":["C5"],"id":"C6"}},"HEAD":{"target":"bugFix","id":"HEAD"}}}'
    );
  });

  it('only fetches one branch if specified', function() {
    return expectTreeAsync(
      'git branch bugFix; git clone; git fakeTeamwork bugFix; git fakeTeamwork; git fetch origin bugFix',
      '{"branches":{"main":{"target":"C1","id":"main","remoteTrackingBranchID":"o/main"},"bugFix":{"target":"C1","id":"bugFix","remoteTrackingBranchID":"o/bugFix"},"o/main":{"target":"C1","id":"o/main","remoteTrackingBranchID":null},"o/bugFix":{"target":"C2","id":"o/bugFix","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"}},"HEAD":{"target":"main","id":"HEAD"},"originTree":{"branches":{"main":{"target":"C3","id":"main","remoteTrackingBranchID":null},"bugFix":{"target":"C2","id":"bugFix","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"},"C3":{"parents":["C1"],"id":"C3"}},"HEAD":{"target":"main","id":"HEAD"}}}'
    );
  });

  it('can fetch with --force where otherwise it would error', function() {
    return expectTreeAsync(
      'git clone; git fakeTeamwork; git commit; git checkout C1; git fetch origin main:main --force;',
      '{"branches":{"main":{"target":"C2","id":"main","remoteTrackingBranchID":"o/main"},"o/main":{"target":"C2","id":"o/main","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C3":{"parents":["C1"],"id":"C3"},"C2":{"parents":["C1"],"id":"C2"}},"tags":{},"HEAD":{"target":"C1","id":"HEAD"},"originTree":{"branches":{"main":{"target":"C2","id":"main","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"}},"tags":{},"HEAD":{"target":"main","id":"HEAD"}}}',
    );
  });

  it('checks all branches for fetching', function() {
    return expectTreeAsync(
      'git branch bugFix; git clone; git fakeTeamwork; git fetch',
      '{"branches":{"main":{"target":"C1","id":"main","remoteTrackingBranchID":"o/main"},"bugFix":{"target":"C1","id":"bugFix","remoteTrackingBranchID":"o/bugFix"},"o/main":{"target":"C2","id":"o/main","remoteTrackingBranchID":null},"o/bugFix":{"target":"C1","id":"o/bugFix","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"}},"HEAD":{"target":"main","id":"HEAD"},"originTree":{"branches":{"main":{"target":"C2","id":"main","remoteTrackingBranchID":null},"bugFix":{"target":"C1","id":"bugFix","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"}},"HEAD":{"target":"main","id":"HEAD"}}}'
    );
  });

  it('pulls with nothing and then commits', function() {
    return expectTreeAsync(
      'git clone; git pull; git commit',
      '{"branches":{"main":{"target":"C2","id":"main","remoteTrackingBranchID":"o/main"},"o/main":{"target":"C1","id":"o/main","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"}},"HEAD":{"target":"main","id":"HEAD"},"originTree":{"branches":{"main":{"target":"C1","id":"main","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"}},"HEAD":{"target":"main","id":"HEAD"}}}'
    );
  });

  it('pulls from different remote tracking branches nad merges', function() {
    return expectTreeAsync(
      'git branch side; git clone; git fakeTeamwork side;git commit; git pull origin side;git pull;git fakeTeamwork main;git pull',
      '{"branches":{"main":{"target":"C6","id":"main","remoteTrackingBranchID":"o/main"},"side":{"target":"C1","id":"side","remoteTrackingBranchID":"o/side"},"o/main":{"target":"C5","id":"o/main","remoteTrackingBranchID":null},"o/side":{"target":"C2","id":"o/side","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C3":{"parents":["C1"],"id":"C3"},"C2":{"parents":["C1"],"id":"C2"},"C4":{"parents":["C2","C3"],"id":"C4"},"C5":{"parents":["C1"],"id":"C5"},"C6":{"parents":["C4","C5"],"id":"C6"}},"HEAD":{"target":"main","id":"HEAD"},"originTree":{"branches":{"main":{"target":"C5","id":"main","remoteTrackingBranchID":null},"side":{"target":"C2","id":"side","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"},"C5":{"parents":["C1"],"id":"C5"}},"HEAD":{"target":"main","id":"HEAD"}}}'
    );
  });

  it('pulls with rebase from different remote tracking', function() {
    return expectTreeAsync(
      'git branch side; git clone; git fakeTeamwork side;git commit; git pull origin side --rebase',
      '%7B%22branches%22%3A%7B%22main%22%3A%7B%22target%22%3A%22C3%27%22%2C%22id%22%3A%22main%22%2C%22remoteTrackingBranchID%22%3A%22o/main%22%7D%2C%22side%22%3A%7B%22target%22%3A%22C1%22%2C%22id%22%3A%22side%22%2C%22remoteTrackingBranchID%22%3A%22o/side%22%7D%2C%22o/main%22%3A%7B%22target%22%3A%22C1%22%2C%22id%22%3A%22o/main%22%2C%22remoteTrackingBranchID%22%3Anull%2C%22localBranchesThatTrackThis%22%3A%5B%22main%22%5D%7D%2C%22o/side%22%3A%7B%22target%22%3A%22C2%22%2C%22id%22%3A%22o/side%22%2C%22remoteTrackingBranchID%22%3Anull%2C%22localBranchesThatTrackThis%22%3A%5B%22side%22%5D%7D%7D%2C%22commits%22%3A%7B%22C0%22%3A%7B%22parents%22%3A%5B%5D%2C%22id%22%3A%22C0%22%2C%22rootCommit%22%3Atrue%7D%2C%22C1%22%3A%7B%22parents%22%3A%5B%22C0%22%5D%2C%22id%22%3A%22C1%22%7D%2C%22C3%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C3%22%7D%2C%22C2%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C2%22%7D%2C%22C3%27%22%3A%7B%22parents%22%3A%5B%22C2%22%5D%2C%22id%22%3A%22C3%27%22%7D%7D%2C%22HEAD%22%3A%7B%22target%22%3A%22main%22%2C%22id%22%3A%22HEAD%22%7D%2C%22originTree%22%3A%7B%22branches%22%3A%7B%22main%22%3A%7B%22target%22%3A%22C1%22%2C%22id%22%3A%22main%22%2C%22remoteTrackingBranchID%22%3Anull%2C%22localBranchesThatTrackThis%22%3Anull%7D%2C%22side%22%3A%7B%22target%22%3A%22C2%22%2C%22id%22%3A%22side%22%2C%22remoteTrackingBranchID%22%3Anull%2C%22localBranchesThatTrackThis%22%3Anull%7D%7D%2C%22commits%22%3A%7B%22C0%22%3A%7B%22parents%22%3A%5B%5D%2C%22id%22%3A%22C0%22%2C%22rootCommit%22%3Atrue%7D%2C%22C1%22%3A%7B%22parents%22%3A%5B%22C0%22%5D%2C%22id%22%3A%22C1%22%7D%2C%22C2%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C2%22%7D%7D%2C%22HEAD%22%3A%7B%22target%22%3A%22side%22%2C%22id%22%3A%22HEAD%22%7D%7D%7D'
    );
  });

  it('pushes to another remote', function() {
    return expectTreeAsync(
      'git branch side; git clone;git commit; git push origin HEAD:side',
      '{"branches":{"main":{"target":"C2","id":"main","remoteTrackingBranchID":"o/main"},"side":{"target":"C1","id":"side","remoteTrackingBranchID":"o/side"},"o/main":{"target":"C1","id":"o/main","remoteTrackingBranchID":null},"o/side":{"target":"C2","id":"o/side","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"}},"HEAD":{"target":"main","id":"HEAD"},"originTree":{"branches":{"main":{"target":"C1","id":"main","remoteTrackingBranchID":null},"side":{"target":"C2","id":"side","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"}},"HEAD":{"target":"main","id":"HEAD"}}}'
    );
  });

  it('pushes to tracking remote', function() {
    return expectTreeAsync(
      'git branch side; git clone;git commit;git push; go side; git commit; git push',
      '{"branches":{"main":{"target":"C2","id":"main","remoteTrackingBranchID":"o/main"},"side":{"target":"C3","id":"side","remoteTrackingBranchID":"o/side"},"o/main":{"target":"C2","id":"o/main","remoteTrackingBranchID":null},"o/side":{"target":"C3","id":"o/side","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"},"C3":{"parents":["C1"],"id":"C3"}},"HEAD":{"target":"side","id":"HEAD"},"originTree":{"branches":{"main":{"target":"C2","id":"main","remoteTrackingBranchID":null},"side":{"target":"C3","id":"side","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"},"C3":{"parents":["C1"],"id":"C3"}},"HEAD":{"target":"main","id":"HEAD"}}}'
    );
  });

  it('sets tracking when checking out remote branch', function() {
    return expectTreeAsync(
      'git clone; git checkout -b side o/main;git fakeTeamwork;git pull',
      '{"branches":{"main":{"target":"C1","id":"main","remoteTrackingBranchID":"o/main"},"o/main":{"target":"C2","id":"o/main","remoteTrackingBranchID":null,"localBranchesThatTrackThis":["main","side"]},"side":{"target":"C2","id":"side","remoteTrackingBranchID":"o/main"}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"}},"HEAD":{"target":"side","id":"HEAD"},"originTree":{"branches":{"main":{"target":"C2","id":"main","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"}},"HEAD":{"target":"main","id":"HEAD"}}}'
    );
  });

  it('also sets tracking when just branching', function() {
    return expectTreeAsync(
      'git clone; gb side o/main',
      '{"branches":{"main":{"target":"C1","id":"main","remoteTrackingBranchID":"o/main"},"o/main":{"target":"C1","id":"o/main","remoteTrackingBranchID":null,"localBranchesThatTrackThis":["main","side"]},"side":{"target":"C1","id":"side","remoteTrackingBranchID":"o/main"}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"}},"HEAD":{"target":"main","id":"HEAD"},"originTree":{"branches":{"main":{"target":"C1","id":"main","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"}},"HEAD":{"target":"main","id":"HEAD"}}}'
    );
  });

  it('can push with colon refspec', function() {
    return expectTreeAsync(
      'git clone; gc; git checkout -b foo HEAD~1; git push origin main:main',
      '{"branches":{"main":{"target":"C2","id":"main","remoteTrackingBranchID":"o/main"},"o/main":{"target":"C2","id":"o/main","remoteTrackingBranchID":null},"foo":{"target":"C1","id":"foo","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"}},"HEAD":{"target":"foo","id":"HEAD"},"originTree":{"branches":{"main":{"target":"C2","id":"main","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"}},"HEAD":{"target":"main","id":"HEAD"}}}'
    );
  });

  it('can delete branches with colon refspec', function() {
    return expectTreeAsync(
      'git branch foo; git clone; git push origin :foo',
      '{"branches":{"main":{"target":"C1","id":"main","remoteTrackingBranchID":"o/main"},"foo":{"target":"C1","id":"foo","remoteTrackingBranchID":null},"o/main":{"target":"C1","id":"o/main","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"}},"HEAD":{"target":"main","id":"HEAD"},"originTree":{"branches":{"main":{"target":"C1","id":"main","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"}},"HEAD":{"target":"main","id":"HEAD"}}}'
    );
  });

  it('can delete branches with --delete flag', function() {
    expectTreeAsync(
      'git branch foo; git clone; git push origin --delete',
      '{"branches":{"main":{"target":"C1","id":"main","remoteTrackingBranchID":"o/main"},"foo":{"target":"C1","id":"foo","remoteTrackingBranchID":"o/foo"},"o/main":{"target":"C1","id":"o/main","remoteTrackingBranchID":null},"o/foo":{"target":"C1","id":"o/foo","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"}},"tags":{},"HEAD":{"target":"main","id":"HEAD"},"originTree":{"branches":{"main":{"target":"C1","id":"main","remoteTrackingBranchID":null},"foo":{"target":"C1","id":"foo","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"}},"tags":{},"HEAD":{"target":"main","id":"HEAD"}}}'
    );

    expectTreeAsync(
      'git branch foo; git clone; git push origin --delete main:foo',
      '{"branches":{"main":{"target":"C1","id":"main","remoteTrackingBranchID":"o/main"},"foo":{"target":"C1","id":"foo","remoteTrackingBranchID":"o/foo"},"o/main":{"target":"C1","id":"o/main","remoteTrackingBranchID":null},"o/foo":{"target":"C1","id":"o/foo","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"}},"tags":{},"HEAD":{"target":"main","id":"HEAD"},"originTree":{"branches":{"main":{"target":"C1","id":"main","remoteTrackingBranchID":null},"foo":{"target":"C1","id":"foo","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"}},"tags":{},"HEAD":{"target":"main","id":"HEAD"}}}'
    );

    expectTreeAsync(
      'git branch foo; git clone; git push --delete origin foo',
      '{"branches":{"main":{"target":"C1","id":"main","remoteTrackingBranchID":"o/main"},"foo":{"target":"C1","id":"foo","remoteTrackingBranchID":null},"o/main":{"target":"C1","id":"o/main","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"}},"HEAD":{"target":"main","id":"HEAD"},"originTree":{"branches":{"main":{"target":"C1","id":"main","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"}},"HEAD":{"target":"main","id":"HEAD"}}}'
    );

    return expectTreeAsync(
      'git branch foo; git clone; git push origin --delete foo',
      '{"branches":{"main":{"target":"C1","id":"main","remoteTrackingBranchID":"o/main"},"foo":{"target":"C1","id":"foo","remoteTrackingBranchID":null},"o/main":{"target":"C1","id":"o/main","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"}},"HEAD":{"target":"main","id":"HEAD"},"originTree":{"branches":{"main":{"target":"C1","id":"main","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"}},"HEAD":{"target":"main","id":"HEAD"}}}'
    );
  });


  it('pushes new branch onto server', function() {
    return expectTreeAsync(
      'git clone; git commit; git push origin main:foo',
      '{"branches":{"main":{"target":"C2","id":"main","remoteTrackingBranchID":"o/main"},"o/main":{"target":"C1","id":"o/main","remoteTrackingBranchID":null},"o/foo":{"target":"C2","id":"o/foo","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"}},"HEAD":{"target":"main","id":"HEAD"},"originTree":{"branches":{"main":{"target":"C1","id":"main","remoteTrackingBranchID":null},"foo":{"target":"C2","id":"foo","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"}},"HEAD":{"target":"main","id":"HEAD"}}}'
    );
  });

  it('does not push for HEAD', function() {
    return expectTreeAsync(
      'git clone; git commit; git checkout C2; git push',
      '{"branches":{"main":{"target":"C2","id":"main","remoteTrackingBranchID":"o/main"},"o/main":{"target":"C1","id":"o/main","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"}},"HEAD":{"target":"C2","id":"HEAD"},"originTree":{"branches":{"main":{"target":"C1","id":"main","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"}},"HEAD":{"target":"main","id":"HEAD"}}}'
    );
  });

  it('does push for HEAD as a source though to a new branch', function() {
    return expectTreeAsync(
      'git clone; git commit; git checkout C2; git push origin HEAD:foo',
      '{"branches":{"main":{"target":"C2","id":"main","remoteTrackingBranchID":"o/main"},"o/main":{"target":"C1","id":"o/main","remoteTrackingBranchID":null},"o/foo":{"target":"C2","id":"o/foo","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"}},"HEAD":{"target":"C2","id":"HEAD"},"originTree":{"branches":{"main":{"target":"C1","id":"main","remoteTrackingBranchID":null},"foo":{"target":"C2","id":"foo","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"}},"HEAD":{"target":"main","id":"HEAD"}}}'
    );
  });

  it('but it cant delete main on remote', function() {
    return expectTreeAsync(
      'git branch foo; git clone; git push origin :main',
      '{"branches":{"main":{"target":"C1","id":"main","remoteTrackingBranchID":"o/main"},"foo":{"target":"C1","id":"foo","remoteTrackingBranchID":"o/foo"},"o/main":{"target":"C1","id":"o/main","remoteTrackingBranchID":null},"o/foo":{"target":"C1","id":"o/foo","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"}},"HEAD":{"target":"main","id":"HEAD"},"originTree":{"branches":{"main":{"target":"C1","id":"main","remoteTrackingBranchID":null},"foo":{"target":"C1","id":"foo","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"}},"HEAD":{"target":"main","id":"HEAD"}}}'
    );
  });

  it('will prune the origin tree when deleting branches', function() {
    return expectTreeAsync(
      'git checkout -b foo; git commit; git clone; git push origin :foo',
      '{"branches":{"main":{"target":"C1","id":"main","remoteTrackingBranchID":"o/main"},"foo":{"target":"C2","id":"foo","remoteTrackingBranchID":null},"o/main":{"target":"C1","id":"o/main","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"}},"HEAD":{"target":"foo","id":"HEAD"},"originTree":{"branches":{"main":{"target":"C1","id":"main","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"}},"HEAD":{"target":"main","id":"HEAD"}}}'
    );
  });

  it('will not push to a remote if the local ref does not exist', function() {
    return expectTreeAsync(
      'git clone; git push origin foo',
      '{"branches":{"main":{"target":"C1","id":"main","remoteTrackingBranchID":"o/main"},"o/main":{"target":"C1","id":"o/main","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"}},"HEAD":{"target":"main","id":"HEAD"},"originTree":{"branches":{"main":{"target":"C1","id":"main","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"}},"HEAD":{"target":"main","id":"HEAD"}}}'
    );
  });

  it('will push to the remote branch IF IT has tracking', function() {
    return expectTreeAsync(
      'git clone; git checkout -b foo o/main; git commit; git push',
      '{"branches":{"main":{"target":"C1","id":"main","remoteTrackingBranchID":"o/main"},"o/main":{"target":"C2","id":"o/main","remoteTrackingBranchID":null},"foo":{"target":"C2","id":"foo","remoteTrackingBranchID":"o/main"}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"}},"HEAD":{"target":"foo","id":"HEAD"},"originTree":{"branches":{"main":{"target":"C2","id":"main","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"}},"HEAD":{"target":"main","id":"HEAD"}}}'
    );
  });

  it('will push to a new remote branch if no tracking is set up', function() {
    return expectTreeAsync(
      'git clone; git checkout -b foo; git commit; git push',
      '{"branches":{"main":{"target":"C1","id":"main","remoteTrackingBranchID":"o/main"},"o/main":{"target":"C1","id":"o/main","remoteTrackingBranchID":null},"foo":{"target":"C2","id":"foo","remoteTrackingBranchID":"o/foo"},"o/foo":{"target":"C2","id":"o/foo","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"}},"HEAD":{"target":"foo","id":"HEAD"},"originTree":{"branches":{"main":{"target":"C1","id":"main","remoteTrackingBranchID":null},"foo":{"target":"C2","id":"foo","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"}},"HEAD":{"target":"main","id":"HEAD"}}}'
    );
  });

  it('will push to the remote tracking branch WHILE NOT on branch if it is set up', function() {
    return expectTreeAsync(
      'git clone; git checkout -b foo o/main; git commit; go main; git push origin foo',
      '{"branches":{"main":{"target":"C1","id":"main","remoteTrackingBranchID":"o/main"},"o/main":{"target":"C2","id":"o/main","remoteTrackingBranchID":null},"foo":{"target":"C2","id":"foo","remoteTrackingBranchID":"o/main"}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"}},"HEAD":{"target":"main","id":"HEAD"},"originTree":{"branches":{"main":{"target":"C2","id":"main","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"}},"HEAD":{"target":"main","id":"HEAD"}}}'
    );
  });

  it('will push to a new remote branch if tracking was previously set up but remote branch was merged on origin', function() {
    return expectTreeAsync(
      `git clone;
      git switch -c feat;
      git commit;
      git push;
      git fakeTeamwork;
      git mergeMR feat main --delete-after-merge;
      git commit;
      git push;`,
      '{"branches":{"main":{"remoteTrackingBranchID":"o/main","target":"C1","id":"main"},"o/main":{"remoteTrackingBranchID":null,"target":"C1","id":"o/main"},"feat":{"remoteTrackingBranchID":"o/feat","target":"C5","id":"feat"},"o/feat":{"remoteTrackingBranchID":null,"target":"C5","id":"o/feat"}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"},"C5":{"parents":["C2"],"id":"C5"}},"tags":{},"HEAD":{"id":"HEAD","target":"feat"},"originTree":{"branches":{"main":{"remoteTrackingBranchID":null,"target":"C4","id":"main"},"feat":{"remoteTrackingBranchID":null,"target":"C5","id":"feat"}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"},"C3":{"parents":["C1"],"id":"C3"},"C4":{"parents":["C3","C2"],"id":"C4"},"C5":{"parents":["C2"],"id":"C5"}},"tags":{},"HEAD":{"target":"main","id":"HEAD"}}}'
    );
  });

  it('will not fetch if ref does not exist on remote', function() {
    return expectTreeAsync(
      'git clone; git fakeTeamwork; git fetch origin foo:main',
      '{"branches":{"main":{"target":"C1","id":"main","remoteTrackingBranchID":"o/main"},"o/main":{"target":"C1","id":"o/main","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"}},"HEAD":{"target":"main","id":"HEAD"},"originTree":{"branches":{"main":{"target":"C2","id":"main","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"}},"HEAD":{"target":"main","id":"HEAD"}}}'
    );
  });

  it('does not fetch if ref does not exist on remote with one arg', function() {
    return expectTreeAsync(
      'git clone; git fakeTeamwork; git fetch origin foo',
      '{"branches":{"main":{"target":"C1","id":"main","remoteTrackingBranchID":"o/main"},"o/main":{"target":"C1","id":"o/main","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"}},"HEAD":{"target":"main","id":"HEAD"},"originTree":{"branches":{"main":{"target":"C2","id":"main","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"}},"HEAD":{"target":"main","id":"HEAD"}}}'
    );
  });

  it('validates branch names when fetching', function() {
    return expectTreeAsync(
      'git clone; git fakeTeamwork; git fetch origin main:f<>',
      '{"branches":{"main":{"target":"C1","id":"main","remoteTrackingBranchID":"o/main"},"o/main":{"target":"C1","id":"o/main","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"}},"HEAD":{"target":"main","id":"HEAD"},"originTree":{"branches":{"main":{"target":"C2","id":"main","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"}},"HEAD":{"target":"main","id":"HEAD"}}}'
    );
  });

  it('fetches only one remote if specified', function() {
    return expectTreeAsync(
      'git clone;gc;git push origin main:banana;git fakeTeamwork banana;git fakeTeamwork main;git fetch origin banana',
      '{"branches":{"main":{"target":"C2","id":"main","remoteTrackingBranchID":"o/main"},"o/main":{"target":"C1","id":"o/main","remoteTrackingBranchID":null},"o/banana":{"target":"C3","id":"o/banana","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"},"C3":{"parents":["C2"],"id":"C3"}},"HEAD":{"target":"main","id":"HEAD"},"originTree":{"branches":{"main":{"target":"C4","id":"main","remoteTrackingBranchID":null},"banana":{"target":"C3","id":"banana","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"},"C3":{"parents":["C2"],"id":"C3"},"C4":{"parents":["C1"],"id":"C4"}},"HEAD":{"target":"main","id":"HEAD"}}}'
    );
  });

  it('sets remote tracking', function() {
    return expectTreeAsync(
      'git clone; git branch foo; git branch -u o/main foo',
      '{"branches":{"main":{"target":"C1","id":"main","remoteTrackingBranchID":"o/main"},"o/main":{"target":"C1","id":"o/main","remoteTrackingBranchID":null},"foo":{"target":"C1","id":"foo","remoteTrackingBranchID":"o/main"}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"}},"HEAD":{"target":"main","id":"HEAD"},"originTree":{"branches":{"main":{"target":"C1","id":"main","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"}},"HEAD":{"target":"main","id":"HEAD"}}}'
    );
  });

  it('sets remote tracking on current branch if not specified', function() {
    return expectTreeAsync(
      'git clone; git checkout -b foo; git branch -u o/main',
      '{"branches":{"main":{"target":"C1","id":"main","remoteTrackingBranchID":"o/main"},"o/main":{"target":"C1","id":"o/main","remoteTrackingBranchID":null},"foo":{"target":"C1","id":"foo","remoteTrackingBranchID":"o/main"}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"}},"HEAD":{"target":"foo","id":"HEAD"},"originTree":{"branches":{"main":{"target":"C1","id":"main","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"}},"HEAD":{"target":"main","id":"HEAD"}}}'
    );
  });

  it('fetches with no args, explicit dest args, and with just one arg', function() {
    return expectTreeAsync(
      'git clone; git fakeTeamwork; git fetch origin main:o/main;git fakeTeamwork;git fetch;git fakeTeamwork;git fetch origin main',
      '{"branches":{"main":{"target":"C1","id":"main","remoteTrackingBranchID":"o/main"},"o/main":{"target":"C4","id":"o/main","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"},"C3":{"parents":["C2"],"id":"C3"},"C4":{"parents":["C3"],"id":"C4"}},"HEAD":{"target":"main","id":"HEAD"},"originTree":{"branches":{"main":{"target":"C4","id":"main","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"},"C3":{"parents":["C2"],"id":"C3"},"C4":{"parents":["C3"],"id":"C4"}},"HEAD":{"target":"main","id":"HEAD"}}}'
    );
  });

  it('doesn\'t fetch if out of sync, but will update explicit dest if specified', function() {
    return expectTreeAsync(
      'git clone; git fakeTeamwork; go HEAD~1; git fetch origin main:main;go main; gc; go HEAD~1; git fakeTeamwork;git fetch origin main:main',
      '{"branches":{"main":{"target":"C3","id":"main","remoteTrackingBranchID":"o/main"},"o/main":{"target":"C2","id":"o/main","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"},"C3":{"parents":["C2"],"id":"C3"}},"HEAD":{"target":"C2","id":"HEAD"},"originTree":{"branches":{"main":{"target":"C4","id":"main","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"},"C4":{"parents":["C2"],"id":"C4"}},"HEAD":{"target":"main","id":"HEAD"}}}'
    );
  });

  it('pulls to the right branch and destination', function() {
    return expectTreeAsync(
        'git clone; git checkout -b side o/main;git fakeTeamwork;git pull origin main:o/main',
        '{"branches":{"main":{"target":"C1","id":"main","remoteTrackingBranchID":"o/main"},"o/main":{"target":"C2","id":"o/main","remoteTrackingBranchID":null},"side":{"target":"C2","id":"side","remoteTrackingBranchID":"o/main"}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"}},"HEAD":{"target":"side","id":"HEAD"},"originTree":{"branches":{"main":{"target":"C2","id":"main","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"}},"HEAD":{"target":"main","id":"HEAD"}}}'
    );
  });

  it('correctly checks upstream when pushing to a remote where commits already exist but branch is not updated DAYAM dawg', function() {
    return expectTreeAsync(
      'git push origin main^:main',
      '{"branches":{"main":{"target":"C9","id":"main","remoteTrackingBranchID":"o/main"},"foo":{"target":"C8","id":"foo","remoteTrackingBranchID":"o/foo"},"o/main":{"target":"C5","id":"o/main","remoteTrackingBranchID":null},"o/foo":{"target":"C5","id":"o/foo","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"},"C3":{"parents":["C2"],"id":"C3"},"C4":{"parents":["C1"],"id":"C4"},"C5":{"parents":["C2","C4"],"id":"C5"},"C6":{"parents":["C4"],"id":"C6"},"C7":{"parents":["C6"],"id":"C7"},"C8":{"parents":["C5","C7"],"id":"C8"},"C9":{"parents":["C5"],"id":"C9"}},"HEAD":{"target":"main","id":"HEAD"},"originTree":{"branches":{"main":{"target":"C5","id":"main","remoteTrackingBranchID":null},"foo":{"target":"C5","id":"foo","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"},"C4":{"parents":["C1"],"id":"C4"},"C5":{"parents":["C2","C4"],"id":"C5"}},"HEAD":{"target":"main","id":"HEAD"}}}',
      '{"branches":{"main":{"target":"C9","id":"main","remoteTrackingBranchID":"o/main"},"foo":{"target":"C8","id":"foo","remoteTrackingBranchID":"o/foo"},"o/main":{"target":"C1","id":"o/main","remoteTrackingBranchID":null},"o/foo":{"target":"C5","id":"o/foo","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"},"C3":{"parents":["C2"],"id":"C3"},"C4":{"parents":["C1"],"id":"C4"},"C5":{"parents":["C2","C4"],"id":"C5"},"C6":{"parents":["C4"],"id":"C6"},"C7":{"parents":["C6"],"id":"C7"},"C8":{"parents":["C5","C7"],"id":"C8"},"C9":{"parents":["C5"],"id":"C9"}},"HEAD":{"target":"main","id":"HEAD"},"originTree":{"branches":{"main":{"target":"C1","id":"main","remoteTrackingBranchID":null},"foo":{"target":"C5","id":"foo","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"},"C4":{"parents":["C1"],"id":"C4"},"C5":{"parents":["C2","C4"],"id":"C5"}},"HEAD":{"target":"main","id":"HEAD"}}}'
    );
  });

  it('correctly resolves source during git fetch with params', function() {
    return expectTreeAsync(
      'git clone; git push origin main:foo; git fakeTeamwork foo 2; git fetch origin c2:blah',
      '{"branches":{"main":{"target":"C1","id":"main","remoteTrackingBranchID":"o/main"},"o/main":{"target":"C1","id":"o/main","remoteTrackingBranchID":null},"o/foo":{"target":"C1","id":"o/foo","remoteTrackingBranchID":null},"blah":{"target":"C2","id":"blah","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"}},"HEAD":{"target":"main","id":"HEAD"},"originTree":{"branches":{"main":{"target":"C1","id":"main","remoteTrackingBranchID":null},"foo":{"target":"C3","id":"foo","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"},"C3":{"parents":["C2"],"id":"C3"}},"HEAD":{"target":"foo","id":"HEAD"}}}'
    );
  });

  it('correctly makes a new branch during fetch despite nothing to download', function() {
    return expectTreeAsync(
      'git clone; git push origin main:foo',
      '{"branches":{"main":{"target":"C1","id":"main","remoteTrackingBranchID":"o/main"},"o/main":{"target":"C1","id":"o/main","remoteTrackingBranchID":null},"o/foo":{"target":"C1","id":"o/foo","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"}},"HEAD":{"target":"main","id":"HEAD"},"originTree":{"branches":{"main":{"target":"C1","id":"main","remoteTrackingBranchID":null},"foo":{"target":"C1","id":"foo","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"}},"HEAD":{"target":"main","id":"HEAD"}}}'
    );
  });

  it('correctly resolves existing commits and updates', function() {
    return expectTreeAsync(
      'git clone; git push origin main:foo; git fakeTeamwork foo 2; git fetch origin c2:blah;go C0; git fetch origin c2:main',
      '{"branches":{"main":{"target":"C2","id":"main","remoteTrackingBranchID":"o/main"},"o/main":{"target":"C1","id":"o/main","remoteTrackingBranchID":null},"o/foo":{"target":"C1","id":"o/foo","remoteTrackingBranchID":null},"blah":{"target":"C2","id":"blah","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"}},"HEAD":{"target":"C0","id":"HEAD"},"originTree":{"branches":{"main":{"target":"C1","id":"main","remoteTrackingBranchID":null},"foo":{"target":"C3","id":"foo","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"},"C3":{"parents":["C2"],"id":"C3"}},"HEAD":{"target":"foo","id":"HEAD"}}}'
    );
  });

  it('doesn\'t let you fetch to main if you are checked out there', function() {
    return expectTreeAsync(
      'git clone; git push origin main:foo; git fakeTeamwork foo 2; git fetch origin c2:blah; git fetch origin foo:main',
      '{"branches":{"main":{"target":"C1","id":"main","remoteTrackingBranchID":"o/main"},"o/main":{"target":"C1","id":"o/main","remoteTrackingBranchID":null},"o/foo":{"target":"C1","id":"o/foo","remoteTrackingBranchID":null},"blah":{"target":"C2","id":"blah","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"}},"HEAD":{"target":"main","id":"HEAD"},"originTree":{"branches":{"main":{"target":"C1","id":"main","remoteTrackingBranchID":null},"foo":{"target":"C3","id":"foo","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"},"C3":{"parents":["C2"],"id":"C3"}},"HEAD":{"target":"foo","id":"HEAD"}}}'
    );
  });

  it('doesn\'t let you delete branches that don\'t exist', function() {
    return expectTreeAsync(
      'git clone; git push origin :foo',
      '{"branches":{"main":{"target":"C1","id":"main","remoteTrackingBranchID":"o/main"},"o/main":{"target":"C1","id":"o/main","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"}},"HEAD":{"target":"main","id":"HEAD"},"originTree":{"branches":{"main":{"target":"C1","id":"main","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"}},"HEAD":{"target":"main","id":"HEAD"}}}'
    );
  });

  it('pulls to a new branch and then merges in that branch', function() {
    return expectTreeAsync(
      'git clone; git fakeTeamwork; git commit; git pull origin main:bar',
      '{"branches":{"main":{"target":"C4","id":"main","remoteTrackingBranchID":"o/main"},"o/main":{"target":"C2","id":"o/main","remoteTrackingBranchID":null},"bar":{"target":"C2","id":"bar","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C3":{"parents":["C1"],"id":"C3"},"C2":{"parents":["C1"],"id":"C2"},"C4":{"parents":["C2","C3"],"id":"C4"}},"HEAD":{"target":"main","id":"HEAD"},"originTree":{"branches":{"main":{"target":"C2","id":"main","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"}},"HEAD":{"target":"main","id":"HEAD"}}}'
    );
  });

  it('makes a new branch from pull and doesn\'t bork', function() {
    return expectTreeAsync(
      'git clone; git pull origin :bar',
      '{"branches":{"main":{"target":"C1","id":"main","remoteTrackingBranchID":"o/main"},"o/main":{"target":"C1","id":"o/main","remoteTrackingBranchID":null},"bar":{"target":"C1","id":"bar","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"}},"HEAD":{"target":"main","id":"HEAD"},"originTree":{"branches":{"main":{"target":"C1","id":"main","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"}},"HEAD":{"target":"main","id":"HEAD"}}}'
    );
  });

  it('makes the new branch on push in the right place', function() {
    return expectTreeAsync(
      'git clone; git fakeTeamwork; git push origin main:foo',
      '{"branches":{"main":{"target":"C1","id":"main","remoteTrackingBranchID":"o/main"},"o/main":{"target":"C1","id":"o/main","remoteTrackingBranchID":null},"o/foo":{"target":"C1","id":"o/foo","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"}},"HEAD":{"target":"main","id":"HEAD"},"originTree":{"branches":{"main":{"target":"C2","id":"main","remoteTrackingBranchID":null},"foo":{"target":"C1","id":"foo","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"}},"HEAD":{"target":"main","id":"HEAD"}}}'
    );
  });

  it('tracks remote with -u', function() {
    return expectTreeAsync(
      'git clone; git branch foo; git branch -u o/main foo',
      '{"branches":{"main":{"target":"C1","id":"main","remoteTrackingBranchID":"o/main"},"o/main":{"target":"C1","id":"o/main","remoteTrackingBranchID":null},"foo":{"target":"C1","id":"foo","remoteTrackingBranchID":"o/main"}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"}},"tags":{},"HEAD":{"target":"main","id":"HEAD"},"originTree":{"branches":{"main":{"target":"C1","id":"main","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"}},"tags":{},"HEAD":{"target":"main","id":"HEAD"}}}'
    );
  });

  it('does not fetch if one arg is not branch ref', function() {
    return expectTreeAsync(
      'git clone; git fakeTeamwork 2; git fetch origin main~1',
      '{"branches":{"main":{"target":"C1","id":"main","remoteTrackingBranchID":"o/main"},"o/main":{"target":"C1","id":"o/main","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"}},"tags":{},"HEAD":{"target":"main","id":"HEAD"},"originTree":{"branches":{"main":{"target":"C3","id":"main","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"},"C3":{"parents":["C2"],"id":"C3"}},"tags":{},"HEAD":{"target":"main","id":"HEAD"}}}'
    );
  });

  it('creates the branch on the fly', function() {
    return expectTreeAsync(
      'git clone; git commit; go -b side; git push origin side',
      '{"branches":{"main":{"target":"C2","id":"main","remoteTrackingBranchID":"o/main"},"o/main":{"target":"C1","id":"o/main","remoteTrackingBranchID":null},"side":{"target":"C2","id":"side","remoteTrackingBranchID":"o/side"},"o/side":{"target":"C2","id":"o/side","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"}},"tags":{},"HEAD":{"target":"side","id":"HEAD"},"originTree":{"branches":{"main":{"target":"C1","id":"main","remoteTrackingBranchID":null},"side":{"target":"C2","id":"side","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"}},"tags":{},"HEAD":{"target":"main","id":"HEAD"}}}'
    );
  });

  it('does not create the o/main branch on remote', function() {
    return expectTreeAsync(
      'git clone; git commit; git push origin o/main',
      '{"branches":{"main":{"target":"C2","id":"main","remoteTrackingBranchID":"o/main"},"o/main":{"target":"C1","id":"o/main","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"}},"tags":{},"HEAD":{"target":"main","id":"HEAD"},"originTree":{"branches":{"main":{"target":"C1","id":"main","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"}},"tags":{},"HEAD":{"target":"main","id":"HEAD"}}}'
    );
  });

  it('pulls with rebase correctly in weird situation with no rebase to do', function() {
    return expectTreeAsync(
      'git checkout -b side; git commit; git checkout main; git commit; git commit; git merge side; git commit; git clone; git checkout -b otherMain main^^^; git rebase side; git rebase otherMain main; git push;git pull --rebase',
      '%7B%22branches%22%3A%7B%22main%22%3A%7B%22target%22%3A%22C6%22%2C%22id%22%3A%22main%22%2C%22remoteTrackingBranchID%22%3A%22o/main%22%7D%2C%22side%22%3A%7B%22target%22%3A%22C2%22%2C%22id%22%3A%22side%22%2C%22remoteTrackingBranchID%22%3A%22o/side%22%7D%2C%22o/main%22%3A%7B%22target%22%3A%22C6%22%2C%22id%22%3A%22o/main%22%2C%22remoteTrackingBranchID%22%3Anull%7D%2C%22o/side%22%3A%7B%22target%22%3A%22C2%22%2C%22id%22%3A%22o/side%22%2C%22remoteTrackingBranchID%22%3Anull%7D%2C%22otherMain%22%3A%7B%22target%22%3A%22C3%27%22%2C%22id%22%3A%22otherMain%22%2C%22remoteTrackingBranchID%22%3Anull%7D%7D%2C%22commits%22%3A%7B%22C0%22%3A%7B%22parents%22%3A%5B%5D%2C%22id%22%3A%22C0%22%2C%22rootCommit%22%3Atrue%7D%2C%22C1%22%3A%7B%22parents%22%3A%5B%22C0%22%5D%2C%22id%22%3A%22C1%22%7D%2C%22C2%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C2%22%7D%2C%22C3%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C3%22%7D%2C%22C4%22%3A%7B%22parents%22%3A%5B%22C3%22%5D%2C%22id%22%3A%22C4%22%7D%2C%22C5%22%3A%7B%22parents%22%3A%5B%22C2%22%2C%22C4%22%5D%2C%22id%22%3A%22C5%22%7D%2C%22C6%22%3A%7B%22parents%22%3A%5B%22C5%22%5D%2C%22id%22%3A%22C6%22%7D%2C%22C3%27%22%3A%7B%22parents%22%3A%5B%22C2%22%5D%2C%22id%22%3A%22C3%27%22%7D%2C%22C4%27%22%3A%7B%22parents%22%3A%5B%22C3%27%22%5D%2C%22id%22%3A%22C4%27%22%7D%2C%22C6%27%22%3A%7B%22parents%22%3A%5B%22C4%27%22%5D%2C%22id%22%3A%22C6%27%22%7D%7D%2C%22tags%22%3A%7B%7D%2C%22HEAD%22%3A%7B%22target%22%3A%22main%22%2C%22id%22%3A%22HEAD%22%7D%2C%22originTree%22%3A%7B%22branches%22%3A%7B%22main%22%3A%7B%22target%22%3A%22C6%22%2C%22id%22%3A%22main%22%2C%22remoteTrackingBranchID%22%3Anull%7D%2C%22side%22%3A%7B%22target%22%3A%22C2%22%2C%22id%22%3A%22side%22%2C%22remoteTrackingBranchID%22%3Anull%7D%7D%2C%22commits%22%3A%7B%22C0%22%3A%7B%22parents%22%3A%5B%5D%2C%22id%22%3A%22C0%22%2C%22rootCommit%22%3Atrue%7D%2C%22C1%22%3A%7B%22parents%22%3A%5B%22C0%22%5D%2C%22id%22%3A%22C1%22%7D%2C%22C2%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C2%22%7D%2C%22C3%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C3%22%7D%2C%22C4%22%3A%7B%22parents%22%3A%5B%22C3%22%5D%2C%22id%22%3A%22C4%22%7D%2C%22C5%22%3A%7B%22parents%22%3A%5B%22C2%22%2C%22C4%22%5D%2C%22id%22%3A%22C5%22%7D%2C%22C6%22%3A%7B%22parents%22%3A%5B%22C5%22%5D%2C%22id%22%3A%22C6%22%7D%7D%2C%22tags%22%3A%7B%7D%2C%22HEAD%22%3A%7B%22target%22%3A%22main%22%2C%22id%22%3A%22HEAD%22%7D%7D%7D'
    );
  });

  it('pulls with rebase in other weird situation with just fast forward', function() {
    return expectTreeAsync(
      'git clone; git fakeTeamwork; git pull --rebase',
      '{"branches":{"main":{"target":"C2","id":"main","remoteTrackingBranchID":"o/main"},"o/main":{"target":"C2","id":"o/main","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"}},"tags":{},"HEAD":{"target":"main","id":"HEAD"},"originTree":{"branches":{"main":{"target":"C2","id":"main","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"}},"tags":{},"HEAD":{"target":"main","id":"HEAD"}}}'
    );
  });

  /* TODO -- enable this back when we have better async tree compare, it takes too long right now
  it('will correctly resolve the dependency order of commits when fetching or pushing', function() {
    return expectTreeAsync(
      'git clone; git commit; git commit; git commit; git checkout -b test C2; git commit; git checkout main; git push; git checkout main; git merge test; git commit; git push; git checkout test; git commit; git commit; git checkout -b feat1 main; git commit; git merge test; git checkout main; git merge test; git checkout feat1; git commit; git checkout main; git merge feat1; git push',
      '{"branches":{"main":{"target":"C14","id":"main","remoteTrackingBranchID":"o/main"},"o/main":{"target":"C7","id":"o/main","remoteTrackingBranchID":null},"test":{"target":"C9","id":"test","remoteTrackingBranchID":null},"feat1":{"target":"C13","id":"feat1","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"},"C3":{"parents":["C2"],"id":"C3"},"C4":{"parents":["C3"],"id":"C4"},"C5":{"parents":["C2"],"id":"C5"},"C6":{"parents":["C4","C5"],"id":"C6"},"C7":{"parents":["C6"],"id":"C7"},"C8":{"parents":["C5"],"id":"C8"},"C9":{"parents":["C8"],"id":"C9"},"C10":{"parents":["C7"],"id":"C10"},"C11":{"parents":["C10","C9"],"id":"C11"},"C12":{"parents":["C7","C9"],"id":"C12"},"C13":{"parents":["C11"],"id":"C13"},"C14":{"parents":["C12","C13"],"id":"C14"}},"tags":{},"HEAD":{"target":"main","id":"HEAD"},"originTree":{"branches":{"main":{"target":"C7","id":"main","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"},"C3":{"parents":["C2"],"id":"C3"},"C4":{"parents":["C3"],"id":"C4"},"C5":{"parents":["C2"],"id":"C5"},"C6":{"parents":["C4","C5"],"id":"C6"},"C7":{"parents":["C6"],"id":"C7"}},"tags":{},"HEAD":{"target":"main","id":"HEAD"}}}'
    );
  });*/

  it('uses git force to bypass upstream check', function() {
    return expectTreeAsync(
      'git clone; git commit; git push; go C1; git branch -f main C1; go main; git commit; git commit; go C1; git checkout -b side; git commit; go main; git merge side; git push --force',
      '{"branches":{"main":{"target":"C6","id":"main","remoteTrackingBranchID":"o/main"},"o/main":{"target":"C6","id":"o/main","remoteTrackingBranchID":null},"side":{"target":"C5","id":"side","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"},"C3":{"parents":["C1"],"id":"C3"},"C4":{"parents":["C3"],"id":"C4"},"C5":{"parents":["C1"],"id":"C5"},"C6":{"parents":["C4","C5"],"id":"C6"}},"tags":{},"HEAD":{"target":"main","id":"HEAD"},"originTree":{"branches":{"main":{"target":"C6","id":"main","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"},"C5":{"parents":["C1"],"id":"C5"},"C3":{"parents":["C1"],"id":"C3"},"C4":{"parents":["C3"],"id":"C4"},"C6":{"parents":["C4","C5"],"id":"C6"}},"tags":{},"HEAD":{"target":"main","id":"HEAD"}}}'
    );
  });

  it('uses --push to delete commits', function() {
    return expectTreeAsync(
      'git commit; git clone;git reset HEAD~1;git push --force',
      '{"branches":{"main":{"target":"C1","id":"main","remoteTrackingBranchID":"o/main"},"o/main":{"target":"C1","id":"o/main","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"}},"tags":{},"HEAD":{"target":"main","id":"HEAD"},"originTree":{"branches":{"main":{"target":"C1","id":"main","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"}},"tags":{},"HEAD":{"target":"main","id":"HEAD"}}}'
    );
  });

  it('uses --push to delete commits and can push again after', function() {
    return expectTreeAsync(
      'git commit; git clone;git reset HEAD~1;git push --force;git commit; git push ',
      '{"branches":{"main":{"target":"C3","id":"main","remoteTrackingBranchID":"o/main"},"o/main":{"target":"C3","id":"o/main","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"},"C3":{"parents":["C1"],"id":"C3"}},"tags":{},"HEAD":{"target":"main","id":"HEAD"},"originTree":{"branches":{"main":{"target":"C3","id":"main","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"},"C3":{"parents":["C1"],"id":"C3"}},"tags":{},"HEAD":{"target":"main","id":"HEAD"}}}'
    );
  });

  describe('mergeMR/mergePR on remote', function() {
    it('requires a remote', function() {
      return runCommand('git mergeMR', function(commandMsg) {
        expect(commandMsg).toBe(intl.str('git-error-origin-required'));
      });
    });

    it('requires exactly 2 parameters', function() {
      return Q.all([
        runCommand('git clone; git mergeMR', function(commandMsg) {
          expect(commandMsg).toBe(
            intl.str('git-error-args-few', {
              lower: '2',
              what: 'with git mergeMR',
            })
          );
        }),
        runCommand('git clone; git mergeMR feat', function(commandMsg) {
          expect(commandMsg).toBe(
            intl.str('git-error-args-few', {
              lower: '2',
              what: 'with git mergeMR',
            })
          );
        }),
        runCommand('git clone; git mergeMR a b main', function(commandMsg) {
          expect(commandMsg).toBe(
            intl.str('git-error-args-many', {
              upper: '2',
              what: 'with git mergeMR',
            })
          );
        }),
      ]);
    });

    it('merges one remote branch into another', function() {
      return expectTreeAsync(
        `git clone;
        git switch -c feat;
        git commit;
        git push;
        git fakeTeamwork;
        git mergeMR feat main`,
        '{"branches":{"main":{"target":"C1","id":"main","remoteTrackingBranchID":"o/main"},"o/main":{"target":"C1","id":"o/main","remoteTrackingBranchID":null},"feat":{"target":"C2","id":"feat","remoteTrackingBranchID":"o/feat"},"o/feat":{"target":"C2","id":"o/feat","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"}},"tags":{},"HEAD":{"target":"feat","id":"HEAD"},"originTree":{"branches":{"main":{"target":"C4","id":"main","remoteTrackingBranchID":null},"feat":{"target":"C2","id":"feat","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"},"C3":{"parents":["C1"],"id":"C3"},"C4":{"parents":["C3","C2"],"id":"C4"}},"tags":{},"HEAD":{"target":"main","id":"HEAD"}}}'
      );
    });

    it('deletes the merged remote branch after merging', function() {
      return expectTreeAsync(
        `git clone;
        git switch -c feat;
        git commit;
        git push;
        git fakeTeamwork;
        git mergeMR feat main --delete-after-merge`,
        '{"branches":{"main":{"target":"C1","id":"main","remoteTrackingBranchID":"o/main"},"o/main":{"target":"C1","id":"o/main","remoteTrackingBranchID":null},"feat":{"target":"C2","id":"feat","remoteTrackingBranchID":"o/feat"},"o/feat":{"target":"C2","id":"o/feat","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"}},"tags":{},"HEAD":{"target":"feat","id":"HEAD"},"originTree":{"branches":{"main":{"target":"C4","id":"main","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"},"C3":{"parents":["C1"],"id":"C3"},"C4":{"parents":["C3","C2"],"id":"C4"}},"tags":{},"HEAD":{"target":"main","id":"HEAD"}}}'
      );
    });
  });
});
