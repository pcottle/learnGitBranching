
// backbone or something uses _.uniqueId, so we make our own here
var uniqueId = (function() {
  var n = 0;
  return function(prepend) {
    return prepend? prepend + n++ : n++;
  };
})();

function GitEngine() {
  this.rootCommit = null;
  this.refs = {};
  this.HEAD = null;
  this.id_gen = 0;
  this.branches = [];

  this._init();
}

GitEngine.prototype._init = function() {
  // make an initial commit and a master branch
  this.rootCommit = new Commit({rootCommit: true});
  this.refs[this.rootCommit.get('id')] = this.rootCommit;

  var master = this._makeBranch('master', this.rootCommit);
  this.HEAD = new Ref({
    id: 'HEAD',
    target: master
  });
  this.refs[this.HEAD.get('id')] = this.HEAD;

  // commit once to get things going
  this.commit();
};

GitEngine.prototype.getDetachedHead = function() {
  // detached head is if HEAD points to a commit instead of a branch...
  var target = this.HEAD.get('target');
  var targetType = target.get('type');
  return targetType !== 'branch';
};

GitEngine.prototype._validateBranchName = function(name) {
  name = name.replace(/\s/g, ''); 
  if (!/^[a-zA-Z0-9]+$/.test(name)) {
    throw new Error('woah bad branch name!! This is not ok: ' + name);
  }
  if (/[hH][eE][aA][dD]/.test(name)) {
    throw new Error('branch name of "head" is ambiguous, dont name it that');
  }
  return name;
};

GitEngine.prototype._makeBranch = function(id, target) {
  id = this._validateBranchName(id);
  if (this.refs[id]) {
    throw new Error('that branch id already exists!');
  }

  var branch = new Branch({
    target: target,
    id: id
  });
  this.branches.push(branch);
  this.refs[branch.get('id')] = branch;
  return branch;
};

GitEngine.prototype.getBranches = function() {
  var toReturn = [];
  _.each(this.branches, function(branch) {
    toReturn.push({
      id: branch.get('id'),
      selected: this.HEAD.get('target') === branch
    });
  }, this);
  return toReturn;
};

GitEngine.prototype.printBranches = function() {
  var branches = this.getBranches();
  _.each(branches, function(branch) {
    console.log((branch.selected ? '* ' : '') + branch.id);
  });
};

GitEngine.prototype._makeCommit = function(parent) {
  var commit = new Commit({
    parents: [parent]
  });
  this.refs[commit.get('id')] = commit;
  return commit;
};

GitEngine.prototype.commit = function() {
  var targetCommit = null;
  if (this.getDetachedHead()) {
    // in detached head mode, must warn user TODO
    targetCommit = this.HEAD.get('target');
  } else {
    var targetBranch = this.HEAD.get('target');
    targetCommit = targetBranch.get('target');
  }

  var newCommit = this._makeCommit(targetCommit);
  targetBranch.set('target', newCommit);
};

GitEngine.prototype._resolveId = function(idOrTarget) {
  if (typeof idOrTarget !== 'string') {
    return idOrTarget;
  }
  return this._resolveStringRef(idOrTarget);
};

GitEngine.prototype._resolveStringRef = function(ref) {
  if (this.refs[ref]) {
    return this.refs[ref];
  }

  // may be something like HEAD~2 or master^^
  var relativeRefs = [
    [/^([a-zA-Z0-9]+)~(\d+)\s*$/, function(matches) {
      return parseInt(matches[2]);
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
    throw new Error('unknown ref ' + ref);
  }
  if (!this.refs[startRef]) {
    throw new Error('the ref ' + startRef +' does not exist.');
  }
  var commit = this._getCommitFromRef(startRef);

  return this._numBackFrom(commit, numBack);
};

GitEngine.prototype._getCommitFromRef = function(ref) {
  var start = this._resolveId(ref);
  // works for both HEAD and just a single layer. aka branch
  while (start.get('type') !== 'commit') {
    start = start.get('target');
  }
  return start;
};

GitEngine.prototype._numBackFrom = function(commit, numBack) {
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
  if (numBack == 0) {
    return commit;
  }

  var sortFunc = function(cA, cB) {
    // why cant parse int handle leading characters? :(
    var numA = parseInt(cA.get('id').slice(1));
    var numB = parseInt(cB.get('id').slice(1));
    return numA - numB;
  };

  var pQueue = [].concat(commit.get('parents'));
  pQueue.sort(sortFunc);
  numBack--;

  while (pQueue.length && numBack !== 0) {
    var popped = pQueue.shift(0);
    pQueue = pQueue.concat(popped.get('parents'));
    pQueue.sort(sortFunc);
    numBack--;
  }

  if (numBack !== 0 || pQueue.length == 0) {
    throw new Error('exhausted search, sorry');
  }
  return pQueue.shift(0);
};

GitEngine.prototype.checkout = function(idOrTarget) {
  var target = this._resolveId(idOrTarget);
  if (target.get('id') === 'HEAD') {
    // meaningless command but i used to do this back in the day
    return;
  }

  var type = target.get('type');
  if (type !== 'branch' && type !== 'commit') {
    throw new Error('can only checkout branches and commits!');
  }

  this.HEAD.set('target', target);
};

GitEngine.prototype.branch = function(name, ref, options) {
  ref = ref || 'HEAD';
  options = options || {};

  if (options['-d'] || options['-D']) {
    this._deleteBranch(name);
    return;
   }

  var target = this._getCommitFromRef(ref);
  this._makeBranch(name, target);
};

GitEngine.prototype._deleteBranch = function(name) {
  // trying to delete, lets check our refs
  var target = this._resolveId(name);
  if (target.get('type') !== 'branch') {
    throw new Error("You can't delete things that arent branches with branch command");
  }
  if (target.get('id') == 'master') {
    throw new Error("You can't delete the master branch!");
  }
  if (this.HEAD.get('target') === target) {
    throw new Error("Cannot delete the branch you are currently on");
  }

  var id = target.get('id');
  target.delete();
  delete this.refs[id];
};

GitEngine.prototype.dispatch = function(commandObj) {
  // TODO: parse arguments
  this[commandObj.method](); 
};

GitEngine.prototype.add = function() {
  throw new Error(
    "This demo is meant to demonstrate git branching, so don't worry about " +
    "adding / staging files. Just go ahead and commit away!"
  );
};

GitEngine.prototype.execute = function(command, callback) {
  // execute command, and when it's finished, call the callback
  // we still need to figure this out

  var closures = this.getClosuresForCommand(command);
  // make a scheduler based on all the closures, and pass in our callback
  var s = new Scheduler(closures, {
    callback: callback
  });
  s.start();
};

GitEngine.prototype.getClosuresForCommand = function(command) {
  var numbers = [1,2,3,4,5,6,7,8,9,10];
  var closures = [];
  _.each(numbers, function(num) {
    var c = function() {
      console.log(num);
    };
    closures.push(c);
  });
  return closures;
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
  },

  toString: function() {
    return 'a ' + this.get('type') + 'pointing to ' + String(this.get('target'));
  },

  delete: function() {
    console.log('DELETING ' + this.get('type') + ' ' + this.get('id'));
  }
});

var Branch  = Ref.extend({
  initialize: function() {
    Ref.prototype.initialize.call(this);
    this.set('type', 'branch');
  }
});

var Commit = Backbone.Model.extend({
  validateAtInit: function() {
    if (!this.get('id')) {
      this.set('id', uniqueId('C'));
    }
    this.set('type', 'commit');
    this.set('children', []);

    // root commits have no parents
    if (this.get('rootCommit')) {
      this.set('parents', []);
    } else {
      if (!this.get('parents') || !this.get('parents').length) {
        throw new Error('needs parents');
      }
    }
  },

  addNodeToVisuals: function() {
    // TODO: arbor stuff
    // this.set('node', sys.addNode(this.get('id')));
  },

  addEdgeToVisuals: function(parent) {

  },

  initialize: function() {
    this.validateAtInit();
    this.addNodeToVisuals();
    console.log('MAKING NEW COMMIT', this.get('id'));

    _.each(this.get('parents'), function(parent) {
      parent.get('children').push(this);
      this.addEdgeToVisuals(parent);
    }, this);
  }
});

