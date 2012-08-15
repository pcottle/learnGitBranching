
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

  this.init();
}

GitEngine.prototype.init = function() {
  // make an initial commit and a master branch
  this.rootCommit = new Commit({rootCommit: true});
  this.refs[this.rootCommit.get('id')] = this.rootCommit;

  var master = this.makeBranch('master', this.rootCommit);
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

GitEngine.prototype.makeBranch = function(id, target) {
  var branch = new Branch({
    target: target,
    id: id
  });
  this.refs[branch.get('id')] = branch;
  return branch;
};

GitEngine.prototype.makeCommit = function(parent) {
  var commit = new Commit({
    parents: [parent]
  });
  this.refs[commit.get('id')] = commit;
  return commit;
};

GitEngine.prototype.commit = function() {
  if (this.getDetachedHead()) {
    throw new Error('you are in detached head state!');
  }

  // commits are always done on head
  var targetBranch = this.HEAD.get('target');
  var targetCommit = targetBranch.get('target');

  var newCommit = this.makeCommit(targetCommit);
  targetBranch.set('target', newCommit);
};

GitEngine.prototype.resolveId = function(idOrTarget) {
  if (typeof idOrTarget !== 'string') {
    return idOrTarget;
  }
  return this.resolveStringRef(idOrTarget);
};

GitEngine.prototype.resolveStringRef = function(ref) {
  var target = this.refs[ref];
  if (!target) {
    throw new Error('that ref ' + idOrTarget + ' does not exist');
  }
  return target;
};

GitEngine.prototype.checkout = function(idOrTarget) {
  var target = this.resolveId(idOrTarget);
  var type = target.get('type');

  if (type !== 'branch' && type !== 'commit') {
    throw new Error('can only checkout branches and commits!');
  }

  this.HEAD.set('target', target);
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
      if (parent.get('child')) {
        console.warn('overwriting child for ', parent, ' to this', this);
      }
      parent.set('child', this);
      this.addEdgeToVisuals(parent);
    }, this);
  }
});

