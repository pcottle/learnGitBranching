
var loadTree = function(json) {
  return JSON.parse(unescape(json));
};

var TIME = 150;
// useful for throwing garbage and then expecting one commit
var oneCommit = '{"branches":{"master":{"target":"C2","id":"master"}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"}},"HEAD":{"target":"master","id":"HEAD"}}';


