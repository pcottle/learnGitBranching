/*
 * Warning!! This is this hackiest goddamn script evarrr. Don't
 * judge :D
 */

var child_process = require('child_process');
var _ = require('underscore');
var Q = require('q');
var intl = require('../intl');

var shouldBegin = Q.defer();
var translateQueue = [];

var translate = function(context, path, key, blob) {
  translateQueue.push({
    context: context,
    path: path,
    key: key,
    blob: blob
  });
};

// CONFIG stuff
var findLevelsCommand = 'find ../../levels -name "*.js"';

var processLevelIndex = function() {
  var path = '../../levels';
  var sequenceInfo = require(path).sequenceInfo;

  var genNameContext = function(sequence) {
    var name = intl.getIntlKey(sequence, 'displayName');
    return [
      'This is a title of a level sequence "' + name + '" ',
      'What is the best translation for that title?'
    ].join('\n');
  };

  var genAboutContext = function(sequence) {
    var name = intl.getIntlKey(sequence, 'displayName');
    var about = intl.getIntlKey(sequence, 'about');
    return [
      'For the level sequence "' + name + '",',
      'the about section is:',
      '~~"' + about + '"',
      '',
      'What is the best translation for the about section?'
    ].join('\n');
  };

  _.each(sequenceInfo, function(sequence) {
    translate(
      genNameContext(sequence),
      path,
      'displayName',
      sequence.displayName
    );

    translate(
      genAboutContext(sequence),
      path,
      'about',
      sequence.about
    );
  });
};

var processLevel = function(levelPath) {
  if (/index.js/.test(levelPath)) {
    return;
  }

  var level = require(levelPath).level;
  // TODO
};

child_process.exec(findLevelsCommand, function(err, output) {
  _.each(output.split('\n'), function(levelPath) {
    if (!levelPath || !levelPath.length) {
      return;
    }

    processLevel(levelPath);
  });

  processLevelIndex();
  shouldBegin.resolve();
});

var printContext = function(queueObj) {
  if (typeof queueObj.context === 'string') {
    console.log(queueObj.context);
  } else {
    var results = queueObj.context();
    if (results) { console.log(results); }
  }
};

var printSeparator = function() {
  var printLn = function() {
    console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
  };

  var printSpace = function(num) {
    num = (num === undefined) ? 1 : num;
    for (var i = 0; i < num; i++) {
      console.log('\n');
    }
  };

  var printRandomEmoji = function() {
    var emojis = [
      ':D',
      '~~~ (> O o)> ~~~~'
    ];

    var index = Math.floor(Math.random() * emojis.length);
    console.log(emojis[index]);
  };

  printLn();
  printSpace(1);
  printRandomEmoji();
  printSpace(1);
  printLn();
};

var printPrompt = function() {
  console.log('(input)>>');
};

var collectInput = function(cb) {
  setTimeout(function() {
    cb('hihi');
  }, 50);
};

var popTranslateQueue = function(queueObj) {
  printSeparator();
  printContext(queueObj);
  printPrompt();

  collectInput(function(input) {
    outputTranslation(queueObj, input);
  });
};

var outputTranslation = function(queueObj, input) {
  console.log(queueObj.blob);
  var path = queueObj.path;
  var needle = queueObj.blob['en_US'];
  console.log('the needle \n', needle, '\n in path', path);
};

shouldBegin.promise
.then(function() {
  _.each(translateQueue, popTranslateQueue);
});


