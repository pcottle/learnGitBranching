// Each level is part of a "sequence;" levels within
// a sequence proceed in the order listed here.
//
// `levelFiles` is the declarative source of truth (module paths only), which
// the build-time manifest generator (scripts/generateLevelManifest.js) reads
// to lazy-load each level on demand in the browser. `levelSequences` keeps
// the old eager shape for Node tooling, tests, and the docs generator.
var levelFiles = exports.levelFiles = {
  intro: [
    './intro/commits',
    './intro/branching',
    './intro/merging',
    './intro/rebasing'
  ],
  rampup: [
    './rampup/detachedHead',
    './rampup/relativeRefs',
    './rampup/relativeRefs2',
    './rampup/reversingChanges'
  ],
  move: [
    './rampup/cherryPick',
    './rampup/interactiveRebase',
    './workingDir/staging',
    './workingDir/restore'
  ],
  mixed: [
    './mixed/grabbingOneCommit',
    './mixed/jugglingCommits',
    './mixed/jugglingCommits2',
    './mixed/tags',
    './mixed/describe'
  ],
  advanced: [
    './rebase/manyRebases',
    './advanced/multipleParents',
    './rebase/selectiveRebase'
  ],
  remote: [
    './remote/clone',
    './remote/remoteBranches',
    './remote/fetch',
    './remote/pull',
    './remote/fakeTeamwork',
    './remote/push',
    './remote/fetchRebase',
    './remote/lockedMain'
  ],
  remoteAdvanced: [
    './remote/pushManyFeatures',
    './remote/mergeManyFeatures',
    './remote/tracking',
    './remote/pushArgs',
    './remote/pushArgs2',
    './remote/fetchArgs',
    './remote/sourceNothing',
    './remote/pullArgs'
  ]
};

exports.levelSequences = Object.keys(levelFiles).reduce(function(acc, sequenceName) {
  acc[sequenceName] = levelFiles[sequenceName].map(function(modulePath) {
    return require(modulePath).level;
  });
  return acc;
}, {});

var sequenceInfoModule = require('./sequenceInfo');
var sequenceInfo = exports.sequenceInfo = sequenceInfoModule.sequenceInfo;
exports.getTabForSequence = sequenceInfoModule.getTabForSequence;
