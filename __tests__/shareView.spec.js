var LevelActions = require('../src/js/actions/LevelActions');
var LevelStore = require('../src/js/stores/LevelStore');
var shareView = require('../src/js/views/shareView');

describe('shareView helpers', function() {
  afterEach(function() {
    LevelActions.resetLevelsSolved();
  });

  it('reports total, solved, and percent progress', function() {
    LevelActions.resetLevelsSolved();
    var info = shareView.getProgressInfo();

    expect(info.total).toBeGreaterThan(0);
    expect(info.solved).toEqual(0);
    expect(info.percent).toEqual(0);
  });

  it('counts solved levels toward the percentage', function() {
    var sequenceMap = LevelStore.getSequenceToLevels();
    var firstLevel = sequenceMap[Object.keys(sequenceMap)[0]][0];

    LevelActions.setLevelSolved(firstLevel.id, false);
    var info = shareView.getProgressInfo();

    expect(info.solved).toEqual(1);
    expect(info.percent).toEqual(Math.round((1 / info.total) * 100));
  });

  it('builds composer deeplinks that encode the text and url', function() {
    var text = 'I solved "Introduction to Git Commits"!';
    var url = 'https://learngitbranching.js.org';
    var links = shareView.buildDeeplinks(text, url);

    var encodedText = encodeURIComponent(text);
    var encodedUrl = encodeURIComponent(url);

    expect(links.twitter).toContain('twitter.com/intent/tweet');
    expect(links.twitter).toContain(encodedText);
    expect(links.twitter).toContain(encodedUrl);

    expect(links.linkedin).toContain('linkedin.com/sharing/share-offsite');
    expect(links.linkedin).toContain(encodedUrl);

    expect(links.facebook).toContain('facebook.com/sharer');
    expect(links.facebook).toContain(encodedUrl);

    // threads only accepts text, so the url is folded into it
    expect(links.threads).toContain('threads.net/intent/post');
    expect(links.threads).toContain(encodeURIComponent(text + '\n' + url));
  });
});
