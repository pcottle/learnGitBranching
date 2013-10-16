var base = require('./base');
var expectTreeAsync = base.expectTreeAsync;

describe('Git Remotes', function() {
  it('clones', function() {
    expectTreeAsync(
      'git clone',
      '{"branches":{"master":{"target":"C1","id":"master","remoteTrackingBranchID":"o/master"},"o/master":{"target":"C1","id":"o/master","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"}},"HEAD":{"target":"master","id":"HEAD"},"originTree":{"branches":{"master":{"target":"C1","id":"master","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"}},"HEAD":{"target":"master","id":"HEAD"}}}'
    );
  });

  it('does fake teamwork', function() {
    expectTreeAsync(
      'git clone; git fakeTeamwork',
      '{"branches":{"master":{"target":"C1","id":"master","remoteTrackingBranchID":"o/master"},"o/master":{"target":"C1","id":"o/master","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"}},"HEAD":{"target":"master","id":"HEAD"},"originTree":{"branches":{"master":{"target":"C2","id":"master","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"}},"HEAD":{"target":"master","id":"HEAD"}}}'
    );
  });

  it('does fake teamwork and then fetches', function() {
    expectTreeAsync(
      'git clone; git fakeTeamwork; git fetch',
      '{"branches":{"master":{"target":"C1","id":"master","remoteTrackingBranchID":"o/master"},"o/master":{"target":"C2","id":"o/master","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"}},"HEAD":{"target":"master","id":"HEAD"},"originTree":{"branches":{"master":{"target":"C2","id":"master","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"}},"HEAD":{"target":"master","id":"HEAD"}}}'
    );
  });

  it('pulls', function() {
    expectTreeAsync(
      'git clone; git commit; git fakeTeamwork; git pull',
      '{"branches":{"master":{"target":"C4","id":"master","remoteTrackingBranchID":"o/master"},"o/master":{"target":"C3","id":"o/master","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"},"C3":{"parents":["C1"],"id":"C3"},"C4":{"parents":["C2","C3"],"id":"C4"}},"HEAD":{"target":"master","id":"HEAD"},"originTree":{"branches":{"master":{"target":"C3","id":"master","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C3":{"parents":["C1"],"id":"C3"}},"HEAD":{"target":"master","id":"HEAD"}}}'
    );
  });

  it('pulls with rebase', function() {
    expectTreeAsync(
      'git clone; git commit; git fakeTeamwork; git pull --rebase',
      '%7B%22branches%22%3A%7B%22master%22%3A%7B%22target%22%3A%22C2%27%22%2C%22id%22%3A%22master%22%2C%22remoteTrackingBranchID%22%3A%22o/master%22%2C%22localBranchesThatTrackThis%22%3Anull%7D%2C%22o/master%22%3A%7B%22target%22%3A%22C3%22%2C%22id%22%3A%22o/master%22%2C%22remoteTrackingBranchID%22%3Anull%2C%22localBranchesThatTrackThis%22%3A%5B%22master%22%5D%7D%7D%2C%22commits%22%3A%7B%22C0%22%3A%7B%22parents%22%3A%5B%5D%2C%22id%22%3A%22C0%22%2C%22rootCommit%22%3Atrue%7D%2C%22C1%22%3A%7B%22parents%22%3A%5B%22C0%22%5D%2C%22id%22%3A%22C1%22%7D%2C%22C2%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C2%22%7D%2C%22C3%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C3%22%7D%2C%22C2%27%22%3A%7B%22parents%22%3A%5B%22C3%22%5D%2C%22id%22%3A%22C2%27%22%7D%7D%2C%22HEAD%22%3A%7B%22target%22%3A%22master%22%2C%22id%22%3A%22HEAD%22%7D%2C%22originTree%22%3A%7B%22branches%22%3A%7B%22master%22%3A%7B%22target%22%3A%22C3%22%2C%22id%22%3A%22master%22%2C%22remoteTrackingBranchID%22%3Anull%2C%22localBranchesThatTrackThis%22%3Anull%7D%7D%2C%22commits%22%3A%7B%22C0%22%3A%7B%22parents%22%3A%5B%5D%2C%22id%22%3A%22C0%22%2C%22rootCommit%22%3Atrue%7D%2C%22C1%22%3A%7B%22parents%22%3A%5B%22C0%22%5D%2C%22id%22%3A%22C1%22%7D%2C%22C3%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C3%22%7D%7D%2C%22HEAD%22%3A%7B%22target%22%3A%22master%22%2C%22id%22%3A%22HEAD%22%7D%7D%7D'
    );
  });

  it('pushes', function() {
    expectTreeAsync(
      'git clone; git commit; git push',
      '{"branches":{"master":{"target":"C2","id":"master","remoteTrackingBranchID":"o/master"},"o/master":{"target":"C2","id":"o/master","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"}},"HEAD":{"target":"master","id":"HEAD"},"originTree":{"branches":{"master":{"target":"C2","id":"master","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"}},"HEAD":{"target":"master","id":"HEAD"}}}'
    );
  });

  it('pulls and then pushes', function() {
    expectTreeAsync(
      'git clone; git commit; git fakeTeamwork; git pull; git push',
      '{"branches":{"master":{"target":"C4","id":"master","remoteTrackingBranchID":"o/master"},"o/master":{"target":"C4","id":"o/master","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"},"C3":{"parents":["C1"],"id":"C3"},"C4":{"parents":["C2","C3"],"id":"C4"}},"HEAD":{"target":"master","id":"HEAD"},"originTree":{"branches":{"master":{"target":"C4","id":"master","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C3":{"parents":["C1"],"id":"C3"},"C2":{"parents":["C1"],"id":"C2"},"C4":{"parents":["C2","C3"],"id":"C4"}},"HEAD":{"target":"master","id":"HEAD"}}}'
    );
  });

  it('pulls with rebase and then pushes', function() {
    expectTreeAsync(
      'git clone; git commit; git fakeTeamwork; git pull --rebase; git push',
      '%7B%22branches%22%3A%7B%22master%22%3A%7B%22target%22%3A%22C2%27%22%2C%22id%22%3A%22master%22%2C%22remoteTrackingBranchID%22%3A%22o/master%22%2C%22localBranchesThatTrackThis%22%3Anull%7D%2C%22o/master%22%3A%7B%22target%22%3A%22C2%27%22%2C%22id%22%3A%22o/master%22%2C%22remoteTrackingBranchID%22%3Anull%2C%22localBranchesThatTrackThis%22%3A%5B%22master%22%5D%7D%7D%2C%22commits%22%3A%7B%22C0%22%3A%7B%22parents%22%3A%5B%5D%2C%22id%22%3A%22C0%22%2C%22rootCommit%22%3Atrue%7D%2C%22C1%22%3A%7B%22parents%22%3A%5B%22C0%22%5D%2C%22id%22%3A%22C1%22%7D%2C%22C2%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C2%22%7D%2C%22C3%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C3%22%7D%2C%22C2%27%22%3A%7B%22parents%22%3A%5B%22C3%22%5D%2C%22id%22%3A%22C2%27%22%7D%7D%2C%22HEAD%22%3A%7B%22target%22%3A%22master%22%2C%22id%22%3A%22HEAD%22%7D%2C%22originTree%22%3A%7B%22branches%22%3A%7B%22master%22%3A%7B%22target%22%3A%22C2%27%22%2C%22id%22%3A%22master%22%2C%22remoteTrackingBranchID%22%3Anull%2C%22localBranchesThatTrackThis%22%3Anull%7D%7D%2C%22commits%22%3A%7B%22C0%22%3A%7B%22parents%22%3A%5B%5D%2C%22id%22%3A%22C0%22%2C%22rootCommit%22%3Atrue%7D%2C%22C1%22%3A%7B%22parents%22%3A%5B%22C0%22%5D%2C%22id%22%3A%22C1%22%7D%2C%22C3%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C3%22%7D%2C%22C2%27%22%3A%7B%22parents%22%3A%5B%22C3%22%5D%2C%22id%22%3A%22C2%27%22%7D%7D%2C%22HEAD%22%3A%7B%22target%22%3A%22master%22%2C%22id%22%3A%22HEAD%22%7D%7D%7D'
    );
  });

  it('clones with many branches', function() {
    expectTreeAsync(
      'git branch bugFix; git clone',
      '{"branches":{"master":{"target":"C1","id":"master","remoteTrackingBranchID":"o/master"},"bugFix":{"target":"C1","id":"bugFix","remoteTrackingBranchID":"o/bugFix"},"o/master":{"target":"C1","id":"o/master","remoteTrackingBranchID":null},"o/bugFix":{"target":"C1","id":"o/bugFix","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"}},"HEAD":{"target":"master","id":"HEAD"},"originTree":{"branches":{"master":{"target":"C1","id":"master","remoteTrackingBranchID":null},"bugFix":{"target":"C1","id":"bugFix","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"}},"HEAD":{"target":"master","id":"HEAD"}}}'
    );
  });

  it('clones with a merge commit, does teamwork, fetches', function() {
    expectTreeAsync(
      'git branch bugFix; git commit; git checkout bugFix; git commit; git merge master; git clone; git fakeTeamwork bugFix 2',
      '{"branches":{"master":{"target":"C2","id":"master","remoteTrackingBranchID":"o/master"},"bugFix":{"target":"C4","id":"bugFix","remoteTrackingBranchID":"o/bugFix"},"o/master":{"target":"C2","id":"o/master","remoteTrackingBranchID":null},"o/bugFix":{"target":"C4","id":"o/bugFix","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"},"C3":{"parents":["C1"],"id":"C3"},"C4":{"parents":["C2","C3"],"id":"C4"}},"HEAD":{"target":"bugFix","id":"HEAD"},"originTree":{"branches":{"master":{"target":"C2","id":"master","remoteTrackingBranchID":null},"bugFix":{"target":"C6","id":"bugFix","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"},"C3":{"parents":["C1"],"id":"C3"},"C4":{"parents":["C2","C3"],"id":"C4"},"C5":{"parents":["C4"],"id":"C5"},"C6":{"parents":["C5"],"id":"C6"}},"HEAD":{"target":"bugFix","id":"HEAD"}}}'
    );
  });

  it('only fetches one branch if specified', function() {
    expectTreeAsync(
      'git branch bugFix; git clone; git fakeTeamwork bugFix; git fakeTeamwork; git fetch origin bugFix',
      '{"branches":{"master":{"target":"C1","id":"master","remoteTrackingBranchID":"o/master"},"bugFix":{"target":"C1","id":"bugFix","remoteTrackingBranchID":"o/bugFix"},"o/master":{"target":"C1","id":"o/master","remoteTrackingBranchID":null},"o/bugFix":{"target":"C2","id":"o/bugFix","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"}},"HEAD":{"target":"master","id":"HEAD"},"originTree":{"branches":{"master":{"target":"C3","id":"master","remoteTrackingBranchID":null},"bugFix":{"target":"C2","id":"bugFix","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"},"C3":{"parents":["C1"],"id":"C3"}},"HEAD":{"target":"master","id":"HEAD"}}}'
    );
  });

  it('checks all branhces for fetching', function() {
    expectTreeAsync(
      'git branch bugFix; git clone; git fakeTeamwork; git fetch',
      '{"branches":{"master":{"target":"C1","id":"master","remoteTrackingBranchID":"o/master"},"bugFix":{"target":"C1","id":"bugFix","remoteTrackingBranchID":"o/bugFix"},"o/master":{"target":"C2","id":"o/master","remoteTrackingBranchID":null},"o/bugFix":{"target":"C1","id":"o/bugFix","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"}},"HEAD":{"target":"master","id":"HEAD"},"originTree":{"branches":{"master":{"target":"C2","id":"master","remoteTrackingBranchID":null},"bugFix":{"target":"C1","id":"bugFix","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"}},"HEAD":{"target":"master","id":"HEAD"}}}'
    );
  });

  it('pulls with nothing and then commits', function() {
    expectTreeAsync(
      'git clone; git pull; git commit',
      '{"branches":{"master":{"target":"C2","id":"master","remoteTrackingBranchID":"o/master"},"o/master":{"target":"C1","id":"o/master","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"}},"HEAD":{"target":"master","id":"HEAD"},"originTree":{"branches":{"master":{"target":"C1","id":"master","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"}},"HEAD":{"target":"master","id":"HEAD"}}}'
    );
  });

  it('pulls from different remote tracking branches nad merges', function() {
    expectTreeAsync(
      'git branch side; git clone; git fakeTeamwork side;git commit; git pull origin side;git pull;git fakeTeamwork master;git pull',
      '{"branches":{"master":{"target":"C6","id":"master","remoteTrackingBranchID":"o/master"},"side":{"target":"C1","id":"side","remoteTrackingBranchID":"o/side"},"o/master":{"target":"C5","id":"o/master","remoteTrackingBranchID":null},"o/side":{"target":"C2","id":"o/side","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C3":{"parents":["C1"],"id":"C3"},"C2":{"parents":["C1"],"id":"C2"},"C4":{"parents":["C2","C3"],"id":"C4"},"C5":{"parents":["C1"],"id":"C5"},"C6":{"parents":["C4","C5"],"id":"C6"}},"HEAD":{"target":"master","id":"HEAD"},"originTree":{"branches":{"master":{"target":"C5","id":"master","remoteTrackingBranchID":null},"side":{"target":"C2","id":"side","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"},"C5":{"parents":["C1"],"id":"C5"}},"HEAD":{"target":"master","id":"HEAD"}}}'
    );
  });

  it('pulls with rebase from different remote tracking', function() {
    expectTreeAsync(
      'git branch side; git clone; git fakeTeamwork side;git commit; git pull origin side --rebase',
      '%7B%22branches%22%3A%7B%22master%22%3A%7B%22target%22%3A%22C3%27%22%2C%22id%22%3A%22master%22%2C%22remoteTrackingBranchID%22%3A%22o/master%22%7D%2C%22side%22%3A%7B%22target%22%3A%22C1%22%2C%22id%22%3A%22side%22%2C%22remoteTrackingBranchID%22%3A%22o/side%22%7D%2C%22o/master%22%3A%7B%22target%22%3A%22C1%22%2C%22id%22%3A%22o/master%22%2C%22remoteTrackingBranchID%22%3Anull%2C%22localBranchesThatTrackThis%22%3A%5B%22master%22%5D%7D%2C%22o/side%22%3A%7B%22target%22%3A%22C2%22%2C%22id%22%3A%22o/side%22%2C%22remoteTrackingBranchID%22%3Anull%2C%22localBranchesThatTrackThis%22%3A%5B%22side%22%5D%7D%7D%2C%22commits%22%3A%7B%22C0%22%3A%7B%22parents%22%3A%5B%5D%2C%22id%22%3A%22C0%22%2C%22rootCommit%22%3Atrue%7D%2C%22C1%22%3A%7B%22parents%22%3A%5B%22C0%22%5D%2C%22id%22%3A%22C1%22%7D%2C%22C3%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C3%22%7D%2C%22C2%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C2%22%7D%2C%22C3%27%22%3A%7B%22parents%22%3A%5B%22C2%22%5D%2C%22id%22%3A%22C3%27%22%7D%7D%2C%22HEAD%22%3A%7B%22target%22%3A%22master%22%2C%22id%22%3A%22HEAD%22%7D%2C%22originTree%22%3A%7B%22branches%22%3A%7B%22master%22%3A%7B%22target%22%3A%22C1%22%2C%22id%22%3A%22master%22%2C%22remoteTrackingBranchID%22%3Anull%2C%22localBranchesThatTrackThis%22%3Anull%7D%2C%22side%22%3A%7B%22target%22%3A%22C2%22%2C%22id%22%3A%22side%22%2C%22remoteTrackingBranchID%22%3Anull%2C%22localBranchesThatTrackThis%22%3Anull%7D%7D%2C%22commits%22%3A%7B%22C0%22%3A%7B%22parents%22%3A%5B%5D%2C%22id%22%3A%22C0%22%2C%22rootCommit%22%3Atrue%7D%2C%22C1%22%3A%7B%22parents%22%3A%5B%22C0%22%5D%2C%22id%22%3A%22C1%22%7D%2C%22C2%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C2%22%7D%7D%2C%22HEAD%22%3A%7B%22target%22%3A%22side%22%2C%22id%22%3A%22HEAD%22%7D%7D%7D'
    );
  });

  it('pushes to another remote', function() {
    expectTreeAsync(
      'git branch side; git clone;git commit; git push origin HEAD:side',
      '{"branches":{"master":{"target":"C2","id":"master","remoteTrackingBranchID":"o/master"},"side":{"target":"C1","id":"side","remoteTrackingBranchID":"o/side"},"o/master":{"target":"C1","id":"o/master","remoteTrackingBranchID":null,"localBranchesThatTrackThis":["master"]},"o/side":{"target":"C2","id":"o/side","remoteTrackingBranchID":null,"localBranchesThatTrackThis":["side"]}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"}},"HEAD":{"target":"master","id":"HEAD"},"originTree":{"branches":{"master":{"target":"C1","id":"master","remoteTrackingBranchID":null},"side":{"target":"C2","id":"side","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"}},"HEAD":{"target":"master","id":"HEAD"}}}'
    );
  });

  it('pushes to tracking remote', function() {
    expectTreeAsync(
      'git branch side; git clone;git commit;git push; go side; git commit; git push',
      '{"branches":{"master":{"target":"C2","id":"master","remoteTrackingBranchID":"o/master"},"side":{"target":"C3","id":"side","remoteTrackingBranchID":"o/side"},"o/master":{"target":"C2","id":"o/master","remoteTrackingBranchID":null},"o/side":{"target":"C3","id":"o/side","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"},"C3":{"parents":["C1"],"id":"C3"}},"HEAD":{"target":"side","id":"HEAD"},"originTree":{"branches":{"master":{"target":"C2","id":"master","remoteTrackingBranchID":null},"side":{"target":"C3","id":"side","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"},"C3":{"parents":["C1"],"id":"C3"}},"HEAD":{"target":"master","id":"HEAD"}}}'
    );
  });
  
  it('sets tracking when checking out remote branch', function() {
    expectTreeAsync(
      'git clone; git checkout -b side o/master;git fakeTeamwork;git pull',
      '{"branches":{"master":{"target":"C1","id":"master","remoteTrackingBranchID":"o/master"},"o/master":{"target":"C2","id":"o/master","remoteTrackingBranchID":null,"localBranchesThatTrackThis":["master","side"]},"side":{"target":"C2","id":"side","remoteTrackingBranchID":"o/master"}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"}},"HEAD":{"target":"side","id":"HEAD"},"originTree":{"branches":{"master":{"target":"C2","id":"master","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"}},"HEAD":{"target":"master","id":"HEAD"}}}'
    );
  });

  it('also sets tracking when just branching', function() {
    expectTreeAsync(
      'git clone; gb side o/master',
      '{"branches":{"master":{"target":"C1","id":"master","remoteTrackingBranchID":"o/master"},"o/master":{"target":"C1","id":"o/master","remoteTrackingBranchID":null,"localBranchesThatTrackThis":["master","side"]},"side":{"target":"C1","id":"side","remoteTrackingBranchID":"o/master"}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"}},"HEAD":{"target":"master","id":"HEAD"},"originTree":{"branches":{"master":{"target":"C1","id":"master","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"}},"HEAD":{"target":"master","id":"HEAD"}}}'
    );
  });

  it('can push with colon refspec', function() {
    expectTreeAsync(
      'git clone; gc; git checkout -b foo HEAD~1; git push master:master',
      '{"branches":{"master":{"target":"C2","id":"master","remoteTrackingBranchID":"o/master"},"o/master":{"target":"C2","id":"o/master","remoteTrackingBranchID":null},"foo":{"target":"C1","id":"foo","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"}},"HEAD":{"target":"foo","id":"HEAD"},"originTree":{"branches":{"master":{"target":"C2","id":"master","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"}},"HEAD":{"target":"master","id":"HEAD"}}}'
    );
  });

  it('can delete branches with colon refspec', function() {
    expectTreeAsync(
      'git branch foo; git clone; git push :foo',
      '{"branches":{"master":{"target":"C1","id":"master","remoteTrackingBranchID":"o/master"},"foo":{"target":"C1","id":"foo","remoteTrackingBranchID":null},"o/master":{"target":"C1","id":"o/master","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"}},"HEAD":{"target":"master","id":"HEAD"},"originTree":{"branches":{"master":{"target":"C1","id":"master","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"}},"HEAD":{"target":"master","id":"HEAD"}}}'
    );
  });

  it('pushes new branch onto server', function() {
    expectTreeAsync(
      'git clone; git commit; git push origin master:foo',
      '{"branches":{"master":{"target":"C2","id":"master","remoteTrackingBranchID":"o/master"},"o/master":{"target":"C1","id":"o/master","remoteTrackingBranchID":null},"o/foo":{"target":"C2","id":"o/foo","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"}},"HEAD":{"target":"master","id":"HEAD"},"originTree":{"branches":{"master":{"target":"C1","id":"master","remoteTrackingBranchID":null},"foo":{"target":"C2","id":"foo","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"}},"HEAD":{"target":"master","id":"HEAD"}}}'
    );
  });

  it('does not push for HEAD', function() {
    expectTreeAsync(
      'git clone; git commit; git checkout C2; git push',
      '{"branches":{"master":{"target":"C2","id":"master","remoteTrackingBranchID":"o/master"},"o/master":{"target":"C1","id":"o/master","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"}},"HEAD":{"target":"C2","id":"HEAD"},"originTree":{"branches":{"master":{"target":"C1","id":"master","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"}},"HEAD":{"target":"master","id":"HEAD"}}}'
    );
  });

  it('does push for HEAD as a source though to a new branch', function() {
    expectTreeAsync(
      'git clone; git commit; git checkout C2; git push HEAD:foo',
      '{"branches":{"master":{"target":"C2","id":"master","remoteTrackingBranchID":"o/master"},"o/master":{"target":"C1","id":"o/master","remoteTrackingBranchID":null},"o/foo":{"target":"C2","id":"o/foo","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"}},"HEAD":{"target":"C2","id":"HEAD"},"originTree":{"branches":{"master":{"target":"C1","id":"master","remoteTrackingBranchID":null},"foo":{"target":"C2","id":"foo","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"}},"HEAD":{"target":"master","id":"HEAD"}}}'
    );
  });

  it('but it cant delete master on remote', function() {
    expectTreeAsync(
      'git branch foo; git clone; git push :master',
      '{"branches":{"master":{"target":"C1","id":"master","remoteTrackingBranchID":"o/master"},"foo":{"target":"C1","id":"foo","remoteTrackingBranchID":"o/foo"},"o/master":{"target":"C1","id":"o/master","remoteTrackingBranchID":null},"o/foo":{"target":"C1","id":"o/foo","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"}},"HEAD":{"target":"master","id":"HEAD"},"originTree":{"branches":{"master":{"target":"C1","id":"master","remoteTrackingBranchID":null},"foo":{"target":"C1","id":"foo","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"}},"HEAD":{"target":"master","id":"HEAD"}}}'
    );
  });

  it('will prune the origin tree when deleting branches', function() {
    expectTreeAsync(
      'git checkout -b foo; git commit; git clone; git push :foo',
      '{"branches":{"master":{"target":"C1","id":"master","remoteTrackingBranchID":"o/master"},"foo":{"target":"C2","id":"foo","remoteTrackingBranchID":null},"o/master":{"target":"C1","id":"o/master","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"}},"HEAD":{"target":"foo","id":"HEAD"},"originTree":{"branches":{"master":{"target":"C1","id":"master","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"}},"HEAD":{"target":"master","id":"HEAD"}}}'
    );
  });

  it('will not push to a remote if the local ref does not exist', function() {
    expectTreeAsync(
      'git clone; git push origin foo',
      '{"branches":{"master":{"target":"C1","id":"master","remoteTrackingBranchID":"o/master"},"o/master":{"target":"C1","id":"o/master","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"}},"HEAD":{"target":"master","id":"HEAD"},"originTree":{"branches":{"master":{"target":"C1","id":"master","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"}},"HEAD":{"target":"master","id":"HEAD"}}}'
    );
  });

  it('will push to the remote branch IF IT has tracking', function() {
    expectTreeAsync(
      'git clone; git checkout -b foo o/master; git commit; git push',
      '{"branches":{"master":{"target":"C1","id":"master","remoteTrackingBranchID":"o/master"},"o/master":{"target":"C2","id":"o/master","remoteTrackingBranchID":null},"foo":{"target":"C2","id":"foo","remoteTrackingBranchID":"o/master"}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"}},"HEAD":{"target":"foo","id":"HEAD"},"originTree":{"branches":{"master":{"target":"C2","id":"master","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"}},"HEAD":{"target":"master","id":"HEAD"}}}'
    );
  });

  it('will push to a new remote branch if no tracking is set up', function() {
    expectTreeAsync(
      'git clone; git checkout -b foo; git commit; git push',
      '{"branches":{"master":{"target":"C1","id":"master","remoteTrackingBranchID":"o/master"},"o/master":{"target":"C1","id":"o/master","remoteTrackingBranchID":null},"foo":{"target":"C2","id":"foo","remoteTrackingBranchID":"o/foo"},"o/foo":{"target":"C2","id":"o/foo","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"}},"HEAD":{"target":"foo","id":"HEAD"},"originTree":{"branches":{"master":{"target":"C1","id":"master","remoteTrackingBranchID":null},"foo":{"target":"C2","id":"foo","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"}},"HEAD":{"target":"master","id":"HEAD"}}}'
    );
  });

  it('will push to the remote tracking branch WHILE NOT on branch if it is set up', function() {
    expectTreeAsync(
      'git clone; git checkout -b foo o/master; git commit; go master; git push origin foo',
      '{"branches":{"master":{"target":"C1","id":"master","remoteTrackingBranchID":"o/master"},"o/master":{"target":"C2","id":"o/master","remoteTrackingBranchID":null},"foo":{"target":"C2","id":"foo","remoteTrackingBranchID":"o/master"}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"}},"HEAD":{"target":"master","id":"HEAD"},"originTree":{"branches":{"master":{"target":"C2","id":"master","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"}},"HEAD":{"target":"master","id":"HEAD"}}}'
    );
  });

});

