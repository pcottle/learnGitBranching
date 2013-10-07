var base = require('./base');
var expectTreeAsync = base.expectTreeAsync;

describe('Git Remotes', function() {
  it('clones', function() {
    expectTreeAsync(
      'git clone',
      '{"branches":{"master":{"target":"C1","id":"master"},"o/master":{"target":"C1","id":"o/master"}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"}},"HEAD":{"target":"master","id":"HEAD"},"originTree":{"branches":{"master":{"remoteTrackingBranchID":null,"localBranchesThatTrackThis":null,"remote":false,"target":"C1","id":"master","type":"branch"}},"commits":{"C0":{"type":"commit","parents":[],"author":"Peter Cottle","createTime":"Sun Sep 01 2013 11:59:29 GMT-0700 (PDT)","commitMessage":"Quick commit. Go Bears!","id":"C0","rootCommit":true},"C1":{"type":"commit","parents":["C0"],"author":"Peter Cottle","createTime":"Sun Sep 01 2013 11:59:29 GMT-0700 (PDT)","commitMessage":"Quick commit. Go Bears!","id":"C1"}},"HEAD":{"target":"master","id":"HEAD","type":"general ref"}}}'
    );
  });

  it('does fake teamwork', function() {
    expectTreeAsync(
      'git clone; git fakeTeamwork',
      '{"branches":{"master":{"target":"C1","id":"master"},"o/master":{"target":"C1","id":"o/master"}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"}},"HEAD":{"target":"master","id":"HEAD"},"originTree":{"branches":{"master":{"target":"C2","id":"master"}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"}},"HEAD":{"target":"master","id":"HEAD"}}}'
    );
  });

  it('does fake teamwork and then fetches', function() {
    expectTreeAsync(
      'git clone; git fakeTeamwork; git fetch',
      '{"branches":{"master":{"target":"C1","id":"master"},"o/master":{"target":"C2","id":"o/master"}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"}},"HEAD":{"target":"master","id":"HEAD"},"originTree":{"branches":{"master":{"target":"C2","id":"master"}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"}},"HEAD":{"target":"master","id":"HEAD"}}}'
    );
  });

  it('pulls', function() {
    expectTreeAsync(
      'git clone; git commit; git fakeTeamwork; git pull',
      '{"branches":{"master":{"target":"C4","id":"master"},"o/master":{"target":"C3","id":"o/master"}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"},"C3":{"parents":["C1"],"id":"C3"},"C4":{"parents":["C2","C3"],"id":"C4"}},"HEAD":{"target":"master","id":"HEAD"},"originTree":{"branches":{"master":{"target":"C3","id":"master"}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C3":{"parents":["C1"],"id":"C3"}},"HEAD":{"target":"master","id":"HEAD"}}}'
    );
  });

  it('pulls with rebase', function() {
    expectTreeAsync(
      'git clone; git commit; git fakeTeamwork; git pull --rebase',
      '%7B%22branches%22%3A%7B%22master%22%3A%7B%22target%22%3A%22C2%27%22%2C%22id%22%3A%22master%22%7D%2C%22o/master%22%3A%7B%22target%22%3A%22C3%22%2C%22id%22%3A%22o/master%22%7D%7D%2C%22commits%22%3A%7B%22C0%22%3A%7B%22parents%22%3A%5B%5D%2C%22id%22%3A%22C0%22%2C%22rootCommit%22%3Atrue%7D%2C%22C1%22%3A%7B%22parents%22%3A%5B%22C0%22%5D%2C%22id%22%3A%22C1%22%7D%2C%22C2%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C2%22%7D%2C%22C3%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C3%22%7D%2C%22C2%27%22%3A%7B%22parents%22%3A%5B%22C3%22%5D%2C%22id%22%3A%22C2%27%22%7D%7D%2C%22HEAD%22%3A%7B%22target%22%3A%22master%22%2C%22id%22%3A%22HEAD%22%7D%2C%22originTree%22%3A%7B%22branches%22%3A%7B%22master%22%3A%7B%22target%22%3A%22C3%22%2C%22id%22%3A%22master%22%7D%7D%2C%22commits%22%3A%7B%22C0%22%3A%7B%22parents%22%3A%5B%5D%2C%22id%22%3A%22C0%22%2C%22rootCommit%22%3Atrue%7D%2C%22C1%22%3A%7B%22parents%22%3A%5B%22C0%22%5D%2C%22id%22%3A%22C1%22%7D%2C%22C3%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C3%22%7D%7D%2C%22HEAD%22%3A%7B%22target%22%3A%22master%22%2C%22id%22%3A%22HEAD%22%7D%7D%7D'
    );
  });

  it('pulls and then pushes', function() {
    expectTreeAsync(
      'git clone; git commit; git fakeTeamwork; git pull; git push',
      '{"branches":{"master":{"target":"C4","id":"master"},"o/master":{"target":"C4","id":"o/master"}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"},"C3":{"parents":["C1"],"id":"C3"},"C4":{"parents":["C2","C3"],"id":"C4"}},"HEAD":{"target":"master","id":"HEAD"},"originTree":{"branches":{"master":{"target":"C4","id":"master"}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C3":{"parents":["C1"],"id":"C3"},"C2":{"parents":["C1"],"id":"C2"},"C4":{"parents":["C2","C3"],"id":"C4"}},"HEAD":{"target":"master","id":"HEAD"}}}'
    );
  });

  it('pulls with rebase and then pushes', function() {
    expectTreeAsync(
      'git clone; git commit; git fakeTeamwork; git pull --rebase; git push',
      '%7B%22branches%22%3A%7B%22master%22%3A%7B%22target%22%3A%22C2%27%22%2C%22id%22%3A%22master%22%7D%2C%22o/master%22%3A%7B%22target%22%3A%22C2%27%22%2C%22id%22%3A%22o/master%22%7D%7D%2C%22commits%22%3A%7B%22C0%22%3A%7B%22parents%22%3A%5B%5D%2C%22id%22%3A%22C0%22%2C%22rootCommit%22%3Atrue%7D%2C%22C1%22%3A%7B%22parents%22%3A%5B%22C0%22%5D%2C%22id%22%3A%22C1%22%7D%2C%22C2%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C2%22%7D%2C%22C3%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C3%22%7D%2C%22C2%27%22%3A%7B%22parents%22%3A%5B%22C3%22%5D%2C%22id%22%3A%22C2%27%22%7D%7D%2C%22HEAD%22%3A%7B%22target%22%3A%22master%22%2C%22id%22%3A%22HEAD%22%7D%2C%22originTree%22%3A%7B%22branches%22%3A%7B%22master%22%3A%7B%22target%22%3A%22C2%27%22%2C%22id%22%3A%22master%22%7D%7D%2C%22commits%22%3A%7B%22C0%22%3A%7B%22parents%22%3A%5B%5D%2C%22id%22%3A%22C0%22%2C%22rootCommit%22%3Atrue%7D%2C%22C1%22%3A%7B%22parents%22%3A%5B%22C0%22%5D%2C%22id%22%3A%22C1%22%7D%2C%22C3%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C3%22%7D%2C%22C2%27%22%3A%7B%22parents%22%3A%5B%22C3%22%5D%2C%22id%22%3A%22C2%27%22%7D%7D%2C%22HEAD%22%3A%7B%22target%22%3A%22master%22%2C%22id%22%3A%22HEAD%22%7D%7D%7D'
    );
  });

  it('clones with many branches', function() {
    expectTreeAsync(
      'git branch bugFix; git clone',
      '{"branches":{"master":{"target":"C1","id":"master"},"bugFix":{"target":"C1","id":"bugFix"},"o/master":{"target":"C1","id":"o/master"},"o/bugFix":{"target":"C1","id":"o/bugFix"}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"}},"HEAD":{"target":"master","id":"HEAD"},"originTree":{"branches":{"master":{"target":"C1","id":"master"},"bugFix":{"target":"C1","id":"bugFix"}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"}},"HEAD":{"target":"master","id":"HEAD"}}}'
    );
  });

  it('clones with a merge commit, does teamwork, fetches', function() {
    expectTreeAsync(
      'git branch bugFix; git commit; git checkout bugFix; git commit; git merge master; git clone; git fakeTeamwork bugFix 2',
      '{"branches":{"master":{"target":"C2","id":"master"},"bugFix":{"target":"C4","id":"bugFix"},"o/master":{"target":"C2","id":"o/master"},"o/bugFix":{"target":"C4","id":"o/bugFix"}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"},"C3":{"parents":["C1"],"id":"C3"},"C4":{"parents":["C2","C3"],"id":"C4"}},"HEAD":{"target":"bugFix","id":"HEAD"},"originTree":{"branches":{"master":{"target":"C2","id":"master"},"bugFix":{"target":"C6","id":"bugFix"}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"},"C3":{"parents":["C1"],"id":"C3"},"C4":{"parents":["C2","C3"],"id":"C4"},"C5":{"parents":["C4"],"id":"C5"},"C6":{"parents":["C5"],"id":"C6"}},"HEAD":{"target":"bugFix","id":"HEAD"}}}'
    );
  });

  it('only fetches one branch if specified', function() {
    expectTreeAsync(
      'git branch bugFix; git clone; git fakeTeamwork bugFix; git fakeTeamwork; git fetch origin bugFix',
      '{"branches":{"master":{"target":"C1","id":"master"},"bugFix":{"target":"C1","id":"bugFix"},"o/master":{"target":"C1","id":"o/master"},"o/bugFix":{"target":"C2","id":"o/bugFix"}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"}},"HEAD":{"target":"master","id":"HEAD"},"originTree":{"branches":{"master":{"target":"C3","id":"master"},"bugFix":{"target":"C2","id":"bugFix"}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"},"C3":{"parents":["C1"],"id":"C3"}},"HEAD":{"target":"master","id":"HEAD"}}}'
    );
  });

  it('checks all branhces for fetching', function() {
    expectTreeAsync(
      'git branch bugFix; git clone; git fakeTeamwork; git fetch',
      '{"branches":{"master":{"target":"C1","id":"master"},"bugFix":{"target":"C1","id":"bugFix"},"o/master":{"target":"C2","id":"o/master"},"o/bugFix":{"target":"C1","id":"o/bugFix"}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"}},"HEAD":{"target":"master","id":"HEAD"},"originTree":{"branches":{"master":{"target":"C2","id":"master"},"bugFix":{"target":"C1","id":"bugFix"}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"}},"HEAD":{"target":"master","id":"HEAD"}}}'
    );
  });

  it('pulls with nothing and then commits', function() {
    expectTreeAsync(
      'git clone; git pull; git commit',
      '{"branches":{"master":{"target":"C2","id":"master"},"o/master":{"target":"C1","id":"o/master"}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"}},"HEAD":{"target":"master","id":"HEAD"},"originTree":{"branches":{"master":{"target":"C1","id":"master"}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"}},"HEAD":{"target":"master","id":"HEAD"}}}'
    );
  });
});

