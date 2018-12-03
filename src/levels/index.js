var locales = require('../locales');
// Each level is part of a "sequence;" levels within
// a sequence proceed in the order listed here
exports.levelSequences = {
  intro: [
    require('./intro/commits').level,
    require('./intro/branching').level,
    require('./intro/merging').level,
    require('./intro/rebasing').level
  ],
  rampup: [
    require('./rampup/detachedHead').level,
    require('./rampup/relativeRefs').level,
    require('./rampup/relativeRefs2').level,
    require('./rampup/reversingChanges').level
  ],
  move: [
    require('./rampup/cherryPick').level,
    require('./rampup/interactiveRebase').level
  ],
  mixed: [
    require('./mixed/grabbingOneCommit').level,
    require('./mixed/jugglingCommits').level,
    require('./mixed/jugglingCommits2').level,
    require('./mixed/tags').level,
    require('./mixed/describe').level
  ],
  advanced: [
    require('./rebase/manyRebases').level,
    require('./advanced/multipleParents').level,
    require('./rebase/selectiveRebase').level
  ],
  remote: [
    require('./remote/clone').level,
    require('./remote/remoteBranches').level,
    require('./remote/fetch').level,
    require('./remote/pull').level,
    require('./remote/fakeTeamwork').level,
    require('./remote/push').level,
    require('./remote/fetchRebase').level
  ],
  remoteAdvanced: [
    require('./remote/pushManyFeatures').level,
    require('./remote/mergeManyFeatures').level,
    require('./remote/tracking').level,
    require('./remote/pushArgs').level,
    require('./remote/pushArgs2').level,
    require('./remote/fetchArgs').level,
    require('./remote/sourceNothing').level,
    require('./remote/pullArgs').level
  ]
};

// there are also cute names and such for sequences
var sequenceInfo = exports.sequenceInfo = {
  intro: {
    displayName: locales.str('sequence-intro-display'),
    about: locales.str('sequence-intro-about')
  },
  rampup: {
    displayName: locales.str('sequence-rampup-display'),
    about: locales.str('sequence-rampup-about')
  },
  remote: {
    tab: 'remote',
    displayName: locales.str('sequence-remote-display'),
    about: locales.str('sequence-remote-about')
  },
  remoteAdvanced: {
    tab: 'remote',
    displayName: locales.str('sequence-remote-advanced-display'),
    about: locales.str('sequence-remote-advanced-about')
  },
  move: {
    displayName: locales.str('sequence-move-display'),
    about: locales.str('sequence-move-about')
  },
  mixed: {
    displayName: locales.str('sequence-mixed-display'),
    about: locales.str('sequence-mixed-about')
  },
  advanced: {
    displayName: locales.str('sequence-advanced-display'),
    about: locales.str('sequence-advanced-about')
  }
};

exports.getTabForSequence = function(sequenceName) {
  var info = sequenceInfo[sequenceName];
  return (info.tab) ?
    info.tab :
    'main';
};
