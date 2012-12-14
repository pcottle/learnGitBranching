(function(){
var require = function (file, cwd) {
    var resolved = require.resolve(file, cwd || '/');
    var mod = require.modules[resolved];
    if (!mod) throw new Error(
        'Failed to resolve module ' + file + ', tried ' + resolved
    );
    var cached = require.cache[resolved];
    var res = cached? cached.exports : mod();
    return res;
};

require.paths = [];
require.modules = {};
require.cache = {};
require.extensions = [".js",".coffee",".json"];

require._core = {
    'assert': true,
    'events': true,
    'fs': true,
    'path': true,
    'vm': true
};

require.resolve = (function () {
    return function (x, cwd) {
        if (!cwd) cwd = '/';
        
        if (require._core[x]) return x;
        var path = require.modules.path();
        cwd = path.resolve('/', cwd);
        var y = cwd || '/';
        
        if (x.match(/^(?:\.\.?\/|\/)/)) {
            var m = loadAsFileSync(path.resolve(y, x))
                || loadAsDirectorySync(path.resolve(y, x));
            if (m) return m;
        }
        
        var n = loadNodeModulesSync(x, y);
        if (n) return n;
        
        throw new Error("Cannot find module '" + x + "'");
        
        function loadAsFileSync (x) {
            x = path.normalize(x);
            if (require.modules[x]) {
                return x;
            }
            
            for (var i = 0; i < require.extensions.length; i++) {
                var ext = require.extensions[i];
                if (require.modules[x + ext]) return x + ext;
            }
        }
        
        function loadAsDirectorySync (x) {
            x = x.replace(/\/+$/, '');
            var pkgfile = path.normalize(x + '/package.json');
            if (require.modules[pkgfile]) {
                var pkg = require.modules[pkgfile]();
                var b = pkg.browserify;
                if (typeof b === 'object' && b.main) {
                    var m = loadAsFileSync(path.resolve(x, b.main));
                    if (m) return m;
                }
                else if (typeof b === 'string') {
                    var m = loadAsFileSync(path.resolve(x, b));
                    if (m) return m;
                }
                else if (pkg.main) {
                    var m = loadAsFileSync(path.resolve(x, pkg.main));
                    if (m) return m;
                }
            }
            
            return loadAsFileSync(x + '/index');
        }
        
        function loadNodeModulesSync (x, start) {
            var dirs = nodeModulesPathsSync(start);
            for (var i = 0; i < dirs.length; i++) {
                var dir = dirs[i];
                var m = loadAsFileSync(dir + '/' + x);
                if (m) return m;
                var n = loadAsDirectorySync(dir + '/' + x);
                if (n) return n;
            }
            
            var m = loadAsFileSync(x);
            if (m) return m;
        }
        
        function nodeModulesPathsSync (start) {
            var parts;
            if (start === '/') parts = [ '' ];
            else parts = path.normalize(start).split('/');
            
            var dirs = [];
            for (var i = parts.length - 1; i >= 0; i--) {
                if (parts[i] === 'node_modules') continue;
                var dir = parts.slice(0, i + 1).join('/') + '/node_modules';
                dirs.push(dir);
            }
            
            return dirs;
        }
    };
})();

require.alias = function (from, to) {
    var path = require.modules.path();
    var res = null;
    try {
        res = require.resolve(from + '/package.json', '/');
    }
    catch (err) {
        res = require.resolve(from, '/');
    }
    var basedir = path.dirname(res);
    
    var keys = (Object.keys || function (obj) {
        var res = [];
        for (var key in obj) res.push(key);
        return res;
    })(require.modules);
    
    for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        if (key.slice(0, basedir.length + 1) === basedir + '/') {
            var f = key.slice(basedir.length);
            require.modules[to + f] = require.modules[basedir + f];
        }
        else if (key === basedir) {
            require.modules[to] = require.modules[basedir];
        }
    }
};

(function () {
    var process = {};
    var global = typeof window !== 'undefined' ? window : {};
    var definedProcess = false;
    
    require.define = function (filename, fn) {
        if (!definedProcess && require.modules.__browserify_process) {
            process = require.modules.__browserify_process();
            definedProcess = true;
        }
        
        var dirname = require._core[filename]
            ? ''
            : require.modules.path().dirname(filename)
        ;
        
        var require_ = function (file) {
            var requiredModule = require(file, dirname);
            var cached = require.cache[require.resolve(file, dirname)];

            if (cached && cached.parent === null) {
                cached.parent = module_;
            }

            return requiredModule;
        };
        require_.resolve = function (name) {
            return require.resolve(name, dirname);
        };
        require_.modules = require.modules;
        require_.define = require.define;
        require_.cache = require.cache;
        var module_ = {
            id : filename,
            filename: filename,
            exports : {},
            loaded : false,
            parent: null
        };
        
        require.modules[filename] = function () {
            require.cache[filename] = module_;
            fn.call(
                module_.exports,
                require_,
                module_,
                module_.exports,
                dirname,
                filename,
                process,
                global
            );
            module_.loaded = true;
            return module_.exports;
        };
    };
})();


require.define("path",function(require,module,exports,__dirname,__filename,process,global){function filter (xs, fn) {
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (fn(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length; i >= 0; i--) {
    var last = parts[i];
    if (last == '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// Regex to split a filename into [*, dir, basename, ext]
// posix version
var splitPathRe = /^(.+\/(?!$)|\/)?((?:.+?)?(\.[^.]*)?)$/;

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
var resolvedPath = '',
    resolvedAbsolute = false;

for (var i = arguments.length; i >= -1 && !resolvedAbsolute; i--) {
  var path = (i >= 0)
      ? arguments[i]
      : process.cwd();

  // Skip empty and invalid entries
  if (typeof path !== 'string' || !path) {
    continue;
  }

  resolvedPath = path + '/' + resolvedPath;
  resolvedAbsolute = path.charAt(0) === '/';
}

// At this point the path should be resolved to a full absolute path, but
// handle relative paths to be safe (might happen when process.cwd() fails)

// Normalize the path
resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
var isAbsolute = path.charAt(0) === '/',
    trailingSlash = path.slice(-1) === '/';

// Normalize the path
path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }
  
  return (isAbsolute ? '/' : '') + path;
};


// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    return p && typeof p === 'string';
  }).join('/'));
};


exports.dirname = function(path) {
  var dir = splitPathRe.exec(path)[1] || '';
  var isWindows = false;
  if (!dir) {
    // No dirname
    return '.';
  } else if (dir.length === 1 ||
      (isWindows && dir.length <= 3 && dir.charAt(1) === ':')) {
    // It is just a slash or a drive letter with a slash
    return dir;
  } else {
    // It is a full dirname, strip trailing slash
    return dir.substring(0, dir.length - 1);
  }
};


exports.basename = function(path, ext) {
  var f = splitPathRe.exec(path)[2] || '';
  // TODO: make this comparison case-insensitive on windows?
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};


exports.extname = function(path) {
  return splitPathRe.exec(path)[3] || '';
};

});

require.define("__browserify_process",function(require,module,exports,__dirname,__filename,process,global){var process = module.exports = {};

process.nextTick = (function () {
    var canSetImmediate = typeof window !== 'undefined'
        && window.setImmediate;
    var canPost = typeof window !== 'undefined'
        && window.postMessage && window.addEventListener
    ;

    if (canSetImmediate) {
        return function (f) { return window.setImmediate(f) };
    }

    if (canPost) {
        var queue = [];
        window.addEventListener('message', function (ev) {
            if (ev.source === window && ev.data === 'browserify-tick') {
                ev.stopPropagation();
                if (queue.length > 0) {
                    var fn = queue.shift();
                    fn();
                }
            }
        }, true);

        return function nextTick(fn) {
            queue.push(fn);
            window.postMessage('browserify-tick', '*');
        };
    }

    return function nextTick(fn) {
        setTimeout(fn, 0);
    };
})();

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];

process.binding = function (name) {
    if (name === 'evals') return (require)('vm')
    else throw new Error('No such module. (Possibly not yet loaded)')
};

(function () {
    var cwd = '/';
    var path;
    process.cwd = function () { return cwd };
    process.chdir = function (dir) {
        if (!path) path = require('path');
        cwd = path.resolve(dir, cwd);
    };
})();

});

require.define("/animation/index.js",function(require,module,exports,__dirname,__filename,process,global){var GLOBAL = require('../util/constants').GLOBAL;

var Animation = Backbone.Model.extend({
  defaults: {
    duration: 300,
    closure: null
  },

  validateAtInit: function() {
    if (!this.get('closure')) {
      throw new Error('give me a closure!');
    }
  },

  initialize: function(options) {
    this.validateAtInit();
  },

  run: function() {
    this.get('closure')();
  }
});

var AnimationQueue = Backbone.Model.extend({
  defaults: {
    animations: null,
    index: 0,
    callback: null,
    defer: false
  },

  initialize: function(options) {
    this.set('animations', []);
    if (!options.callback) {
      console.warn('no callback');
    }
  },

  add: function(animation) {
    if (!animation instanceof Animation) {
      throw new Error("Need animation not something else");
    }

    this.get('animations').push(animation);
  },

  start: function() {
    this.set('index', 0);

    // set the global lock that we are animating
    GLOBAL.isAnimating = true;
    this.next();
  },

  finish: function() {
    // release lock here
    GLOBAL.isAnimating = false;
    this.get('callback')();
  },

  next: function() {
    // ok so call the first animation, and then set a timeout to call the next
    // TODO: animations with callbacks!!
    var animations = this.get('animations');
    var index = this.get('index');
    if (index >= animations.length) {
      this.finish();
      return;
    }

    var next = animations[index];
    var duration = next.get('duration');

    next.run();

    this.set('index', index + 1);
    setTimeout(_.bind(function() {
      this.next();
    }, this), duration);
  }
});

exports.Animation = Animation;
exports.AnimationQueue = AnimationQueue;


});

require.define("/util/constants.js",function(require,module,exports,__dirname,__filename,process,global){/**
 * Constants....!!!
 */
var TIME = {
  betweenCommandsDelay: 400
};

// useful for locks, etc
var GLOBAL = {
  isAnimating: false
};

var GRAPHICS = {
  arrowHeadSize: 8,

  nodeRadius: 17,
  curveControlPointOffset: 50,
  defaultEasing: 'easeInOut',
  defaultAnimationTime: 400,

  //rectFill: '#FF3A3A',
  rectFill: 'hsb(0.8816909813322127,0.7,1)',
  headRectFill: '#2831FF',
  rectStroke: '#FFF',
  rectStrokeWidth: '3',

  multiBranchY: 20,
  upstreamHeadOpacity: 0.5,
  upstreamNoneOpacity: 0.2,
  edgeUpstreamHeadOpacity: 0.4,
  edgeUpstreamNoneOpacity: 0.15,

  visBranchStrokeWidth: 2,
  visBranchStrokeColorNone: '#333',

  defaultNodeFill: 'hsba(0.5,0.8,0.7,1)',
  defaultNodeStrokeWidth: 2,
  defaultNodeStroke: '#FFF',

  orphanNodeFill: 'hsb(0.5,0.8,0.7)'
};

exports.GLOBAL = GLOBAL;
exports.TIME = TIME;
exports.GRAPHICS = GRAPHICS;


});

require.define("/visuals/index.js",function(require,module,exports,__dirname,__filename,process,global){var Main = require('../app');
var GRAPHICS = require('../util/constants').GRAPHICS;
var GLOBAL = require('../util/constants').GLOBAL;

var Collections = require('../collections');
var CommitCollection = Collections.CommitCollection;
var BranchCollection = Collections.BranchCollection;

var Tree = require('../visuals/tree');
var VisEdgeCollection = Tree.VisEdgeCollection;
var VisBranchCollection = Tree.VisBranchCollection;
var VisNode = Tree.VisNode;
var VisBranch = Tree.VisBranch;
var VisEdge = Tree.VisEdge;

var Visualization = Backbone.View.extend({
  initialize: function(options) {
    var _this = this;
    new Raphael(10, 10, 200, 200, function() {

      // for some reason raphael calls this function with a predefined
      // context...
      // so switch it
      _this.paperInitialize(this);
    });
  },

  paperInitialize: function(paper, options) {
    this.paper = paper;

    this.commitCollection = new CommitCollection();
    this.branchCollection = new BranchCollection();

    this.gitVisuals = new GitVisuals({
      commitCollection: this.commitCollection,
      branchCollection: this.branchCollection,
      paper: this.paper
    });

    var GitEngine = require('../git').GitEngine;
    this.gitEngine = new GitEngine({
      collection: this.commitCollection,
      branches: this.branchCollection,
      gitVisuals: this.gitVisuals
    });
    this.gitEngine.init();
    this.gitVisuals.assignGitEngine(this.gitEngine);

    this.myResize();
    $(window).on('resize', _.bind(this.myResize, this));
    this.gitVisuals.drawTreeFirstTime();
  },

  myResize: function() {
    var smaller = 1;
    var el = this.el;

    var left = el.offsetLeft;
    var top = el.offsetTop;
    var width = el.clientWidth - smaller;
    var height = el.clientHeight - smaller;

    $(this.paper.canvas).css({
      left: left + 'px',
      top: top + 'px'
    });
    this.paper.setSize(width, height);
    this.gitVisuals.canvasResize(width, height);
  }

});

function GitVisuals(options) {
  this.commitCollection = options.commitCollection;
  this.branchCollection = options.branchCollection;
  this.visNodeMap = {};

  this.visEdgeCollection = new VisEdgeCollection();
  this.visBranchCollection = new VisBranchCollection();
  this.commitMap = {};

  this.rootCommit = null;
  this.branchStackMap = null;
  this.upstreamBranchSet = null;
  this.upstreamHeadSet = null;

  this.paper = options.paper;
  this.gitReady = false;

  this.branchCollection.on('add', this.addBranchFromEvent, this);
  this.branchCollection.on('remove', this.removeBranch, this);
  this.deferred = [];

  Main.getEvents().on('refreshTree', _.bind(
    this.refreshTree, this
  ));
}

GitVisuals.prototype.defer = function(action) {
  this.deferred.push(action);
};

GitVisuals.prototype.deferFlush = function() {
  _.each(this.deferred, function(action) {
    action();
  }, this);
  this.deferred = [];
};

GitVisuals.prototype.resetAll = function() {
  // make sure to copy these collections because we remove
  // items in place and underscore is too dumb to detect length change
  var edges = this.visEdgeCollection.toArray();
  _.each(edges, function(visEdge) {
    visEdge.remove();
  }, this);

  var branches = this.visBranchCollection.toArray();
  _.each(branches, function(visBranch) {
    visBranch.remove();
  }, this);

  _.each(this.visNodeMap, function(visNode) {
    visNode.remove();
  }, this);

  this.visEdgeCollection.reset();
  this.visBranchCollection.reset();

  this.visNodeMap = {};
  this.rootCommit = null;
  this.commitMap = {};
};

GitVisuals.prototype.assignGitEngine = function(gitEngine) {
  this.gitEngine = gitEngine;
  this.initHeadBranch();
  this.deferFlush();
};

GitVisuals.prototype.initHeadBranch = function() {
  // it's unfortaunte we have to do this, but the head branch
  // is an edge case because it's not part of a collection so
  // we can't use events to load or unload it. thus we have to call
  // this ugly method which will be deleted one day

  // seed this with the HEAD pseudo-branch
  this.addBranchFromEvent(this.gitEngine.HEAD);
};

GitVisuals.prototype.getScreenBounds = function() {
  // for now we return the node radius subtracted from the walls
  return {
    widthPadding: GRAPHICS.nodeRadius * 1.5,
    heightPadding: GRAPHICS.nodeRadius * 1.5
  };
};

GitVisuals.prototype.toScreenCoords = function(pos) {
  if (!this.paper.width) {
    throw new Error('being called too early for screen coords');
  }
  var bounds = this.getScreenBounds();

  var shrink = function(frac, total, padding) {
    return padding + frac * (total - padding * 2);
  };

  return {
    x: shrink(pos.x, this.paper.width, bounds.widthPadding),
    y: shrink(pos.y, this.paper.height, bounds.heightPadding)
  };
};

GitVisuals.prototype.animateAllFromAttrToAttr = function(fromSnapshot, toSnapshot, idsToOmit) {
  var animate = function(obj) {
    var id = obj.getID();
    if (_.include(idsToOmit, id)) {
      return;
    }

    if (!fromSnapshot[id] || !toSnapshot[id]) {
      // its actually ok it doesnt exist yet
      return;
    }
    obj.animateFromAttrToAttr(fromSnapshot[id], toSnapshot[id]);
  };

  this.visBranchCollection.each(function(visBranch) {
    animate(visBranch);
  });
  this.visEdgeCollection.each(function(visEdge) {
    animate(visEdge);
  });
  _.each(this.visNodeMap, function(visNode) {
    animate(visNode);
  });
};

/***************************************
     == BEGIN Tree Calculation Parts ==
       _  __    __  _
       \\/ /    \ \//_
        \ \     /   __|   __
         \ \___/   /_____/ /
          |        _______ \
          \  ( )   /      \_\
           \      /
            |    |
            |    |
  ____+-_=+-^    ^+-=_=__________

^^ I drew that :D

 **************************************/

GitVisuals.prototype.genSnapshot = function() {
  this.fullCalc();

  var snapshot = {};
  _.each(this.visNodeMap, function(visNode) {
    snapshot[visNode.get('id')] = visNode.getAttributes();
  }, this);

  this.visBranchCollection.each(function(visBranch) {
    snapshot[visBranch.getID()] = visBranch.getAttributes();
  }, this);

  this.visEdgeCollection.each(function(visEdge) {
    snapshot[visEdge.getID()] = visEdge.getAttributes();
  }, this);

  return snapshot;
};

GitVisuals.prototype.refreshTree = function(speed) {
  if (!this.gitReady) {
    return;
  }

  // this method can only be called after graphics are rendered
  this.fullCalc();

  this.animateAll(speed);
};

GitVisuals.prototype.refreshTreeHarsh = function() {
  this.fullCalc();

  this.animateAll(0);
};

GitVisuals.prototype.animateAll = function(speed) {
  this.zIndexReflow();

  this.animateEdges(speed);
  this.animateNodePositions(speed);
  this.animateRefs(speed);
};

GitVisuals.prototype.fullCalc = function() {
  this.calcTreeCoords();
  this.calcGraphicsCoords();
};

GitVisuals.prototype.calcTreeCoords = function() {
  // this method can only contain things that dont rely on graphics
  if (!this.rootCommit) {
    throw new Error('grr, no root commit!');
  }

  this.calcUpstreamSets();
  this.calcBranchStacks();

  this.calcDepth();
  this.calcWidth();
};

GitVisuals.prototype.calcGraphicsCoords = function() {
  this.visBranchCollection.each(function(visBranch) {
    visBranch.updateName();
  });
};

GitVisuals.prototype.calcUpstreamSets = function() {
  this.upstreamBranchSet = this.gitEngine.getUpstreamBranchSet();
  this.upstreamHeadSet = this.gitEngine.getUpstreamHeadSet();
};

GitVisuals.prototype.getCommitUpstreamBranches = function(commit) {
  return this.branchStackMap[commit.get('id')];
};

GitVisuals.prototype.getBlendedHuesForCommit = function(commit) {
  var branches = this.upstreamBranchSet[commit.get('id')];
  if (!branches) {
    throw new Error('that commit doesnt have upstream branches!');
  }

  return this.blendHuesFromBranchStack(branches);
};

GitVisuals.prototype.blendHuesFromBranchStack = function(branchStackArray) {
  var hueStrings = [];
  _.each(branchStackArray, function(branchWrapper) {
    var fill = branchWrapper.obj.get('visBranch').get('fill');

    if (fill.slice(0,3) !== 'hsb') {
      // crap! convert
      var color = Raphael.color(fill);
      fill = 'hsb(' + String(color.h) + ',' + String(color.l);
      fill = fill + ',' + String(color.s) + ')';
    }

    hueStrings.push(fill);
  });

  return blendHueStrings(hueStrings);
};

GitVisuals.prototype.getCommitUpstreamStatus = function(commit) {
  if (!this.upstreamBranchSet) {
    throw new Error("Can't calculate this yet!");
  }

  var id = commit.get('id');
  var branch = this.upstreamBranchSet;
  var head = this.upstreamHeadSet;

  if (branch[id]) {
    return 'branch';
  } else if (head[id]) {
    return 'head';
  } else {
    return 'none';
  }
};

GitVisuals.prototype.calcBranchStacks = function() {
  var branches = this.gitEngine.getBranches();
  var map = {};
  _.each(branches, function(branch) {
    var thisId = branch.target.get('id');

    map[thisId] = map[thisId] || [];
    map[thisId].push(branch);
    map[thisId].sort(function(a, b) {
      var aId = a.obj.get('id');
      var bId = b.obj.get('id');
      if (aId == 'master' || bId == 'master') {
        return aId == 'master' ? -1 : 1;
      }
      return aId.localeCompare(bId);
    });
  });
  this.branchStackMap = map;
};

GitVisuals.prototype.calcWidth = function() {
  this.maxWidthRecursive(this.rootCommit);

  this.assignBoundsRecursive(this.rootCommit, 0, 1);
};

GitVisuals.prototype.maxWidthRecursive = function(commit) {
  var childrenTotalWidth = 0;
  _.each(commit.get('children'), function(child) {
    // only include this if we are the "main" parent of
    // this child
    if (child.isMainParent(commit)) {
      var childWidth = this.maxWidthRecursive(child);
      childrenTotalWidth += childWidth;
    }
  }, this);

  var maxWidth = Math.max(1, childrenTotalWidth);
  commit.get('visNode').set('maxWidth', maxWidth);
  return maxWidth;
};

GitVisuals.prototype.assignBoundsRecursive = function(commit, min, max) {
  // I always center myself within my bounds
  var myWidthPos = (min + max) / 2.0;
  commit.get('visNode').get('pos').x = myWidthPos;

  if (commit.get('children').length === 0) {
    return;
  }

  // i have a certain length to divide up
  var myLength = max - min;
  // I will divide up that length based on my children's max width in a
  // basic box-flex model
  var totalFlex = 0;
  var children = commit.get('children');
  _.each(children, function(child) {
    if (child.isMainParent(commit)) {
      totalFlex += child.get('visNode').getMaxWidthScaled();
    }
  }, this);

  var prevBound = min;

  // now go through and do everything
  // TODO: order so the max width children are in the middle!!
  _.each(children, function(child) {
    if (!child.isMainParent(commit)) {
      return;
    }

    var flex = child.get('visNode').getMaxWidthScaled();
    var portion = (flex / totalFlex) * myLength;
    var childMin = prevBound;
    var childMax = childMin + portion;
    this.assignBoundsRecursive(child, childMin, childMax);
    prevBound = childMax;
  }, this);
};

GitVisuals.prototype.calcDepth = function() {
  var maxDepth = this.calcDepthRecursive(this.rootCommit, 0);
  if (maxDepth > 15) {
    // issue warning
    console.warn('graphics are degrading from too many layers');
  }

  var depthIncrement = this.getDepthIncrement(maxDepth);
  _.each(this.visNodeMap, function(visNode) {
    visNode.setDepthBasedOn(depthIncrement);
  }, this);
};

/***************************************
     == END Tree Calculation ==
       _  __    __  _
       \\/ /    \ \//_
        \ \     /   __|   __
         \ \___/   /_____/ /
          |        _______ \
          \  ( )   /      \_\
           \      /
            |    |
            |    |
  ____+-_=+-^    ^+-=_=__________

^^ I drew that :D

 **************************************/

GitVisuals.prototype.animateNodePositions = function(speed) {
  _.each(this.visNodeMap, function(visNode) {
    visNode.animateUpdatedPosition(speed);
  }, this);
};

GitVisuals.prototype.turnOnPaper = function() {
  this.gitReady = false;
};

// does making an accessor method make it any less hacky? that is the true question
GitVisuals.prototype.turnOffPaper = function() {
  this.gitReady = true;
};

GitVisuals.prototype.addBranchFromEvent = function(branch, collection, index) {
  var action = _.bind(function() {
    this.addBranch(branch);
  }, this);

  if (!this.gitEngine || !this.gitReady) {
    this.defer(action);
  } else {
    action();
  }
};

GitVisuals.prototype.addBranch = function(branch) {
  var visBranch = new VisBranch({
    branch: branch,
    gitVisuals: this,
    gitEngine: this.gitEngine
  });

  this.visBranchCollection.add(visBranch);
  if (this.gitReady) {
    visBranch.genGraphics(this.paper);
  }
};

GitVisuals.prototype.removeVisBranch = function(visBranch) {
  this.visBranchCollection.remove(visBranch);
};

GitVisuals.prototype.removeVisNode = function(visNode) {
  this.visNodeMap[visNode.getID()] = undefined;
};

GitVisuals.prototype.removeVisEdge = function(visEdge) {
  this.visEdgeCollection.remove(visEdge);
};

GitVisuals.prototype.animateRefs = function(speed) {
  this.visBranchCollection.each(function(visBranch) {
    visBranch.animateUpdatedPos(speed);
  }, this);
};

GitVisuals.prototype.animateEdges = function(speed) {
  this.visEdgeCollection.each(function(edge) {
    edge.animateUpdatedPath(speed);
  }, this);
};

GitVisuals.prototype.getDepthIncrement = function(maxDepth) {
  // assume there are at least 7 layers until later
  maxDepth = Math.max(maxDepth, 7);
  var increment = 1.0 / maxDepth;
  return increment;
};

GitVisuals.prototype.calcDepthRecursive = function(commit, depth) {
  commit.get('visNode').setDepth(depth);

  var children = commit.get('children');
  var maxDepth = depth;
  _.each(children, function(child) {
    var d = this.calcDepthRecursive(child, depth + 1);
    maxDepth = Math.max(d, maxDepth);
  }, this);

  return maxDepth;
};

// we debounce here so we aren't firing a resize call on every resize event
// but only after they stop
GitVisuals.prototype.canvasResize = _.debounce(function(width, height) {
  // refresh when we are ready
  if (GLOBAL.isAnimating) {
    Main.getEvents().trigger('processCommandFromEvent', 'refresh');
  } else {
    this.refreshTree();
  }
}, 200);

GitVisuals.prototype.addNode = function(id, commit) {
  this.commitMap[id] = commit;
  if (commit.get('rootCommit')) {
    this.rootCommit = commit;
  }

  var visNode = new VisNode({
    id: id,
    commit: commit,
    gitVisuals: this,
    gitEngine: this.gitEngine
  });
  this.visNodeMap[id] = visNode;

  if (this.gitReady) {
    visNode.genGraphics(this.paper);
  }
  return visNode;
};

GitVisuals.prototype.addEdge = function(idTail, idHead) {
  var visNodeTail = this.visNodeMap[idTail];
  var visNodeHead = this.visNodeMap[idHead];

  if (!visNodeTail || !visNodeHead) {
    throw new Error('one of the ids in (' + idTail +
                    ', ' + idHead + ') does not exist');
  }

  var edge = new VisEdge({
    tail: visNodeTail,
    head: visNodeHead,
    gitVisuals: this,
    gitEngine: this.gitEngine
  });
  this.visEdgeCollection.add(edge);

  if (this.gitReady) {
    edge.genGraphics(this.paper);
  }
};

GitVisuals.prototype.collectionChanged = function() {
  // TODO ?
};

GitVisuals.prototype.zIndexReflow = function() {
  this.visNodesFront();
  this.visBranchesFront();
};

GitVisuals.prototype.visNodesFront = function() {
  _.each(this.visNodeMap, function(visNode) {
    visNode.toFront();
  });
};

GitVisuals.prototype.visBranchesFront = function() {
  this.visBranchCollection.each(function(vBranch) {
    vBranch.nonTextToFront();
  });

  this.visBranchCollection.each(function(vBranch) {
    vBranch.textToFront();
  });
};

GitVisuals.prototype.drawTreeFromReload = function() {
  this.gitReady = true;
  // gen all the graphics we need
  this.deferFlush();

  this.calcTreeCoords();
};

GitVisuals.prototype.drawTreeFirstTime = function() {
  this.gitReady = true;
  this.calcTreeCoords();

  _.each(this.visNodeMap, function(visNode) {
    visNode.genGraphics(this.paper);
  }, this);

  this.visEdgeCollection.each(function(edge) {
    edge.genGraphics(this.paper);
  }, this);

  this.visBranchCollection.each(function(visBranch) {
    visBranch.genGraphics(this.paper);
  }, this);

  this.zIndexReflow();
};


/************************
 * Random util functions, some from liquidGraph
 ***********************/
function blendHueStrings(hueStrings) {
  // assumes a sat of 0.7 and brightness of 1

  var x = 0;
  var y = 0;
  var totalSat = 0;
  var totalBright = 0;
  var length = hueStrings.length;

  _.each(hueStrings, function(hueString) {
    var exploded = hueString.split('(')[1];
    exploded = exploded.split(')')[0];
    exploded = exploded.split(',');

    totalSat += parseFloat(exploded[1]);
    totalBright += parseFloat(exploded[2]);
    var hue = parseFloat(exploded[0]);

    var angle = hue * Math.PI * 2;
    x += Math.cos(angle);
    y += Math.sin(angle);
  });

  x = x / length;
  y = y / length;
  totalSat = totalSat / length;
  totalBright = totalBright / length;

  var hue = Math.atan2(y, x) / (Math.PI * 2); // could fail on 0's
  if (hue < 0) {
    hue = hue + 1;
  }
  return 'hsb(' + String(hue) + ',' + String(totalSat) + ',' + String(totalBright) + ')';
}

exports.Visualization = Visualization;


});

require.define("/app/index.js",function(require,module,exports,__dirname,__filename,process,global){/**
 * Globals
 */
var events = _.clone(Backbone.Events);
var ui = null;
var mainVis = null;

///////////////////////////////////////////////////////////////////////

$(document).ready(function(){
  var Visuals = require('../visuals');

  ui = new UI();
  mainVis = new Visuals.Visualization({
    el: $('#canvasWrapper')[0]
  });

  if (/\?demo/.test(window.location.href)) {
    setTimeout(function() {
      events.trigger('submitCommandValueFromEvent', "gc; git checkout HEAD~1; git commit; git checkout -b bugFix; gc; gc; git rebase master; git checkout master; gc; gc; git merge bugFix");
    }, 500);
  }
});

function UI() {
  var Collections = require('../collections');
  var CommandViews = require('../views/commandViews');

  this.commandCollection = new Collections.CommandCollection();

  this.commandBuffer = new Collections.CommandBuffer({
    collection: this.commandCollection
  });

  this.commandPromptView = new CommandViews.CommandPromptView({
    el: $('#commandLineBar'),
    collection: this.commandCollection
  });
  this.commandLineHistoryView = new CommandViews.CommandLineHistoryView({
    el: $('#commandLineHistory'),
    collection: this.commandCollection
  });

  $('#commandTextField').focus();
}

exports.getEvents = function() {
  return events;
};
exports.getUI = function() {
  return ui;
};


});

require.define("/collections/index.js",function(require,module,exports,__dirname,__filename,process,global){var Commit = require('../git').Commit;
var Branch = require('../git').Branch;

var Main = require('../app');
var Command = require('../models/commandModel').Command;
var CommandEntry = require('../models/commandModel').CommandEntry;
var TIME = require('../util/constants').TIME;

var CommitCollection = Backbone.Collection.extend({
  model: Commit
});

var CommandCollection = Backbone.Collection.extend({
  model: Command
});

var BranchCollection = Backbone.Collection.extend({
  model: Branch
});

var CommandEntryCollection = Backbone.Collection.extend({
  model: CommandEntry,
  localStorage: new Backbone.LocalStorage('CommandEntries')
});

var CommandBuffer = Backbone.Model.extend({
  defaults: {
    collection: null
  },

  initialize: function(options) {
    require('../app').getEvents().on('gitCommandReady', _.bind(
      this.addCommand, this
    ));

    options.collection.bind('add', this.addCommand, this);

    this.buffer = [];
    this.timeout = null;
  },

  addCommand: function(command) {
    this.buffer.push(command);
    this.touchBuffer();
  },

  touchBuffer: function() {
    // touch buffer just essentially means we just check if our buffer is being
    // processed. if it's not, we immediately process the first item
    // and then set the timeout.
    if (this.timeout) {
      // timeout existence implies its being processed
      return;
    }
    this.setTimeout();
  },


  setTimeout: function() {
    this.timeout = setTimeout(_.bind(function() {
        this.sipFromBuffer();
    }, this), TIME.betweenCommandsDelay);
  },

  popAndProcess: function() {
    var popped = this.buffer.shift(0);
    var callback = _.bind(function() {
      this.setTimeout();
    }, this);

    // find a command with no error
    while (popped.get('error') && this.buffer.length) {
      popped = this.buffer.pop();
    }
    if (!popped.get('error')) {
      // pass in a callback, so when this command is "done" we will process the next.
      Main.getEvents().trigger('processCommand', popped, callback);
    } else {
      this.clear();
    }
  },

  clear: function() {
    clearTimeout(this.timeout);
    this.timeout = null;
  },

  sipFromBuffer: function() {
    if (!this.buffer.length) {
      this.clear();
      return;
    }

    this.popAndProcess();
  }
});

exports.CommitCollection = CommitCollection;
exports.CommandCollection = CommandCollection;
exports.BranchCollection = BranchCollection;
exports.CommandEntryCollection = CommandEntryCollection;
exports.CommandBuffer = CommandBuffer;


});

require.define("/git/index.js",function(require,module,exports,__dirname,__filename,process,global){var AnimationFactoryModule = require('../animation/animationFactory');
var animationFactory = new AnimationFactoryModule.AnimationFactory();
var Main = require('../app');
var AnimationQueue = require('../animation').AnimationQueue;
var InteractiveRebaseView = require('../views/miscViews').InteractiveRebaseView;

var Errors = require('../util/errors');
var GitError = Errors.GitError;
var CommandResult = Errors.CommandResult;

// backbone or something uses _.uniqueId, so we make our own here
var uniqueId = (function() {
  var n = 0;
  return function(prepend) {
    return prepend? prepend + n++ : n++;
  };
})();

function GitEngine(options) {
  this.rootCommit = null;
  this.refs = {};
  this.HEAD = null;

  this.branchCollection = options.branches;
  this.commitCollection = options.collection;
  this.gitVisuals = options.gitVisuals;

  // global variable to keep track of the options given
  // along with the command call.
  this.commandOptions = {};
  this.generalArgs = [];

  Main.getEvents().on('processCommand', _.bind(this.dispatch, this));
}

GitEngine.prototype.defaultInit = function() {
  var defaultTree = JSON.parse(unescape("%7B%22branches%22%3A%7B%22master%22%3A%7B%22target%22%3A%22C1%22%2C%22id%22%3A%22master%22%2C%22type%22%3A%22branch%22%7D%7D%2C%22commits%22%3A%7B%22C0%22%3A%7B%22type%22%3A%22commit%22%2C%22parents%22%3A%5B%5D%2C%22author%22%3A%22Peter%20Cottle%22%2C%22createTime%22%3A%22Mon%20Nov%2005%202012%2000%3A56%3A47%20GMT-0800%20%28PST%29%22%2C%22commitMessage%22%3A%22Quick%20Commit.%20Go%20Bears%21%22%2C%22id%22%3A%22C0%22%2C%22rootCommit%22%3Atrue%7D%2C%22C1%22%3A%7B%22type%22%3A%22commit%22%2C%22parents%22%3A%5B%22C0%22%5D%2C%22author%22%3A%22Peter%20Cottle%22%2C%22createTime%22%3A%22Mon%20Nov%2005%202012%2000%3A56%3A47%20GMT-0800%20%28PST%29%22%2C%22commitMessage%22%3A%22Quick%20Commit.%20Go%20Bears%21%22%2C%22id%22%3A%22C1%22%7D%7D%2C%22HEAD%22%3A%7B%22id%22%3A%22HEAD%22%2C%22target%22%3A%22master%22%2C%22type%22%3A%22general%20ref%22%7D%7D"));
  this.loadTree(defaultTree);
};

GitEngine.prototype.init = function() {
  // make an initial commit and a master branch
  this.rootCommit = this.makeCommit(null, null, {rootCommit: true});
  this.commitCollection.add(this.rootCommit);

  var master = this.makeBranch('master', this.rootCommit);
  this.HEAD = new Ref({
    id: 'HEAD',
    target: master
  });
  this.refs[this.HEAD.get('id')] = this.HEAD;

  // commit once to get things going
  this.commit();
};

GitEngine.prototype.exportTree = function() {
  // need to export all commits, their connectivity / messages, branches, and state of head.
  // this would be simple if didn't have circular structures.... :P
  // thus, we need to loop through and "flatten" our graph of objects referencing one another
  var totalExport = {
    branches: {},
    commits: {},
    HEAD: null
  };

  _.each(this.branchCollection.toJSON(), function(branch) {
    branch.target = branch.target.get('id');
    branch.visBranch = undefined;

    totalExport.branches[branch.id] = branch;
  });

  _.each(this.commitCollection.toJSON(), function(commit) {
    // clear out the fields that reference objects and create circular structure
    _.each(Commit.prototype.constants.circularFields, function(field) {
      commit[field] = undefined;
    }, this);

    // convert parents
    var parents = [];
    _.each(commit.parents, function(par) {
      parents.push(par.get('id'));
    });
    commit.parents = parents;

    totalExport.commits[commit.id] = commit;
  }, this);

  var HEAD = this.HEAD.toJSON();
  HEAD.visBranch = undefined;
  HEAD.lastTarget = HEAD.lastLastTarget = HEAD.visBranch = undefined;
  HEAD.target = HEAD.target.get('id');
  totalExport.HEAD = HEAD;

  return totalExport;
};

GitEngine.prototype.printTree = function() {
  var str = escape(JSON.stringify(this.exportTree()));
  return str;
};

GitEngine.prototype.printAndCopyTree = function() {
  window.prompt('Copy the tree string below', this.printTree());
};

GitEngine.prototype.loadTree = function(tree) {
  // deep copy in case we use it a bunch
  tree = $.extend(true, {}, tree);

  // first clear everything
  this.removeAll();

  this.instantiateFromTree(tree);

  this.reloadGraphics();
};

GitEngine.prototype.loadTreeFromString = function(treeString) {
  this.loadTree(JSON.parse(unescape(treeString)));
};

GitEngine.prototype.instantiateFromTree = function(tree) {
  // now we do the loading part
  var createdSoFar = {};

  _.each(tree.commits, function(commitJSON) {
    var commit = this.getOrMakeRecursive(tree, createdSoFar, commitJSON.id);
    this.commitCollection.add(commit);
  }, this);

  _.each(tree.branches, function(branchJSON) {
    var branch = this.getOrMakeRecursive(tree, createdSoFar, branchJSON.id);

    this.branchCollection.add(branch, {silent: true});
  }, this);

  var HEAD = this.getOrMakeRecursive(tree, createdSoFar, tree.HEAD.id);
  this.HEAD = HEAD;

  this.rootCommit = createdSoFar['C0'];
  if (!this.rootCommit) {
    throw new Error('Need root commit of C0 for calculations');
  }
  this.refs = createdSoFar;

  this.branchCollection.each(function(branch) {
    this.gitVisuals.addBranch(branch);
  }, this);
};

GitEngine.prototype.reloadGraphics = function() {
  // get the root commit, no better way to do it
  var rootCommit = null;
  this.commitCollection.each(function(commit) {
    if (commit.get('id') == 'C0') {
      rootCommit = commit;
    }
  });
  this.gitVisuals.rootCommit = rootCommit;

  // this just basically makes the HEAD branch. the head branch really should have been
  // a member of a collection and not this annoying edge case stuff... one day
  this.gitVisuals.initHeadBranch();

  // when the paper is ready
  this.gitVisuals.drawTreeFromReload();

  this.gitVisuals.refreshTreeHarsh();
};

GitEngine.prototype.getOrMakeRecursive = function(tree, createdSoFar, objID) {
  if (createdSoFar[objID]) {
    // base case
    return createdSoFar[objID];
  }

  var getType = function(tree, id) {
    if (tree.commits[id]) {
      return 'commit';
    } else if (tree.branches[id]) {
      return 'branch';
    } else if (id == 'HEAD') {
      return 'HEAD';
    }
    throw new Error("bad type for " + id);
  };

  // figure out what type
  var type = getType(tree, objID);

  if (type == 'HEAD') {
    var headJSON = tree.HEAD;
    var HEAD = new Ref(_.extend(
      tree.HEAD,
      {
        target: this.getOrMakeRecursive(tree, createdSoFar, headJSON.target)
      }
    ));
    createdSoFar[objID] = HEAD;
    return HEAD;
  }

  if (type == 'branch') {
    var branchJSON = tree.branches[objID];

    var branch = new Branch(_.extend(
      tree.branches[objID],
      {
        target: this.getOrMakeRecursive(tree, createdSoFar, branchJSON.target)
      }
    ));
    createdSoFar[objID] = branch;
    return branch;
  }

  if (type == 'commit') {
    // for commits, we need to grab all the parents
    var commitJSON = tree.commits[objID];

    var parentObjs = [];
    _.each(commitJSON.parents, function(parentID) {
      parentObjs.push(this.getOrMakeRecursive(tree, createdSoFar, parentID));
    }, this);

    var commit = new Commit(_.extend(
      commitJSON,
      {
        parents: parentObjs,
        gitVisuals: this.gitVisuals
      }
    ));
    createdSoFar[objID] = commit;
    return commit;
  }

  throw new Error('ruh rho!! unsupported tyep for ' + objID);
};

GitEngine.prototype.removeAll = function() {
  this.branchCollection.reset();
  this.commitCollection.reset();
  this.refs = {};
  this.HEAD = null;
  this.rootCommit = null;

  this.gitVisuals.resetAll();
};

GitEngine.prototype.getDetachedHead = function() {
  // detached head is if HEAD points to a commit instead of a branch...
  var target = this.HEAD.get('target');
  var targetType = target.get('type');
  return targetType !== 'branch';
};

GitEngine.prototype.validateBranchName = function(name) {
  name = name.replace(/\s/g, '');
  if (!/^[a-zA-Z0-9]+$/.test(name)) {
    throw new GitError({
      msg: 'woah bad branch name!! This is not ok: ' + name
    });
  }
  if (/[hH][eE][aA][dD]/.test(name)) {
    throw new GitError({
      msg: 'branch name of "head" is ambiguous, dont name it that'
    });
  }
  if (name.length > 9) {
    name = name.slice(0, 9);
    this.command.addWarning(
      'Sorry, we need to keep branch names short for the visuals. Your branch ' +
      'name was truncated to 9 characters, resulting in ' + name
    );
  }
  return name;
};

GitEngine.prototype.makeBranch = function(id, target) {
  id = this.validateBranchName(id);
  if (this.refs[id]) {
    throw new GitError({
      msg: 'that branch id either matches a commit hash or already exists!'
    });
  }

  var branch = new Branch({
    target: target,
    id: id
  });
  this.branchCollection.add(branch);
  this.refs[branch.get('id')] = branch;
  return branch;
};

GitEngine.prototype.getHead = function() {
  return _.clone(this.HEAD);
};

GitEngine.prototype.getBranches = function() {
  var toReturn = [];
  this.branchCollection.each(function(branch) {
    toReturn.push({
      id: branch.get('id'),
      selected: this.HEAD.get('target') === branch,
      target: branch.get('target'),
      obj: branch
    });
  }, this);
  return toReturn;
};

GitEngine.prototype.printBranchesWithout = function(without) {
  var commitToBranches = this.getUpstreamBranchSet();
  var commitID = this.getCommitFromRef(without).get('id');

  var toPrint = [];
  _.each(commitToBranches[commitID], function(branchJSON) {
    branchJSON.selected = this.HEAD.get('target').get('id') == branchJSON.id;
    toPrint.push(branchJSON);
  }, this);
  this.printBranches(toPrint);
};

GitEngine.prototype.printBranches = function(branches) {
  var result = '';
  _.each(branches, function(branch) {
    result += (branch.selected ? '* ' : '') + branch.id + '\n';
  });
  throw new CommandResult({
    msg: result
  });
};

GitEngine.prototype.makeCommit = function(parents, id, options) {
  // ok we need to actually manually create commit IDs now because
  // people like nikita (thanks for finding this!) could
  // make branches named C2 before creating the commit C2
  if (!id) {
    id = uniqueId('C');
    while (this.refs[id]) {
      id = uniqueId('C');
    }
  }

  var commit = new Commit(_.extend({
      parents: parents,
      id: id,
      gitVisuals: this.gitVisuals
    },
    options || {}
  ));

  this.refs[commit.get('id')] = commit;
  this.commitCollection.add(commit);
  return commit;
};

GitEngine.prototype.acceptNoGeneralArgs = function() {
  if (this.generalArgs.length) {
    throw new GitError({
      msg: "That command accepts no general arguments"
    });
  }
};

GitEngine.prototype.validateArgBounds = function(args, lower, upper, option) {
  // this is a little utility class to help arg validation that happens over and over again
  var what = (option === undefined) ?
    'git ' + this.command.get('method') :
    this.command.get('method') + ' ' + option + ' ';
  what = 'with ' + what;

  if (args.length < lower) {
    throw new GitError({
      msg: 'I expect at least ' + String(lower) + ' argument(s) ' + what
    });
  }
  if (args.length > upper) {
    throw new GitError({
      msg: 'I expect at most ' + String(upper) + ' argument(s) ' + what
    });
  }
};

GitEngine.prototype.oneArgImpliedHead = function(args, option) {
  // for log, show, etc
  this.validateArgBounds(args, 0, 1, option);
  if (args.length === 0) {
    args.push('HEAD');
  }
};

GitEngine.prototype.twoArgsImpliedHead = function(args, option) {
  // our args we expect to be between 1 and 2
  this.validateArgBounds(args, 1, 2, option);
  // and if it's one, add a HEAD to the back
  if (args.length == 1) {
    args.push('HEAD');
  }
};

GitEngine.prototype.revertStarter = function() {
  this.validateArgBounds(this.generalArgs, 1, NaN);

  var response = this.revert(this.generalArgs);

  if (response) {
    animationFactory.rebaseAnimation(this.animationQueue, response, this, this.gitVisuals);
  }
};

GitEngine.prototype.revert = function(whichCommits) {
  // for each commit, we want to revert it
  var toRebase = [];
  _.each(whichCommits, function(stringRef) {
    toRebase.push(this.getCommitFromRef(stringRef));
  }, this);

  // we animate reverts now!! we use the rebase animation though so that's
  // why the terminology is like it is
  var animationResponse = {};
  animationResponse.destinationBranch = this.resolveID(toRebase[0]);
  animationResponse.toRebaseArray = toRebase.slice(0);
  animationResponse.rebaseSteps = [];

  var beforeSnapshot = this.gitVisuals.genSnapshot();
  var afterSnapshot;

  // now make a bunch of commits on top of where we are
  var base = this.getCommitFromRef('HEAD');
  _.each(toRebase, function(oldCommit) {
    var newId = this.rebaseAltID(oldCommit.get('id'));

    var newCommit = this.makeCommit([base], newId, {
        commitMessage: 'Reverting ' + this.resolveName(oldCommit) +
          ': "' + oldCommit.get('commitMessage') + '"'
    });

    base = newCommit;

    // animation stuff
    afterSnapshot = this.gitVisuals.genSnapshot();
    animationResponse.rebaseSteps.push({
      oldCommit: oldCommit,
      newCommit: newCommit,
      beforeSnapshot: beforeSnapshot,
      afterSnapshot: afterSnapshot
    });
    beforeSnapshot = afterSnapshot;
  }, this);
  // done! update our location
  this.setTargetLocation('HEAD', base);

  // animation
  return animationResponse;
};

GitEngine.prototype.resetStarter = function() {
  if (this.commandOptions['--soft']) {
    throw new GitError({
      msg: "You can't use --soft because there is no concept of stashing" +
           " changes or staging files, so you will lose your progress." +
           " Try using interactive rebasing (or just rebasing) to move commits."
    });
  }
  if (this.commandOptions['--hard']) {
    this.command.addWarning(
      'Nice! You are using --hard. The default behavior is a hard reset in ' +
      "this demo, so don't worry about specifying the option explicity"
    );
    // dont absorb the arg off of --hard
    this.generalArgs = this.generalArgs.concat(this.commandOptions['--hard']);
  }

  this.validateArgBounds(this.generalArgs, 1, 1);

  if (this.getDetachedHead()) {
    throw new GitError({
      msg: "Cant reset in detached head! Use checkout if you want to move"
    });
  }

  this.reset(this.generalArgs[0]);
};

GitEngine.prototype.reset = function(target) {
  this.setTargetLocation('HEAD', this.getCommitFromRef(target));
};

GitEngine.prototype.cherrypickStarter = function() {
  this.validateArgBounds(this.generalArgs, 1, 1);
  var newCommit = this.cherrypick(this.generalArgs[0]);

  animationFactory.genCommitBirthAnimation(this.animationQueue, newCommit, this.gitVisuals);
};

GitEngine.prototype.cherrypick = function(ref) {
  var commit = this.getCommitFromRef(ref);
  // check if we already have that
  var set = this.getUpstreamSet('HEAD');
  if (set[commit.get('id')]) {
    throw new GitError({
      msg: "We already have that commit in our changes history! You can't cherry-pick it " +
           "if it shows up in git log."
    });
  }

  // alter the ID slightly
  var id = this.rebaseAltID(commit.get('id'));

  // now commit with that id onto HEAD
  var newCommit = this.makeCommit([this.getCommitFromRef('HEAD')], id);
  this.setTargetLocation(this.HEAD, newCommit);
  return newCommit;
};

GitEngine.prototype.commitStarter = function() {
  this.acceptNoGeneralArgs();
  if (this.commandOptions['-am'] && (
      this.commandOptions['-a'] || this.commandOptions['-m'])) {
    throw new GitError({
      msg: "You can't have -am with another -m or -a!"
    });
  }

  var msg = null;
  var args = null;
  if (this.commandOptions['-a']) {
    this.command.addWarning('No need to add files in this demo');
  }

  if (this.commandOptions['-am']) {
    args = this.commandOptions['-am'];
    this.validateArgBounds(args, 1, 1, '-am');

    this.command.addWarning("Don't worry about adding files in this demo. I'll take " +
      "down your commit message anyways, but you can commit without a message " +
      "in this demo as well");
    msg = args[0];
  }

  if (this.commandOptions['-m']) {
    args = this.commandOptions['-m'];
    this.validateArgBounds(args, 1, 1, '-m');
    msg = args[0];
  }

  var newCommit = this.commit();
  if (msg) {
    msg = msg
      .replace(/&quot;/g, '"')
      .replace(/^"/g, '')
      .replace(/"$/g, '');

    newCommit.set('commitMessage', msg);
  }
  animationFactory.genCommitBirthAnimation(this.animationQueue, newCommit, this.gitVisuals);
};

GitEngine.prototype.commit = function() {
  var targetCommit = this.getCommitFromRef(this.HEAD);
  var id = null;

  // if we want to ammend, go one above
  if (this.commandOptions['--amend']) {
    targetCommit = this.resolveID('HEAD~1');
    id = this.rebaseAltID(this.getCommitFromRef('HEAD').get('id'));
  }

  var newCommit = this.makeCommit([targetCommit], id);
  if (this.getDetachedHead()) {
    this.command.addWarning('Warning!! Detached HEAD state');
  }

  this.setTargetLocation(this.HEAD, newCommit);
  return newCommit;
};

GitEngine.prototype.resolveName = function(someRef) {
  // first get the obj
  var obj = this.resolveID(someRef);
  if (obj.get('type') == 'commit') {
    return 'commit ' + obj.get('id');
  }
  if (obj.get('type') == 'branch') {
    return 'branch "' + obj.get('id') + '"';
  }
  // we are dealing with HEAD
  return this.resolveName(obj.get('target'));
};

GitEngine.prototype.resolveID = function(idOrTarget) {
  if (idOrTarget === null || idOrTarget === undefined) {
    throw new Error('Dont call this with null / undefined');
  }

  if (typeof idOrTarget !== 'string') {
    return idOrTarget;
  }
  return this.resolveStringRef(idOrTarget);
};

GitEngine.prototype.resolveStringRef = function(ref) {
  if (this.refs[ref]) {
    return this.refs[ref];
  }

  // may be something like HEAD~2 or master^^
  var relativeRefs = [
    [/^([a-zA-Z0-9]+)~(\d+)\s*$/, function(matches) {
      return parseInt(matches[2], 10);
    }],
    [/^([a-zA-Z0-9]+)(\^+)\s*$/, function(matches) {
      return matches[2].length;
    }]
  ];

  var startRef = null;
  var numBack = null;
  _.each(relativeRefs, function(config) {
    var regex = config[0];
    var parse = config[1];
    if (regex.test(ref)) {
      var matches = regex.exec(ref);
      numBack = parse(matches);
      startRef = matches[1];
    }
  }, this);

  if (!startRef) {
    throw new GitError({
      msg: 'unknown ref ' + ref
    });
  }
  if (!this.refs[startRef]) {
    throw new GitError({
      msg: 'the ref ' + startRef +' does not exist.'
    });
  }
  var commit = this.getCommitFromRef(startRef);

  return this.numBackFrom(commit, numBack);
};

GitEngine.prototype.getCommitFromRef = function(ref) {
  var start = this.resolveID(ref);

  // works for both HEAD and just a single layer. aka branch
  while (start.get('type') !== 'commit') {
    start = start.get('target');
  }
  return start;
};

GitEngine.prototype.getType = function(ref) {
  return this.resolveID(ref).get('type');
};

GitEngine.prototype.setTargetLocation = function(ref, target) {
  if (this.getType(ref) == 'commit') {
    // nothing to do
    return;
  }

  // sets whatever ref is (branch, HEAD, etc) to a target. so if
  // you pass in HEAD, and HEAD is pointing to a branch, it will update
  // the branch to that commit, not the HEAD
  ref = this.getOneBeforeCommit(ref);
  ref.set('target', target);
};

GitEngine.prototype.getUpstreamBranchSet = function() {
  // this is expensive!! so only call once in a while
  var commitToSet = {};

  var inArray = function(arr, id) {
    var found = false;
    _.each(arr, function(wrapper) {
      if (wrapper.id == id) {
        found = true;
      }
    });

    return found;
  };

  var bfsSearch = function(commit) {
    var set = [];
    var pQueue = [commit];
    while (pQueue.length) {
      var popped = pQueue.pop();
      set.push(popped.get('id'));

      if (popped.get('parents') && popped.get('parents').length) {
        pQueue = pQueue.concat(popped.get('parents'));
      }
    }
    return set;
  };

  this.branchCollection.each(function(branch) {
    var set = bfsSearch(branch.get('target'));
    _.each(set, function(id) {
      commitToSet[id] = commitToSet[id] || [];

      // only add it if it's not there, so hue blending is ok
      if (!inArray(commitToSet[id], branch.get('id'))) {
        commitToSet[id].push({
          obj: branch,
          id: branch.get('id')
        });
      }
    });
  });

  return commitToSet;
};

GitEngine.prototype.getUpstreamHeadSet = function() {
  var set = this.getUpstreamSet('HEAD');
  var including = this.getCommitFromRef('HEAD').get('id');

  set[including] = true;
  return set;
};

GitEngine.prototype.getOneBeforeCommit = function(ref) {
  // you can call this command on HEAD in detached, HEAD, or on a branch
  // and it will return the ref that is one above a commit. aka
  // it resolves HEAD to something that we can move the ref with
  var start = this.resolveID(ref);
  if (start === this.HEAD && !this.getDetachedHead()) {
    start = start.get('target');
  }
  return start;
};

GitEngine.prototype.numBackFrom = function(commit, numBack) {
  // going back '3' from a given ref is not trivial, for you might have
  // a bunch of merge commits and such. like this situation:
  //
  //      * merge master into new
  //      |\
  //      | \* commit here
  //      |* \ commit there
  //      |  |* commit here
  //      \ /
  //       | * root
  //
  //
  // hence we need to do a BFS search, with the commit date being the
  // value to sort off of (rather than just purely the level)
  if (numBack === 0) {
    return commit;
  }

  // we use a special sorting function here that
  // prefers the later commits over the earlier ones
  var sortQueue = _.bind(function(queue) {
    queue.sort(this.idSortFunc);
    queue.reverse();
  }, this);

  var pQueue = [].concat(commit.get('parents') || []);
  sortQueue(pQueue);
  numBack--;

  while (pQueue.length && numBack !== 0) {
    var popped = pQueue.shift(0);
    var parents = popped.get('parents');

    if (parents && parents.length) {
      pQueue = pQueue.concat(parents);
    }

    sortQueue(pQueue);
    numBack--;
  }

  if (numBack !== 0 || pQueue.length === 0) {
    throw new GitError({
      msg: "Sorry, I can't go that many commits back"
    });
  }
  return pQueue.shift(0);
};

GitEngine.prototype.scrapeBaseID = function(id) {
  var results = /^C(\d+)/.exec(id);

  if (!results) {
    throw new Error('regex failed on ' + id);
  }

  return 'C' + results[1];
};

GitEngine.prototype.rebaseAltID = function(id) {
  // this function alters an ID to add a quote to the end,
  // indicating that it was rebased. it also checks existence
  var regexMap = [
    [/^C(\d+)[']{0,2}$/, function(bits) {
      // this id can use another quote, so just add it
      return bits[0] + "'";
    }],
    [/^C(\d+)[']{3}$/, function(bits) {
      // here we switch from C''' to C'^4
      return bits[0].slice(0, -3) + "'^4";
    }],
    [/^C(\d+)['][\^](\d+)$/, function(bits) {
      return 'C' + String(bits[1]) + "'^" + String(Number(bits[2]) + 1);
    }]
  ];

  for (var i = 0; i < regexMap.length; i++) {
    var regex = regexMap[i][0];
    var func = regexMap[i][1];
    var results = regex.exec(id);
    if (results) {
      var newId = func(results);
      // if this id exists, continue down the rabbit hole
      if (this.refs[newId]) {
        return this.rebaseAltID(newId);
      } else {
        return newId;
      }
    }
  }
  throw new Error('could not modify the id ' + id);
};

GitEngine.prototype.idSortFunc = function(cA, cB) {
  // commit IDs can come in many forms:
  //  C4
  //  C4' (from a rebase)
  //  C4'' (from multiple rebases)
  //  C4'^3 (from a BUNCH of rebases)

  var scale = 1000;

  var regexMap = [
    [/^C(\d+)$/, function(bits) {
      // return the 4 from C4
      return scale * bits[1];
    }],
    [/^C(\d+)([']+)$/, function(bits) {
      // return the 4 from C4, plus the length of the quotes
      return scale * bits[1] + bits[2].length;
    }],
    [/^C(\d+)['][\^](\d+)$/, function(bits) {
      return scale * bits[1] + Number(bits[2]);
    }]
  ];

  var getNumToSort = function(id) {
    for (var i = 0; i < regexMap.length; i++) {
      var regex = regexMap[i][0];
      var func = regexMap[i][1];
      var results = regex.exec(id);
      if (results) {
        return func(results);
      }
    }
    throw new Error('Could not parse commit ID ' + id);
  };

  return getNumToSort(cA.get('id')) - getNumToSort(cB.get('id'));
};

GitEngine.prototype.rebaseInteractiveStarter = function() {
  var args = this.commandOptions['-i'];
  this.twoArgsImpliedHead(args, ' -i');

  this.rebaseInteractive(args[0], args[1]);
};

GitEngine.prototype.rebaseStarter = function() {
  if (this.commandOptions['-i']) {
    this.rebaseInteractiveStarter();
    return;
  }

  this.twoArgsImpliedHead(this.generalArgs);

  var response = this.rebase(this.generalArgs[0], this.generalArgs[1]);

  if (response === undefined) {
    // was a fastforward or already up to date. returning now
    // will trigger the refresh animation by not adding anything to
    // the animation queue
    return;
  }

  animationFactory.rebaseAnimation(this.animationQueue, response, this, this.gitVisuals);
};

GitEngine.prototype.rebase = function(targetSource, currentLocation) {
  // first some conditions
  if (this.isUpstreamOf(targetSource, currentLocation)) {
    this.command.setResult('Branch already up-to-date');

    // git for some reason always checks out the branch you are rebasing,
    // no matter the result of the rebase
    this.checkout(currentLocation);

    // returning instead of throwing makes a tree refresh
    return;
  }

  if (this.isUpstreamOf(currentLocation, targetSource)) {
    // just set the target of this current location to the source
    this.setTargetLocation(currentLocation, this.getCommitFromRef(targetSource));
    // we need the refresh tree animation to happen, so set the result directly
    // instead of throwing
    this.command.setResult('Fast-forwarding...');

    this.checkout(currentLocation);
    return;
  }

   // now the part of actually rebasing.
  // We need to get the downstream set of targetSource first.
  // then we BFS from currentLocation, using the downstream set as our stopping point.
  // we need to BFS because we need to include all commits below
  // pop these commits on top of targetSource and modify their ids with quotes
  var stopSet = this.getUpstreamSet(targetSource);

  // now BFS from here on out
  var toRebaseRough = [];
  var pQueue = [this.getCommitFromRef(currentLocation)];

  while (pQueue.length) {
    var popped = pQueue.pop();

    // if its in the set, dont add it
    if (stopSet[popped.get('id')]) {
      continue;
    }

    // it's not in the set, so we need to rebase this commit
    toRebaseRough.push(popped);
    toRebaseRough.sort(this.idSortFunc);
    toRebaseRough.reverse();
    // keep searching
    pQueue = pQueue.concat(popped.get('parents'));
  }

  return this.rebaseFinish(toRebaseRough, stopSet, targetSource, currentLocation);
};

GitEngine.prototype.rebaseInteractive = function(targetSource, currentLocation) {
  // there are a reduced set of checks now, so we can't exactly use parts of the rebase function
  // but it will look similar.

  // first if we are upstream of the target
  if (this.isUpstreamOf(currentLocation, targetSource)) {
    throw new GitError({
      msg: 'Nothing to do... (git throws a "noop" status here); ' +
        'Your source is upstream of your rebase target'
    });
  }

  // now get the stop set
  var stopSet = this.getUpstreamSet(targetSource);

  var toRebaseRough = [];
  // standard BFS
  var pQueue = [this.getCommitFromRef(currentLocation)];

  while (pQueue.length) {
    var popped = pQueue.pop();

    if (stopSet[popped.get('id')]) {
      continue;
    }

    toRebaseRough.push(popped);
    pQueue = pQueue.concat(popped.get('parents'));
    pQueue.sort(this.idSortFunc);
  }

  // throw our merge's real fast and see if we have anything to do
  var toRebase = [];
  _.each(toRebaseRough, function(commit) {
    if (commit.get('parents').length == 1) {
      toRebase.push(commit);
    }
  });

  if (!toRebase.length) {
    throw new GitError({
      msg: 'No commits to rebase! Everything is a merge commit'
    });
  }

  // now do stuff :D since all our validation checks have passed, we are going to defer animation
  // and actually launch the dialog
  this.animationQueue.set('defer', true);

  var callback = _.bind(function(userSpecifiedRebase) {
    // first, they might have dropped everything (annoying)
    if (!userSpecifiedRebase.length) {
      this.command.setResult('Nothing to do...');
      this.animationQueue.start();
      return;
    }

    // finish the rebase crap and animate!
    var animationData = this.rebaseFinish(userSpecifiedRebase, {}, targetSource, currentLocation);
    animationFactory.rebaseAnimation(this.animationQueue, animationData, this, this.gitVisuals);
    this.animationQueue.start();
  }, this);

  new InteractiveRebaseView({
    callback: callback,
    toRebase: toRebase,
    el: $('#dialogHolder')
  });
};

GitEngine.prototype.rebaseFinish = function(toRebaseRough, stopSet, targetSource, currentLocation) {
  // now we have the all the commits between currentLocation and the set of target to rebase.
  var animationResponse = {};
  animationResponse.destinationBranch = this.resolveID(targetSource);

  // we need to throw out merge commits
  var toRebase = [];
  _.each(toRebaseRough, function(commit) {
    if (commit.get('parents').length == 1) {
      toRebase.push(commit);
    }
  });

  // we ALSO need to throw out commits that will do the same changes. like
  // if the upstream set has a commit C4 and we have C4', we dont rebase the C4' again.
  // get this by doing ID scraping
  var changesAlreadyMade = {};
  _.each(stopSet, function(val, key) {
    changesAlreadyMade[this.scrapeBaseID(key)] = val; // val == true
  }, this);

  // now get rid of the commits that will redo same changes
  toRebaseRough = toRebase;
  toRebase = [];
  _.each(toRebaseRough, function(commit) {
    var baseID = this.scrapeBaseID(commit.get('id'));
    if (!changesAlreadyMade[baseID]) {
      toRebase.push(commit);
    }
  }, this);

  if (!toRebase.length) {
    throw new GitError({
      msg: 'No Commits to Rebase! Everything else is merge commits or changes already have been applied'
    });
  }

  // now reverse it once more to get it in the right order
  toRebase.reverse();
  animationResponse.toRebaseArray = toRebase.slice(0);

  // now pop all of these commits onto targetLocation
  var base = this.getCommitFromRef(targetSource);

  // do the rebase, and also maintain all our animation info during this
  animationResponse.rebaseSteps = [];
  var beforeSnapshot = this.gitVisuals.genSnapshot();
  var afterSnapshot;
  _.each(toRebase, function(old) {
    var newId = this.rebaseAltID(old.get('id'));

    var newCommit = this.makeCommit([base], newId);
    base = newCommit;

    // animation info
    afterSnapshot = this.gitVisuals.genSnapshot();
    animationResponse.rebaseSteps.push({
      oldCommit: old,
      newCommit: newCommit,
      beforeSnapshot: beforeSnapshot,
      afterSnapshot: afterSnapshot
    });
    beforeSnapshot = afterSnapshot;
  }, this);

  if (this.resolveID(currentLocation).get('type') == 'commit') {
    // we referenced a commit like git rebase C2 C1, so we have
    // to manually check out C1'

    var steps = animationResponse.rebaseSteps;
    var newestCommit = steps[steps.length - 1].newCommit;

    this.checkout(newestCommit);
  } else {
    // now we just need to update the rebased branch is
    this.setTargetLocation(currentLocation, base);
    this.checkout(currentLocation);
  }

  // for animation
  return animationResponse;
};

GitEngine.prototype.mergeStarter = function() {
  this.twoArgsImpliedHead(this.generalArgs);

  var newCommit = this.merge(this.generalArgs[0], this.generalArgs[1]);

  if (newCommit === undefined) {
    // its just a fast forwrard
    animationFactory.refreshTree(this.animationQueue, this.gitVisuals);
    return;
  }

  animationFactory.genCommitBirthAnimation(this.animationQueue, newCommit, this.gitVisuals);
};

GitEngine.prototype.merge = function(targetSource, currentLocation) {
  // first some conditions
  if (this.isUpstreamOf(targetSource, currentLocation) ||
      this.getCommitFromRef(targetSource) === this.getCommitFromRef(currentLocation)) {
    throw new CommandResult({
      msg: 'Branch already up-to-date'
    });
  }

  if (this.isUpstreamOf(currentLocation, targetSource)) {
    // just set the target of this current location to the source
    this.setTargetLocation(currentLocation, this.getCommitFromRef(targetSource));
    // get fresh animation to happen
    this.command.setResult('Fast-forwarding...');
    return;
  }

  // now the part of making a merge commit
  var parent1 = this.getCommitFromRef(currentLocation);
  var parent2 = this.getCommitFromRef(targetSource);

  // we need a fancy commit message
  var msg = 'Merge ' + this.resolveName(targetSource) +
    ' into ' + this.resolveName(currentLocation);

  // since we specify parent 1 as the first parent, it is the "main" parent
  // and the node will be displayed below that branch / commit / whatever
  var mergeCommit = this.makeCommit(
    [parent1, parent2],
    null,
    {
      commitMessage: msg
    }
  );

  this.setTargetLocation(currentLocation, mergeCommit);
  return mergeCommit;
};

GitEngine.prototype.checkoutStarter = function() {
  var args = null;
  if (this.commandOptions['-b']) {
    // the user is really trying to just make a branch and then switch to it. so first:
    args = this.commandOptions['-b'];
    this.twoArgsImpliedHead(args, '-b');

    var validId = this.validateBranchName(args[0]);
    this.branch(validId, args[1]);
    this.checkout(validId);
    return;
  }

  if (this.commandOptions['-']) {
    // get the heads last location
    var lastPlace = this.HEAD.get('lastLastTarget');
    if (!lastPlace) {
      throw new GitError({
        msg: 'Need a previous location to do - switching'
      });
    }
    this.HEAD.set('target', lastPlace);
    return;
  }

  if (this.commandOptions['-B']) {
    args = this.commandOptions['-B'];
    this.twoArgsImpliedHead(args, '-B');

    this.forceBranch(args[0], args[1]);
    this.checkout(args[0]);
    return;
  }

  this.validateArgBounds(this.generalArgs, 1, 1);

  this.checkout(this.unescapeQuotes(this.generalArgs[0]));
};

GitEngine.prototype.checkout = function(idOrTarget) {
  var target = this.resolveID(idOrTarget);
  if (target.get('id') === 'HEAD') {
    // git checkout HEAD is a
    // meaningless command but i used to do this back in the day
    return;
  }

  var type = target.get('type');
  if (type !== 'branch' && type !== 'commit') {
    throw new GitError({
      msg: 'can only checkout branches and commits!'
    });
  }

  this.HEAD.set('target', target);
};

GitEngine.prototype.branchStarter = function() {
  var args = null;
  // handle deletion first
  if (this.commandOptions['-d'] || this.commandOptions['-D']) {
    var names = this.commandOptions['-d'] || this.commandOptions['-D'];
    this.validateArgBounds(names, 1, NaN, '-d');

    _.each(names, function(name) {
      this.deleteBranch(name);
    }, this);
    return;
  }

  if (this.commandOptions['--contains']) {
    args = this.commandOptions['--contains'];
    this.validateArgBounds(args, 1, 1, '--contains');
    this.printBranchesWithout(args[0]);
    return;
  }

  if (this.commandOptions['-f']) {
    args = this.commandOptions['-f'];
    this.twoArgsImpliedHead(args, '-f');

    // we want to force a branch somewhere
    this.forceBranch(args[0], args[1]);
    return;
  }


  if (this.generalArgs.length === 0) {
    this.printBranches(this.getBranches());
    return;
  }

  this.twoArgsImpliedHead(this.generalArgs);
  this.branch(this.generalArgs[0], this.generalArgs[1]);
};

GitEngine.prototype.forceBranch = function(branchName, where) {
  // if branchname doesn't exist...
  if (!this.refs[branchName]) {
    this.branch(branchName, where);
  }

  var branch = this.resolveID(branchName);
  if (branch.get('type') !== 'branch') {
    throw new GitError({
      msg: "Can't force move anything but a branch!!"
    });
  }

  var whereCommit = this.getCommitFromRef(where);

  this.setTargetLocation(branch, whereCommit);
};

GitEngine.prototype.branch = function(name, ref) {
  var target = this.getCommitFromRef(ref);
  this.makeBranch(name, target);
};

GitEngine.prototype.deleteBranch = function(name) {
  // trying to delete, lets check our refs
  var target = this.resolveID(name);
  if (target.get('type') !== 'branch') {
    throw new GitError({
      msg: "You can't delete things that arent branches with branch command"
    });
  }
  if (target.get('id') == 'master') {
    throw new GitError({
      msg: "You can't delete the master branch!"
    });
  }
  if (this.HEAD.get('target') === target) {
    throw new GitError({
      msg: "Cannot delete the branch you are currently on"
    });
  }

  // now we know it's a branch
  var branch = target;

  this.branchCollection.remove(branch);
  this.refs[branch.get('id')] = undefined;
  delete this.refs[branch.get('id')];

  if (branch.get('visBranch')) {
    branch.get('visBranch').remove();
  }
};

GitEngine.prototype.unescapeQuotes = function(str) {
  return str.replace(/&#x27;/g, "'");
};

GitEngine.prototype.dispatch = function(command, callback) {
  // current command, options, and args are stored in the gitEngine
  // for easy reference during processing.
  this.command = command;
  this.commandOptions = command.get('supportedMap');
  this.generalArgs = command.get('generalArgs');

  // set up the animation queue
  var whenDone = _.bind(function() {
    command.set('status', 'finished');
    callback();
  }, this);
  this.animationQueue = new AnimationQueue({
    callback: whenDone
  });

  command.set('status', 'processing');
  try {
    var methodName = command.get('method').replace(/-/g, '') + 'Starter';
    this[methodName]();
  } catch (err) {
    if (err instanceof GitError ||
        err instanceof CommandResult) {
      // short circuit animation by just setting error and returning
      command.set('error', err);
      callback();
      return;
    } else {
      throw err;
    }
  }

  // only add the refresh if we didn't do manual animations
  if (!this.animationQueue.get('animations').length && !this.animationQueue.get('defer')) {
    animationFactory.refreshTree(this.animationQueue, this.gitVisuals);
  }

  // animation queue will call the callback when its done
  if (!this.animationQueue.get('defer')) {
    this.animationQueue.start();
  }
};

GitEngine.prototype.showStarter = function() {
  this.oneArgImpliedHead(this.generalArgs);

  this.show(this.generalArgs[0]);
};

GitEngine.prototype.show = function(ref) {
  var commit = this.getCommitFromRef(ref);

  throw new CommandResult({
    msg: commit.getShowEntry()
  });
};

GitEngine.prototype.statusStarter = function() {
  var lines = [];
  if (this.getDetachedHead()) {
    lines.push('Detached Head!');
  } else {
    var branchName = this.HEAD.get('target').get('id');
    lines.push('On branch ' + branchName);
  }
  lines.push('Changes to be committed:');
  lines.push('');
  lines.push('&nbsp;&nbsp;&nbsp; modified: cal/OskiCostume.stl');
  lines.push('');
  lines.push('Ready to commit! (as always in this demo)');

  var msg = '';
  _.each(lines, function(line) {
    msg += '# ' + line + '\n';
  });

  throw new CommandResult({
    msg: msg
  });
};

GitEngine.prototype.logStarter = function() {
  if (this.generalArgs.length == 2) {
    // do fancy git log branchA ^branchB
    if (this.generalArgs[1][0] == '^') {
      this.logWithout(this.generalArgs[0], this.generalArgs[1]);
    } else {
      throw new GitError({
        msg: 'I need a not branch (^branchName) when getting two arguments!'
      });
    }
  }

  this.oneArgImpliedHead(this.generalArgs);
  this.log(this.generalArgs[0]);
};

GitEngine.prototype.logWithout = function(ref, omitBranch) {
  // slice off the ^branch
  omitBranch = omitBranch.slice(1);
  this.log(ref, this.getUpstreamSet(omitBranch));
};

GitEngine.prototype.log = function(ref, omitSet) {
  // omit set is for doing stuff like git log branchA ^branchB
  omitSet = omitSet || {};
  // first get the commit we referenced
  var commit = this.getCommitFromRef(ref);

  // then get as many far back as we can from here, order by commit date
  var toDump = [];
  var pQueue = [commit];

  var seen = {};

  while (pQueue.length) {
    var popped = pQueue.shift(0);
    if (seen[popped.get('id')] || omitSet[popped.get('id')]) {
      continue;
    }
    seen[popped.get('id')] = true;

    toDump.push(popped);

    if (popped.get('parents') && popped.get('parents').length) {
      pQueue = pQueue.concat(popped.get('parents'));
    }
  }

  // now go through and collect logs
  var bigLogStr = '';
  _.each(toDump, function(c) {
    bigLogStr += c.getLogEntry();
  }, this);

  throw new CommandResult({
    msg: bigLogStr
  });
};

GitEngine.prototype.addStarter = function() {
  throw new CommandResult({
    msg: "This demo is meant to demonstrate git branching, so don't worry about " +
         "adding / staging files. Just go ahead and commit away!"
  });
};

GitEngine.prototype.getCommonAncestor = function(ancestor, cousin) {
  if (this.isUpstreamOf(cousin, ancestor)) {
    throw new Error('Dont use common ancestor if we are upstream!');
  }

  var upstreamSet = this.getUpstreamSet(ancestor);
  // now BFS off of cousin until you find something

  var queue = [this.getCommitFromRef(cousin)];
  while (queue.length) {
    var here = queue.pop();
    if (upstreamSet[here.get('id')]) {
      return here;
    }
    queue = queue.concat(here.get('parents'));
  }
  throw new Error('something has gone very wrong... two nodes arent connected!');
};

GitEngine.prototype.isUpstreamOf = function(child, ancestor) {
  child = this.getCommitFromRef(child);

  // basically just do a completely BFS search on ancestor to the root, then
  // check for membership of child in that set of explored nodes
  var upstream = this.getUpstreamSet(ancestor);
  return upstream[child.get('id')] !== undefined;
};

GitEngine.prototype.getUpstreamSet = function(ancestor) {
  var commit = this.getCommitFromRef(ancestor);
  var ancestorID = commit.get('id');
  var queue = [commit];

  var exploredSet = {};
  exploredSet[ancestorID] = true;

  var addToExplored = function(rent) {
    exploredSet[rent.get('id')] = true;
    queue.push(rent);
  };

  while (queue.length) {
    var here = queue.pop();
    var rents = here.get('parents');

    _.each(rents, addToExplored);
  }
  return exploredSet;
};


var Ref = Backbone.Model.extend({
  initialize: function() {
    if (!this.get('target')) {
      throw new Error('must be initialized with target');
    }
    if (!this.get('id')) {
      throw new Error('must be given an id');
    }
    this.set('type', 'general ref');

    if (this.get('id') == 'HEAD') {
      this.set('lastLastTarget', null);
      this.set('lastTarget', this.get('target'));
      // have HEAD remember where it is for checkout -
      this.on('change:target', this.targetChanged, this);
    }
  },

  targetChanged: function(model, targetValue, ev) {
    // push our little 3 stack back. we need to do this because
    // backbone doesn't give you what the value WAS, only what it was changed
    // TO
    this.set('lastLastTarget', this.get('lastTarget'));
    this.set('lastTarget', targetValue);
  },

  toString: function() {
    return 'a ' + this.get('type') + 'pointing to ' + String(this.get('target'));
  }
});

var Branch = Ref.extend({
  defaults: {
    visBranch: null
  },

  initialize: function() {
    Ref.prototype.initialize.call(this);
    this.set('type', 'branch');
  }
});

var Commit = Backbone.Model.extend({
  defaults: {
    type: 'commit',
    children: null,
    parents: null,
    author: 'Peter Cottle',
    createTime: null,
    commitMessage: null,
    visNode: null,
    gitVisuals: null
  },

  constants: {
    circularFields: ['gitVisuals', 'visNode', 'children']
  },

  getLogEntry: function() {
    // for now we are just joining all these things with newlines which
    // will get placed by paragraph tags. Not really a fan of this, but
    // it's better than making an entire template and all that jazz
    return [
      'Author: ' + this.get('author'),
      'Date: ' + this.get('createTime'),
      '<br/>',
      this.get('commitMessage'),
      '<br/>',
      'Commit: ' + this.get('id')
    ].join('\n' ) + '\n';
  },

  getShowEntry: function() {
    // same deal as above, show log entry and some fake changes
    return [
      this.getLogEntry(),
      'diff --git a/bigGameResults.html b/bigGameResults.html',
      '--- bigGameResults.html',
      '+++ bigGameResults.html',
      '@@ 13,27 @@ Winner, Score',
      '- Stanfurd, 14-7',
      '+ Cal, 21-14'
    ].join('\n') + '\n';
  },

  validateAtInit: function() {
    if (!this.get('id')) {
      throw new Error('Need ID!!');
    }

    if (!this.get('createTime')) {
      this.set('createTime', new Date().toString());
    }
    if (!this.get('commitMessage')) {
      this.set('commitMessage', 'Quick Commit. Go Bears!');
    }

    this.set('children', []);

    // root commits have no parents
    if (!this.get('rootCommit')) {
      if (!this.get('parents') || !this.get('parents').length) {
        throw new Error('needs parents');
      }
    }
  },

  addNodeToVisuals: function() {
    var visNode = this.get('gitVisuals').addNode(this.get('id'), this);
    this.set('visNode', visNode);
  },

  addEdgeToVisuals: function(parent) {
    this.get('gitVisuals').addEdge(this.get('id'), parent.get('id'));
  },

  isMainParent: function(parent) {
    var index = this.get('parents').indexOf(parent);
    return index === 0;
  },

  initialize: function(options) {
    this.validateAtInit();
    this.addNodeToVisuals();

    _.each(this.get('parents'), function(parent) {
      parent.get('children').push(this);
      this.addEdgeToVisuals(parent);
    }, this);
  }
});

exports.GitEngine = GitEngine;
exports.Commit = Commit;
exports.Branch = Branch;
exports.Ref = Ref;


});

require.define("/animation/animationFactory.js",function(require,module,exports,__dirname,__filename,process,global){/******************
 * This class is responsible for a lot of the heavy lifting around creating an animation at a certain state in time.
 * The tricky thing is that when a new commit has to be "born," say in the middle of a rebase
 * or something, it must animate out from the parent position to it's birth position.

 * These two positions though may not be where the commit finally ends up. So we actually need to take a snapshot of the tree,
 * store all those positions, take a snapshot of the tree after a layout refresh afterwards, and then animate between those two spots.
 * and then essentially animate the entire tree too.
 */

var Animation = require('./index').Animation;
var GRAPHICS = require('../util/constants').GRAPHICS;

// essentially a static class
var AnimationFactory = function() {

};

AnimationFactory.prototype.genCommitBirthAnimation = function(animationQueue, commit, gitVisuals) {
  if (!animationQueue) {
    throw new Error("Need animation queue to add closure to!");
  }

  var time = GRAPHICS.defaultAnimationTime * 1.0;
  var bounceTime = time * 2;

  // essentially refresh the entire tree, but do a special thing for the commit
  var visNode = commit.get('visNode');

  var animation = function() {
    // this takes care of refs and all that jazz, and updates all the positions
    gitVisuals.refreshTree(time);

    visNode.setBirth();
    visNode.parentInFront();
    gitVisuals.visBranchesFront();

    visNode.animateUpdatedPosition(bounceTime, 'bounce');
    visNode.animateOutgoingEdges(time);
  };

  animationQueue.add(new Animation({
    closure: animation,
    duration: Math.max(time, bounceTime)
  }));
};

AnimationFactory.prototype.overrideOpacityDepth2 = function(attr, opacity) {
  opacity = (opacity === undefined) ? 1 : opacity;

  var newAttr = {};

  _.each(attr, function(partObj, partName) {
    newAttr[partName] = {};
    _.each(partObj, function(val, key) {
      if (key == 'opacity') {
        newAttr[partName][key] = opacity;
      } else {
        newAttr[partName][key] = val;
      }
    });
  });
  return newAttr;
};

AnimationFactory.prototype.overrideOpacityDepth3 = function(snapShot, opacity) {
  var newSnap = {};

  _.each(snapShot, function(visObj, visID) {
    newSnap[visID] = this.overrideOpacityDepth2(visObj, opacity);
  }, this);
  return newSnap;
};

AnimationFactory.prototype.genCommitBirthClosureFromSnapshot = function(step, gitVisuals) {
  var time = GRAPHICS.defaultAnimationTime * 1.0;
  var bounceTime = time * 1.5;

  var visNode = step.newCommit.get('visNode');
  var afterAttrWithOpacity = this.overrideOpacityDepth2(step.afterSnapshot[visNode.getID()]);
  var afterSnapWithOpacity = this.overrideOpacityDepth3(step.afterSnapshot);

  var animation = function() {
    visNode.setBirthFromSnapshot(step.beforeSnapshot);
    visNode.parentInFront();
    gitVisuals.visBranchesFront();

    visNode.animateToAttr(afterAttrWithOpacity, bounceTime, 'bounce');
    visNode.animateOutgoingEdgesToAttr(afterSnapWithOpacity, bounceTime);
  };

  return animation;
};

AnimationFactory.prototype.refreshTree = function(animationQueue, gitVisuals) {
  animationQueue.add(new Animation({
    closure: function() {
      gitVisuals.refreshTree();
    }
  }));
};

AnimationFactory.prototype.rebaseAnimation = function(animationQueue, rebaseResponse,
                                                      gitEngine, gitVisuals) {

  this.rebaseHighlightPart(animationQueue, rebaseResponse, gitEngine);
  this.rebaseBirthPart(animationQueue, rebaseResponse, gitEngine, gitVisuals);
};

AnimationFactory.prototype.rebaseHighlightPart = function(animationQueue, rebaseResponse, gitEngine) {
  var fullTime = GRAPHICS.defaultAnimationTime * 0.66;
  var slowTime = fullTime * 2.0;

  // we want to highlight all the old commits
  var oldCommits = rebaseResponse.toRebaseArray;
  // we are either highlighting to a visBranch or a visNode
  var visBranch = rebaseResponse.destinationBranch.get('visBranch');
  if (!visBranch) {
    // in the case where we rebase onto a commit
    visBranch = rebaseResponse.destinationBranch.get('visNode');
  }

  _.each(oldCommits, function(oldCommit) {
    var visNode = oldCommit.get('visNode');
    animationQueue.add(new Animation({
      closure: function() {
        visNode.highlightTo(visBranch, slowTime, 'easeInOut');
      },
      duration: fullTime * 1.5
    }));

  }, this);

  this.delay(animationQueue, fullTime * 2);
};

AnimationFactory.prototype.rebaseBirthPart = function(animationQueue, rebaseResponse,
                                                      gitEngine, gitVisuals) {
  var rebaseSteps = rebaseResponse.rebaseSteps;

  var newVisNodes = [];
  _.each(rebaseSteps, function(step) {
    var visNode = step.newCommit.get('visNode');

    newVisNodes.push(visNode);
    visNode.setOpacity(0);
    visNode.setOutgoingEdgesOpacity(0);
  }, this);

  var previousVisNodes = [];
  _.each(rebaseSteps, function(rebaseStep, index) {
    var toOmit = newVisNodes.slice(index + 1);

    var snapshotPart = this.genFromToSnapshotAnimation(
      rebaseStep.beforeSnapshot,
      rebaseStep.afterSnapshot,
      toOmit,
      previousVisNodes,
      gitVisuals
    );
    var birthPart = this.genCommitBirthClosureFromSnapshot(rebaseStep, gitVisuals);

    var animation = function() {
      snapshotPart();
      birthPart();
    };

    animationQueue.add(new Animation({
      closure: animation,
      duration: GRAPHICS.defaultAnimationTime * 1.5
    }));

    previousVisNodes.push(rebaseStep.newCommit.get('visNode'));
  }, this);

  // need to delay to let bouncing finish
  this.delay(animationQueue);

  this.refreshTree(animationQueue, gitVisuals);
};

AnimationFactory.prototype.delay = function(animationQueue, time) {
  time = time || GRAPHICS.defaultAnimationTime;
  animationQueue.add(new Animation({
    closure: function() { },
    duration: time
  }));
};

AnimationFactory.prototype.genSetAllCommitOpacities = function(visNodes, opacity) {
  // need to slice for closure
  var nodesToAnimate = visNodes.slice(0);

  return function() {
    _.each(nodesToAnimate, function(visNode) {
      visNode.setOpacity(opacity);
      visNode.setOutgoingEdgesOpacity(opacity);
    });
  };
};

AnimationFactory.prototype.stripObjectsFromSnapshot = function(snapShot, toOmit) {
  var ids = [];
  _.each(toOmit, function(obj) {
    ids.push(obj.getID());
  });

  var newSnapshot = {};
  _.each(snapShot, function(val, key) {
    if (_.include(ids, key)) {
      // omit
      return;
    }
    newSnapshot[key] = val;
  }, this);
  return newSnapshot;
};

AnimationFactory.prototype.genFromToSnapshotAnimation = function(
  beforeSnapshot,
  afterSnapshot,
  commitsToOmit,
  commitsToFixOpacity,
  gitVisuals) {

  // we want to omit the commit outgoing edges
  var toOmit = [];
  _.each(commitsToOmit, function(visNode) {
    toOmit.push(visNode);
    toOmit = toOmit.concat(visNode.get('outgoingEdges'));
  });

  var fixOpacity = function(obj) {
    if (!obj) { return; }
    _.each(obj, function(attr, partName) {
      obj[partName].opacity = 1;
    });
  };

  // HORRIBLE loop to fix opacities all throughout the snapshot
  _.each([beforeSnapshot, afterSnapshot], function(snapShot) {
    _.each(commitsToFixOpacity, function(visNode) {
      fixOpacity(snapShot[visNode.getID()]);
      _.each(visNode.get('outgoingEdges'), function(visEdge) {
        fixOpacity(snapShot[visEdge.getID()]);
      });
    });
  });

  return function() {
    gitVisuals.animateAllFromAttrToAttr(beforeSnapshot, afterSnapshot, toOmit);
  };
};

exports.AnimationFactory = AnimationFactory;


});

require.define("/views/miscViews.js",function(require,module,exports,__dirname,__filename,process,global){var InteractiveRebaseView = Backbone.View.extend({
  tagName: 'div',
  template: _.template($('#interactive-rebase-template').html()),

  events: {
    'click #confirmButton': 'confirmed'
  },

  initialize: function(options) {
    this.hasClicked = false;
    this.rebaseCallback = options.callback;

    this.rebaseArray = options.toRebase;

    this.rebaseEntries = new RebaseEntryCollection();
    this.rebaseMap = {};
    this.entryObjMap = {};

    this.rebaseArray.reverse();
    // make basic models for each commit
    _.each(this.rebaseArray, function(commit) {
      var id = commit.get('id');
      this.rebaseMap[id] = commit;
      this.entryObjMap[id] = new RebaseEntry({
        id: id
      });
      this.rebaseEntries.add(this.entryObjMap[id]);
    }, this);

    this.render();

    // show the dialog holder
    this.show();
  },

  show: function() {
    this.toggleVisibility(true);
  },

  hide: function() {
    this.toggleVisibility(false);
  },

  toggleVisibility: function(toggle) {
    console.log('toggling');
    $('#dialogHolder').toggleClass('shown', toggle);
  },

  confirmed: function() {
    // we hide the dialog anyways, but they might be fast clickers
    if (this.hasClicked) {
      return;
    }
    this.hasClicked = true;

    // first of all hide
    this.$el.css('display', 'none');

    // get our ordering
    var uiOrder = [];
    this.$('ul#rebaseEntries li').each(function(i, obj) {
      uiOrder.push(obj.id);
    });

    // now get the real array
    var toRebase = [];
    _.each(uiOrder, function(id) {
      // the model
      if (this.entryObjMap[id].get('pick')) {
        toRebase.unshift(this.rebaseMap[id]);
      }
    }, this);

    this.rebaseCallback(toRebase);

    this.$el.html('');
    // garbage collection will get us
  },

  render: function() {
    var json = {
      num: this.rebaseArray.length
    };

    this.$el.html(this.template(json));

    // also render each entry
    var listHolder = this.$('ul#rebaseEntries');
    this.rebaseEntries.each(function(entry) {
      new RebaseEntryView({
        el: listHolder,
        model: entry
      });
    }, this);

    // then make it reorderable..
    listHolder.sortable({
      distance: 5,
      placeholder: 'ui-state-highlight'
    });
  }
});

var RebaseEntry = Backbone.Model.extend({
  defaults: {
    pick: true
  },

  toggle: function() {
    this.set('pick', !this.get('pick'));
  }
});

var RebaseEntryCollection = Backbone.Collection.extend({
  model: RebaseEntry
});

var RebaseEntryView = Backbone.View.extend({
  tagName: 'li',
  template: _.template($('#interactive-rebase-entry-template').html()),

  toggle: function() {
    this.model.toggle();

    // toggle a class also
    this.listEntry.toggleClass('notPicked', !this.model.get('pick'));
  },

  initialize: function(options) {
    this.render();
  },

  render: function() {
    var json = this.model.toJSON();
    this.$el.append(this.template(this.model.toJSON()));

    // hacky :( who would have known jquery barfs on ids with %'s and quotes
    this.listEntry = this.$el.children(':last');

    this.listEntry.delegate('#toggleButton', 'click', _.bind(function() {
      this.toggle();
    }, this));
  }
});

exports.InteractiveRebaseView = InteractiveRebaseView;


});

require.define("/util/errors.js",function(require,module,exports,__dirname,__filename,process,global){var MyError = Backbone.Model.extend({
  defaults: {
    type: 'MyError',
    msg: 'Unknown Error'
  },
  toString: function() {
    return this.get('type') + ': ' + this.get('msg');
  },

  getMsg: function() {
    return this.get('msg') || 'Unknown Error';
  },

  toResult: function() {
    if (!this.get('msg').length) {
      return '';
    }
    return '<p>' + this.get('msg').replace(/\n/g, '</p><p>') + '</p>';
  }
});

var CommandProcessError = exports.CommandProcessError = MyError.extend({
  defaults: {
    type: 'Command Process Error'
  }
});

var CommandResult = exports.CommandResult = MyError.extend({
  defaults: {
    type: 'Command Result'
  }
});

var Warning = exports.Warning = MyError.extend({
  defaults: {
    type: 'Warning'
  }
});

var GitError = exports.GitError = MyError.extend({
  defaults: {
    type: 'Git Error'
  }
});


});

require.define("/models/commandModel.js",function(require,module,exports,__dirname,__filename,process,global){var Errors = require('../util/errors');

var CommandProcessError = Errors.CommandProcessError;
var GitError = Errors.GitError;
var Warning = Errors.Warning;
var CommandResult = Errors.CommandResult;

var Command = Backbone.Model.extend({
  defaults: {
    status: 'inqueue',
    rawStr: null,
    result: '',

    error: null,
    warnings: null,

    generalArgs: null,
    supportedMap: null,
    options: null,
    method: null,

    createTime: null
  },

  validateAtInit: function() {
    // weird things happen with defaults if you dont
    // make new objects
    this.set('generalArgs', []);
    this.set('supportedMap', {});
    this.set('warnings', []);

    if (this.get('rawStr') === null) {
      throw new Error('Give me a string!');
    }
    if (!this.get('createTime')) {
      this.set('createTime', new Date().toString());
    }


    this.on('change:error', this.errorChanged, this);
    // catch errors on init
    if (this.get('error')) {
      this.errorChanged();
    }
  },

  setResult: function(msg) {
    this.set('result', msg);
  },

  addWarning: function(msg) {
    this.get('warnings').push(msg);
    // change numWarnings so the change event fires. This is bizarre -- Backbone can't
    // detect if an array changes, so adding an element does nothing
    this.set('numWarnings', this.get('numWarnings') ? this.get('numWarnings') + 1 : 1);
  },

  getFormattedWarnings: function() {
    if (!this.get('warnings').length) {
      return '';
    }
    var i = '<i class="icon-exclamation-sign"></i>';
    return '<p>' + i + this.get('warnings').join('</p><p>' + i) + '</p>';
  },

  initialize: function() {
    this.validateAtInit();
    this.parseOrCatch();
  },

  parseOrCatch: function() {
    try {
      this.parse();
    } catch (err) {
      if (err instanceof CommandProcessError ||
          err instanceof GitError ||
          err instanceof CommandResult ||
          err instanceof Warning) {
        // errorChanged() will handle status and all of that
        this.set('error', err);
      } else {
        throw err;
      }
    }
  },

  errorChanged: function() {
    var err = this.get('error');
    if (err instanceof CommandProcessError ||
        err instanceof GitError) {
      this.set('status', 'error');
    } else if (err instanceof CommandResult) {
      this.set('status', 'finished');
    } else if (err instanceof Warning) {
      this.set('status', 'warning');
    }
    this.formatError();
  },

  formatError: function() {
    this.set('result', this.get('error').toResult());
  },

  getShortcutMap: function() {
    return {
      'git commit': /^gc($|\s)/,
      'git add': /^ga($|\s)/,
      'git checkout': /^gchk($|\s)/,
      'git rebase': /^gr($|\s)/,
      'git branch': /^gb($|\s)/
    };
  },

  getRegexMap: function() {
    return {
      // ($|\s) means that we either have to end the string
      // after the command or there needs to be a space for options
      commit: /^commit($|\s)/,
      add: /^add($|\s)/,
      checkout: /^checkout($|\s)/,
      rebase: /^rebase($|\s)/,
      reset: /^reset($|\s)/,
      branch: /^branch($|\s)/,
      revert: /^revert($|\s)/,
      log: /^log($|\s)/,
      merge: /^merge($|\s)/,
      show: /^show($|\s)/,
      status: /^status($|\s)/,
      'cherry-pick': /^cherry-pick($|\s)/
    };
  },

  getSandboxCommands: function() {
    return [
      [/^ls/, function() {
        throw new CommandResult({
          msg: "DontWorryAboutFilesInThisDemo.txt"
        });
      }],
      [/^cd/, function() {
        throw new CommandResult({
          msg: "Directory Changed to '/directories/dont/matter/in/this/demo'"
        });
      }],
      [/^git help($|\s)/, function() {
        // sym link this to the blank git command
        var allCommands = Command.prototype.getSandboxCommands();
        // wow this is hacky :(
        var equivalent = 'git';
        _.each(allCommands, function(bits) {
          var regex = bits[0];
          if (regex.test(equivalent)) {
            bits[1]();
          }
        });
      }],
      [/^git$/, function() {
        var lines = [
          'Git Version PCOTTLE.1.0',
          '<br/>',
          'Usage:',
          _.escape('\t git <command> [<args>]'),
          '<br/>',
          'Supported commands:',
          '<br/>'
        ];
        var commands = OptionParser.prototype.getMasterOptionMap();

        // build up a nice display of what we support
        _.each(commands, function(commandOptions, command) {
          lines.push('git ' + command);
          _.each(commandOptions, function(vals, optionName) {
            lines.push('\t ' + optionName);
          }, this);
        }, this);

        // format and throw
        var msg = lines.join('\n');
        msg = msg.replace(/\t/g, '&nbsp;&nbsp;&nbsp;');
        throw new CommandResult({
          msg: msg
        });
      }],
      [/^refresh$/, function() {
        var events = require('../app').getEvents();

        events.trigger('refreshTree');
        throw new CommandResult({
          msg: "Refreshing tree..."
        });
      }],
      [/^rollup (\d+)$/, function(bits) {
        var events = require('../app').getEvents();

        // go roll up these commands by joining them with semicolons
        events.trigger('rollupCommands', bits[1]);
        throw new CommandResult({
          msg: 'Commands combined!'
        });
      }]
    ];
  },

  parse: function() {
    var str = this.get('rawStr');
    // first if the string is empty, they just want a blank line
    if (!str.length) {
      throw new CommandResult({msg: ""});
    }

    // then check if it's one of our sandbox commands
    _.each(this.getSandboxCommands(), function(tuple) {
      var regex = tuple[0];
      var results = regex.exec(str);
      if (results) {
        tuple[1](results);
      }
    });

    // then check if shortcut exists, and replace, but
    // preserve options if so
    _.each(this.getShortcutMap(), function(regex, method) {
      var results = regex.exec(str);
      if (results) {
        str = method + ' ' + str.slice(results[0].length);
      }
    });

    // see if begins with git
    if (str.slice(0,3) !== 'git') {
      throw new CommandProcessError({
        msg: 'That command is not supported, sorry!'
      });
    }

    // ok, we have a (probably) valid command. actually parse it
    this.gitParse(str);
  },

  gitParse: function(str) {
    // now slice off command part
    var fullCommand = str.slice('git '.length);

    // see if we support this particular command
    _.each(this.getRegexMap(), function(regex, method) {
      if (regex.exec(fullCommand)) {
        this.set('options', fullCommand.slice(method.length + 1));
        this.set('method', method);
        // we should stop iterating, but the regex will only match
        // one command in practice. we could stop iterating if we used
        // jqeurys for each but im using underscore (for no real reason other
        // than style)
      }
    }, this);

    if (!this.get('method')) {
      throw new CommandProcessError({
        msg: "Sorry, this demo does not support that git command: " + fullCommand
      });
    }

    // parse off the options and assemble the map / general args
    var optionParser = new OptionParser(this.get('method'), this.get('options'));

    // steal these away so we can be completely JSON
    this.set('generalArgs', optionParser.generalArgs);
    this.set('supportedMap', optionParser.supportedMap);
  }
});

/**
 * OptionParser
 */
function OptionParser(method, options) {
  this.method = method;
  this.rawOptions = options;

  this.supportedMap = this.getMasterOptionMap()[method];
  if (this.supportedMap === undefined) {
    throw new Error('No option map for ' + method);
  }

  this.generalArgs = [];
  this.explodeAndSet();
}

OptionParser.prototype.getMasterOptionMap = function() {
  // here a value of false means that we support it, even if its just a
  // pass-through option. If the value is not here (aka will be undefined
  // when accessed), we do not support it.
  return {
    commit: {
      '--amend': false,
      '-a': false, // warning
      '-am': false, // warning
      '-m': false
    },
    status: {},
    log: {},
    add: {},
    'cherry-pick': {},
    branch: {
      '-d': false,
      '-D': false,
      '-f': false,
      '--contains': false
    },
    checkout: {
      '-b': false,
      '-B': false,
      '-': false
    },
    reset: {
      '--hard': false,
      '--soft': false // this will raise an error but we catch it in gitEngine
    },
    merge: {},
    rebase: {
      '-i': false // the mother of all options
    },
    revert: {},
    show: {}
  };
};

OptionParser.prototype.explodeAndSet = function() {
  // split on spaces, except when inside quotes

  var exploded = this.rawOptions.match(/('.*?'|".*?"|\S+)/g) || [];

  for (var i = 0; i < exploded.length; i++) {
    var part = exploded[i];
    if (part.slice(0,1) == '-') {
      // it's an option, check supportedMap
      if (this.supportedMap[part] === undefined) {
        throw new CommandProcessError({
          msg: 'The option "' + part + '" is not supported'
        });
      }

      // go through and include all the next args until we hit another option or the end
      var optionArgs = [];
      var next = i + 1;
      while (next < exploded.length && exploded[next].slice(0,1) != '-') {
        optionArgs.push(exploded[next]);
        next += 1;
      }
      i = next - 1;

      // **phew** we are done grabbing those. theseArgs is truthy even with an empty array
      this.supportedMap[part] = optionArgs;
    } else {
      // must be a general arg
      this.generalArgs.push(part);
    }
  }

  // done!
};

// command entry is for the commandview
var CommandEntry = Backbone.Model.extend({
  defaults: {
    text: ''
  },
  localStorage: new Backbone.LocalStorage('CommandEntries')
});


exports.CommandEntry = CommandEntry;
exports.Command = Command;


});

require.define("/views/commandViews.js",function(require,module,exports,__dirname,__filename,process,global){var CommandEntryCollection = require('../collections').CommandEntryCollection;
var Main = require('../app');
var Command = require('../models/commandModel').Command;
var CommandEntry = require('../models/commandModel').CommandEntry;

var Errors = require('../util/errors');
var Warning = Errors.Warning;

var CommandPromptView = Backbone.View.extend({
  initialize: function(options) {
    this.collection = options.collection;

    // uses local storage
    this.commands = new CommandEntryCollection();
    this.commands.fetch({
      success: _.bind(function() {
        // reverse the commands. this is ugly but needs to be done...
        var commands = [];
        this.commands.each(function(c) {
          commands.push(c);
        });

        commands.reverse();
        this.commands.reset();

        _.each(commands, function(c) {
          this.commands.add(c);
        }, this);
      }, this)
    });

    this.index = -1;

    this.commandSpan = this.$('#prompt span.command')[0];
    this.commandCursor = this.$('#prompt span.cursor')[0];

    // this is evil, but we will refer to HTML outside the document
    // and attach a click event listener so we can focus / unfocus
    $(document).delegate('#commandLineHistory', 'click', _.bind(function() {
      this.focus();
    }, this));


    $(document).delegate('#commandTextField', 'blur', _.bind(function() {
      this.blur();
    }, this));

    Main.getEvents().on('processCommandFromEvent', this.addToCollection, this);
    Main.getEvents().on('submitCommandValueFromEvent', this.submitValue, this);
    Main.getEvents().on('rollupCommands', this.rollupCommands, this);

    // hacky timeout focus
    setTimeout(_.bind(function() {
      this.focus();
    }, this), 100);
  },

  events: {
    'keydown #commandTextField': 'onKey',
    'keyup #commandTextField': 'onKeyUp',
    'blur #commandTextField': 'hideCursor',
    'focus #commandTextField': 'showCursor'
  },

  blur: function() {
    $(this.commandCursor).toggleClass('shown', false);
  },

  focus: function() {
    this.$('#commandTextField').focus();
    this.showCursor();
  },

  hideCursor: function() {
    this.toggleCursor(false);
  },

  showCursor: function() {
    this.toggleCursor(true);
  },

  toggleCursor: function(state) {
    $(this.commandCursor).toggleClass('shown', state);
  },

  onKey: function(e) {
    var el = e.srcElement;
    this.updatePrompt(el);
  },

  onKeyUp: function(e) {
    this.onKey(e);

    // we need to capture some of these events.
    // WARNING: this key map is not internationalized :(
    var keyMap = {
      // enter
      13: _.bind(function() {
        this.submit();
      }, this),
      // up
      38: _.bind(function() {
        this.commandSelectChange(1);
      }, this),
      // down
      40: _.bind(function() {
        this.commandSelectChange(-1);
      }, this)
    };

    if (keyMap[e.which] !== undefined) {
      e.preventDefault();
      keyMap[e.which]();
      this.onKey(e);
    }
  },

  badHtmlEncode: function(text) {
    return text.replace(/&/g,'&amp;')
      .replace(/</g,'&lt;')
      .replace(/</g,'&lt;')
      .replace(/ /g,'&nbsp;')
      .replace(/\n/g,'');
  },

  updatePrompt: function(el) {
    // i WEEEPPPPPPpppppppppppp that this reflow takes so long. it adds this
    // super annoying delay to every keystroke... I have tried everything
    // to make this more performant. getting the srcElement from the event,
    // getting the value directly from the dom, etc etc. yet still,
    // there's a very annoying and sightly noticeable command delay.
    // try.github.com also has this, so I'm assuming those engineers gave up as
    // well...

    var val = this.badHtmlEncode(el.value);
    this.commandSpan.innerHTML = val;

    // now mutate the cursor...
    this.cursorUpdate(el.value.length, el.selectionStart, el.selectionEnd);
    // and scroll down due to some weird bug
    Main.getEvents().trigger('commandScrollDown');
  },

  cursorUpdate: function(commandLength, selectionStart, selectionEnd) {
    // 10px for monospaced font...
    var widthPerChar = 10;

    var numCharsSelected = Math.max(1, selectionEnd - selectionStart);
    var width = String(numCharsSelected * widthPerChar) + 'px';

    // now for positioning
    var numLeft = Math.max(commandLength - selectionStart, 0);
    var left = String(-numLeft * widthPerChar) + 'px';
    // one reflow? :D
    $(this.commandCursor).css({
      width: width,
      left: left
    });
  },

  commandSelectChange: function(delta) {
    this.index += delta;

    // if we are over / under, display blank line. yes this eliminates your
    // partially edited command, but i doubt that is much in this demo
    if (this.index >= this.commands.length || this.index < 0) {
      this.clear();
      this.index = -1;
      return;
    }

    // yay! we actually can display something
    var commandEntry = this.commands.toArray()[this.index].get('text');
    this.setTextField(commandEntry);
  },

  clearLocalStorage: function() {
    this.commands.each(function(c) {
      Backbone.sync('delete', c, function() { });
    }, this);
    localStorage.setItem('CommandEntries', '');
  },

  setTextField: function(value) {
    this.$('#commandTextField').val(value);
  },

  clear: function() {
    this.setTextField('');
  },

  submit: function() {
    var value = this.$('#commandTextField').val().replace('\n', '');
    this.clear();
    this.submitValue(value);
  },

  rollupCommands: function(numBack) {
    var which = this.commands.toArray().slice(1, Number(numBack) + 1);
    which.reverse();

    var str = '';
    _.each(which, function(commandEntry) {
      str += commandEntry.get('text') + ';';
    }, this);

    console.log('the str', str);

    var rolled = new CommandEntry({text: str});
    this.commands.unshift(rolled);
    Backbone.sync('create', rolled, function() { });
  },

  submitValue: function(value) {
    // we should add if it's not a blank line and this is a new command...
    // or if we edited the command
    var shouldAdd = (value.length && this.index == -1) ||
      ((value.length && this.index !== -1 &&
      this.commands.toArray()[this.index].get('text') !== value));

    if (shouldAdd) {
      var commandEntry = new CommandEntry({text: value});
      this.commands.unshift(commandEntry);

      // store to local storage
      Backbone.sync('create', commandEntry, function() { });

      // if our length is too egregious, reset
      if (this.commands.length > 100) {
        this.clearLocalStorage();
      }
    }
    this.index = -1;

    // split commands on semicolon
    _.each(value.split(';'), _.bind(function(command, index) {
      command = _.escape(command);

      command = command
        .replace(/^(\s+)/, '')
        .replace(/(\s+)$/, '')
        .replace(/&quot;/g, '"')
        .replace(/&#x27;/g, "'");

      if (index > 0 && !command.length) {
        return;
      }

      this.addToCollection(command);
    }, this));
  },

  addToCollection: function(value) {
    var command = new Command({
      rawStr: value
    });
    this.collection.add(command);
  }
});


// This is the view for all commands -- it will represent
// their status (inqueue, processing, finished, error),
// their value ("git commit --amend"),
// and the result (either errors or warnings or whatever)
var CommandView = Backbone.View.extend({
  tagName: 'div',
  model: Command,
  template: _.template($('#command-template').html()),

  events: {
    'click': 'clicked'
  },

  clicked: function(e) {
  },

  initialize: function() {
    this.model.bind('change', this.wasChanged, this);
    this.model.bind('destroy', this.remove, this);
  },

  wasChanged: function(model, changeEvent) {
    // for changes that are just comestic, we actually only want to toggle classes
    // with jquery rather than brutally delete a html of HTML
    var changes = changeEvent.changes;
    var changeKeys = _.keys(changes);
    if (_.difference(changeKeys, ['status']) === 0) {
      this.updateStatus();
    } else if (_.difference(changeKeys, ['error']) === 0) {
      // the above will
      this.render();
    } else {
      this.render();
    }
  },

  updateStatus: function() {
    var statuses = ['inqueue', 'processing', 'finished'];
    var toggleMap = {};
    _.each(statuses, function(status) {
      toggleMap[status] = false;
    });
    toggleMap[this.model.get('status')] = true;

    var query = this.$('p.commandLine');

    _.each(toggleMap, function(value, key) {
      query.toggleClass(key, value);
    });
  },

  render: function() {
    var json = _.extend(
      {
        resultType: '',
        result: '',
        formattedWarnings: this.model.getFormattedWarnings()
      },
      this.model.toJSON()
    );

    this.$el.html(this.template(json));
    return this;
  },

  remove: function() {
    $(this.el).hide();
  }
});


var CommandLineHistoryView = Backbone.View.extend({
  initialize: function(options) {
    this.collection = options.collection;

    this.collection.on('add', this.addOne, this);
    this.collection.on('reset', this.addAll, this);
    this.collection.on('all', this.render, this);

    this.collection.on('change', this.scrollDown, this);

    Main.getEvents().on('issueWarning', this.addWarning, this);
    Main.getEvents().on('commandScrollDown', this.scrollDown, this);
  },

  addWarning: function(msg) {
    var err = new Warning({
      msg: msg
    });

    var command = new Command({
      error: err,
      rawStr: 'Warning:'
    });

    this.collection.add(command);
  },

  scrollDown: function() {
    // if commandDisplay is ever bigger than #terminal, we need to
    // add overflow-y to terminal and scroll down
    var cD = $('#commandDisplay')[0];
    var t = $('#terminal')[0];

    if ($(t).hasClass('scrolling')) {
      t.scrollTop = t.scrollHeight;
      return;
    }
    if (cD.clientHeight > t.clientHeight) {
      $(t).css('overflow-y', 'scroll');
      $(t).css('overflow-x', 'hidden');
      $(t).addClass('scrolling');
      t.scrollTop = t.scrollHeight;
    }
  },

  addOne: function(command) {
    var view = new CommandView({
      model: command
    });
    this.$('#commandDisplay').append(view.render().el);
    this.scrollDown();
  },

  addAll: function() {
    this.collection.each(this.addOne);
  }
});

exports.CommandPromptView = CommandPromptView;
exports.CommandLineHistoryView = CommandLineHistoryView;


});

require.define("/visuals/tree.js",function(require,module,exports,__dirname,__filename,process,global){var Main = require('../app');
var GRAPHICS = require('../util/constants').GRAPHICS;

var randomHueString = function() {
  var hue = Math.random();
  var str = 'hsb(' + String(hue) + ',0.7,1)';
  return str;
};

var VisBase = Backbone.Model.extend({
  removeKeys: function(keys) {
    _.each(keys, function(key) {
      if (this.get(key)) {
        this.get(key).remove();
      }
    }, this);
  }
});

var VisBranch = VisBase.extend({
  defaults: {
    pos: null,
    text: null,
    rect: null,
    arrow: null,
    isHead: false,
    flip: 1,

    fill: GRAPHICS.rectFill,
    stroke: GRAPHICS.rectStroke,
    'stroke-width': GRAPHICS.rectStrokeWidth,

    offsetX: GRAPHICS.nodeRadius * 4.75,
    offsetY: 0,
    arrowHeight: 14,
    arrowInnerSkew: 0,
    arrowEdgeHeight: 6,
    arrowLength: 14,
    arrowOffsetFromCircleX: 10,

    vPad: 5,
    hPad: 5,

    animationSpeed: GRAPHICS.defaultAnimationTime,
    animationEasing: GRAPHICS.defaultEasing
  },

  validateAtInit: function() {
    if (!this.get('branch')) {
      throw new Error('need a branch!');
    }
  },

  getID: function() {
    return this.get('branch').get('id');
  },

  initialize: function() {
    this.validateAtInit();

    // shorthand notation for the main objects
    this.gitVisuals = this.get('gitVisuals');
    this.gitEngine = this.get('gitEngine');
    if (!this.gitEngine) {
      console.log('throw damnit');
      throw new Error('asd');
    }

    this.get('branch').set('visBranch', this);
    var id = this.get('branch').get('id');

    if (id == 'HEAD') {
      // switch to a head ref
      this.set('isHead', true);
      this.set('flip', -1);

      this.set('fill', GRAPHICS.headRectFill);
    } else if (id !== 'master') {
      // we need to set our color to something random
      this.set('fill', randomHueString());
    }
  },

  getCommitPosition: function() {
    var commit = this.gitEngine.getCommitFromRef(this.get('branch'));
    var visNode = commit.get('visNode');
    return visNode.getScreenCoords();
  },

  getBranchStackIndex: function() {
    if (this.get('isHead')) {
      // head is never stacked with other branches
      return 0;
    }

    var myArray = this.getBranchStackArray();
    var index = -1;
    _.each(myArray, function(branch, i) {
      if (branch.obj == this.get('branch')) {
        index = i;
      }
    }, this);
    return index;
  },

  getBranchStackLength: function() {
    if (this.get('isHead')) {
      // head is always by itself
      return 1;
    }

    return this.getBranchStackArray().length;
  },

  getBranchStackArray: function() {
    var arr = this.gitVisuals.branchStackMap[this.get('branch').get('target').get('id')];
    if (arr === undefined) {
      // this only occurs when we are generating graphics inside of
      // a new Branch instantiation, so we need to force the update
      this.gitVisuals.calcBranchStacks();
      return this.getBranchStackArray();
    }
    return arr;
  },

  getTextPosition: function() {
    var pos = this.getCommitPosition();

    // then order yourself accordingly. we use alphabetical sorting
    // so everything is independent
    var myPos = this.getBranchStackIndex();
    return {
      x: pos.x + this.get('flip') * this.get('offsetX'),
      y: pos.y + myPos * GRAPHICS.multiBranchY + this.get('offsetY')
    };
  },

  getRectPosition: function() {
    var pos = this.getTextPosition();
    var f = this.get('flip');

    // first get text width and height
    var textSize = this.getTextSize();
    return {
      x: pos.x - 0.5 * textSize.w - this.get('hPad'),
      y: pos.y - 0.5 * textSize.h - this.get('vPad')
    };
  },

  getArrowPath: function() {
    // should make these util functions...
    var offset2d = function(pos, x, y) {
      return {
        x: pos.x + x,
        y: pos.y + y
      };
    };
    var toStringCoords = function(pos) {
      return String(Math.round(pos.x)) + ',' + String(Math.round(pos.y));
    };
    var f = this.get('flip');

    var arrowTip = offset2d(this.getCommitPosition(),
      f * this.get('arrowOffsetFromCircleX'),
      0
    );
    var arrowEdgeUp = offset2d(arrowTip, f * this.get('arrowLength'), -this.get('arrowHeight'));
    var arrowEdgeLow = offset2d(arrowTip, f * this.get('arrowLength'), this.get('arrowHeight'));

    var arrowInnerUp = offset2d(arrowEdgeUp,
      f * this.get('arrowInnerSkew'),
      this.get('arrowEdgeHeight')
    );
    var arrowInnerLow = offset2d(arrowEdgeLow,
      f * this.get('arrowInnerSkew'),
      -this.get('arrowEdgeHeight')
    );

    var tailLength = 49;
    var arrowStartUp = offset2d(arrowInnerUp, f * tailLength, 0);
    var arrowStartLow = offset2d(arrowInnerLow, f * tailLength, 0);

    var pathStr = '';
    pathStr += 'M' + toStringCoords(arrowStartUp) + ' ';
    var coords = [
      arrowInnerUp,
      arrowEdgeUp,
      arrowTip,
      arrowEdgeLow,
      arrowInnerLow,
      arrowStartLow
    ];
    _.each(coords, function(pos) {
      pathStr += 'L' + toStringCoords(pos) + ' ';
    }, this);
    pathStr += 'z';
    return pathStr;
  },

  getTextSize: function() {
    var getTextWidth = function(visBranch) {
      var textNode = visBranch.get('text').node;
      return (textNode === null) ? 1 : textNode.clientWidth;
    };

    var textNode = this.get('text').node;
    if (this.get('isHead')) {
      // HEAD is a special case
      return {
        w: textNode.clientWidth,
        h: textNode.clientHeight
      };
    }

    var maxWidth = 0;
    _.each(this.getBranchStackArray(), function(branch) {
      maxWidth = Math.max(maxWidth, getTextWidth(
        branch.obj.get('visBranch')
      ));
    });

    return {
      w: maxWidth,
      h: textNode.clientHeight
    };
  },

  getSingleRectSize: function() {
    var textSize = this.getTextSize();
    var vPad = this.get('vPad');
    var hPad = this.get('hPad');
    return {
      w: textSize.w + vPad * 2,
      h: textSize.h + hPad * 2
    };
  },

  getRectSize: function() {
    var textSize = this.getTextSize();
    // enforce padding
    var vPad = this.get('vPad');
    var hPad = this.get('hPad');

    // number of other branch names we are housing
    var totalNum = this.getBranchStackLength();
    return {
      w: textSize.w + vPad * 2,
      h: textSize.h * totalNum * 1.1 + hPad * 2
    };
  },

  getName: function() {
    var name = this.get('branch').get('id');
    var selected = this.gitEngine.HEAD.get('target').get('id');

    var add = (selected == name) ? '*' : '';
    return name + add;
  },

  nonTextToFront: function() {
    this.get('arrow').toFront();
    this.get('rect').toFront();
  },

  textToFront: function() {
    this.get('text').toFront();
  },

  getFill: function() {
    // in the easy case, just return your own fill if you are:
    // - the HEAD ref
    // - by yourself (length of 1)
    // - part of a multi branch, but your thing is hidden
    if (this.get('isHead') ||
        this.getBranchStackLength() == 1 ||
        this.getBranchStackIndex() !== 0) {
      return this.get('fill');
    }

    // woof. now it's hard, we need to blend hues...
    return this.gitVisuals.blendHuesFromBranchStack(this.getBranchStackArray());
  },

  remove: function() {
    this.removeKeys(['text', 'arrow', 'rect']);
    // also need to remove from this.gitVisuals
    this.gitVisuals.removeVisBranch(this);
  },

  genGraphics: function(paper) {
    var textPos = this.getTextPosition();
    var name = this.getName();
    var text;

    // when from a reload, we dont need to generate the text
    text = paper.text(textPos.x, textPos.y, String(name));
    text.attr({
      'font-size': 14,
      'font-family': 'Monaco, Courier, font-monospace',
      opacity: this.getTextOpacity()
    });
    this.set('text', text);

    var rectPos = this.getRectPosition();
    var sizeOfRect = this.getRectSize();
    var rect = paper
      .rect(rectPos.x, rectPos.y, sizeOfRect.w, sizeOfRect.h, 8)
      .attr(this.getAttributes().rect);
    this.set('rect', rect);

    var arrowPath = this.getArrowPath();
    var arrow = paper
      .path(arrowPath)
      .attr(this.getAttributes().arrow);
    this.set('arrow', arrow);

    rect.toFront();
    text.toFront();
  },

  updateName: function() {
    this.get('text').attr({
      text: this.getName()
    });
  },

  getNonTextOpacity: function() {
    if (this.get('isHead')) {
      return this.gitEngine.getDetachedHead() ? 1 : 0;
    }
    return this.getBranchStackIndex() === 0 ? 1 : 0.0;
  },

  getTextOpacity: function() {
    if (this.get('isHead')) {
      return this.gitEngine.getDetachedHead() ? 1 : 0;
    }
    return 1;
  },

  getAttributes: function() {
    var nonTextOpacity = this.getNonTextOpacity();
    var textOpacity = this.getTextOpacity();
    this.updateName();

    var textPos = this.getTextPosition();
    var rectPos = this.getRectPosition();
    var rectSize = this.getRectSize();

    var arrowPath = this.getArrowPath();

    return {
      text: {
        x: textPos.x,
        y: textPos.y,
        opacity: textOpacity
      },
      rect: {
        x: rectPos.x,
        y: rectPos.y,
        width: rectSize.w,
        height: rectSize.h,
        opacity: nonTextOpacity,
        fill: this.getFill(),
        stroke: this.get('stroke'),
        'stroke-width': this.get('stroke-width')
      },
      arrow: {
        path: arrowPath,
        opacity: nonTextOpacity,
        fill: this.getFill(),
        stroke: this.get('stroke'),
        'stroke-width': this.get('stroke-width')
      }
    };
  },

  animateUpdatedPos: function(speed, easing) {
    var attr = this.getAttributes();
    this.animateToAttr(attr, speed, easing);
  },

  animateFromAttrToAttr: function(fromAttr, toAttr, speed, easing) {
    // an animation of 0 is essentially setting the attribute directly
    this.animateToAttr(fromAttr, 0);
    this.animateToAttr(toAttr, speed, easing);
  },

  animateToAttr: function(attr, speed, easing) {
    if (speed === 0) {
      this.get('text').attr(attr.text);
      this.get('rect').attr(attr.rect);
      this.get('arrow').attr(attr.arrow);
      return;
    }

    var s = speed !== undefined ? speed : this.get('animationSpeed');
    var e = easing || this.get('animationEasing');

    this.get('text').stop().animate(attr.text, s, e);
    this.get('rect').stop().animate(attr.rect, s, e);
    this.get('arrow').stop().animate(attr.arrow, s, e);
  }
});


var VisNode = VisBase.extend({
  defaults: {
    depth: undefined,
    maxWidth: null,
    outgoingEdges: null,

    circle: null,
    text: null,

    id: null,
    pos: null,
    radius: null,

    commit: null,
    animationSpeed: GRAPHICS.defaultAnimationTime,
    animationEasing: GRAPHICS.defaultEasing,

    fill: GRAPHICS.defaultNodeFill,
    'stroke-width': GRAPHICS.defaultNodeStrokeWidth,
    stroke: GRAPHICS.defaultNodeStroke
  },

  getID: function() {
    return this.get('id');
  },

  validateAtInit: function() {
    if (!this.get('id')) {
      throw new Error('need id for mapping');
    }
    if (!this.get('commit')) {
      throw new Error('need commit for linking');
    }

    if (!this.get('pos')) {
      this.set('pos', {
        x: Math.random(),
        y: Math.random()
      });
    }
  },

  initialize: function() {
    this.validateAtInit();
    // shorthand for the main objects
    this.gitVisuals = this.get('gitVisuals');
    this.gitEngine = this.get('gitEngine');

    this.set('outgoingEdges', []);
  },

  setDepth: function(depth) {
    // for merge commits we need to max the depths across all
    this.set('depth', Math.max(this.get('depth') || 0, depth));
  },

  setDepthBasedOn: function(depthIncrement) {
    if (this.get('depth') === undefined) {
      debugger;
      throw new Error('no depth yet!');
    }
    var pos = this.get('pos');
    pos.y = this.get('depth') * depthIncrement;
  },

  getMaxWidthScaled: function() {
    // returns our max width scaled based on if we are visible
    // from a branch or not
    var stat = this.gitVisuals.getCommitUpstreamStatus(this.get('commit'));
    var map = {
      branch: 1,
      head: 0.3,
      none: 0.1
    };
    if (map[stat] === undefined) { throw new Error('bad stat'); }
    return map[stat] * this.get('maxWidth');
  },

  toFront: function() {
    this.get('circle').toFront();
    this.get('text').toFront();
  },

  getOpacity: function() {
    var map = {
      'branch': 1,
      'head': GRAPHICS.upstreamHeadOpacity,
      'none': GRAPHICS.upstreamNoneOpacity
    };

    var stat = this.gitVisuals.getCommitUpstreamStatus(this.get('commit'));
    if (map[stat] === undefined) {
      throw new Error('invalid status');
    }
    return map[stat];
  },

  getTextScreenCoords: function() {
    return this.getScreenCoords();
  },

  getAttributes: function() {
    var pos = this.getScreenCoords();
    var textPos = this.getTextScreenCoords();
    var opacity = this.getOpacity();

    return {
      circle: {
        cx: pos.x,
        cy: pos.y,
        opacity: opacity,
        r: this.getRadius(),
        fill: this.getFill(),
        'stroke-width': this.get('stroke-width'),
        stroke: this.get('stroke')
      },
      text: {
        x: textPos.x,
        y: textPos.y,
        opacity: opacity
      }
    };
  },

  highlightTo: function(visObj, speed, easing) {
    // a small function to highlight the color of a node for demonstration purposes
    var color = visObj.get('fill');

    var attr = {
      circle: {
        fill: color,
        stroke: color,
        'stroke-width': this.get('stroke-width') * 5
      },
      text: {}
    };

    this.animateToAttr(attr, speed, easing);
  },

  animateUpdatedPosition: function(speed, easing) {
    var attr = this.getAttributes();
    this.animateToAttr(attr, speed, easing);
  },

  animateFromAttrToAttr: function(fromAttr, toAttr, speed, easing) {
    // an animation of 0 is essentially setting the attribute directly
    this.animateToAttr(fromAttr, 0);
    this.animateToAttr(toAttr, speed, easing);
  },

  animateToSnapshot: function(snapShot, speed, easing) {
    if (!snapShot[this.getID()]) {
      return;
    }
    this.animateToAttr(snapShot[this.getID()], speed, easing);
  },

  animateToAttr: function(attr, speed, easing) {
    if (speed === 0) {
      this.get('circle').attr(attr.circle);
      this.get('text').attr(attr.text);
      return;
    }

    var s = speed !== undefined ? speed : this.get('animationSpeed');
    var e = easing || this.get('animationEasing');

    this.get('circle').stop().animate(attr.circle, s, e);
    this.get('text').stop().animate(attr.text, s, e);

    // animate the x attribute without bouncing so it looks like there's
    // gravity in only one direction. Just a small animation polish
    this.get('circle').animate(attr.circle.cx, s, 'easeInOut');
    this.get('text').animate(attr.text.x, s, 'easeInOut');
  },

  getScreenCoords: function() {
    var pos = this.get('pos');
    return this.gitVisuals.toScreenCoords(pos);
  },

  getRadius: function() {
    return this.get('radius') || GRAPHICS.nodeRadius;
  },

  getParentScreenCoords: function() {
    return this.get('commit').get('parents')[0].get('visNode').getScreenCoords();
  },

  setBirthPosition: function() {
    // utility method for animating it out from underneath a parent
    var parentCoords = this.getParentScreenCoords();

    this.get('circle').attr({
      cx: parentCoords.x,
      cy: parentCoords.y,
      opacity: 0,
      r: 0
    });
    this.get('text').attr({
      x: parentCoords.x,
      y: parentCoords.y,
      opacity: 0
    });
  },

  setBirthFromSnapshot: function(beforeSnapshot) {
    // first get parent attribute
    // woof bad data access. TODO
    var parentID = this.get('commit').get('parents')[0].get('visNode').getID();
    var parentAttr = beforeSnapshot[parentID];

    // then set myself faded on top of parent
    this.get('circle').attr({
      opacity: 0,
      r: 0,
      cx: parentAttr.circle.cx,
      cy: parentAttr.circle.cy
    });

    this.get('text').attr({
      opacity: 0,
      x: parentAttr.text.x,
      y: parentAttr.text.y
    });

    // then do edges
    var parentCoords = {
      x: parentAttr.circle.cx,
      y: parentAttr.circle.cy
    };
    this.setOutgoingEdgesBirthPosition(parentCoords);
  },

  setBirth: function() {
    this.setBirthPosition();
    this.setOutgoingEdgesBirthPosition(this.getParentScreenCoords());
  },

  setOutgoingEdgesOpacity: function(opacity) {
    _.each(this.get('outgoingEdges'), function(edge) {
      edge.setOpacity(opacity);
    });
  },

  animateOutgoingEdgesToAttr: function(snapShot, speed, easing) {
    _.each(this.get('outgoingEdges'), function(edge) {
      var attr = snapShot[edge.getID()];
      edge.animateToAttr(attr);
    }, this);
  },

  animateOutgoingEdges: function(speed, easing) {
    _.each(this.get('outgoingEdges'), function(edge) {
      edge.animateUpdatedPath(speed, easing);
    }, this);
  },

  animateOutgoingEdgesFromSnapshot: function(snapshot, speed, easing) {
    _.each(this.get('outgoingEdges'), function(edge) {
      var attr = snapshot[edge.getID()];
      edge.animateToAttr(attr, speed, easing);
    }, this);
  },

  setOutgoingEdgesBirthPosition: function(parentCoords) {

    _.each(this.get('outgoingEdges'), function(edge) {
      var headPos = edge.get('head').getScreenCoords();
      var path = edge.genSmoothBezierPathStringFromCoords(parentCoords, headPos);
      edge.get('path').stop().attr({
        path: path,
        opacity: 0
      });
    }, this);
  },

  parentInFront: function() {
    // woof! talk about bad data access
    this.get('commit').get('parents')[0].get('visNode').toFront();
  },

  getFontSize: function(str) {
    if (str.length < 3) {
      return 12;
    } else if (str.length < 5) {
      return 10;
    } else {
      return 8;
    }
  },

  getFill: function() {
    // first get our status, might be easy from this
    var stat = this.gitVisuals.getCommitUpstreamStatus(this.get('commit'));
    if (stat == 'head') {
      return GRAPHICS.headRectFill;
    } else if (stat == 'none') {
      return GRAPHICS.orphanNodeFill;
    }

    // now we need to get branch hues
    return this.gitVisuals.getBlendedHuesForCommit(this.get('commit'));
  },

  attachClickHandlers: function() {
    var commandStr = 'git show ' + this.get('commit').get('id');
    _.each([this.get('circle'), this.get('text')], function(rObj) {
      rObj.click(function() {
        Main.getEvents().trigger('processCommandFromEvent', commandStr);
      });
    });
  },

  setOpacity: function(opacity) {
    opacity = (opacity === undefined) ? 1 : opacity;

    // set the opacity on my stuff
    var keys = ['circle', 'text'];
    _.each(keys, function(key) {
      this.get(key).attr({
        opacity: opacity
      });
    }, this);
  },

  remove: function() {
    this.removeKeys(['circle'], ['text']);
    // needs a manual removal of text for whatever reason
    this.get('text').remove();

    this.gitVisuals.removeVisNode(this);
  },

  removeAll: function() {
    this.remove();
    _.each(this.get('outgoingEdges'), function(edge) {
      edge.remove();
    }, this);
  },

  genGraphics: function() {
    var paper = this.gitVisuals.paper;

    var pos = this.getScreenCoords();
    var textPos = this.getTextScreenCoords();

    var circle = paper.circle(
      pos.x,
      pos.y,
      this.getRadius()
    ).attr(this.getAttributes().circle);

    var text = paper.text(textPos.x, textPos.y, String(this.get('id')));
    text.attr({
      'font-size': this.getFontSize(this.get('id')),
      'font-weight': 'bold',
      'font-family': 'Monaco, Courier, font-monospace',
      opacity: this.getOpacity()
    });

    this.set('circle', circle);
    this.set('text', text);

    this.attachClickHandlers();
  }
});

var VisEdge = VisBase.extend({
  defaults: {
    tail: null,
    head: null,
    animationSpeed: GRAPHICS.defaultAnimationTime,
    animationEasing: GRAPHICS.defaultEasing
  },

  validateAtInit: function() {
    var required = ['tail', 'head'];
    _.each(required, function(key) {
      if (!this.get(key)) {
        throw new Error(key + ' is required!');
      }
    }, this);
  },

  getID: function() {
    return this.get('tail').get('id') + '.' + this.get('head').get('id');
  },

  initialize: function() {
    this.validateAtInit();

    // shorthand for the main objects
    this.gitVisuals = this.get('gitVisuals');
    this.gitEngine = this.get('gitEngine');

    this.get('tail').get('outgoingEdges').push(this);
  },

  remove: function() {
    this.removeKeys(['path']);
    this.gitVisuals.removeVisEdge(this);
  },

  genSmoothBezierPathString: function(tail, head) {
    var tailPos = tail.getScreenCoords();
    var headPos = head.getScreenCoords();
    return this.genSmoothBezierPathStringFromCoords(tailPos, headPos);
  },

  genSmoothBezierPathStringFromCoords: function(tailPos, headPos) {
    // we need to generate the path and control points for the bezier. format
    // is M(move abs) C (curve to) (control point 1) (control point 2) (final point)
    // the control points have to be __below__ to get the curve starting off straight.

    var coords = function(pos) {
      return String(Math.round(pos.x)) + ',' + String(Math.round(pos.y));
    };
    var offset = function(pos, dir, delta) {
      delta = delta || GRAPHICS.curveControlPointOffset;
      return {
        x: pos.x,
        y: pos.y + delta * dir
      };
    };
    var offset2d = function(pos, x, y) {
      return {
        x: pos.x + x,
        y: pos.y + y
      };
    };

    // first offset tail and head by radii
    tailPos = offset(tailPos, -1, this.get('tail').getRadius());
    headPos = offset(headPos, 1, this.get('head').getRadius());

    var str = '';
    // first move to bottom of tail
    str += 'M' + coords(tailPos) + ' ';
    // start bezier
    str += 'C';
    // then control points above tail and below head
    str += coords(offset(tailPos, -1)) + ' ';
    str += coords(offset(headPos, 1)) + ' ';
    // now finish
    str += coords(headPos);

    // arrow head
    var delta = GRAPHICS.arrowHeadSize || 10;
    str += ' L' + coords(offset2d(headPos, -delta, delta));
    str += ' L' + coords(offset2d(headPos, delta, delta));
    str += ' L' + coords(headPos);

    // then go back, so we can fill correctly
    str += 'C';
    str += coords(offset(headPos, 1)) + ' ';
    str += coords(offset(tailPos, -1)) + ' ';
    str += coords(tailPos);

    return str;
  },

  getBezierCurve: function() {
    return this.genSmoothBezierPathString(this.get('tail'), this.get('head'));
  },

  getStrokeColor: function() {
    return GRAPHICS.visBranchStrokeColorNone;
  },

  setOpacity: function(opacity) {
    opacity = (opacity === undefined) ? 1 : opacity;

    this.get('path').attr({opacity: opacity});
  },

  genGraphics: function(paper) {
    var pathString = this.getBezierCurve();

    var path = paper.path(pathString).attr({
      'stroke-width': GRAPHICS.visBranchStrokeWidth,
      'stroke': this.getStrokeColor(),
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round',
      'fill': this.getStrokeColor()
    });
    path.toBack();
    this.set('path', path);
  },

  getOpacity: function() {
    var stat = this.gitVisuals.getCommitUpstreamStatus(this.get('tail'));
    var map = {
      'branch': 1,
      'head': GRAPHICS.edgeUpstreamHeadOpacity,
      'none': GRAPHICS.edgeUpstreamNoneOpacity
    };

    if (map[stat] === undefined) { throw new Error('bad stat'); }
    return map[stat];
  },

  getAttributes: function() {
    var newPath = this.getBezierCurve();
    var opacity = this.getOpacity();
    return {
      path: {
        path: newPath,
        opacity: opacity
      }
    };
  },

  animateUpdatedPath: function(speed, easing) {
    var attr = this.getAttributes();
    this.animateToAttr(attr, speed, easing);
  },

  animateFromAttrToAttr: function(fromAttr, toAttr, speed, easing) {
    // an animation of 0 is essentially setting the attribute directly
    this.animateToAttr(fromAttr, 0);
    this.animateToAttr(toAttr, speed, easing);
  },

  animateToAttr: function(attr, speed, easing) {
    if (speed === 0) {
      this.get('path').attr(attr.path);
      return;
    }

    this.get('path').toBack();
    this.get('path').stop().animate(
      attr.path,
      speed !== undefined ? speed : this.get('animationSpeed'),
      easing || this.get('animationEasing')
    );
  }
});

var VisEdgeCollection = Backbone.Collection.extend({
  model: VisEdge
});

var VisBranchCollection = Backbone.Collection.extend({
  model: VisBranch
});

exports.VisEdgeCollection = VisEdgeCollection;
exports.VisBranchCollection = VisBranchCollection;
exports.VisNode = VisNode;
exports.VisEdge = VisEdge;
exports.VisBranch = VisBranch;


});

require.define("/levels/index.js",function(require,module,exports,__dirname,__filename,process,global){// static class...
function LevelEngine() {

}

LevelEngine.prototype.compareBranchesWithinTrees = function(treeA, treeB, branches) {
  var result = true;
  _.each(branches, function(branchName) {
    result = result && this.compareBranchWithinTrees(treeA, treeB, branchName);
  }, this);

  return result;
};

LevelEngine.prototype.compareBranchWithinTrees = function(treeA, treeB, branchName) {
  treeA = this.convertTreeSafe(treeA);
  treeB = this.convertTreeSafe(treeB);

  this.stripTreeFields([treeA, treeB]);

  // we need a recursive comparison function to bubble up the  branch
  var recurseCompare = function(commitA, commitB) {
    // this is the short-circuit base case
    var result = _.isEqual(commitA, commitB);
    if (!result) {
      return false;
    }

    // we loop through each parent ID. we sort the parent ID's beforehand
    // so the index lookup is valid
    _.each(commitA.parents, function(pAid, index) {
      var pBid = commitB.parents[index];

      var childA = treeA.commits[pAid];
      var childB = treeB.commits[pBid];

      result = result && recurseCompare(childA, childB);
    }, this);
    // if each of our children recursively are equal, we are good
    return result;
  };

  var branchA = treeA.branches[branchName];
  var branchB = treeB.branches[branchName];

  return _.isEqual(branchA, branchB) &&
    recurseCompare(treeA.commits[branchA.target], treeB.commits[branchB.target]);
};

LevelEngine.prototype.convertTreeSafe = function(tree) {
  if (typeof tree == 'string') {
    return JSON.parse(unescape(tree));
  }
  return tree;
};

LevelEngine.prototype.stripTreeFields = function(trees) {
  var stripFields = ['createTime', 'author', 'commitMessage'];
  var sortFields = ['children', 'parents'];

  _.each(trees, function(tree) {
    _.each(tree.commits, function(commit) {
      _.each(stripFields, function(field) {
        commit[field] = undefined;
      });
      _.each(sortFields, function(field) {
        if (commit[field]) {
          commit[field] = commit[field].sort();
        }
      });
    });
  });
};

LevelEngine.prototype.compareTrees = function(treeA, treeB) {
  treeA = this.convertTreeSafe(treeA);
  treeB = this.convertTreeSafe(treeB);

  // now we need to strip out the fields we don't care about, aka things
  // like createTime, message, author
  this.stripTreeFields([treeA, treeB]);

  return _.isEqual(treeA, treeB);
};

var levelEngine = new LevelEngine();

exports.LevelEngine = LevelEngine;


});

require.define("/animation/animationFactory.js",function(require,module,exports,__dirname,__filename,process,global){/******************
 * This class is responsible for a lot of the heavy lifting around creating an animation at a certain state in time.
 * The tricky thing is that when a new commit has to be "born," say in the middle of a rebase
 * or something, it must animate out from the parent position to it's birth position.

 * These two positions though may not be where the commit finally ends up. So we actually need to take a snapshot of the tree,
 * store all those positions, take a snapshot of the tree after a layout refresh afterwards, and then animate between those two spots.
 * and then essentially animate the entire tree too.
 */

var Animation = require('./index').Animation;
var GRAPHICS = require('../util/constants').GRAPHICS;

// essentially a static class
var AnimationFactory = function() {

};

AnimationFactory.prototype.genCommitBirthAnimation = function(animationQueue, commit, gitVisuals) {
  if (!animationQueue) {
    throw new Error("Need animation queue to add closure to!");
  }

  var time = GRAPHICS.defaultAnimationTime * 1.0;
  var bounceTime = time * 2;

  // essentially refresh the entire tree, but do a special thing for the commit
  var visNode = commit.get('visNode');

  var animation = function() {
    // this takes care of refs and all that jazz, and updates all the positions
    gitVisuals.refreshTree(time);

    visNode.setBirth();
    visNode.parentInFront();
    gitVisuals.visBranchesFront();

    visNode.animateUpdatedPosition(bounceTime, 'bounce');
    visNode.animateOutgoingEdges(time);
  };

  animationQueue.add(new Animation({
    closure: animation,
    duration: Math.max(time, bounceTime)
  }));
};

AnimationFactory.prototype.overrideOpacityDepth2 = function(attr, opacity) {
  opacity = (opacity === undefined) ? 1 : opacity;

  var newAttr = {};

  _.each(attr, function(partObj, partName) {
    newAttr[partName] = {};
    _.each(partObj, function(val, key) {
      if (key == 'opacity') {
        newAttr[partName][key] = opacity;
      } else {
        newAttr[partName][key] = val;
      }
    });
  });
  return newAttr;
};

AnimationFactory.prototype.overrideOpacityDepth3 = function(snapShot, opacity) {
  var newSnap = {};

  _.each(snapShot, function(visObj, visID) {
    newSnap[visID] = this.overrideOpacityDepth2(visObj, opacity);
  }, this);
  return newSnap;
};

AnimationFactory.prototype.genCommitBirthClosureFromSnapshot = function(step, gitVisuals) {
  var time = GRAPHICS.defaultAnimationTime * 1.0;
  var bounceTime = time * 1.5;

  var visNode = step.newCommit.get('visNode');
  var afterAttrWithOpacity = this.overrideOpacityDepth2(step.afterSnapshot[visNode.getID()]);
  var afterSnapWithOpacity = this.overrideOpacityDepth3(step.afterSnapshot);

  var animation = function() {
    visNode.setBirthFromSnapshot(step.beforeSnapshot);
    visNode.parentInFront();
    gitVisuals.visBranchesFront();

    visNode.animateToAttr(afterAttrWithOpacity, bounceTime, 'bounce');
    visNode.animateOutgoingEdgesToAttr(afterSnapWithOpacity, bounceTime);
  };

  return animation;
};

AnimationFactory.prototype.refreshTree = function(animationQueue, gitVisuals) {
  animationQueue.add(new Animation({
    closure: function() {
      gitVisuals.refreshTree();
    }
  }));
};

AnimationFactory.prototype.rebaseAnimation = function(animationQueue, rebaseResponse,
                                                      gitEngine, gitVisuals) {

  this.rebaseHighlightPart(animationQueue, rebaseResponse, gitEngine);
  this.rebaseBirthPart(animationQueue, rebaseResponse, gitEngine, gitVisuals);
};

AnimationFactory.prototype.rebaseHighlightPart = function(animationQueue, rebaseResponse, gitEngine) {
  var fullTime = GRAPHICS.defaultAnimationTime * 0.66;
  var slowTime = fullTime * 2.0;

  // we want to highlight all the old commits
  var oldCommits = rebaseResponse.toRebaseArray;
  // we are either highlighting to a visBranch or a visNode
  var visBranch = rebaseResponse.destinationBranch.get('visBranch');
  if (!visBranch) {
    // in the case where we rebase onto a commit
    visBranch = rebaseResponse.destinationBranch.get('visNode');
  }

  _.each(oldCommits, function(oldCommit) {
    var visNode = oldCommit.get('visNode');
    animationQueue.add(new Animation({
      closure: function() {
        visNode.highlightTo(visBranch, slowTime, 'easeInOut');
      },
      duration: fullTime * 1.5
    }));

  }, this);

  this.delay(animationQueue, fullTime * 2);
};

AnimationFactory.prototype.rebaseBirthPart = function(animationQueue, rebaseResponse,
                                                      gitEngine, gitVisuals) {
  var rebaseSteps = rebaseResponse.rebaseSteps;

  var newVisNodes = [];
  _.each(rebaseSteps, function(step) {
    var visNode = step.newCommit.get('visNode');

    newVisNodes.push(visNode);
    visNode.setOpacity(0);
    visNode.setOutgoingEdgesOpacity(0);
  }, this);

  var previousVisNodes = [];
  _.each(rebaseSteps, function(rebaseStep, index) {
    var toOmit = newVisNodes.slice(index + 1);

    var snapshotPart = this.genFromToSnapshotAnimation(
      rebaseStep.beforeSnapshot,
      rebaseStep.afterSnapshot,
      toOmit,
      previousVisNodes,
      gitVisuals
    );
    var birthPart = this.genCommitBirthClosureFromSnapshot(rebaseStep, gitVisuals);

    var animation = function() {
      snapshotPart();
      birthPart();
    };

    animationQueue.add(new Animation({
      closure: animation,
      duration: GRAPHICS.defaultAnimationTime * 1.5
    }));

    previousVisNodes.push(rebaseStep.newCommit.get('visNode'));
  }, this);

  // need to delay to let bouncing finish
  this.delay(animationQueue);

  this.refreshTree(animationQueue, gitVisuals);
};

AnimationFactory.prototype.delay = function(animationQueue, time) {
  time = time || GRAPHICS.defaultAnimationTime;
  animationQueue.add(new Animation({
    closure: function() { },
    duration: time
  }));
};

AnimationFactory.prototype.genSetAllCommitOpacities = function(visNodes, opacity) {
  // need to slice for closure
  var nodesToAnimate = visNodes.slice(0);

  return function() {
    _.each(nodesToAnimate, function(visNode) {
      visNode.setOpacity(opacity);
      visNode.setOutgoingEdgesOpacity(opacity);
    });
  };
};

AnimationFactory.prototype.stripObjectsFromSnapshot = function(snapShot, toOmit) {
  var ids = [];
  _.each(toOmit, function(obj) {
    ids.push(obj.getID());
  });

  var newSnapshot = {};
  _.each(snapShot, function(val, key) {
    if (_.include(ids, key)) {
      // omit
      return;
    }
    newSnapshot[key] = val;
  }, this);
  return newSnapshot;
};

AnimationFactory.prototype.genFromToSnapshotAnimation = function(
  beforeSnapshot,
  afterSnapshot,
  commitsToOmit,
  commitsToFixOpacity,
  gitVisuals) {

  // we want to omit the commit outgoing edges
  var toOmit = [];
  _.each(commitsToOmit, function(visNode) {
    toOmit.push(visNode);
    toOmit = toOmit.concat(visNode.get('outgoingEdges'));
  });

  var fixOpacity = function(obj) {
    if (!obj) { return; }
    _.each(obj, function(attr, partName) {
      obj[partName].opacity = 1;
    });
  };

  // HORRIBLE loop to fix opacities all throughout the snapshot
  _.each([beforeSnapshot, afterSnapshot], function(snapShot) {
    _.each(commitsToFixOpacity, function(visNode) {
      fixOpacity(snapShot[visNode.getID()]);
      _.each(visNode.get('outgoingEdges'), function(visEdge) {
        fixOpacity(snapShot[visEdge.getID()]);
      });
    });
  });

  return function() {
    gitVisuals.animateAllFromAttrToAttr(beforeSnapshot, afterSnapshot, toOmit);
  };
};

exports.AnimationFactory = AnimationFactory;


});
require("/animation/animationFactory.js");

require.define("/animation/index.js",function(require,module,exports,__dirname,__filename,process,global){var GLOBAL = require('../util/constants').GLOBAL;

var Animation = Backbone.Model.extend({
  defaults: {
    duration: 300,
    closure: null
  },

  validateAtInit: function() {
    if (!this.get('closure')) {
      throw new Error('give me a closure!');
    }
  },

  initialize: function(options) {
    this.validateAtInit();
  },

  run: function() {
    this.get('closure')();
  }
});

var AnimationQueue = Backbone.Model.extend({
  defaults: {
    animations: null,
    index: 0,
    callback: null,
    defer: false
  },

  initialize: function(options) {
    this.set('animations', []);
    if (!options.callback) {
      console.warn('no callback');
    }
  },

  add: function(animation) {
    if (!animation instanceof Animation) {
      throw new Error("Need animation not something else");
    }

    this.get('animations').push(animation);
  },

  start: function() {
    this.set('index', 0);

    // set the global lock that we are animating
    GLOBAL.isAnimating = true;
    this.next();
  },

  finish: function() {
    // release lock here
    GLOBAL.isAnimating = false;
    this.get('callback')();
  },

  next: function() {
    // ok so call the first animation, and then set a timeout to call the next
    // TODO: animations with callbacks!!
    var animations = this.get('animations');
    var index = this.get('index');
    if (index >= animations.length) {
      this.finish();
      return;
    }

    var next = animations[index];
    var duration = next.get('duration');

    next.run();

    this.set('index', index + 1);
    setTimeout(_.bind(function() {
      this.next();
    }, this), duration);
  }
});

exports.Animation = Animation;
exports.AnimationQueue = AnimationQueue;


});
require("/animation/index.js");

require.define("/app/index.js",function(require,module,exports,__dirname,__filename,process,global){/**
 * Globals
 */
var events = _.clone(Backbone.Events);
var ui = null;
var mainVis = null;

///////////////////////////////////////////////////////////////////////

$(document).ready(function(){
  var Visuals = require('../visuals');

  ui = new UI();
  mainVis = new Visuals.Visualization({
    el: $('#canvasWrapper')[0]
  });

  if (/\?demo/.test(window.location.href)) {
    setTimeout(function() {
      events.trigger('submitCommandValueFromEvent', "gc; git checkout HEAD~1; git commit; git checkout -b bugFix; gc; gc; git rebase master; git checkout master; gc; gc; git merge bugFix");
    }, 500);
  }
});

function UI() {
  var Collections = require('../collections');
  var CommandViews = require('../views/commandViews');

  this.commandCollection = new Collections.CommandCollection();

  this.commandBuffer = new Collections.CommandBuffer({
    collection: this.commandCollection
  });

  this.commandPromptView = new CommandViews.CommandPromptView({
    el: $('#commandLineBar'),
    collection: this.commandCollection
  });
  this.commandLineHistoryView = new CommandViews.CommandLineHistoryView({
    el: $('#commandLineHistory'),
    collection: this.commandCollection
  });

  $('#commandTextField').focus();
}

exports.getEvents = function() {
  return events;
};
exports.getUI = function() {
  return ui;
};


});
require("/app/index.js");

require.define("/collections/index.js",function(require,module,exports,__dirname,__filename,process,global){var Commit = require('../git').Commit;
var Branch = require('../git').Branch;

var Main = require('../app');
var Command = require('../models/commandModel').Command;
var CommandEntry = require('../models/commandModel').CommandEntry;
var TIME = require('../util/constants').TIME;

var CommitCollection = Backbone.Collection.extend({
  model: Commit
});

var CommandCollection = Backbone.Collection.extend({
  model: Command
});

var BranchCollection = Backbone.Collection.extend({
  model: Branch
});

var CommandEntryCollection = Backbone.Collection.extend({
  model: CommandEntry,
  localStorage: new Backbone.LocalStorage('CommandEntries')
});

var CommandBuffer = Backbone.Model.extend({
  defaults: {
    collection: null
  },

  initialize: function(options) {
    require('../app').getEvents().on('gitCommandReady', _.bind(
      this.addCommand, this
    ));

    options.collection.bind('add', this.addCommand, this);

    this.buffer = [];
    this.timeout = null;
  },

  addCommand: function(command) {
    this.buffer.push(command);
    this.touchBuffer();
  },

  touchBuffer: function() {
    // touch buffer just essentially means we just check if our buffer is being
    // processed. if it's not, we immediately process the first item
    // and then set the timeout.
    if (this.timeout) {
      // timeout existence implies its being processed
      return;
    }
    this.setTimeout();
  },


  setTimeout: function() {
    this.timeout = setTimeout(_.bind(function() {
        this.sipFromBuffer();
    }, this), TIME.betweenCommandsDelay);
  },

  popAndProcess: function() {
    var popped = this.buffer.shift(0);
    var callback = _.bind(function() {
      this.setTimeout();
    }, this);

    // find a command with no error
    while (popped.get('error') && this.buffer.length) {
      popped = this.buffer.pop();
    }
    if (!popped.get('error')) {
      // pass in a callback, so when this command is "done" we will process the next.
      Main.getEvents().trigger('processCommand', popped, callback);
    } else {
      this.clear();
    }
  },

  clear: function() {
    clearTimeout(this.timeout);
    this.timeout = null;
  },

  sipFromBuffer: function() {
    if (!this.buffer.length) {
      this.clear();
      return;
    }

    this.popAndProcess();
  }
});

exports.CommitCollection = CommitCollection;
exports.CommandCollection = CommandCollection;
exports.BranchCollection = BranchCollection;
exports.CommandEntryCollection = CommandEntryCollection;
exports.CommandBuffer = CommandBuffer;


});
require("/collections/index.js");

require.define("/git/index.js",function(require,module,exports,__dirname,__filename,process,global){var AnimationFactoryModule = require('../animation/animationFactory');
var animationFactory = new AnimationFactoryModule.AnimationFactory();
var Main = require('../app');
var AnimationQueue = require('../animation').AnimationQueue;
var InteractiveRebaseView = require('../views/miscViews').InteractiveRebaseView;

var Errors = require('../util/errors');
var GitError = Errors.GitError;
var CommandResult = Errors.CommandResult;

// backbone or something uses _.uniqueId, so we make our own here
var uniqueId = (function() {
  var n = 0;
  return function(prepend) {
    return prepend? prepend + n++ : n++;
  };
})();

function GitEngine(options) {
  this.rootCommit = null;
  this.refs = {};
  this.HEAD = null;

  this.branchCollection = options.branches;
  this.commitCollection = options.collection;
  this.gitVisuals = options.gitVisuals;

  // global variable to keep track of the options given
  // along with the command call.
  this.commandOptions = {};
  this.generalArgs = [];

  Main.getEvents().on('processCommand', _.bind(this.dispatch, this));
}

GitEngine.prototype.defaultInit = function() {
  var defaultTree = JSON.parse(unescape("%7B%22branches%22%3A%7B%22master%22%3A%7B%22target%22%3A%22C1%22%2C%22id%22%3A%22master%22%2C%22type%22%3A%22branch%22%7D%7D%2C%22commits%22%3A%7B%22C0%22%3A%7B%22type%22%3A%22commit%22%2C%22parents%22%3A%5B%5D%2C%22author%22%3A%22Peter%20Cottle%22%2C%22createTime%22%3A%22Mon%20Nov%2005%202012%2000%3A56%3A47%20GMT-0800%20%28PST%29%22%2C%22commitMessage%22%3A%22Quick%20Commit.%20Go%20Bears%21%22%2C%22id%22%3A%22C0%22%2C%22rootCommit%22%3Atrue%7D%2C%22C1%22%3A%7B%22type%22%3A%22commit%22%2C%22parents%22%3A%5B%22C0%22%5D%2C%22author%22%3A%22Peter%20Cottle%22%2C%22createTime%22%3A%22Mon%20Nov%2005%202012%2000%3A56%3A47%20GMT-0800%20%28PST%29%22%2C%22commitMessage%22%3A%22Quick%20Commit.%20Go%20Bears%21%22%2C%22id%22%3A%22C1%22%7D%7D%2C%22HEAD%22%3A%7B%22id%22%3A%22HEAD%22%2C%22target%22%3A%22master%22%2C%22type%22%3A%22general%20ref%22%7D%7D"));
  this.loadTree(defaultTree);
};

GitEngine.prototype.init = function() {
  // make an initial commit and a master branch
  this.rootCommit = this.makeCommit(null, null, {rootCommit: true});
  this.commitCollection.add(this.rootCommit);

  var master = this.makeBranch('master', this.rootCommit);
  this.HEAD = new Ref({
    id: 'HEAD',
    target: master
  });
  this.refs[this.HEAD.get('id')] = this.HEAD;

  // commit once to get things going
  this.commit();
};

GitEngine.prototype.exportTree = function() {
  // need to export all commits, their connectivity / messages, branches, and state of head.
  // this would be simple if didn't have circular structures.... :P
  // thus, we need to loop through and "flatten" our graph of objects referencing one another
  var totalExport = {
    branches: {},
    commits: {},
    HEAD: null
  };

  _.each(this.branchCollection.toJSON(), function(branch) {
    branch.target = branch.target.get('id');
    branch.visBranch = undefined;

    totalExport.branches[branch.id] = branch;
  });

  _.each(this.commitCollection.toJSON(), function(commit) {
    // clear out the fields that reference objects and create circular structure
    _.each(Commit.prototype.constants.circularFields, function(field) {
      commit[field] = undefined;
    }, this);

    // convert parents
    var parents = [];
    _.each(commit.parents, function(par) {
      parents.push(par.get('id'));
    });
    commit.parents = parents;

    totalExport.commits[commit.id] = commit;
  }, this);

  var HEAD = this.HEAD.toJSON();
  HEAD.visBranch = undefined;
  HEAD.lastTarget = HEAD.lastLastTarget = HEAD.visBranch = undefined;
  HEAD.target = HEAD.target.get('id');
  totalExport.HEAD = HEAD;

  return totalExport;
};

GitEngine.prototype.printTree = function() {
  var str = escape(JSON.stringify(this.exportTree()));
  return str;
};

GitEngine.prototype.printAndCopyTree = function() {
  window.prompt('Copy the tree string below', this.printTree());
};

GitEngine.prototype.loadTree = function(tree) {
  // deep copy in case we use it a bunch
  tree = $.extend(true, {}, tree);

  // first clear everything
  this.removeAll();

  this.instantiateFromTree(tree);

  this.reloadGraphics();
};

GitEngine.prototype.loadTreeFromString = function(treeString) {
  this.loadTree(JSON.parse(unescape(treeString)));
};

GitEngine.prototype.instantiateFromTree = function(tree) {
  // now we do the loading part
  var createdSoFar = {};

  _.each(tree.commits, function(commitJSON) {
    var commit = this.getOrMakeRecursive(tree, createdSoFar, commitJSON.id);
    this.commitCollection.add(commit);
  }, this);

  _.each(tree.branches, function(branchJSON) {
    var branch = this.getOrMakeRecursive(tree, createdSoFar, branchJSON.id);

    this.branchCollection.add(branch, {silent: true});
  }, this);

  var HEAD = this.getOrMakeRecursive(tree, createdSoFar, tree.HEAD.id);
  this.HEAD = HEAD;

  this.rootCommit = createdSoFar['C0'];
  if (!this.rootCommit) {
    throw new Error('Need root commit of C0 for calculations');
  }
  this.refs = createdSoFar;

  this.branchCollection.each(function(branch) {
    this.gitVisuals.addBranch(branch);
  }, this);
};

GitEngine.prototype.reloadGraphics = function() {
  // get the root commit, no better way to do it
  var rootCommit = null;
  this.commitCollection.each(function(commit) {
    if (commit.get('id') == 'C0') {
      rootCommit = commit;
    }
  });
  this.gitVisuals.rootCommit = rootCommit;

  // this just basically makes the HEAD branch. the head branch really should have been
  // a member of a collection and not this annoying edge case stuff... one day
  this.gitVisuals.initHeadBranch();

  // when the paper is ready
  this.gitVisuals.drawTreeFromReload();

  this.gitVisuals.refreshTreeHarsh();
};

GitEngine.prototype.getOrMakeRecursive = function(tree, createdSoFar, objID) {
  if (createdSoFar[objID]) {
    // base case
    return createdSoFar[objID];
  }

  var getType = function(tree, id) {
    if (tree.commits[id]) {
      return 'commit';
    } else if (tree.branches[id]) {
      return 'branch';
    } else if (id == 'HEAD') {
      return 'HEAD';
    }
    throw new Error("bad type for " + id);
  };

  // figure out what type
  var type = getType(tree, objID);

  if (type == 'HEAD') {
    var headJSON = tree.HEAD;
    var HEAD = new Ref(_.extend(
      tree.HEAD,
      {
        target: this.getOrMakeRecursive(tree, createdSoFar, headJSON.target)
      }
    ));
    createdSoFar[objID] = HEAD;
    return HEAD;
  }

  if (type == 'branch') {
    var branchJSON = tree.branches[objID];

    var branch = new Branch(_.extend(
      tree.branches[objID],
      {
        target: this.getOrMakeRecursive(tree, createdSoFar, branchJSON.target)
      }
    ));
    createdSoFar[objID] = branch;
    return branch;
  }

  if (type == 'commit') {
    // for commits, we need to grab all the parents
    var commitJSON = tree.commits[objID];

    var parentObjs = [];
    _.each(commitJSON.parents, function(parentID) {
      parentObjs.push(this.getOrMakeRecursive(tree, createdSoFar, parentID));
    }, this);

    var commit = new Commit(_.extend(
      commitJSON,
      {
        parents: parentObjs,
        gitVisuals: this.gitVisuals
      }
    ));
    createdSoFar[objID] = commit;
    return commit;
  }

  throw new Error('ruh rho!! unsupported tyep for ' + objID);
};

GitEngine.prototype.removeAll = function() {
  this.branchCollection.reset();
  this.commitCollection.reset();
  this.refs = {};
  this.HEAD = null;
  this.rootCommit = null;

  this.gitVisuals.resetAll();
};

GitEngine.prototype.getDetachedHead = function() {
  // detached head is if HEAD points to a commit instead of a branch...
  var target = this.HEAD.get('target');
  var targetType = target.get('type');
  return targetType !== 'branch';
};

GitEngine.prototype.validateBranchName = function(name) {
  name = name.replace(/\s/g, '');
  if (!/^[a-zA-Z0-9]+$/.test(name)) {
    throw new GitError({
      msg: 'woah bad branch name!! This is not ok: ' + name
    });
  }
  if (/[hH][eE][aA][dD]/.test(name)) {
    throw new GitError({
      msg: 'branch name of "head" is ambiguous, dont name it that'
    });
  }
  if (name.length > 9) {
    name = name.slice(0, 9);
    this.command.addWarning(
      'Sorry, we need to keep branch names short for the visuals. Your branch ' +
      'name was truncated to 9 characters, resulting in ' + name
    );
  }
  return name;
};

GitEngine.prototype.makeBranch = function(id, target) {
  id = this.validateBranchName(id);
  if (this.refs[id]) {
    throw new GitError({
      msg: 'that branch id either matches a commit hash or already exists!'
    });
  }

  var branch = new Branch({
    target: target,
    id: id
  });
  this.branchCollection.add(branch);
  this.refs[branch.get('id')] = branch;
  return branch;
};

GitEngine.prototype.getHead = function() {
  return _.clone(this.HEAD);
};

GitEngine.prototype.getBranches = function() {
  var toReturn = [];
  this.branchCollection.each(function(branch) {
    toReturn.push({
      id: branch.get('id'),
      selected: this.HEAD.get('target') === branch,
      target: branch.get('target'),
      obj: branch
    });
  }, this);
  return toReturn;
};

GitEngine.prototype.printBranchesWithout = function(without) {
  var commitToBranches = this.getUpstreamBranchSet();
  var commitID = this.getCommitFromRef(without).get('id');

  var toPrint = [];
  _.each(commitToBranches[commitID], function(branchJSON) {
    branchJSON.selected = this.HEAD.get('target').get('id') == branchJSON.id;
    toPrint.push(branchJSON);
  }, this);
  this.printBranches(toPrint);
};

GitEngine.prototype.printBranches = function(branches) {
  var result = '';
  _.each(branches, function(branch) {
    result += (branch.selected ? '* ' : '') + branch.id + '\n';
  });
  throw new CommandResult({
    msg: result
  });
};

GitEngine.prototype.makeCommit = function(parents, id, options) {
  // ok we need to actually manually create commit IDs now because
  // people like nikita (thanks for finding this!) could
  // make branches named C2 before creating the commit C2
  if (!id) {
    id = uniqueId('C');
    while (this.refs[id]) {
      id = uniqueId('C');
    }
  }

  var commit = new Commit(_.extend({
      parents: parents,
      id: id,
      gitVisuals: this.gitVisuals
    },
    options || {}
  ));

  this.refs[commit.get('id')] = commit;
  this.commitCollection.add(commit);
  return commit;
};

GitEngine.prototype.acceptNoGeneralArgs = function() {
  if (this.generalArgs.length) {
    throw new GitError({
      msg: "That command accepts no general arguments"
    });
  }
};

GitEngine.prototype.validateArgBounds = function(args, lower, upper, option) {
  // this is a little utility class to help arg validation that happens over and over again
  var what = (option === undefined) ?
    'git ' + this.command.get('method') :
    this.command.get('method') + ' ' + option + ' ';
  what = 'with ' + what;

  if (args.length < lower) {
    throw new GitError({
      msg: 'I expect at least ' + String(lower) + ' argument(s) ' + what
    });
  }
  if (args.length > upper) {
    throw new GitError({
      msg: 'I expect at most ' + String(upper) + ' argument(s) ' + what
    });
  }
};

GitEngine.prototype.oneArgImpliedHead = function(args, option) {
  // for log, show, etc
  this.validateArgBounds(args, 0, 1, option);
  if (args.length === 0) {
    args.push('HEAD');
  }
};

GitEngine.prototype.twoArgsImpliedHead = function(args, option) {
  // our args we expect to be between 1 and 2
  this.validateArgBounds(args, 1, 2, option);
  // and if it's one, add a HEAD to the back
  if (args.length == 1) {
    args.push('HEAD');
  }
};

GitEngine.prototype.revertStarter = function() {
  this.validateArgBounds(this.generalArgs, 1, NaN);

  var response = this.revert(this.generalArgs);

  if (response) {
    animationFactory.rebaseAnimation(this.animationQueue, response, this, this.gitVisuals);
  }
};

GitEngine.prototype.revert = function(whichCommits) {
  // for each commit, we want to revert it
  var toRebase = [];
  _.each(whichCommits, function(stringRef) {
    toRebase.push(this.getCommitFromRef(stringRef));
  }, this);

  // we animate reverts now!! we use the rebase animation though so that's
  // why the terminology is like it is
  var animationResponse = {};
  animationResponse.destinationBranch = this.resolveID(toRebase[0]);
  animationResponse.toRebaseArray = toRebase.slice(0);
  animationResponse.rebaseSteps = [];

  var beforeSnapshot = this.gitVisuals.genSnapshot();
  var afterSnapshot;

  // now make a bunch of commits on top of where we are
  var base = this.getCommitFromRef('HEAD');
  _.each(toRebase, function(oldCommit) {
    var newId = this.rebaseAltID(oldCommit.get('id'));

    var newCommit = this.makeCommit([base], newId, {
        commitMessage: 'Reverting ' + this.resolveName(oldCommit) +
          ': "' + oldCommit.get('commitMessage') + '"'
    });

    base = newCommit;

    // animation stuff
    afterSnapshot = this.gitVisuals.genSnapshot();
    animationResponse.rebaseSteps.push({
      oldCommit: oldCommit,
      newCommit: newCommit,
      beforeSnapshot: beforeSnapshot,
      afterSnapshot: afterSnapshot
    });
    beforeSnapshot = afterSnapshot;
  }, this);
  // done! update our location
  this.setTargetLocation('HEAD', base);

  // animation
  return animationResponse;
};

GitEngine.prototype.resetStarter = function() {
  if (this.commandOptions['--soft']) {
    throw new GitError({
      msg: "You can't use --soft because there is no concept of stashing" +
           " changes or staging files, so you will lose your progress." +
           " Try using interactive rebasing (or just rebasing) to move commits."
    });
  }
  if (this.commandOptions['--hard']) {
    this.command.addWarning(
      'Nice! You are using --hard. The default behavior is a hard reset in ' +
      "this demo, so don't worry about specifying the option explicity"
    );
    // dont absorb the arg off of --hard
    this.generalArgs = this.generalArgs.concat(this.commandOptions['--hard']);
  }

  this.validateArgBounds(this.generalArgs, 1, 1);

  if (this.getDetachedHead()) {
    throw new GitError({
      msg: "Cant reset in detached head! Use checkout if you want to move"
    });
  }

  this.reset(this.generalArgs[0]);
};

GitEngine.prototype.reset = function(target) {
  this.setTargetLocation('HEAD', this.getCommitFromRef(target));
};

GitEngine.prototype.cherrypickStarter = function() {
  this.validateArgBounds(this.generalArgs, 1, 1);
  var newCommit = this.cherrypick(this.generalArgs[0]);

  animationFactory.genCommitBirthAnimation(this.animationQueue, newCommit, this.gitVisuals);
};

GitEngine.prototype.cherrypick = function(ref) {
  var commit = this.getCommitFromRef(ref);
  // check if we already have that
  var set = this.getUpstreamSet('HEAD');
  if (set[commit.get('id')]) {
    throw new GitError({
      msg: "We already have that commit in our changes history! You can't cherry-pick it " +
           "if it shows up in git log."
    });
  }

  // alter the ID slightly
  var id = this.rebaseAltID(commit.get('id'));

  // now commit with that id onto HEAD
  var newCommit = this.makeCommit([this.getCommitFromRef('HEAD')], id);
  this.setTargetLocation(this.HEAD, newCommit);
  return newCommit;
};

GitEngine.prototype.commitStarter = function() {
  this.acceptNoGeneralArgs();
  if (this.commandOptions['-am'] && (
      this.commandOptions['-a'] || this.commandOptions['-m'])) {
    throw new GitError({
      msg: "You can't have -am with another -m or -a!"
    });
  }

  var msg = null;
  var args = null;
  if (this.commandOptions['-a']) {
    this.command.addWarning('No need to add files in this demo');
  }

  if (this.commandOptions['-am']) {
    args = this.commandOptions['-am'];
    this.validateArgBounds(args, 1, 1, '-am');

    this.command.addWarning("Don't worry about adding files in this demo. I'll take " +
      "down your commit message anyways, but you can commit without a message " +
      "in this demo as well");
    msg = args[0];
  }

  if (this.commandOptions['-m']) {
    args = this.commandOptions['-m'];
    this.validateArgBounds(args, 1, 1, '-m');
    msg = args[0];
  }

  var newCommit = this.commit();
  if (msg) {
    msg = msg
      .replace(/&quot;/g, '"')
      .replace(/^"/g, '')
      .replace(/"$/g, '');

    newCommit.set('commitMessage', msg);
  }
  animationFactory.genCommitBirthAnimation(this.animationQueue, newCommit, this.gitVisuals);
};

GitEngine.prototype.commit = function() {
  var targetCommit = this.getCommitFromRef(this.HEAD);
  var id = null;

  // if we want to ammend, go one above
  if (this.commandOptions['--amend']) {
    targetCommit = this.resolveID('HEAD~1');
    id = this.rebaseAltID(this.getCommitFromRef('HEAD').get('id'));
  }

  var newCommit = this.makeCommit([targetCommit], id);
  if (this.getDetachedHead()) {
    this.command.addWarning('Warning!! Detached HEAD state');
  }

  this.setTargetLocation(this.HEAD, newCommit);
  return newCommit;
};

GitEngine.prototype.resolveName = function(someRef) {
  // first get the obj
  var obj = this.resolveID(someRef);
  if (obj.get('type') == 'commit') {
    return 'commit ' + obj.get('id');
  }
  if (obj.get('type') == 'branch') {
    return 'branch "' + obj.get('id') + '"';
  }
  // we are dealing with HEAD
  return this.resolveName(obj.get('target'));
};

GitEngine.prototype.resolveID = function(idOrTarget) {
  if (idOrTarget === null || idOrTarget === undefined) {
    throw new Error('Dont call this with null / undefined');
  }

  if (typeof idOrTarget !== 'string') {
    return idOrTarget;
  }
  return this.resolveStringRef(idOrTarget);
};

GitEngine.prototype.resolveStringRef = function(ref) {
  if (this.refs[ref]) {
    return this.refs[ref];
  }

  // may be something like HEAD~2 or master^^
  var relativeRefs = [
    [/^([a-zA-Z0-9]+)~(\d+)\s*$/, function(matches) {
      return parseInt(matches[2], 10);
    }],
    [/^([a-zA-Z0-9]+)(\^+)\s*$/, function(matches) {
      return matches[2].length;
    }]
  ];

  var startRef = null;
  var numBack = null;
  _.each(relativeRefs, function(config) {
    var regex = config[0];
    var parse = config[1];
    if (regex.test(ref)) {
      var matches = regex.exec(ref);
      numBack = parse(matches);
      startRef = matches[1];
    }
  }, this);

  if (!startRef) {
    throw new GitError({
      msg: 'unknown ref ' + ref
    });
  }
  if (!this.refs[startRef]) {
    throw new GitError({
      msg: 'the ref ' + startRef +' does not exist.'
    });
  }
  var commit = this.getCommitFromRef(startRef);

  return this.numBackFrom(commit, numBack);
};

GitEngine.prototype.getCommitFromRef = function(ref) {
  var start = this.resolveID(ref);

  // works for both HEAD and just a single layer. aka branch
  while (start.get('type') !== 'commit') {
    start = start.get('target');
  }
  return start;
};

GitEngine.prototype.getType = function(ref) {
  return this.resolveID(ref).get('type');
};

GitEngine.prototype.setTargetLocation = function(ref, target) {
  if (this.getType(ref) == 'commit') {
    // nothing to do
    return;
  }

  // sets whatever ref is (branch, HEAD, etc) to a target. so if
  // you pass in HEAD, and HEAD is pointing to a branch, it will update
  // the branch to that commit, not the HEAD
  ref = this.getOneBeforeCommit(ref);
  ref.set('target', target);
};

GitEngine.prototype.getUpstreamBranchSet = function() {
  // this is expensive!! so only call once in a while
  var commitToSet = {};

  var inArray = function(arr, id) {
    var found = false;
    _.each(arr, function(wrapper) {
      if (wrapper.id == id) {
        found = true;
      }
    });

    return found;
  };

  var bfsSearch = function(commit) {
    var set = [];
    var pQueue = [commit];
    while (pQueue.length) {
      var popped = pQueue.pop();
      set.push(popped.get('id'));

      if (popped.get('parents') && popped.get('parents').length) {
        pQueue = pQueue.concat(popped.get('parents'));
      }
    }
    return set;
  };

  this.branchCollection.each(function(branch) {
    var set = bfsSearch(branch.get('target'));
    _.each(set, function(id) {
      commitToSet[id] = commitToSet[id] || [];

      // only add it if it's not there, so hue blending is ok
      if (!inArray(commitToSet[id], branch.get('id'))) {
        commitToSet[id].push({
          obj: branch,
          id: branch.get('id')
        });
      }
    });
  });

  return commitToSet;
};

GitEngine.prototype.getUpstreamHeadSet = function() {
  var set = this.getUpstreamSet('HEAD');
  var including = this.getCommitFromRef('HEAD').get('id');

  set[including] = true;
  return set;
};

GitEngine.prototype.getOneBeforeCommit = function(ref) {
  // you can call this command on HEAD in detached, HEAD, or on a branch
  // and it will return the ref that is one above a commit. aka
  // it resolves HEAD to something that we can move the ref with
  var start = this.resolveID(ref);
  if (start === this.HEAD && !this.getDetachedHead()) {
    start = start.get('target');
  }
  return start;
};

GitEngine.prototype.numBackFrom = function(commit, numBack) {
  // going back '3' from a given ref is not trivial, for you might have
  // a bunch of merge commits and such. like this situation:
  //
  //      * merge master into new
  //      |\
  //      | \* commit here
  //      |* \ commit there
  //      |  |* commit here
  //      \ /
  //       | * root
  //
  //
  // hence we need to do a BFS search, with the commit date being the
  // value to sort off of (rather than just purely the level)
  if (numBack === 0) {
    return commit;
  }

  // we use a special sorting function here that
  // prefers the later commits over the earlier ones
  var sortQueue = _.bind(function(queue) {
    queue.sort(this.idSortFunc);
    queue.reverse();
  }, this);

  var pQueue = [].concat(commit.get('parents') || []);
  sortQueue(pQueue);
  numBack--;

  while (pQueue.length && numBack !== 0) {
    var popped = pQueue.shift(0);
    var parents = popped.get('parents');

    if (parents && parents.length) {
      pQueue = pQueue.concat(parents);
    }

    sortQueue(pQueue);
    numBack--;
  }

  if (numBack !== 0 || pQueue.length === 0) {
    throw new GitError({
      msg: "Sorry, I can't go that many commits back"
    });
  }
  return pQueue.shift(0);
};

GitEngine.prototype.scrapeBaseID = function(id) {
  var results = /^C(\d+)/.exec(id);

  if (!results) {
    throw new Error('regex failed on ' + id);
  }

  return 'C' + results[1];
};

GitEngine.prototype.rebaseAltID = function(id) {
  // this function alters an ID to add a quote to the end,
  // indicating that it was rebased. it also checks existence
  var regexMap = [
    [/^C(\d+)[']{0,2}$/, function(bits) {
      // this id can use another quote, so just add it
      return bits[0] + "'";
    }],
    [/^C(\d+)[']{3}$/, function(bits) {
      // here we switch from C''' to C'^4
      return bits[0].slice(0, -3) + "'^4";
    }],
    [/^C(\d+)['][\^](\d+)$/, function(bits) {
      return 'C' + String(bits[1]) + "'^" + String(Number(bits[2]) + 1);
    }]
  ];

  for (var i = 0; i < regexMap.length; i++) {
    var regex = regexMap[i][0];
    var func = regexMap[i][1];
    var results = regex.exec(id);
    if (results) {
      var newId = func(results);
      // if this id exists, continue down the rabbit hole
      if (this.refs[newId]) {
        return this.rebaseAltID(newId);
      } else {
        return newId;
      }
    }
  }
  throw new Error('could not modify the id ' + id);
};

GitEngine.prototype.idSortFunc = function(cA, cB) {
  // commit IDs can come in many forms:
  //  C4
  //  C4' (from a rebase)
  //  C4'' (from multiple rebases)
  //  C4'^3 (from a BUNCH of rebases)

  var scale = 1000;

  var regexMap = [
    [/^C(\d+)$/, function(bits) {
      // return the 4 from C4
      return scale * bits[1];
    }],
    [/^C(\d+)([']+)$/, function(bits) {
      // return the 4 from C4, plus the length of the quotes
      return scale * bits[1] + bits[2].length;
    }],
    [/^C(\d+)['][\^](\d+)$/, function(bits) {
      return scale * bits[1] + Number(bits[2]);
    }]
  ];

  var getNumToSort = function(id) {
    for (var i = 0; i < regexMap.length; i++) {
      var regex = regexMap[i][0];
      var func = regexMap[i][1];
      var results = regex.exec(id);
      if (results) {
        return func(results);
      }
    }
    throw new Error('Could not parse commit ID ' + id);
  };

  return getNumToSort(cA.get('id')) - getNumToSort(cB.get('id'));
};

GitEngine.prototype.rebaseInteractiveStarter = function() {
  var args = this.commandOptions['-i'];
  this.twoArgsImpliedHead(args, ' -i');

  this.rebaseInteractive(args[0], args[1]);
};

GitEngine.prototype.rebaseStarter = function() {
  if (this.commandOptions['-i']) {
    this.rebaseInteractiveStarter();
    return;
  }

  this.twoArgsImpliedHead(this.generalArgs);

  var response = this.rebase(this.generalArgs[0], this.generalArgs[1]);

  if (response === undefined) {
    // was a fastforward or already up to date. returning now
    // will trigger the refresh animation by not adding anything to
    // the animation queue
    return;
  }

  animationFactory.rebaseAnimation(this.animationQueue, response, this, this.gitVisuals);
};

GitEngine.prototype.rebase = function(targetSource, currentLocation) {
  // first some conditions
  if (this.isUpstreamOf(targetSource, currentLocation)) {
    this.command.setResult('Branch already up-to-date');

    // git for some reason always checks out the branch you are rebasing,
    // no matter the result of the rebase
    this.checkout(currentLocation);

    // returning instead of throwing makes a tree refresh
    return;
  }

  if (this.isUpstreamOf(currentLocation, targetSource)) {
    // just set the target of this current location to the source
    this.setTargetLocation(currentLocation, this.getCommitFromRef(targetSource));
    // we need the refresh tree animation to happen, so set the result directly
    // instead of throwing
    this.command.setResult('Fast-forwarding...');

    this.checkout(currentLocation);
    return;
  }

   // now the part of actually rebasing.
  // We need to get the downstream set of targetSource first.
  // then we BFS from currentLocation, using the downstream set as our stopping point.
  // we need to BFS because we need to include all commits below
  // pop these commits on top of targetSource and modify their ids with quotes
  var stopSet = this.getUpstreamSet(targetSource);

  // now BFS from here on out
  var toRebaseRough = [];
  var pQueue = [this.getCommitFromRef(currentLocation)];

  while (pQueue.length) {
    var popped = pQueue.pop();

    // if its in the set, dont add it
    if (stopSet[popped.get('id')]) {
      continue;
    }

    // it's not in the set, so we need to rebase this commit
    toRebaseRough.push(popped);
    toRebaseRough.sort(this.idSortFunc);
    toRebaseRough.reverse();
    // keep searching
    pQueue = pQueue.concat(popped.get('parents'));
  }

  return this.rebaseFinish(toRebaseRough, stopSet, targetSource, currentLocation);
};

GitEngine.prototype.rebaseInteractive = function(targetSource, currentLocation) {
  // there are a reduced set of checks now, so we can't exactly use parts of the rebase function
  // but it will look similar.

  // first if we are upstream of the target
  if (this.isUpstreamOf(currentLocation, targetSource)) {
    throw new GitError({
      msg: 'Nothing to do... (git throws a "noop" status here); ' +
        'Your source is upstream of your rebase target'
    });
  }

  // now get the stop set
  var stopSet = this.getUpstreamSet(targetSource);

  var toRebaseRough = [];
  // standard BFS
  var pQueue = [this.getCommitFromRef(currentLocation)];

  while (pQueue.length) {
    var popped = pQueue.pop();

    if (stopSet[popped.get('id')]) {
      continue;
    }

    toRebaseRough.push(popped);
    pQueue = pQueue.concat(popped.get('parents'));
    pQueue.sort(this.idSortFunc);
  }

  // throw our merge's real fast and see if we have anything to do
  var toRebase = [];
  _.each(toRebaseRough, function(commit) {
    if (commit.get('parents').length == 1) {
      toRebase.push(commit);
    }
  });

  if (!toRebase.length) {
    throw new GitError({
      msg: 'No commits to rebase! Everything is a merge commit'
    });
  }

  // now do stuff :D since all our validation checks have passed, we are going to defer animation
  // and actually launch the dialog
  this.animationQueue.set('defer', true);

  var callback = _.bind(function(userSpecifiedRebase) {
    // first, they might have dropped everything (annoying)
    if (!userSpecifiedRebase.length) {
      this.command.setResult('Nothing to do...');
      this.animationQueue.start();
      return;
    }

    // finish the rebase crap and animate!
    var animationData = this.rebaseFinish(userSpecifiedRebase, {}, targetSource, currentLocation);
    animationFactory.rebaseAnimation(this.animationQueue, animationData, this, this.gitVisuals);
    this.animationQueue.start();
  }, this);

  new InteractiveRebaseView({
    callback: callback,
    toRebase: toRebase,
    el: $('#dialogHolder')
  });
};

GitEngine.prototype.rebaseFinish = function(toRebaseRough, stopSet, targetSource, currentLocation) {
  // now we have the all the commits between currentLocation and the set of target to rebase.
  var animationResponse = {};
  animationResponse.destinationBranch = this.resolveID(targetSource);

  // we need to throw out merge commits
  var toRebase = [];
  _.each(toRebaseRough, function(commit) {
    if (commit.get('parents').length == 1) {
      toRebase.push(commit);
    }
  });

  // we ALSO need to throw out commits that will do the same changes. like
  // if the upstream set has a commit C4 and we have C4', we dont rebase the C4' again.
  // get this by doing ID scraping
  var changesAlreadyMade = {};
  _.each(stopSet, function(val, key) {
    changesAlreadyMade[this.scrapeBaseID(key)] = val; // val == true
  }, this);

  // now get rid of the commits that will redo same changes
  toRebaseRough = toRebase;
  toRebase = [];
  _.each(toRebaseRough, function(commit) {
    var baseID = this.scrapeBaseID(commit.get('id'));
    if (!changesAlreadyMade[baseID]) {
      toRebase.push(commit);
    }
  }, this);

  if (!toRebase.length) {
    throw new GitError({
      msg: 'No Commits to Rebase! Everything else is merge commits or changes already have been applied'
    });
  }

  // now reverse it once more to get it in the right order
  toRebase.reverse();
  animationResponse.toRebaseArray = toRebase.slice(0);

  // now pop all of these commits onto targetLocation
  var base = this.getCommitFromRef(targetSource);

  // do the rebase, and also maintain all our animation info during this
  animationResponse.rebaseSteps = [];
  var beforeSnapshot = this.gitVisuals.genSnapshot();
  var afterSnapshot;
  _.each(toRebase, function(old) {
    var newId = this.rebaseAltID(old.get('id'));

    var newCommit = this.makeCommit([base], newId);
    base = newCommit;

    // animation info
    afterSnapshot = this.gitVisuals.genSnapshot();
    animationResponse.rebaseSteps.push({
      oldCommit: old,
      newCommit: newCommit,
      beforeSnapshot: beforeSnapshot,
      afterSnapshot: afterSnapshot
    });
    beforeSnapshot = afterSnapshot;
  }, this);

  if (this.resolveID(currentLocation).get('type') == 'commit') {
    // we referenced a commit like git rebase C2 C1, so we have
    // to manually check out C1'

    var steps = animationResponse.rebaseSteps;
    var newestCommit = steps[steps.length - 1].newCommit;

    this.checkout(newestCommit);
  } else {
    // now we just need to update the rebased branch is
    this.setTargetLocation(currentLocation, base);
    this.checkout(currentLocation);
  }

  // for animation
  return animationResponse;
};

GitEngine.prototype.mergeStarter = function() {
  this.twoArgsImpliedHead(this.generalArgs);

  var newCommit = this.merge(this.generalArgs[0], this.generalArgs[1]);

  if (newCommit === undefined) {
    // its just a fast forwrard
    animationFactory.refreshTree(this.animationQueue, this.gitVisuals);
    return;
  }

  animationFactory.genCommitBirthAnimation(this.animationQueue, newCommit, this.gitVisuals);
};

GitEngine.prototype.merge = function(targetSource, currentLocation) {
  // first some conditions
  if (this.isUpstreamOf(targetSource, currentLocation) ||
      this.getCommitFromRef(targetSource) === this.getCommitFromRef(currentLocation)) {
    throw new CommandResult({
      msg: 'Branch already up-to-date'
    });
  }

  if (this.isUpstreamOf(currentLocation, targetSource)) {
    // just set the target of this current location to the source
    this.setTargetLocation(currentLocation, this.getCommitFromRef(targetSource));
    // get fresh animation to happen
    this.command.setResult('Fast-forwarding...');
    return;
  }

  // now the part of making a merge commit
  var parent1 = this.getCommitFromRef(currentLocation);
  var parent2 = this.getCommitFromRef(targetSource);

  // we need a fancy commit message
  var msg = 'Merge ' + this.resolveName(targetSource) +
    ' into ' + this.resolveName(currentLocation);

  // since we specify parent 1 as the first parent, it is the "main" parent
  // and the node will be displayed below that branch / commit / whatever
  var mergeCommit = this.makeCommit(
    [parent1, parent2],
    null,
    {
      commitMessage: msg
    }
  );

  this.setTargetLocation(currentLocation, mergeCommit);
  return mergeCommit;
};

GitEngine.prototype.checkoutStarter = function() {
  var args = null;
  if (this.commandOptions['-b']) {
    // the user is really trying to just make a branch and then switch to it. so first:
    args = this.commandOptions['-b'];
    this.twoArgsImpliedHead(args, '-b');

    var validId = this.validateBranchName(args[0]);
    this.branch(validId, args[1]);
    this.checkout(validId);
    return;
  }

  if (this.commandOptions['-']) {
    // get the heads last location
    var lastPlace = this.HEAD.get('lastLastTarget');
    if (!lastPlace) {
      throw new GitError({
        msg: 'Need a previous location to do - switching'
      });
    }
    this.HEAD.set('target', lastPlace);
    return;
  }

  if (this.commandOptions['-B']) {
    args = this.commandOptions['-B'];
    this.twoArgsImpliedHead(args, '-B');

    this.forceBranch(args[0], args[1]);
    this.checkout(args[0]);
    return;
  }

  this.validateArgBounds(this.generalArgs, 1, 1);

  this.checkout(this.unescapeQuotes(this.generalArgs[0]));
};

GitEngine.prototype.checkout = function(idOrTarget) {
  var target = this.resolveID(idOrTarget);
  if (target.get('id') === 'HEAD') {
    // git checkout HEAD is a
    // meaningless command but i used to do this back in the day
    return;
  }

  var type = target.get('type');
  if (type !== 'branch' && type !== 'commit') {
    throw new GitError({
      msg: 'can only checkout branches and commits!'
    });
  }

  this.HEAD.set('target', target);
};

GitEngine.prototype.branchStarter = function() {
  var args = null;
  // handle deletion first
  if (this.commandOptions['-d'] || this.commandOptions['-D']) {
    var names = this.commandOptions['-d'] || this.commandOptions['-D'];
    this.validateArgBounds(names, 1, NaN, '-d');

    _.each(names, function(name) {
      this.deleteBranch(name);
    }, this);
    return;
  }

  if (this.commandOptions['--contains']) {
    args = this.commandOptions['--contains'];
    this.validateArgBounds(args, 1, 1, '--contains');
    this.printBranchesWithout(args[0]);
    return;
  }

  if (this.commandOptions['-f']) {
    args = this.commandOptions['-f'];
    this.twoArgsImpliedHead(args, '-f');

    // we want to force a branch somewhere
    this.forceBranch(args[0], args[1]);
    return;
  }


  if (this.generalArgs.length === 0) {
    this.printBranches(this.getBranches());
    return;
  }

  this.twoArgsImpliedHead(this.generalArgs);
  this.branch(this.generalArgs[0], this.generalArgs[1]);
};

GitEngine.prototype.forceBranch = function(branchName, where) {
  // if branchname doesn't exist...
  if (!this.refs[branchName]) {
    this.branch(branchName, where);
  }

  var branch = this.resolveID(branchName);
  if (branch.get('type') !== 'branch') {
    throw new GitError({
      msg: "Can't force move anything but a branch!!"
    });
  }

  var whereCommit = this.getCommitFromRef(where);

  this.setTargetLocation(branch, whereCommit);
};

GitEngine.prototype.branch = function(name, ref) {
  var target = this.getCommitFromRef(ref);
  this.makeBranch(name, target);
};

GitEngine.prototype.deleteBranch = function(name) {
  // trying to delete, lets check our refs
  var target = this.resolveID(name);
  if (target.get('type') !== 'branch') {
    throw new GitError({
      msg: "You can't delete things that arent branches with branch command"
    });
  }
  if (target.get('id') == 'master') {
    throw new GitError({
      msg: "You can't delete the master branch!"
    });
  }
  if (this.HEAD.get('target') === target) {
    throw new GitError({
      msg: "Cannot delete the branch you are currently on"
    });
  }

  // now we know it's a branch
  var branch = target;

  this.branchCollection.remove(branch);
  this.refs[branch.get('id')] = undefined;
  delete this.refs[branch.get('id')];

  if (branch.get('visBranch')) {
    branch.get('visBranch').remove();
  }
};

GitEngine.prototype.unescapeQuotes = function(str) {
  return str.replace(/&#x27;/g, "'");
};

GitEngine.prototype.dispatch = function(command, callback) {
  // current command, options, and args are stored in the gitEngine
  // for easy reference during processing.
  this.command = command;
  this.commandOptions = command.get('supportedMap');
  this.generalArgs = command.get('generalArgs');

  // set up the animation queue
  var whenDone = _.bind(function() {
    command.set('status', 'finished');
    callback();
  }, this);
  this.animationQueue = new AnimationQueue({
    callback: whenDone
  });

  command.set('status', 'processing');
  try {
    var methodName = command.get('method').replace(/-/g, '') + 'Starter';
    this[methodName]();
  } catch (err) {
    if (err instanceof GitError ||
        err instanceof CommandResult) {
      // short circuit animation by just setting error and returning
      command.set('error', err);
      callback();
      return;
    } else {
      throw err;
    }
  }

  // only add the refresh if we didn't do manual animations
  if (!this.animationQueue.get('animations').length && !this.animationQueue.get('defer')) {
    animationFactory.refreshTree(this.animationQueue, this.gitVisuals);
  }

  // animation queue will call the callback when its done
  if (!this.animationQueue.get('defer')) {
    this.animationQueue.start();
  }
};

GitEngine.prototype.showStarter = function() {
  this.oneArgImpliedHead(this.generalArgs);

  this.show(this.generalArgs[0]);
};

GitEngine.prototype.show = function(ref) {
  var commit = this.getCommitFromRef(ref);

  throw new CommandResult({
    msg: commit.getShowEntry()
  });
};

GitEngine.prototype.statusStarter = function() {
  var lines = [];
  if (this.getDetachedHead()) {
    lines.push('Detached Head!');
  } else {
    var branchName = this.HEAD.get('target').get('id');
    lines.push('On branch ' + branchName);
  }
  lines.push('Changes to be committed:');
  lines.push('');
  lines.push('&nbsp;&nbsp;&nbsp; modified: cal/OskiCostume.stl');
  lines.push('');
  lines.push('Ready to commit! (as always in this demo)');

  var msg = '';
  _.each(lines, function(line) {
    msg += '# ' + line + '\n';
  });

  throw new CommandResult({
    msg: msg
  });
};

GitEngine.prototype.logStarter = function() {
  if (this.generalArgs.length == 2) {
    // do fancy git log branchA ^branchB
    if (this.generalArgs[1][0] == '^') {
      this.logWithout(this.generalArgs[0], this.generalArgs[1]);
    } else {
      throw new GitError({
        msg: 'I need a not branch (^branchName) when getting two arguments!'
      });
    }
  }

  this.oneArgImpliedHead(this.generalArgs);
  this.log(this.generalArgs[0]);
};

GitEngine.prototype.logWithout = function(ref, omitBranch) {
  // slice off the ^branch
  omitBranch = omitBranch.slice(1);
  this.log(ref, this.getUpstreamSet(omitBranch));
};

GitEngine.prototype.log = function(ref, omitSet) {
  // omit set is for doing stuff like git log branchA ^branchB
  omitSet = omitSet || {};
  // first get the commit we referenced
  var commit = this.getCommitFromRef(ref);

  // then get as many far back as we can from here, order by commit date
  var toDump = [];
  var pQueue = [commit];

  var seen = {};

  while (pQueue.length) {
    var popped = pQueue.shift(0);
    if (seen[popped.get('id')] || omitSet[popped.get('id')]) {
      continue;
    }
    seen[popped.get('id')] = true;

    toDump.push(popped);

    if (popped.get('parents') && popped.get('parents').length) {
      pQueue = pQueue.concat(popped.get('parents'));
    }
  }

  // now go through and collect logs
  var bigLogStr = '';
  _.each(toDump, function(c) {
    bigLogStr += c.getLogEntry();
  }, this);

  throw new CommandResult({
    msg: bigLogStr
  });
};

GitEngine.prototype.addStarter = function() {
  throw new CommandResult({
    msg: "This demo is meant to demonstrate git branching, so don't worry about " +
         "adding / staging files. Just go ahead and commit away!"
  });
};

GitEngine.prototype.getCommonAncestor = function(ancestor, cousin) {
  if (this.isUpstreamOf(cousin, ancestor)) {
    throw new Error('Dont use common ancestor if we are upstream!');
  }

  var upstreamSet = this.getUpstreamSet(ancestor);
  // now BFS off of cousin until you find something

  var queue = [this.getCommitFromRef(cousin)];
  while (queue.length) {
    var here = queue.pop();
    if (upstreamSet[here.get('id')]) {
      return here;
    }
    queue = queue.concat(here.get('parents'));
  }
  throw new Error('something has gone very wrong... two nodes arent connected!');
};

GitEngine.prototype.isUpstreamOf = function(child, ancestor) {
  child = this.getCommitFromRef(child);

  // basically just do a completely BFS search on ancestor to the root, then
  // check for membership of child in that set of explored nodes
  var upstream = this.getUpstreamSet(ancestor);
  return upstream[child.get('id')] !== undefined;
};

GitEngine.prototype.getUpstreamSet = function(ancestor) {
  var commit = this.getCommitFromRef(ancestor);
  var ancestorID = commit.get('id');
  var queue = [commit];

  var exploredSet = {};
  exploredSet[ancestorID] = true;

  var addToExplored = function(rent) {
    exploredSet[rent.get('id')] = true;
    queue.push(rent);
  };

  while (queue.length) {
    var here = queue.pop();
    var rents = here.get('parents');

    _.each(rents, addToExplored);
  }
  return exploredSet;
};


var Ref = Backbone.Model.extend({
  initialize: function() {
    if (!this.get('target')) {
      throw new Error('must be initialized with target');
    }
    if (!this.get('id')) {
      throw new Error('must be given an id');
    }
    this.set('type', 'general ref');

    if (this.get('id') == 'HEAD') {
      this.set('lastLastTarget', null);
      this.set('lastTarget', this.get('target'));
      // have HEAD remember where it is for checkout -
      this.on('change:target', this.targetChanged, this);
    }
  },

  targetChanged: function(model, targetValue, ev) {
    // push our little 3 stack back. we need to do this because
    // backbone doesn't give you what the value WAS, only what it was changed
    // TO
    this.set('lastLastTarget', this.get('lastTarget'));
    this.set('lastTarget', targetValue);
  },

  toString: function() {
    return 'a ' + this.get('type') + 'pointing to ' + String(this.get('target'));
  }
});

var Branch = Ref.extend({
  defaults: {
    visBranch: null
  },

  initialize: function() {
    Ref.prototype.initialize.call(this);
    this.set('type', 'branch');
  }
});

var Commit = Backbone.Model.extend({
  defaults: {
    type: 'commit',
    children: null,
    parents: null,
    author: 'Peter Cottle',
    createTime: null,
    commitMessage: null,
    visNode: null,
    gitVisuals: null
  },

  constants: {
    circularFields: ['gitVisuals', 'visNode', 'children']
  },

  getLogEntry: function() {
    // for now we are just joining all these things with newlines which
    // will get placed by paragraph tags. Not really a fan of this, but
    // it's better than making an entire template and all that jazz
    return [
      'Author: ' + this.get('author'),
      'Date: ' + this.get('createTime'),
      '<br/>',
      this.get('commitMessage'),
      '<br/>',
      'Commit: ' + this.get('id')
    ].join('\n' ) + '\n';
  },

  getShowEntry: function() {
    // same deal as above, show log entry and some fake changes
    return [
      this.getLogEntry(),
      'diff --git a/bigGameResults.html b/bigGameResults.html',
      '--- bigGameResults.html',
      '+++ bigGameResults.html',
      '@@ 13,27 @@ Winner, Score',
      '- Stanfurd, 14-7',
      '+ Cal, 21-14'
    ].join('\n') + '\n';
  },

  validateAtInit: function() {
    if (!this.get('id')) {
      throw new Error('Need ID!!');
    }

    if (!this.get('createTime')) {
      this.set('createTime', new Date().toString());
    }
    if (!this.get('commitMessage')) {
      this.set('commitMessage', 'Quick Commit. Go Bears!');
    }

    this.set('children', []);

    // root commits have no parents
    if (!this.get('rootCommit')) {
      if (!this.get('parents') || !this.get('parents').length) {
        throw new Error('needs parents');
      }
    }
  },

  addNodeToVisuals: function() {
    var visNode = this.get('gitVisuals').addNode(this.get('id'), this);
    this.set('visNode', visNode);
  },

  addEdgeToVisuals: function(parent) {
    this.get('gitVisuals').addEdge(this.get('id'), parent.get('id'));
  },

  isMainParent: function(parent) {
    var index = this.get('parents').indexOf(parent);
    return index === 0;
  },

  initialize: function(options) {
    this.validateAtInit();
    this.addNodeToVisuals();

    _.each(this.get('parents'), function(parent) {
      parent.get('children').push(this);
      this.addEdgeToVisuals(parent);
    }, this);
  }
});

exports.GitEngine = GitEngine;
exports.Commit = Commit;
exports.Branch = Branch;
exports.Ref = Ref;


});
require("/git/index.js");

require.define("/levels/index.js",function(require,module,exports,__dirname,__filename,process,global){// static class...
function LevelEngine() {

}

LevelEngine.prototype.compareBranchesWithinTrees = function(treeA, treeB, branches) {
  var result = true;
  _.each(branches, function(branchName) {
    result = result && this.compareBranchWithinTrees(treeA, treeB, branchName);
  }, this);

  return result;
};

LevelEngine.prototype.compareBranchWithinTrees = function(treeA, treeB, branchName) {
  treeA = this.convertTreeSafe(treeA);
  treeB = this.convertTreeSafe(treeB);

  this.stripTreeFields([treeA, treeB]);

  // we need a recursive comparison function to bubble up the  branch
  var recurseCompare = function(commitA, commitB) {
    // this is the short-circuit base case
    var result = _.isEqual(commitA, commitB);
    if (!result) {
      return false;
    }

    // we loop through each parent ID. we sort the parent ID's beforehand
    // so the index lookup is valid
    _.each(commitA.parents, function(pAid, index) {
      var pBid = commitB.parents[index];

      var childA = treeA.commits[pAid];
      var childB = treeB.commits[pBid];

      result = result && recurseCompare(childA, childB);
    }, this);
    // if each of our children recursively are equal, we are good
    return result;
  };

  var branchA = treeA.branches[branchName];
  var branchB = treeB.branches[branchName];

  return _.isEqual(branchA, branchB) &&
    recurseCompare(treeA.commits[branchA.target], treeB.commits[branchB.target]);
};

LevelEngine.prototype.convertTreeSafe = function(tree) {
  if (typeof tree == 'string') {
    return JSON.parse(unescape(tree));
  }
  return tree;
};

LevelEngine.prototype.stripTreeFields = function(trees) {
  var stripFields = ['createTime', 'author', 'commitMessage'];
  var sortFields = ['children', 'parents'];

  _.each(trees, function(tree) {
    _.each(tree.commits, function(commit) {
      _.each(stripFields, function(field) {
        commit[field] = undefined;
      });
      _.each(sortFields, function(field) {
        if (commit[field]) {
          commit[field] = commit[field].sort();
        }
      });
    });
  });
};

LevelEngine.prototype.compareTrees = function(treeA, treeB) {
  treeA = this.convertTreeSafe(treeA);
  treeB = this.convertTreeSafe(treeB);

  // now we need to strip out the fields we don't care about, aka things
  // like createTime, message, author
  this.stripTreeFields([treeA, treeB]);

  return _.isEqual(treeA, treeB);
};

var levelEngine = new LevelEngine();

exports.LevelEngine = LevelEngine;


});
require("/levels/index.js");

require.define("/models/commandModel.js",function(require,module,exports,__dirname,__filename,process,global){var Errors = require('../util/errors');

var CommandProcessError = Errors.CommandProcessError;
var GitError = Errors.GitError;
var Warning = Errors.Warning;
var CommandResult = Errors.CommandResult;

var Command = Backbone.Model.extend({
  defaults: {
    status: 'inqueue',
    rawStr: null,
    result: '',

    error: null,
    warnings: null,

    generalArgs: null,
    supportedMap: null,
    options: null,
    method: null,

    createTime: null
  },

  validateAtInit: function() {
    // weird things happen with defaults if you dont
    // make new objects
    this.set('generalArgs', []);
    this.set('supportedMap', {});
    this.set('warnings', []);

    if (this.get('rawStr') === null) {
      throw new Error('Give me a string!');
    }
    if (!this.get('createTime')) {
      this.set('createTime', new Date().toString());
    }


    this.on('change:error', this.errorChanged, this);
    // catch errors on init
    if (this.get('error')) {
      this.errorChanged();
    }
  },

  setResult: function(msg) {
    this.set('result', msg);
  },

  addWarning: function(msg) {
    this.get('warnings').push(msg);
    // change numWarnings so the change event fires. This is bizarre -- Backbone can't
    // detect if an array changes, so adding an element does nothing
    this.set('numWarnings', this.get('numWarnings') ? this.get('numWarnings') + 1 : 1);
  },

  getFormattedWarnings: function() {
    if (!this.get('warnings').length) {
      return '';
    }
    var i = '<i class="icon-exclamation-sign"></i>';
    return '<p>' + i + this.get('warnings').join('</p><p>' + i) + '</p>';
  },

  initialize: function() {
    this.validateAtInit();
    this.parseOrCatch();
  },

  parseOrCatch: function() {
    try {
      this.parse();
    } catch (err) {
      if (err instanceof CommandProcessError ||
          err instanceof GitError ||
          err instanceof CommandResult ||
          err instanceof Warning) {
        // errorChanged() will handle status and all of that
        this.set('error', err);
      } else {
        throw err;
      }
    }
  },

  errorChanged: function() {
    var err = this.get('error');
    if (err instanceof CommandProcessError ||
        err instanceof GitError) {
      this.set('status', 'error');
    } else if (err instanceof CommandResult) {
      this.set('status', 'finished');
    } else if (err instanceof Warning) {
      this.set('status', 'warning');
    }
    this.formatError();
  },

  formatError: function() {
    this.set('result', this.get('error').toResult());
  },

  getShortcutMap: function() {
    return {
      'git commit': /^gc($|\s)/,
      'git add': /^ga($|\s)/,
      'git checkout': /^gchk($|\s)/,
      'git rebase': /^gr($|\s)/,
      'git branch': /^gb($|\s)/
    };
  },

  getRegexMap: function() {
    return {
      // ($|\s) means that we either have to end the string
      // after the command or there needs to be a space for options
      commit: /^commit($|\s)/,
      add: /^add($|\s)/,
      checkout: /^checkout($|\s)/,
      rebase: /^rebase($|\s)/,
      reset: /^reset($|\s)/,
      branch: /^branch($|\s)/,
      revert: /^revert($|\s)/,
      log: /^log($|\s)/,
      merge: /^merge($|\s)/,
      show: /^show($|\s)/,
      status: /^status($|\s)/,
      'cherry-pick': /^cherry-pick($|\s)/
    };
  },

  getSandboxCommands: function() {
    return [
      [/^ls/, function() {
        throw new CommandResult({
          msg: "DontWorryAboutFilesInThisDemo.txt"
        });
      }],
      [/^cd/, function() {
        throw new CommandResult({
          msg: "Directory Changed to '/directories/dont/matter/in/this/demo'"
        });
      }],
      [/^git help($|\s)/, function() {
        // sym link this to the blank git command
        var allCommands = Command.prototype.getSandboxCommands();
        // wow this is hacky :(
        var equivalent = 'git';
        _.each(allCommands, function(bits) {
          var regex = bits[0];
          if (regex.test(equivalent)) {
            bits[1]();
          }
        });
      }],
      [/^git$/, function() {
        var lines = [
          'Git Version PCOTTLE.1.0',
          '<br/>',
          'Usage:',
          _.escape('\t git <command> [<args>]'),
          '<br/>',
          'Supported commands:',
          '<br/>'
        ];
        var commands = OptionParser.prototype.getMasterOptionMap();

        // build up a nice display of what we support
        _.each(commands, function(commandOptions, command) {
          lines.push('git ' + command);
          _.each(commandOptions, function(vals, optionName) {
            lines.push('\t ' + optionName);
          }, this);
        }, this);

        // format and throw
        var msg = lines.join('\n');
        msg = msg.replace(/\t/g, '&nbsp;&nbsp;&nbsp;');
        throw new CommandResult({
          msg: msg
        });
      }],
      [/^refresh$/, function() {
        var events = require('../app').getEvents();

        events.trigger('refreshTree');
        throw new CommandResult({
          msg: "Refreshing tree..."
        });
      }],
      [/^rollup (\d+)$/, function(bits) {
        var events = require('../app').getEvents();

        // go roll up these commands by joining them with semicolons
        events.trigger('rollupCommands', bits[1]);
        throw new CommandResult({
          msg: 'Commands combined!'
        });
      }]
    ];
  },

  parse: function() {
    var str = this.get('rawStr');
    // first if the string is empty, they just want a blank line
    if (!str.length) {
      throw new CommandResult({msg: ""});
    }

    // then check if it's one of our sandbox commands
    _.each(this.getSandboxCommands(), function(tuple) {
      var regex = tuple[0];
      var results = regex.exec(str);
      if (results) {
        tuple[1](results);
      }
    });

    // then check if shortcut exists, and replace, but
    // preserve options if so
    _.each(this.getShortcutMap(), function(regex, method) {
      var results = regex.exec(str);
      if (results) {
        str = method + ' ' + str.slice(results[0].length);
      }
    });

    // see if begins with git
    if (str.slice(0,3) !== 'git') {
      throw new CommandProcessError({
        msg: 'That command is not supported, sorry!'
      });
    }

    // ok, we have a (probably) valid command. actually parse it
    this.gitParse(str);
  },

  gitParse: function(str) {
    // now slice off command part
    var fullCommand = str.slice('git '.length);

    // see if we support this particular command
    _.each(this.getRegexMap(), function(regex, method) {
      if (regex.exec(fullCommand)) {
        this.set('options', fullCommand.slice(method.length + 1));
        this.set('method', method);
        // we should stop iterating, but the regex will only match
        // one command in practice. we could stop iterating if we used
        // jqeurys for each but im using underscore (for no real reason other
        // than style)
      }
    }, this);

    if (!this.get('method')) {
      throw new CommandProcessError({
        msg: "Sorry, this demo does not support that git command: " + fullCommand
      });
    }

    // parse off the options and assemble the map / general args
    var optionParser = new OptionParser(this.get('method'), this.get('options'));

    // steal these away so we can be completely JSON
    this.set('generalArgs', optionParser.generalArgs);
    this.set('supportedMap', optionParser.supportedMap);
  }
});

/**
 * OptionParser
 */
function OptionParser(method, options) {
  this.method = method;
  this.rawOptions = options;

  this.supportedMap = this.getMasterOptionMap()[method];
  if (this.supportedMap === undefined) {
    throw new Error('No option map for ' + method);
  }

  this.generalArgs = [];
  this.explodeAndSet();
}

OptionParser.prototype.getMasterOptionMap = function() {
  // here a value of false means that we support it, even if its just a
  // pass-through option. If the value is not here (aka will be undefined
  // when accessed), we do not support it.
  return {
    commit: {
      '--amend': false,
      '-a': false, // warning
      '-am': false, // warning
      '-m': false
    },
    status: {},
    log: {},
    add: {},
    'cherry-pick': {},
    branch: {
      '-d': false,
      '-D': false,
      '-f': false,
      '--contains': false
    },
    checkout: {
      '-b': false,
      '-B': false,
      '-': false
    },
    reset: {
      '--hard': false,
      '--soft': false // this will raise an error but we catch it in gitEngine
    },
    merge: {},
    rebase: {
      '-i': false // the mother of all options
    },
    revert: {},
    show: {}
  };
};

OptionParser.prototype.explodeAndSet = function() {
  // split on spaces, except when inside quotes

  var exploded = this.rawOptions.match(/('.*?'|".*?"|\S+)/g) || [];

  for (var i = 0; i < exploded.length; i++) {
    var part = exploded[i];
    if (part.slice(0,1) == '-') {
      // it's an option, check supportedMap
      if (this.supportedMap[part] === undefined) {
        throw new CommandProcessError({
          msg: 'The option "' + part + '" is not supported'
        });
      }

      // go through and include all the next args until we hit another option or the end
      var optionArgs = [];
      var next = i + 1;
      while (next < exploded.length && exploded[next].slice(0,1) != '-') {
        optionArgs.push(exploded[next]);
        next += 1;
      }
      i = next - 1;

      // **phew** we are done grabbing those. theseArgs is truthy even with an empty array
      this.supportedMap[part] = optionArgs;
    } else {
      // must be a general arg
      this.generalArgs.push(part);
    }
  }

  // done!
};

// command entry is for the commandview
var CommandEntry = Backbone.Model.extend({
  defaults: {
    text: ''
  },
  localStorage: new Backbone.LocalStorage('CommandEntries')
});


exports.CommandEntry = CommandEntry;
exports.Command = Command;


});
require("/models/commandModel.js");

require.define("/util/constants.js",function(require,module,exports,__dirname,__filename,process,global){/**
 * Constants....!!!
 */
var TIME = {
  betweenCommandsDelay: 400
};

// useful for locks, etc
var GLOBAL = {
  isAnimating: false
};

var GRAPHICS = {
  arrowHeadSize: 8,

  nodeRadius: 17,
  curveControlPointOffset: 50,
  defaultEasing: 'easeInOut',
  defaultAnimationTime: 400,

  //rectFill: '#FF3A3A',
  rectFill: 'hsb(0.8816909813322127,0.7,1)',
  headRectFill: '#2831FF',
  rectStroke: '#FFF',
  rectStrokeWidth: '3',

  multiBranchY: 20,
  upstreamHeadOpacity: 0.5,
  upstreamNoneOpacity: 0.2,
  edgeUpstreamHeadOpacity: 0.4,
  edgeUpstreamNoneOpacity: 0.15,

  visBranchStrokeWidth: 2,
  visBranchStrokeColorNone: '#333',

  defaultNodeFill: 'hsba(0.5,0.8,0.7,1)',
  defaultNodeStrokeWidth: 2,
  defaultNodeStroke: '#FFF',

  orphanNodeFill: 'hsb(0.5,0.8,0.7)'
};

exports.GLOBAL = GLOBAL;
exports.TIME = TIME;
exports.GRAPHICS = GRAPHICS;


});
require("/util/constants.js");

require.define("/util/debug.js",function(require,module,exports,__dirname,__filename,process,global){var toGlobalize = {
  Tree: require('../visuals/tree'),
  Visuals: require('../visuals'),
  Git: require('../git'),
  CommandModel: require('../models/commandModel'),
  Levels: require('../levels'),
  Constants: require('../util/constants'),
  Collections: require('../collections'),
  Async: require('../animation'),
  AnimationFactory: require('../animation/animationFactory'),
  Main: require('../app')
};

_.each(toGlobalize, function(module) {
  _.extend(window, module);
});

window.events = toGlobalize.Main.getEvents();


});
require("/util/debug.js");

require.define("/util/errors.js",function(require,module,exports,__dirname,__filename,process,global){var MyError = Backbone.Model.extend({
  defaults: {
    type: 'MyError',
    msg: 'Unknown Error'
  },
  toString: function() {
    return this.get('type') + ': ' + this.get('msg');
  },

  getMsg: function() {
    return this.get('msg') || 'Unknown Error';
  },

  toResult: function() {
    if (!this.get('msg').length) {
      return '';
    }
    return '<p>' + this.get('msg').replace(/\n/g, '</p><p>') + '</p>';
  }
});

var CommandProcessError = exports.CommandProcessError = MyError.extend({
  defaults: {
    type: 'Command Process Error'
  }
});

var CommandResult = exports.CommandResult = MyError.extend({
  defaults: {
    type: 'Command Result'
  }
});

var Warning = exports.Warning = MyError.extend({
  defaults: {
    type: 'Warning'
  }
});

var GitError = exports.GitError = MyError.extend({
  defaults: {
    type: 'Git Error'
  }
});


});
require("/util/errors.js");

require.define("/views/commandViews.js",function(require,module,exports,__dirname,__filename,process,global){var CommandEntryCollection = require('../collections').CommandEntryCollection;
var Main = require('../app');
var Command = require('../models/commandModel').Command;
var CommandEntry = require('../models/commandModel').CommandEntry;

var Errors = require('../util/errors');
var Warning = Errors.Warning;

var CommandPromptView = Backbone.View.extend({
  initialize: function(options) {
    this.collection = options.collection;

    // uses local storage
    this.commands = new CommandEntryCollection();
    this.commands.fetch({
      success: _.bind(function() {
        // reverse the commands. this is ugly but needs to be done...
        var commands = [];
        this.commands.each(function(c) {
          commands.push(c);
        });

        commands.reverse();
        this.commands.reset();

        _.each(commands, function(c) {
          this.commands.add(c);
        }, this);
      }, this)
    });

    this.index = -1;

    this.commandSpan = this.$('#prompt span.command')[0];
    this.commandCursor = this.$('#prompt span.cursor')[0];

    // this is evil, but we will refer to HTML outside the document
    // and attach a click event listener so we can focus / unfocus
    $(document).delegate('#commandLineHistory', 'click', _.bind(function() {
      this.focus();
    }, this));


    $(document).delegate('#commandTextField', 'blur', _.bind(function() {
      this.blur();
    }, this));

    Main.getEvents().on('processCommandFromEvent', this.addToCollection, this);
    Main.getEvents().on('submitCommandValueFromEvent', this.submitValue, this);
    Main.getEvents().on('rollupCommands', this.rollupCommands, this);

    // hacky timeout focus
    setTimeout(_.bind(function() {
      this.focus();
    }, this), 100);
  },

  events: {
    'keydown #commandTextField': 'onKey',
    'keyup #commandTextField': 'onKeyUp',
    'blur #commandTextField': 'hideCursor',
    'focus #commandTextField': 'showCursor'
  },

  blur: function() {
    $(this.commandCursor).toggleClass('shown', false);
  },

  focus: function() {
    this.$('#commandTextField').focus();
    this.showCursor();
  },

  hideCursor: function() {
    this.toggleCursor(false);
  },

  showCursor: function() {
    this.toggleCursor(true);
  },

  toggleCursor: function(state) {
    $(this.commandCursor).toggleClass('shown', state);
  },

  onKey: function(e) {
    var el = e.srcElement;
    this.updatePrompt(el);
  },

  onKeyUp: function(e) {
    this.onKey(e);

    // we need to capture some of these events.
    // WARNING: this key map is not internationalized :(
    var keyMap = {
      // enter
      13: _.bind(function() {
        this.submit();
      }, this),
      // up
      38: _.bind(function() {
        this.commandSelectChange(1);
      }, this),
      // down
      40: _.bind(function() {
        this.commandSelectChange(-1);
      }, this)
    };

    if (keyMap[e.which] !== undefined) {
      e.preventDefault();
      keyMap[e.which]();
      this.onKey(e);
    }
  },

  badHtmlEncode: function(text) {
    return text.replace(/&/g,'&amp;')
      .replace(/</g,'&lt;')
      .replace(/</g,'&lt;')
      .replace(/ /g,'&nbsp;')
      .replace(/\n/g,'');
  },

  updatePrompt: function(el) {
    // i WEEEPPPPPPpppppppppppp that this reflow takes so long. it adds this
    // super annoying delay to every keystroke... I have tried everything
    // to make this more performant. getting the srcElement from the event,
    // getting the value directly from the dom, etc etc. yet still,
    // there's a very annoying and sightly noticeable command delay.
    // try.github.com also has this, so I'm assuming those engineers gave up as
    // well...

    var val = this.badHtmlEncode(el.value);
    this.commandSpan.innerHTML = val;

    // now mutate the cursor...
    this.cursorUpdate(el.value.length, el.selectionStart, el.selectionEnd);
    // and scroll down due to some weird bug
    Main.getEvents().trigger('commandScrollDown');
  },

  cursorUpdate: function(commandLength, selectionStart, selectionEnd) {
    // 10px for monospaced font...
    var widthPerChar = 10;

    var numCharsSelected = Math.max(1, selectionEnd - selectionStart);
    var width = String(numCharsSelected * widthPerChar) + 'px';

    // now for positioning
    var numLeft = Math.max(commandLength - selectionStart, 0);
    var left = String(-numLeft * widthPerChar) + 'px';
    // one reflow? :D
    $(this.commandCursor).css({
      width: width,
      left: left
    });
  },

  commandSelectChange: function(delta) {
    this.index += delta;

    // if we are over / under, display blank line. yes this eliminates your
    // partially edited command, but i doubt that is much in this demo
    if (this.index >= this.commands.length || this.index < 0) {
      this.clear();
      this.index = -1;
      return;
    }

    // yay! we actually can display something
    var commandEntry = this.commands.toArray()[this.index].get('text');
    this.setTextField(commandEntry);
  },

  clearLocalStorage: function() {
    this.commands.each(function(c) {
      Backbone.sync('delete', c, function() { });
    }, this);
    localStorage.setItem('CommandEntries', '');
  },

  setTextField: function(value) {
    this.$('#commandTextField').val(value);
  },

  clear: function() {
    this.setTextField('');
  },

  submit: function() {
    var value = this.$('#commandTextField').val().replace('\n', '');
    this.clear();
    this.submitValue(value);
  },

  rollupCommands: function(numBack) {
    var which = this.commands.toArray().slice(1, Number(numBack) + 1);
    which.reverse();

    var str = '';
    _.each(which, function(commandEntry) {
      str += commandEntry.get('text') + ';';
    }, this);

    console.log('the str', str);

    var rolled = new CommandEntry({text: str});
    this.commands.unshift(rolled);
    Backbone.sync('create', rolled, function() { });
  },

  submitValue: function(value) {
    // we should add if it's not a blank line and this is a new command...
    // or if we edited the command
    var shouldAdd = (value.length && this.index == -1) ||
      ((value.length && this.index !== -1 &&
      this.commands.toArray()[this.index].get('text') !== value));

    if (shouldAdd) {
      var commandEntry = new CommandEntry({text: value});
      this.commands.unshift(commandEntry);

      // store to local storage
      Backbone.sync('create', commandEntry, function() { });

      // if our length is too egregious, reset
      if (this.commands.length > 100) {
        this.clearLocalStorage();
      }
    }
    this.index = -1;

    // split commands on semicolon
    _.each(value.split(';'), _.bind(function(command, index) {
      command = _.escape(command);

      command = command
        .replace(/^(\s+)/, '')
        .replace(/(\s+)$/, '')
        .replace(/&quot;/g, '"')
        .replace(/&#x27;/g, "'");

      if (index > 0 && !command.length) {
        return;
      }

      this.addToCollection(command);
    }, this));
  },

  addToCollection: function(value) {
    var command = new Command({
      rawStr: value
    });
    this.collection.add(command);
  }
});


// This is the view for all commands -- it will represent
// their status (inqueue, processing, finished, error),
// their value ("git commit --amend"),
// and the result (either errors or warnings or whatever)
var CommandView = Backbone.View.extend({
  tagName: 'div',
  model: Command,
  template: _.template($('#command-template').html()),

  events: {
    'click': 'clicked'
  },

  clicked: function(e) {
  },

  initialize: function() {
    this.model.bind('change', this.wasChanged, this);
    this.model.bind('destroy', this.remove, this);
  },

  wasChanged: function(model, changeEvent) {
    // for changes that are just comestic, we actually only want to toggle classes
    // with jquery rather than brutally delete a html of HTML
    var changes = changeEvent.changes;
    var changeKeys = _.keys(changes);
    if (_.difference(changeKeys, ['status']) === 0) {
      this.updateStatus();
    } else if (_.difference(changeKeys, ['error']) === 0) {
      // the above will
      this.render();
    } else {
      this.render();
    }
  },

  updateStatus: function() {
    var statuses = ['inqueue', 'processing', 'finished'];
    var toggleMap = {};
    _.each(statuses, function(status) {
      toggleMap[status] = false;
    });
    toggleMap[this.model.get('status')] = true;

    var query = this.$('p.commandLine');

    _.each(toggleMap, function(value, key) {
      query.toggleClass(key, value);
    });
  },

  render: function() {
    var json = _.extend(
      {
        resultType: '',
        result: '',
        formattedWarnings: this.model.getFormattedWarnings()
      },
      this.model.toJSON()
    );

    this.$el.html(this.template(json));
    return this;
  },

  remove: function() {
    $(this.el).hide();
  }
});


var CommandLineHistoryView = Backbone.View.extend({
  initialize: function(options) {
    this.collection = options.collection;

    this.collection.on('add', this.addOne, this);
    this.collection.on('reset', this.addAll, this);
    this.collection.on('all', this.render, this);

    this.collection.on('change', this.scrollDown, this);

    Main.getEvents().on('issueWarning', this.addWarning, this);
    Main.getEvents().on('commandScrollDown', this.scrollDown, this);
  },

  addWarning: function(msg) {
    var err = new Warning({
      msg: msg
    });

    var command = new Command({
      error: err,
      rawStr: 'Warning:'
    });

    this.collection.add(command);
  },

  scrollDown: function() {
    // if commandDisplay is ever bigger than #terminal, we need to
    // add overflow-y to terminal and scroll down
    var cD = $('#commandDisplay')[0];
    var t = $('#terminal')[0];

    if ($(t).hasClass('scrolling')) {
      t.scrollTop = t.scrollHeight;
      return;
    }
    if (cD.clientHeight > t.clientHeight) {
      $(t).css('overflow-y', 'scroll');
      $(t).css('overflow-x', 'hidden');
      $(t).addClass('scrolling');
      t.scrollTop = t.scrollHeight;
    }
  },

  addOne: function(command) {
    var view = new CommandView({
      model: command
    });
    this.$('#commandDisplay').append(view.render().el);
    this.scrollDown();
  },

  addAll: function() {
    this.collection.each(this.addOne);
  }
});

exports.CommandPromptView = CommandPromptView;
exports.CommandLineHistoryView = CommandLineHistoryView;


});
require("/views/commandViews.js");

require.define("/views/miscViews.js",function(require,module,exports,__dirname,__filename,process,global){var InteractiveRebaseView = Backbone.View.extend({
  tagName: 'div',
  template: _.template($('#interactive-rebase-template').html()),

  events: {
    'click #confirmButton': 'confirmed'
  },

  initialize: function(options) {
    this.hasClicked = false;
    this.rebaseCallback = options.callback;

    this.rebaseArray = options.toRebase;

    this.rebaseEntries = new RebaseEntryCollection();
    this.rebaseMap = {};
    this.entryObjMap = {};

    this.rebaseArray.reverse();
    // make basic models for each commit
    _.each(this.rebaseArray, function(commit) {
      var id = commit.get('id');
      this.rebaseMap[id] = commit;
      this.entryObjMap[id] = new RebaseEntry({
        id: id
      });
      this.rebaseEntries.add(this.entryObjMap[id]);
    }, this);

    this.render();

    // show the dialog holder
    this.show();
  },

  show: function() {
    this.toggleVisibility(true);
  },

  hide: function() {
    this.toggleVisibility(false);
  },

  toggleVisibility: function(toggle) {
    console.log('toggling');
    $('#dialogHolder').toggleClass('shown', toggle);
  },

  confirmed: function() {
    // we hide the dialog anyways, but they might be fast clickers
    if (this.hasClicked) {
      return;
    }
    this.hasClicked = true;

    // first of all hide
    this.$el.css('display', 'none');

    // get our ordering
    var uiOrder = [];
    this.$('ul#rebaseEntries li').each(function(i, obj) {
      uiOrder.push(obj.id);
    });

    // now get the real array
    var toRebase = [];
    _.each(uiOrder, function(id) {
      // the model
      if (this.entryObjMap[id].get('pick')) {
        toRebase.unshift(this.rebaseMap[id]);
      }
    }, this);

    this.rebaseCallback(toRebase);

    this.$el.html('');
    // garbage collection will get us
  },

  render: function() {
    var json = {
      num: this.rebaseArray.length
    };

    this.$el.html(this.template(json));

    // also render each entry
    var listHolder = this.$('ul#rebaseEntries');
    this.rebaseEntries.each(function(entry) {
      new RebaseEntryView({
        el: listHolder,
        model: entry
      });
    }, this);

    // then make it reorderable..
    listHolder.sortable({
      distance: 5,
      placeholder: 'ui-state-highlight'
    });
  }
});

var RebaseEntry = Backbone.Model.extend({
  defaults: {
    pick: true
  },

  toggle: function() {
    this.set('pick', !this.get('pick'));
  }
});

var RebaseEntryCollection = Backbone.Collection.extend({
  model: RebaseEntry
});

var RebaseEntryView = Backbone.View.extend({
  tagName: 'li',
  template: _.template($('#interactive-rebase-entry-template').html()),

  toggle: function() {
    this.model.toggle();

    // toggle a class also
    this.listEntry.toggleClass('notPicked', !this.model.get('pick'));
  },

  initialize: function(options) {
    this.render();
  },

  render: function() {
    var json = this.model.toJSON();
    this.$el.append(this.template(this.model.toJSON()));

    // hacky :( who would have known jquery barfs on ids with %'s and quotes
    this.listEntry = this.$el.children(':last');

    this.listEntry.delegate('#toggleButton', 'click', _.bind(function() {
      this.toggle();
    }, this));
  }
});

exports.InteractiveRebaseView = InteractiveRebaseView;


});
require("/views/miscViews.js");

require.define("/visuals/index.js",function(require,module,exports,__dirname,__filename,process,global){var Main = require('../app');
var GRAPHICS = require('../util/constants').GRAPHICS;
var GLOBAL = require('../util/constants').GLOBAL;

var Collections = require('../collections');
var CommitCollection = Collections.CommitCollection;
var BranchCollection = Collections.BranchCollection;

var Tree = require('../visuals/tree');
var VisEdgeCollection = Tree.VisEdgeCollection;
var VisBranchCollection = Tree.VisBranchCollection;
var VisNode = Tree.VisNode;
var VisBranch = Tree.VisBranch;
var VisEdge = Tree.VisEdge;

var Visualization = Backbone.View.extend({
  initialize: function(options) {
    var _this = this;
    new Raphael(10, 10, 200, 200, function() {

      // for some reason raphael calls this function with a predefined
      // context...
      // so switch it
      _this.paperInitialize(this);
    });
  },

  paperInitialize: function(paper, options) {
    this.paper = paper;

    this.commitCollection = new CommitCollection();
    this.branchCollection = new BranchCollection();

    this.gitVisuals = new GitVisuals({
      commitCollection: this.commitCollection,
      branchCollection: this.branchCollection,
      paper: this.paper
    });

    var GitEngine = require('../git').GitEngine;
    this.gitEngine = new GitEngine({
      collection: this.commitCollection,
      branches: this.branchCollection,
      gitVisuals: this.gitVisuals
    });
    this.gitEngine.init();
    this.gitVisuals.assignGitEngine(this.gitEngine);

    this.myResize();
    $(window).on('resize', _.bind(this.myResize, this));
    this.gitVisuals.drawTreeFirstTime();
  },

  myResize: function() {
    var smaller = 1;
    var el = this.el;

    var left = el.offsetLeft;
    var top = el.offsetTop;
    var width = el.clientWidth - smaller;
    var height = el.clientHeight - smaller;

    $(this.paper.canvas).css({
      left: left + 'px',
      top: top + 'px'
    });
    this.paper.setSize(width, height);
    this.gitVisuals.canvasResize(width, height);
  }

});

function GitVisuals(options) {
  this.commitCollection = options.commitCollection;
  this.branchCollection = options.branchCollection;
  this.visNodeMap = {};

  this.visEdgeCollection = new VisEdgeCollection();
  this.visBranchCollection = new VisBranchCollection();
  this.commitMap = {};

  this.rootCommit = null;
  this.branchStackMap = null;
  this.upstreamBranchSet = null;
  this.upstreamHeadSet = null;

  this.paper = options.paper;
  this.gitReady = false;

  this.branchCollection.on('add', this.addBranchFromEvent, this);
  this.branchCollection.on('remove', this.removeBranch, this);
  this.deferred = [];

  Main.getEvents().on('refreshTree', _.bind(
    this.refreshTree, this
  ));
}

GitVisuals.prototype.defer = function(action) {
  this.deferred.push(action);
};

GitVisuals.prototype.deferFlush = function() {
  _.each(this.deferred, function(action) {
    action();
  }, this);
  this.deferred = [];
};

GitVisuals.prototype.resetAll = function() {
  // make sure to copy these collections because we remove
  // items in place and underscore is too dumb to detect length change
  var edges = this.visEdgeCollection.toArray();
  _.each(edges, function(visEdge) {
    visEdge.remove();
  }, this);

  var branches = this.visBranchCollection.toArray();
  _.each(branches, function(visBranch) {
    visBranch.remove();
  }, this);

  _.each(this.visNodeMap, function(visNode) {
    visNode.remove();
  }, this);

  this.visEdgeCollection.reset();
  this.visBranchCollection.reset();

  this.visNodeMap = {};
  this.rootCommit = null;
  this.commitMap = {};
};

GitVisuals.prototype.assignGitEngine = function(gitEngine) {
  this.gitEngine = gitEngine;
  this.initHeadBranch();
  this.deferFlush();
};

GitVisuals.prototype.initHeadBranch = function() {
  // it's unfortaunte we have to do this, but the head branch
  // is an edge case because it's not part of a collection so
  // we can't use events to load or unload it. thus we have to call
  // this ugly method which will be deleted one day

  // seed this with the HEAD pseudo-branch
  this.addBranchFromEvent(this.gitEngine.HEAD);
};

GitVisuals.prototype.getScreenBounds = function() {
  // for now we return the node radius subtracted from the walls
  return {
    widthPadding: GRAPHICS.nodeRadius * 1.5,
    heightPadding: GRAPHICS.nodeRadius * 1.5
  };
};

GitVisuals.prototype.toScreenCoords = function(pos) {
  if (!this.paper.width) {
    throw new Error('being called too early for screen coords');
  }
  var bounds = this.getScreenBounds();

  var shrink = function(frac, total, padding) {
    return padding + frac * (total - padding * 2);
  };

  return {
    x: shrink(pos.x, this.paper.width, bounds.widthPadding),
    y: shrink(pos.y, this.paper.height, bounds.heightPadding)
  };
};

GitVisuals.prototype.animateAllFromAttrToAttr = function(fromSnapshot, toSnapshot, idsToOmit) {
  var animate = function(obj) {
    var id = obj.getID();
    if (_.include(idsToOmit, id)) {
      return;
    }

    if (!fromSnapshot[id] || !toSnapshot[id]) {
      // its actually ok it doesnt exist yet
      return;
    }
    obj.animateFromAttrToAttr(fromSnapshot[id], toSnapshot[id]);
  };

  this.visBranchCollection.each(function(visBranch) {
    animate(visBranch);
  });
  this.visEdgeCollection.each(function(visEdge) {
    animate(visEdge);
  });
  _.each(this.visNodeMap, function(visNode) {
    animate(visNode);
  });
};

/***************************************
     == BEGIN Tree Calculation Parts ==
       _  __    __  _
       \\/ /    \ \//_
        \ \     /   __|   __
         \ \___/   /_____/ /
          |        _______ \
          \  ( )   /      \_\
           \      /
            |    |
            |    |
  ____+-_=+-^    ^+-=_=__________

^^ I drew that :D

 **************************************/

GitVisuals.prototype.genSnapshot = function() {
  this.fullCalc();

  var snapshot = {};
  _.each(this.visNodeMap, function(visNode) {
    snapshot[visNode.get('id')] = visNode.getAttributes();
  }, this);

  this.visBranchCollection.each(function(visBranch) {
    snapshot[visBranch.getID()] = visBranch.getAttributes();
  }, this);

  this.visEdgeCollection.each(function(visEdge) {
    snapshot[visEdge.getID()] = visEdge.getAttributes();
  }, this);

  return snapshot;
};

GitVisuals.prototype.refreshTree = function(speed) {
  if (!this.gitReady) {
    return;
  }

  // this method can only be called after graphics are rendered
  this.fullCalc();

  this.animateAll(speed);
};

GitVisuals.prototype.refreshTreeHarsh = function() {
  this.fullCalc();

  this.animateAll(0);
};

GitVisuals.prototype.animateAll = function(speed) {
  this.zIndexReflow();

  this.animateEdges(speed);
  this.animateNodePositions(speed);
  this.animateRefs(speed);
};

GitVisuals.prototype.fullCalc = function() {
  this.calcTreeCoords();
  this.calcGraphicsCoords();
};

GitVisuals.prototype.calcTreeCoords = function() {
  // this method can only contain things that dont rely on graphics
  if (!this.rootCommit) {
    throw new Error('grr, no root commit!');
  }

  this.calcUpstreamSets();
  this.calcBranchStacks();

  this.calcDepth();
  this.calcWidth();
};

GitVisuals.prototype.calcGraphicsCoords = function() {
  this.visBranchCollection.each(function(visBranch) {
    visBranch.updateName();
  });
};

GitVisuals.prototype.calcUpstreamSets = function() {
  this.upstreamBranchSet = this.gitEngine.getUpstreamBranchSet();
  this.upstreamHeadSet = this.gitEngine.getUpstreamHeadSet();
};

GitVisuals.prototype.getCommitUpstreamBranches = function(commit) {
  return this.branchStackMap[commit.get('id')];
};

GitVisuals.prototype.getBlendedHuesForCommit = function(commit) {
  var branches = this.upstreamBranchSet[commit.get('id')];
  if (!branches) {
    throw new Error('that commit doesnt have upstream branches!');
  }

  return this.blendHuesFromBranchStack(branches);
};

GitVisuals.prototype.blendHuesFromBranchStack = function(branchStackArray) {
  var hueStrings = [];
  _.each(branchStackArray, function(branchWrapper) {
    var fill = branchWrapper.obj.get('visBranch').get('fill');

    if (fill.slice(0,3) !== 'hsb') {
      // crap! convert
      var color = Raphael.color(fill);
      fill = 'hsb(' + String(color.h) + ',' + String(color.l);
      fill = fill + ',' + String(color.s) + ')';
    }

    hueStrings.push(fill);
  });

  return blendHueStrings(hueStrings);
};

GitVisuals.prototype.getCommitUpstreamStatus = function(commit) {
  if (!this.upstreamBranchSet) {
    throw new Error("Can't calculate this yet!");
  }

  var id = commit.get('id');
  var branch = this.upstreamBranchSet;
  var head = this.upstreamHeadSet;

  if (branch[id]) {
    return 'branch';
  } else if (head[id]) {
    return 'head';
  } else {
    return 'none';
  }
};

GitVisuals.prototype.calcBranchStacks = function() {
  var branches = this.gitEngine.getBranches();
  var map = {};
  _.each(branches, function(branch) {
    var thisId = branch.target.get('id');

    map[thisId] = map[thisId] || [];
    map[thisId].push(branch);
    map[thisId].sort(function(a, b) {
      var aId = a.obj.get('id');
      var bId = b.obj.get('id');
      if (aId == 'master' || bId == 'master') {
        return aId == 'master' ? -1 : 1;
      }
      return aId.localeCompare(bId);
    });
  });
  this.branchStackMap = map;
};

GitVisuals.prototype.calcWidth = function() {
  this.maxWidthRecursive(this.rootCommit);

  this.assignBoundsRecursive(this.rootCommit, 0, 1);
};

GitVisuals.prototype.maxWidthRecursive = function(commit) {
  var childrenTotalWidth = 0;
  _.each(commit.get('children'), function(child) {
    // only include this if we are the "main" parent of
    // this child
    if (child.isMainParent(commit)) {
      var childWidth = this.maxWidthRecursive(child);
      childrenTotalWidth += childWidth;
    }
  }, this);

  var maxWidth = Math.max(1, childrenTotalWidth);
  commit.get('visNode').set('maxWidth', maxWidth);
  return maxWidth;
};

GitVisuals.prototype.assignBoundsRecursive = function(commit, min, max) {
  // I always center myself within my bounds
  var myWidthPos = (min + max) / 2.0;
  commit.get('visNode').get('pos').x = myWidthPos;

  if (commit.get('children').length === 0) {
    return;
  }

  // i have a certain length to divide up
  var myLength = max - min;
  // I will divide up that length based on my children's max width in a
  // basic box-flex model
  var totalFlex = 0;
  var children = commit.get('children');
  _.each(children, function(child) {
    if (child.isMainParent(commit)) {
      totalFlex += child.get('visNode').getMaxWidthScaled();
    }
  }, this);

  var prevBound = min;

  // now go through and do everything
  // TODO: order so the max width children are in the middle!!
  _.each(children, function(child) {
    if (!child.isMainParent(commit)) {
      return;
    }

    var flex = child.get('visNode').getMaxWidthScaled();
    var portion = (flex / totalFlex) * myLength;
    var childMin = prevBound;
    var childMax = childMin + portion;
    this.assignBoundsRecursive(child, childMin, childMax);
    prevBound = childMax;
  }, this);
};

GitVisuals.prototype.calcDepth = function() {
  var maxDepth = this.calcDepthRecursive(this.rootCommit, 0);
  if (maxDepth > 15) {
    // issue warning
    console.warn('graphics are degrading from too many layers');
  }

  var depthIncrement = this.getDepthIncrement(maxDepth);
  _.each(this.visNodeMap, function(visNode) {
    visNode.setDepthBasedOn(depthIncrement);
  }, this);
};

/***************************************
     == END Tree Calculation ==
       _  __    __  _
       \\/ /    \ \//_
        \ \     /   __|   __
         \ \___/   /_____/ /
          |        _______ \
          \  ( )   /      \_\
           \      /
            |    |
            |    |
  ____+-_=+-^    ^+-=_=__________

^^ I drew that :D

 **************************************/

GitVisuals.prototype.animateNodePositions = function(speed) {
  _.each(this.visNodeMap, function(visNode) {
    visNode.animateUpdatedPosition(speed);
  }, this);
};

GitVisuals.prototype.turnOnPaper = function() {
  this.gitReady = false;
};

// does making an accessor method make it any less hacky? that is the true question
GitVisuals.prototype.turnOffPaper = function() {
  this.gitReady = true;
};

GitVisuals.prototype.addBranchFromEvent = function(branch, collection, index) {
  var action = _.bind(function() {
    this.addBranch(branch);
  }, this);

  if (!this.gitEngine || !this.gitReady) {
    this.defer(action);
  } else {
    action();
  }
};

GitVisuals.prototype.addBranch = function(branch) {
  var visBranch = new VisBranch({
    branch: branch,
    gitVisuals: this,
    gitEngine: this.gitEngine
  });

  this.visBranchCollection.add(visBranch);
  if (this.gitReady) {
    visBranch.genGraphics(this.paper);
  }
};

GitVisuals.prototype.removeVisBranch = function(visBranch) {
  this.visBranchCollection.remove(visBranch);
};

GitVisuals.prototype.removeVisNode = function(visNode) {
  this.visNodeMap[visNode.getID()] = undefined;
};

GitVisuals.prototype.removeVisEdge = function(visEdge) {
  this.visEdgeCollection.remove(visEdge);
};

GitVisuals.prototype.animateRefs = function(speed) {
  this.visBranchCollection.each(function(visBranch) {
    visBranch.animateUpdatedPos(speed);
  }, this);
};

GitVisuals.prototype.animateEdges = function(speed) {
  this.visEdgeCollection.each(function(edge) {
    edge.animateUpdatedPath(speed);
  }, this);
};

GitVisuals.prototype.getDepthIncrement = function(maxDepth) {
  // assume there are at least 7 layers until later
  maxDepth = Math.max(maxDepth, 7);
  var increment = 1.0 / maxDepth;
  return increment;
};

GitVisuals.prototype.calcDepthRecursive = function(commit, depth) {
  commit.get('visNode').setDepth(depth);

  var children = commit.get('children');
  var maxDepth = depth;
  _.each(children, function(child) {
    var d = this.calcDepthRecursive(child, depth + 1);
    maxDepth = Math.max(d, maxDepth);
  }, this);

  return maxDepth;
};

// we debounce here so we aren't firing a resize call on every resize event
// but only after they stop
GitVisuals.prototype.canvasResize = _.debounce(function(width, height) {
  // refresh when we are ready
  if (GLOBAL.isAnimating) {
    Main.getEvents().trigger('processCommandFromEvent', 'refresh');
  } else {
    this.refreshTree();
  }
}, 200);

GitVisuals.prototype.addNode = function(id, commit) {
  this.commitMap[id] = commit;
  if (commit.get('rootCommit')) {
    this.rootCommit = commit;
  }

  var visNode = new VisNode({
    id: id,
    commit: commit,
    gitVisuals: this,
    gitEngine: this.gitEngine
  });
  this.visNodeMap[id] = visNode;

  if (this.gitReady) {
    visNode.genGraphics(this.paper);
  }
  return visNode;
};

GitVisuals.prototype.addEdge = function(idTail, idHead) {
  var visNodeTail = this.visNodeMap[idTail];
  var visNodeHead = this.visNodeMap[idHead];

  if (!visNodeTail || !visNodeHead) {
    throw new Error('one of the ids in (' + idTail +
                    ', ' + idHead + ') does not exist');
  }

  var edge = new VisEdge({
    tail: visNodeTail,
    head: visNodeHead,
    gitVisuals: this,
    gitEngine: this.gitEngine
  });
  this.visEdgeCollection.add(edge);

  if (this.gitReady) {
    edge.genGraphics(this.paper);
  }
};

GitVisuals.prototype.collectionChanged = function() {
  // TODO ?
};

GitVisuals.prototype.zIndexReflow = function() {
  this.visNodesFront();
  this.visBranchesFront();
};

GitVisuals.prototype.visNodesFront = function() {
  _.each(this.visNodeMap, function(visNode) {
    visNode.toFront();
  });
};

GitVisuals.prototype.visBranchesFront = function() {
  this.visBranchCollection.each(function(vBranch) {
    vBranch.nonTextToFront();
  });

  this.visBranchCollection.each(function(vBranch) {
    vBranch.textToFront();
  });
};

GitVisuals.prototype.drawTreeFromReload = function() {
  this.gitReady = true;
  // gen all the graphics we need
  this.deferFlush();

  this.calcTreeCoords();
};

GitVisuals.prototype.drawTreeFirstTime = function() {
  this.gitReady = true;
  this.calcTreeCoords();

  _.each(this.visNodeMap, function(visNode) {
    visNode.genGraphics(this.paper);
  }, this);

  this.visEdgeCollection.each(function(edge) {
    edge.genGraphics(this.paper);
  }, this);

  this.visBranchCollection.each(function(visBranch) {
    visBranch.genGraphics(this.paper);
  }, this);

  this.zIndexReflow();
};


/************************
 * Random util functions, some from liquidGraph
 ***********************/
function blendHueStrings(hueStrings) {
  // assumes a sat of 0.7 and brightness of 1

  var x = 0;
  var y = 0;
  var totalSat = 0;
  var totalBright = 0;
  var length = hueStrings.length;

  _.each(hueStrings, function(hueString) {
    var exploded = hueString.split('(')[1];
    exploded = exploded.split(')')[0];
    exploded = exploded.split(',');

    totalSat += parseFloat(exploded[1]);
    totalBright += parseFloat(exploded[2]);
    var hue = parseFloat(exploded[0]);

    var angle = hue * Math.PI * 2;
    x += Math.cos(angle);
    y += Math.sin(angle);
  });

  x = x / length;
  y = y / length;
  totalSat = totalSat / length;
  totalBright = totalBright / length;

  var hue = Math.atan2(y, x) / (Math.PI * 2); // could fail on 0's
  if (hue < 0) {
    hue = hue + 1;
  }
  return 'hsb(' + String(hue) + ',' + String(totalSat) + ',' + String(totalBright) + ')';
}

exports.Visualization = Visualization;


});
require("/visuals/index.js");

require.define("/visuals/tree.js",function(require,module,exports,__dirname,__filename,process,global){var Main = require('../app');
var GRAPHICS = require('../util/constants').GRAPHICS;

var randomHueString = function() {
  var hue = Math.random();
  var str = 'hsb(' + String(hue) + ',0.7,1)';
  return str;
};

var VisBase = Backbone.Model.extend({
  removeKeys: function(keys) {
    _.each(keys, function(key) {
      if (this.get(key)) {
        this.get(key).remove();
      }
    }, this);
  }
});

var VisBranch = VisBase.extend({
  defaults: {
    pos: null,
    text: null,
    rect: null,
    arrow: null,
    isHead: false,
    flip: 1,

    fill: GRAPHICS.rectFill,
    stroke: GRAPHICS.rectStroke,
    'stroke-width': GRAPHICS.rectStrokeWidth,

    offsetX: GRAPHICS.nodeRadius * 4.75,
    offsetY: 0,
    arrowHeight: 14,
    arrowInnerSkew: 0,
    arrowEdgeHeight: 6,
    arrowLength: 14,
    arrowOffsetFromCircleX: 10,

    vPad: 5,
    hPad: 5,

    animationSpeed: GRAPHICS.defaultAnimationTime,
    animationEasing: GRAPHICS.defaultEasing
  },

  validateAtInit: function() {
    if (!this.get('branch')) {
      throw new Error('need a branch!');
    }
  },

  getID: function() {
    return this.get('branch').get('id');
  },

  initialize: function() {
    this.validateAtInit();

    // shorthand notation for the main objects
    this.gitVisuals = this.get('gitVisuals');
    this.gitEngine = this.get('gitEngine');
    if (!this.gitEngine) {
      console.log('throw damnit');
      throw new Error('asd');
    }

    this.get('branch').set('visBranch', this);
    var id = this.get('branch').get('id');

    if (id == 'HEAD') {
      // switch to a head ref
      this.set('isHead', true);
      this.set('flip', -1);

      this.set('fill', GRAPHICS.headRectFill);
    } else if (id !== 'master') {
      // we need to set our color to something random
      this.set('fill', randomHueString());
    }
  },

  getCommitPosition: function() {
    var commit = this.gitEngine.getCommitFromRef(this.get('branch'));
    var visNode = commit.get('visNode');
    return visNode.getScreenCoords();
  },

  getBranchStackIndex: function() {
    if (this.get('isHead')) {
      // head is never stacked with other branches
      return 0;
    }

    var myArray = this.getBranchStackArray();
    var index = -1;
    _.each(myArray, function(branch, i) {
      if (branch.obj == this.get('branch')) {
        index = i;
      }
    }, this);
    return index;
  },

  getBranchStackLength: function() {
    if (this.get('isHead')) {
      // head is always by itself
      return 1;
    }

    return this.getBranchStackArray().length;
  },

  getBranchStackArray: function() {
    var arr = this.gitVisuals.branchStackMap[this.get('branch').get('target').get('id')];
    if (arr === undefined) {
      // this only occurs when we are generating graphics inside of
      // a new Branch instantiation, so we need to force the update
      this.gitVisuals.calcBranchStacks();
      return this.getBranchStackArray();
    }
    return arr;
  },

  getTextPosition: function() {
    var pos = this.getCommitPosition();

    // then order yourself accordingly. we use alphabetical sorting
    // so everything is independent
    var myPos = this.getBranchStackIndex();
    return {
      x: pos.x + this.get('flip') * this.get('offsetX'),
      y: pos.y + myPos * GRAPHICS.multiBranchY + this.get('offsetY')
    };
  },

  getRectPosition: function() {
    var pos = this.getTextPosition();
    var f = this.get('flip');

    // first get text width and height
    var textSize = this.getTextSize();
    return {
      x: pos.x - 0.5 * textSize.w - this.get('hPad'),
      y: pos.y - 0.5 * textSize.h - this.get('vPad')
    };
  },

  getArrowPath: function() {
    // should make these util functions...
    var offset2d = function(pos, x, y) {
      return {
        x: pos.x + x,
        y: pos.y + y
      };
    };
    var toStringCoords = function(pos) {
      return String(Math.round(pos.x)) + ',' + String(Math.round(pos.y));
    };
    var f = this.get('flip');

    var arrowTip = offset2d(this.getCommitPosition(),
      f * this.get('arrowOffsetFromCircleX'),
      0
    );
    var arrowEdgeUp = offset2d(arrowTip, f * this.get('arrowLength'), -this.get('arrowHeight'));
    var arrowEdgeLow = offset2d(arrowTip, f * this.get('arrowLength'), this.get('arrowHeight'));

    var arrowInnerUp = offset2d(arrowEdgeUp,
      f * this.get('arrowInnerSkew'),
      this.get('arrowEdgeHeight')
    );
    var arrowInnerLow = offset2d(arrowEdgeLow,
      f * this.get('arrowInnerSkew'),
      -this.get('arrowEdgeHeight')
    );

    var tailLength = 49;
    var arrowStartUp = offset2d(arrowInnerUp, f * tailLength, 0);
    var arrowStartLow = offset2d(arrowInnerLow, f * tailLength, 0);

    var pathStr = '';
    pathStr += 'M' + toStringCoords(arrowStartUp) + ' ';
    var coords = [
      arrowInnerUp,
      arrowEdgeUp,
      arrowTip,
      arrowEdgeLow,
      arrowInnerLow,
      arrowStartLow
    ];
    _.each(coords, function(pos) {
      pathStr += 'L' + toStringCoords(pos) + ' ';
    }, this);
    pathStr += 'z';
    return pathStr;
  },

  getTextSize: function() {
    var getTextWidth = function(visBranch) {
      var textNode = visBranch.get('text').node;
      return (textNode === null) ? 1 : textNode.clientWidth;
    };

    var textNode = this.get('text').node;
    if (this.get('isHead')) {
      // HEAD is a special case
      return {
        w: textNode.clientWidth,
        h: textNode.clientHeight
      };
    }

    var maxWidth = 0;
    _.each(this.getBranchStackArray(), function(branch) {
      maxWidth = Math.max(maxWidth, getTextWidth(
        branch.obj.get('visBranch')
      ));
    });

    return {
      w: maxWidth,
      h: textNode.clientHeight
    };
  },

  getSingleRectSize: function() {
    var textSize = this.getTextSize();
    var vPad = this.get('vPad');
    var hPad = this.get('hPad');
    return {
      w: textSize.w + vPad * 2,
      h: textSize.h + hPad * 2
    };
  },

  getRectSize: function() {
    var textSize = this.getTextSize();
    // enforce padding
    var vPad = this.get('vPad');
    var hPad = this.get('hPad');

    // number of other branch names we are housing
    var totalNum = this.getBranchStackLength();
    return {
      w: textSize.w + vPad * 2,
      h: textSize.h * totalNum * 1.1 + hPad * 2
    };
  },

  getName: function() {
    var name = this.get('branch').get('id');
    var selected = this.gitEngine.HEAD.get('target').get('id');

    var add = (selected == name) ? '*' : '';
    return name + add;
  },

  nonTextToFront: function() {
    this.get('arrow').toFront();
    this.get('rect').toFront();
  },

  textToFront: function() {
    this.get('text').toFront();
  },

  getFill: function() {
    // in the easy case, just return your own fill if you are:
    // - the HEAD ref
    // - by yourself (length of 1)
    // - part of a multi branch, but your thing is hidden
    if (this.get('isHead') ||
        this.getBranchStackLength() == 1 ||
        this.getBranchStackIndex() !== 0) {
      return this.get('fill');
    }

    // woof. now it's hard, we need to blend hues...
    return this.gitVisuals.blendHuesFromBranchStack(this.getBranchStackArray());
  },

  remove: function() {
    this.removeKeys(['text', 'arrow', 'rect']);
    // also need to remove from this.gitVisuals
    this.gitVisuals.removeVisBranch(this);
  },

  genGraphics: function(paper) {
    var textPos = this.getTextPosition();
    var name = this.getName();
    var text;

    // when from a reload, we dont need to generate the text
    text = paper.text(textPos.x, textPos.y, String(name));
    text.attr({
      'font-size': 14,
      'font-family': 'Monaco, Courier, font-monospace',
      opacity: this.getTextOpacity()
    });
    this.set('text', text);

    var rectPos = this.getRectPosition();
    var sizeOfRect = this.getRectSize();
    var rect = paper
      .rect(rectPos.x, rectPos.y, sizeOfRect.w, sizeOfRect.h, 8)
      .attr(this.getAttributes().rect);
    this.set('rect', rect);

    var arrowPath = this.getArrowPath();
    var arrow = paper
      .path(arrowPath)
      .attr(this.getAttributes().arrow);
    this.set('arrow', arrow);

    rect.toFront();
    text.toFront();
  },

  updateName: function() {
    this.get('text').attr({
      text: this.getName()
    });
  },

  getNonTextOpacity: function() {
    if (this.get('isHead')) {
      return this.gitEngine.getDetachedHead() ? 1 : 0;
    }
    return this.getBranchStackIndex() === 0 ? 1 : 0.0;
  },

  getTextOpacity: function() {
    if (this.get('isHead')) {
      return this.gitEngine.getDetachedHead() ? 1 : 0;
    }
    return 1;
  },

  getAttributes: function() {
    var nonTextOpacity = this.getNonTextOpacity();
    var textOpacity = this.getTextOpacity();
    this.updateName();

    var textPos = this.getTextPosition();
    var rectPos = this.getRectPosition();
    var rectSize = this.getRectSize();

    var arrowPath = this.getArrowPath();

    return {
      text: {
        x: textPos.x,
        y: textPos.y,
        opacity: textOpacity
      },
      rect: {
        x: rectPos.x,
        y: rectPos.y,
        width: rectSize.w,
        height: rectSize.h,
        opacity: nonTextOpacity,
        fill: this.getFill(),
        stroke: this.get('stroke'),
        'stroke-width': this.get('stroke-width')
      },
      arrow: {
        path: arrowPath,
        opacity: nonTextOpacity,
        fill: this.getFill(),
        stroke: this.get('stroke'),
        'stroke-width': this.get('stroke-width')
      }
    };
  },

  animateUpdatedPos: function(speed, easing) {
    var attr = this.getAttributes();
    this.animateToAttr(attr, speed, easing);
  },

  animateFromAttrToAttr: function(fromAttr, toAttr, speed, easing) {
    // an animation of 0 is essentially setting the attribute directly
    this.animateToAttr(fromAttr, 0);
    this.animateToAttr(toAttr, speed, easing);
  },

  animateToAttr: function(attr, speed, easing) {
    if (speed === 0) {
      this.get('text').attr(attr.text);
      this.get('rect').attr(attr.rect);
      this.get('arrow').attr(attr.arrow);
      return;
    }

    var s = speed !== undefined ? speed : this.get('animationSpeed');
    var e = easing || this.get('animationEasing');

    this.get('text').stop().animate(attr.text, s, e);
    this.get('rect').stop().animate(attr.rect, s, e);
    this.get('arrow').stop().animate(attr.arrow, s, e);
  }
});


var VisNode = VisBase.extend({
  defaults: {
    depth: undefined,
    maxWidth: null,
    outgoingEdges: null,

    circle: null,
    text: null,

    id: null,
    pos: null,
    radius: null,

    commit: null,
    animationSpeed: GRAPHICS.defaultAnimationTime,
    animationEasing: GRAPHICS.defaultEasing,

    fill: GRAPHICS.defaultNodeFill,
    'stroke-width': GRAPHICS.defaultNodeStrokeWidth,
    stroke: GRAPHICS.defaultNodeStroke
  },

  getID: function() {
    return this.get('id');
  },

  validateAtInit: function() {
    if (!this.get('id')) {
      throw new Error('need id for mapping');
    }
    if (!this.get('commit')) {
      throw new Error('need commit for linking');
    }

    if (!this.get('pos')) {
      this.set('pos', {
        x: Math.random(),
        y: Math.random()
      });
    }
  },

  initialize: function() {
    this.validateAtInit();
    // shorthand for the main objects
    this.gitVisuals = this.get('gitVisuals');
    this.gitEngine = this.get('gitEngine');

    this.set('outgoingEdges', []);
  },

  setDepth: function(depth) {
    // for merge commits we need to max the depths across all
    this.set('depth', Math.max(this.get('depth') || 0, depth));
  },

  setDepthBasedOn: function(depthIncrement) {
    if (this.get('depth') === undefined) {
      debugger;
      throw new Error('no depth yet!');
    }
    var pos = this.get('pos');
    pos.y = this.get('depth') * depthIncrement;
  },

  getMaxWidthScaled: function() {
    // returns our max width scaled based on if we are visible
    // from a branch or not
    var stat = this.gitVisuals.getCommitUpstreamStatus(this.get('commit'));
    var map = {
      branch: 1,
      head: 0.3,
      none: 0.1
    };
    if (map[stat] === undefined) { throw new Error('bad stat'); }
    return map[stat] * this.get('maxWidth');
  },

  toFront: function() {
    this.get('circle').toFront();
    this.get('text').toFront();
  },

  getOpacity: function() {
    var map = {
      'branch': 1,
      'head': GRAPHICS.upstreamHeadOpacity,
      'none': GRAPHICS.upstreamNoneOpacity
    };

    var stat = this.gitVisuals.getCommitUpstreamStatus(this.get('commit'));
    if (map[stat] === undefined) {
      throw new Error('invalid status');
    }
    return map[stat];
  },

  getTextScreenCoords: function() {
    return this.getScreenCoords();
  },

  getAttributes: function() {
    var pos = this.getScreenCoords();
    var textPos = this.getTextScreenCoords();
    var opacity = this.getOpacity();

    return {
      circle: {
        cx: pos.x,
        cy: pos.y,
        opacity: opacity,
        r: this.getRadius(),
        fill: this.getFill(),
        'stroke-width': this.get('stroke-width'),
        stroke: this.get('stroke')
      },
      text: {
        x: textPos.x,
        y: textPos.y,
        opacity: opacity
      }
    };
  },

  highlightTo: function(visObj, speed, easing) {
    // a small function to highlight the color of a node for demonstration purposes
    var color = visObj.get('fill');

    var attr = {
      circle: {
        fill: color,
        stroke: color,
        'stroke-width': this.get('stroke-width') * 5
      },
      text: {}
    };

    this.animateToAttr(attr, speed, easing);
  },

  animateUpdatedPosition: function(speed, easing) {
    var attr = this.getAttributes();
    this.animateToAttr(attr, speed, easing);
  },

  animateFromAttrToAttr: function(fromAttr, toAttr, speed, easing) {
    // an animation of 0 is essentially setting the attribute directly
    this.animateToAttr(fromAttr, 0);
    this.animateToAttr(toAttr, speed, easing);
  },

  animateToSnapshot: function(snapShot, speed, easing) {
    if (!snapShot[this.getID()]) {
      return;
    }
    this.animateToAttr(snapShot[this.getID()], speed, easing);
  },

  animateToAttr: function(attr, speed, easing) {
    if (speed === 0) {
      this.get('circle').attr(attr.circle);
      this.get('text').attr(attr.text);
      return;
    }

    var s = speed !== undefined ? speed : this.get('animationSpeed');
    var e = easing || this.get('animationEasing');

    this.get('circle').stop().animate(attr.circle, s, e);
    this.get('text').stop().animate(attr.text, s, e);

    // animate the x attribute without bouncing so it looks like there's
    // gravity in only one direction. Just a small animation polish
    this.get('circle').animate(attr.circle.cx, s, 'easeInOut');
    this.get('text').animate(attr.text.x, s, 'easeInOut');
  },

  getScreenCoords: function() {
    var pos = this.get('pos');
    return this.gitVisuals.toScreenCoords(pos);
  },

  getRadius: function() {
    return this.get('radius') || GRAPHICS.nodeRadius;
  },

  getParentScreenCoords: function() {
    return this.get('commit').get('parents')[0].get('visNode').getScreenCoords();
  },

  setBirthPosition: function() {
    // utility method for animating it out from underneath a parent
    var parentCoords = this.getParentScreenCoords();

    this.get('circle').attr({
      cx: parentCoords.x,
      cy: parentCoords.y,
      opacity: 0,
      r: 0
    });
    this.get('text').attr({
      x: parentCoords.x,
      y: parentCoords.y,
      opacity: 0
    });
  },

  setBirthFromSnapshot: function(beforeSnapshot) {
    // first get parent attribute
    // woof bad data access. TODO
    var parentID = this.get('commit').get('parents')[0].get('visNode').getID();
    var parentAttr = beforeSnapshot[parentID];

    // then set myself faded on top of parent
    this.get('circle').attr({
      opacity: 0,
      r: 0,
      cx: parentAttr.circle.cx,
      cy: parentAttr.circle.cy
    });

    this.get('text').attr({
      opacity: 0,
      x: parentAttr.text.x,
      y: parentAttr.text.y
    });

    // then do edges
    var parentCoords = {
      x: parentAttr.circle.cx,
      y: parentAttr.circle.cy
    };
    this.setOutgoingEdgesBirthPosition(parentCoords);
  },

  setBirth: function() {
    this.setBirthPosition();
    this.setOutgoingEdgesBirthPosition(this.getParentScreenCoords());
  },

  setOutgoingEdgesOpacity: function(opacity) {
    _.each(this.get('outgoingEdges'), function(edge) {
      edge.setOpacity(opacity);
    });
  },

  animateOutgoingEdgesToAttr: function(snapShot, speed, easing) {
    _.each(this.get('outgoingEdges'), function(edge) {
      var attr = snapShot[edge.getID()];
      edge.animateToAttr(attr);
    }, this);
  },

  animateOutgoingEdges: function(speed, easing) {
    _.each(this.get('outgoingEdges'), function(edge) {
      edge.animateUpdatedPath(speed, easing);
    }, this);
  },

  animateOutgoingEdgesFromSnapshot: function(snapshot, speed, easing) {
    _.each(this.get('outgoingEdges'), function(edge) {
      var attr = snapshot[edge.getID()];
      edge.animateToAttr(attr, speed, easing);
    }, this);
  },

  setOutgoingEdgesBirthPosition: function(parentCoords) {

    _.each(this.get('outgoingEdges'), function(edge) {
      var headPos = edge.get('head').getScreenCoords();
      var path = edge.genSmoothBezierPathStringFromCoords(parentCoords, headPos);
      edge.get('path').stop().attr({
        path: path,
        opacity: 0
      });
    }, this);
  },

  parentInFront: function() {
    // woof! talk about bad data access
    this.get('commit').get('parents')[0].get('visNode').toFront();
  },

  getFontSize: function(str) {
    if (str.length < 3) {
      return 12;
    } else if (str.length < 5) {
      return 10;
    } else {
      return 8;
    }
  },

  getFill: function() {
    // first get our status, might be easy from this
    var stat = this.gitVisuals.getCommitUpstreamStatus(this.get('commit'));
    if (stat == 'head') {
      return GRAPHICS.headRectFill;
    } else if (stat == 'none') {
      return GRAPHICS.orphanNodeFill;
    }

    // now we need to get branch hues
    return this.gitVisuals.getBlendedHuesForCommit(this.get('commit'));
  },

  attachClickHandlers: function() {
    var commandStr = 'git show ' + this.get('commit').get('id');
    _.each([this.get('circle'), this.get('text')], function(rObj) {
      rObj.click(function() {
        Main.getEvents().trigger('processCommandFromEvent', commandStr);
      });
    });
  },

  setOpacity: function(opacity) {
    opacity = (opacity === undefined) ? 1 : opacity;

    // set the opacity on my stuff
    var keys = ['circle', 'text'];
    _.each(keys, function(key) {
      this.get(key).attr({
        opacity: opacity
      });
    }, this);
  },

  remove: function() {
    this.removeKeys(['circle'], ['text']);
    // needs a manual removal of text for whatever reason
    this.get('text').remove();

    this.gitVisuals.removeVisNode(this);
  },

  removeAll: function() {
    this.remove();
    _.each(this.get('outgoingEdges'), function(edge) {
      edge.remove();
    }, this);
  },

  genGraphics: function() {
    var paper = this.gitVisuals.paper;

    var pos = this.getScreenCoords();
    var textPos = this.getTextScreenCoords();

    var circle = paper.circle(
      pos.x,
      pos.y,
      this.getRadius()
    ).attr(this.getAttributes().circle);

    var text = paper.text(textPos.x, textPos.y, String(this.get('id')));
    text.attr({
      'font-size': this.getFontSize(this.get('id')),
      'font-weight': 'bold',
      'font-family': 'Monaco, Courier, font-monospace',
      opacity: this.getOpacity()
    });

    this.set('circle', circle);
    this.set('text', text);

    this.attachClickHandlers();
  }
});

var VisEdge = VisBase.extend({
  defaults: {
    tail: null,
    head: null,
    animationSpeed: GRAPHICS.defaultAnimationTime,
    animationEasing: GRAPHICS.defaultEasing
  },

  validateAtInit: function() {
    var required = ['tail', 'head'];
    _.each(required, function(key) {
      if (!this.get(key)) {
        throw new Error(key + ' is required!');
      }
    }, this);
  },

  getID: function() {
    return this.get('tail').get('id') + '.' + this.get('head').get('id');
  },

  initialize: function() {
    this.validateAtInit();

    // shorthand for the main objects
    this.gitVisuals = this.get('gitVisuals');
    this.gitEngine = this.get('gitEngine');

    this.get('tail').get('outgoingEdges').push(this);
  },

  remove: function() {
    this.removeKeys(['path']);
    this.gitVisuals.removeVisEdge(this);
  },

  genSmoothBezierPathString: function(tail, head) {
    var tailPos = tail.getScreenCoords();
    var headPos = head.getScreenCoords();
    return this.genSmoothBezierPathStringFromCoords(tailPos, headPos);
  },

  genSmoothBezierPathStringFromCoords: function(tailPos, headPos) {
    // we need to generate the path and control points for the bezier. format
    // is M(move abs) C (curve to) (control point 1) (control point 2) (final point)
    // the control points have to be __below__ to get the curve starting off straight.

    var coords = function(pos) {
      return String(Math.round(pos.x)) + ',' + String(Math.round(pos.y));
    };
    var offset = function(pos, dir, delta) {
      delta = delta || GRAPHICS.curveControlPointOffset;
      return {
        x: pos.x,
        y: pos.y + delta * dir
      };
    };
    var offset2d = function(pos, x, y) {
      return {
        x: pos.x + x,
        y: pos.y + y
      };
    };

    // first offset tail and head by radii
    tailPos = offset(tailPos, -1, this.get('tail').getRadius());
    headPos = offset(headPos, 1, this.get('head').getRadius());

    var str = '';
    // first move to bottom of tail
    str += 'M' + coords(tailPos) + ' ';
    // start bezier
    str += 'C';
    // then control points above tail and below head
    str += coords(offset(tailPos, -1)) + ' ';
    str += coords(offset(headPos, 1)) + ' ';
    // now finish
    str += coords(headPos);

    // arrow head
    var delta = GRAPHICS.arrowHeadSize || 10;
    str += ' L' + coords(offset2d(headPos, -delta, delta));
    str += ' L' + coords(offset2d(headPos, delta, delta));
    str += ' L' + coords(headPos);

    // then go back, so we can fill correctly
    str += 'C';
    str += coords(offset(headPos, 1)) + ' ';
    str += coords(offset(tailPos, -1)) + ' ';
    str += coords(tailPos);

    return str;
  },

  getBezierCurve: function() {
    return this.genSmoothBezierPathString(this.get('tail'), this.get('head'));
  },

  getStrokeColor: function() {
    return GRAPHICS.visBranchStrokeColorNone;
  },

  setOpacity: function(opacity) {
    opacity = (opacity === undefined) ? 1 : opacity;

    this.get('path').attr({opacity: opacity});
  },

  genGraphics: function(paper) {
    var pathString = this.getBezierCurve();

    var path = paper.path(pathString).attr({
      'stroke-width': GRAPHICS.visBranchStrokeWidth,
      'stroke': this.getStrokeColor(),
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round',
      'fill': this.getStrokeColor()
    });
    path.toBack();
    this.set('path', path);
  },

  getOpacity: function() {
    var stat = this.gitVisuals.getCommitUpstreamStatus(this.get('tail'));
    var map = {
      'branch': 1,
      'head': GRAPHICS.edgeUpstreamHeadOpacity,
      'none': GRAPHICS.edgeUpstreamNoneOpacity
    };

    if (map[stat] === undefined) { throw new Error('bad stat'); }
    return map[stat];
  },

  getAttributes: function() {
    var newPath = this.getBezierCurve();
    var opacity = this.getOpacity();
    return {
      path: {
        path: newPath,
        opacity: opacity
      }
    };
  },

  animateUpdatedPath: function(speed, easing) {
    var attr = this.getAttributes();
    this.animateToAttr(attr, speed, easing);
  },

  animateFromAttrToAttr: function(fromAttr, toAttr, speed, easing) {
    // an animation of 0 is essentially setting the attribute directly
    this.animateToAttr(fromAttr, 0);
    this.animateToAttr(toAttr, speed, easing);
  },

  animateToAttr: function(attr, speed, easing) {
    if (speed === 0) {
      this.get('path').attr(attr.path);
      return;
    }

    this.get('path').toBack();
    this.get('path').stop().animate(
      attr.path,
      speed !== undefined ? speed : this.get('animationSpeed'),
      easing || this.get('animationEasing')
    );
  }
});

var VisEdgeCollection = Backbone.Collection.extend({
  model: VisEdge
});

var VisBranchCollection = Backbone.Collection.extend({
  model: VisBranch
});

exports.VisEdgeCollection = VisEdgeCollection;
exports.VisBranchCollection = VisBranchCollection;
exports.VisNode = VisNode;
exports.VisEdge = VisEdge;
exports.VisBranch = VisBranch;


});
require("/visuals/tree.js");

})();
