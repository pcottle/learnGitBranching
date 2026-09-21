"use strict";

var AppConstants = require('../constants/AppConstants');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var manifest = require('../../levels/generated/manifest');
var sequenceInfo = require('../../levels/sequenceInfo').sequenceInfo;
var requireLevel = require('../level/levelModule').requireLevel;
var util = require('../util');

var ActionTypes = AppConstants.ActionTypes;
var SOLVED_MAP_STORAGE_KEY = 'solvedMap';
var ALIAS_STORAGE_KEY = 'aliasMap';
var CERTIFICATE_SEEN_STORAGE_KEY = 'certificateSeen';
var CERTIFICATE_NAME_STORAGE_KEY = 'certificateName';

var _levelMap = {};
var _levelLoaders = {};
var levelSequences = {};
var _solvedMap = {};
var _sequences = [];

if (!util.isBrowser()) {
  // https://stackoverflow.com/a/26177872/6250402
  var storage = {};
  var localStorage = {
    setItem: function(key, value) {
      storage[key] = value || '';
    },
    getItem: function(key) {
      return key in storage ? storage[key] : null;
    },
    removeItem: function(key) {
      delete storage[key];
    },
    get length() {
      return Object.keys(storage).length;
    },
    key: function(i) {
      const keys = Object.keys(storage);
      return keys[i] || null;
    }
  };
} else {
  var localStorage = window.localStorage;
}

try {
  _solvedMap = JSON.parse(
    localStorage.getItem(SOLVED_MAP_STORAGE_KEY) || '{}'
  ) || {};
} catch (e) {
  console.warn('local storage failed', e);
}

function _syncToStorage() {
  try {
    localStorage.setItem(SOLVED_MAP_STORAGE_KEY, JSON.stringify(_solvedMap));
  } catch (e) {
    console.warn('local storage failed on set', e);
  }
}

function _cloneSolvedMap() {
  return JSON.parse(JSON.stringify(_solvedMap));
}

function _normalizeImportedSolvedMap(progress) {
  if (!progress || typeof progress !== 'object' || Array.isArray(progress)) {
    throw new Error('level progress must be a JSON object');
  }

  var normalized = {};
  Object.keys(progress).forEach(function(levelID) {
    var levelData = progress[levelID];

    // Backwards compatibility with the old storage format.
    if (levelData === true) {
      normalized[levelID] = true;
      return;
    }

    if (!levelData || typeof levelData !== 'object' || Array.isArray(levelData)) {
      throw new Error('invalid progress data for level: ' + levelID);
    }

    normalized[levelID] = {
      solved: levelData.solved === true,
      best: levelData.best === true
    };
  });

  return normalized;
}

function exportLevelProgress() {
  return JSON.stringify(_cloneSolvedMap());
}

function importLevelProgress(progress) {
  if (typeof progress === 'string') {
    progress = JSON.parse(progress);
  }

  _solvedMap = _normalizeImportedSolvedMap(progress);
  _syncToStorage();
  LevelStore.emit(AppConstants.CHANGE_EVENT);

  return _cloneSolvedMap();
}

function getAliasMap() {
  try {
    return JSON.parse(localStorage.getItem(ALIAS_STORAGE_KEY) || '{}') || {};
  } catch (e) {
    return {};
  }
}

function addToAliasMap(alias, expansion) {
  const aliasMap = getAliasMap();
  aliasMap[alias] = expansion;
  localStorage.setItem(ALIAS_STORAGE_KEY, JSON.stringify(aliasMap));
}

function removeFromAliasMap(alias) {
  const aliasMap = getAliasMap();
  delete aliasMap[alias];
  localStorage.setItem(ALIAS_STORAGE_KEY, JSON.stringify(aliasMap));
}

/**
 * Whether the completion certificate has already popped up on its own.
 * We only auto-show it the first time somebody clears every level, so that
 * replaying levels afterwards does not nag them.
 * @returns {boolean}
 */
function hasSeenCertificate() {
  try {
    return localStorage.getItem(CERTIFICATE_SEEN_STORAGE_KEY) === 'true';
  } catch (e) {
    return false;
  }
}

function markCertificateSeen() {
  try {
    localStorage.setItem(CERTIFICATE_SEEN_STORAGE_KEY, 'true');
  } catch (e) {
    console.warn('local storage failed on set', e);
  }
}

/**
 * The name typed onto the completion certificate. Keeping the certificate's
 * persisted state together ensures a progress reset can clear it all for the
 * next learner.
 * @returns {string}
 */
function getCertificateName() {
  try {
    return localStorage.getItem(CERTIFICATE_NAME_STORAGE_KEY) || '';
  } catch (e) {
    return '';
  }
}

/**
 * @param {string} name
 */
function setCertificateName(name) {
  try {
    localStorage.setItem(CERTIFICATE_NAME_STORAGE_KEY, name);
  } catch (e) {
    // Not being able to remember the name is not worth bothering anyone about.
  }
}

var validateLevel = function(level) {
  level = level || {};
  var requiredFields = [
    'name',
    'goalTreeString',
    //'description',
    'solutionCommand'
  ];

  requiredFields.forEach(function(field) {
    if (level[field] === undefined) {
      console.log(level);
      throw new Error('I need this field for a level: ' + field);
    }
  });
};

/**
 * Unpack the level manifest. The manifest holds only the lightweight
 * metadata (id / name) needed to render the level map; each level's full
 * definition is code-split and fetched via LevelStore.loadLevel() when the
 * level is actually opened.
 */
Object.keys(manifest.sequences).forEach(function(levelSequenceName) {
  var entries = manifest.sequences[levelSequenceName];
  _sequences.push(levelSequenceName);
  if (!entries || !entries.length) {
    throw new Error('no empty sequences allowed');
  }

  levelSequences[levelSequenceName] = entries.map(function(entry) {
    var compiledLevel = {
      id: entry.id,
      index: entry.index,
      sequenceName: entry.sequenceName || levelSequenceName,
      name: entry.name
    };
    _levelMap[compiledLevel.id] = compiledLevel;
    _levelLoaders[compiledLevel.id] = entry.load;
    return compiledLevel;
  });
});

/**
 * Load only the requested level definition. Keeping this separate from the
 * public loadLevel() prevents a background prefetch from cascading through
 * every remaining level.
 * @param {string} id
 * @returns {Promise<Object|null>}
 */
function loadLevelDefinition(id) {
  var level = _levelMap[id];
  if (!level) { return Promise.resolve(null); }
  if (level.__loaded) { return Promise.resolve(level); }

  var loader = _levelLoaders[id];
  if (!loader) {
    level.__loaded = true;
    return Promise.resolve(level);
  }

  return Promise.resolve().then(loader).then(function(mod) {
    var full = requireLevel(mod, id);
    validateLevel(full);
    Object.assign(level, full, {
      id: level.id,
      index: level.index,
      sequenceName: level.sequenceName
    });
    level.__loaded = true;
    return level;
  });
}

/**
 * Load (or return the already-loaded) full definition for a level ID, then
 * begin warming the next level without delaying the current navigation.
 * Resolves to the same object returned by getLevel(), mutated in place so
 * existing references (the level map, sequences) see the full data.
 * @param {string} id
 * @returns {Promise<Object|null>}
 */
function loadLevel(id) {
  return loadLevelDefinition(id).then(function(level) {
    if (!level) { return level; }

    var nextLevel = LevelStore.getNextLevel(id);
    if (nextLevel) {
      prefetchLevel(nextLevel.id);
    }
    return level;
  });
}

/**
 * Best-effort warm-up of a level's chunk (e.g. the next level, or one the
 * user hovered). Errors are swallowed; they surface if the level is opened.
 * @param {string} id
 * @returns {Promise<Object|undefined>}
 */
function prefetchLevel(id) {
  return loadLevelDefinition(id).catch(function() {
    return undefined;
  });
}

var LevelStore = Object.assign(
{},
EventEmitter.prototype,
AppConstants.StoreSubscribePrototype,
{
  exportLevelProgress: exportLevelProgress,
  importLevelProgress: importLevelProgress,

  getAliasMap: getAliasMap,
  addToAliasMap: addToAliasMap,
  removeFromAliasMap: removeFromAliasMap,

  hasSeenCertificate: hasSeenCertificate,
  markCertificateSeen: markCertificateSeen,
  getCertificateName: getCertificateName,
  setCertificateName: setCertificateName,

  getSequenceToLevels: function() {
    return levelSequences;
  },

  getSequences: function() {
    return Object.keys(levelSequences);
  },

  getLevelsInSequence: function(sequenceName) {
    if (!levelSequences[sequenceName]) {
      throw new Error('that sequence name ' + sequenceName + ' does not exist');
    }
    return levelSequences[sequenceName];
  },

  getSequenceInfo: function(sequenceName) {
    return sequenceInfo[sequenceName];
  },

  getLevel: function(id) {
    return _levelMap[id];
  },

  loadLevel: loadLevel,

  prefetchLevel: prefetchLevel,

  getNextLevel: function(id) {
    if (!_levelMap[id]) {
      console.warn('that level doesn\'t exist!!!');
      return null;
    }

    // meh, this method could be better. It's a trade-off between
    // having the sequence structure be really simple JSON
    // and having no connectivity information between levels, which means
    // you have to build that up yourself on every query
    var level = _levelMap[id];
    var sequenceName = level.sequenceName;
    var sequence = levelSequences[sequenceName];

    var nextIndex = level.index + 1;
    if (nextIndex < sequence.length) {
      return sequence[nextIndex];
    }

    var nextSequenceIndex = _sequences.indexOf(sequenceName) + 1;
    if (nextSequenceIndex < _sequences.length) {
      var nextSequenceName = _sequences[nextSequenceIndex];
      return levelSequences[nextSequenceName][0];
    }

    // they finished the last level!
    return null;
  },

  /**
   * How many levels exist across every sequence.
   * @returns {number}
   */
  getTotalLevelCount: function() {
    return Object.keys(_levelMap).length;
  },

  /**
   * How many distinct levels have been solved.
   * @returns {number}
   */
  getSolvedLevelCount: function() {
    return Object.keys(_levelMap).filter(function(levelID) {
      return LevelStore.isLevelSolved(levelID);
    }).length;
  },

  /**
   * Whether every single level has been solved.
   * @returns {boolean}
   */
  areAllLevelsSolved: function() {
    return LevelStore.getSolvedLevelCount() === LevelStore.getTotalLevelCount();
  },

  isLevelSolved: function(levelID) {
    var levelData = _solvedMap[levelID];
    if (levelData === true) {
      return true;
    }
    return levelData ? levelData.solved === true : false;
  },
  
  
  isLevelBest: function(levelID) {
    var levelData = _solvedMap[levelID];
    return levelData ? levelData.best === true : false;
  },
  
    

  dispatchToken: AppDispatcher.register(function(payload) {
    var action = payload.action;
    var shouldInform = false;

    switch (action.type) {
      case ActionTypes.RESET_LEVELS_SOLVED:
        _solvedMap = {};
        _syncToStorage();
        try {
          localStorage.removeItem(CERTIFICATE_SEEN_STORAGE_KEY);
          localStorage.removeItem(CERTIFICATE_NAME_STORAGE_KEY);
        } catch (e) {
          console.warn('local storage failed on remove', e);
        }
        shouldInform = true;
        break;
      case ActionTypes.SET_LEVEL_SOLVED:       
        _solvedMap[action.levelID] = { solved: true, best: action.best || false };        
        _syncToStorage();
        shouldInform = true;
        break;
    }

    if (shouldInform) {
      LevelStore.emit(AppConstants.CHANGE_EVENT);
    }
  })

});

module.exports = LevelStore;
