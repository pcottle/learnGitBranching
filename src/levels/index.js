// Each level is part of a "sequence;" levels within
// a sequence proceed in the order listed here
exports.levelSequences = {
  intro: [
    require('../../levels/intro/1').level
  ],
  rebase: [
    require('../../levels/rebase/1').level
  ]
};

// there are also cute names and such for sequences
exports.sequenceInfo = {
  intro: {
    displayName: 'Introduction Sequence',
    about: 'A nicely paced introduction to the majority of git commands'
  },
  rebase: {
    displayName: 'Master the Rebase Luke!',
    about: 'What is this whole rebase hotness everyone is talking about? Find out!'
  }
};

