exports.level = {
  id: 'rebase1',
  name: 'Introduction #1',
  goalTreeString: '{"branches":{"master":{"target":"C1","id":"master"},"win":{"target":"C2","id":"win"}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"}},"HEAD":{"target":"win","id":"HEAD"}}',
  solutionCommand: 'git checkout -b win; git commit',
  hint: 'Try checking out a branch named after Charlie Sheen'
};

