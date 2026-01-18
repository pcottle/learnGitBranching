
var VisBranch = require('../src/js/visuals/visBranch');
var GitVisuals = require('../src/js/visuals').GitVisuals;

describe('visBranch', function() {
  describe('getBranchColor', function() {
    beforeEach(function() {
      VisBranch.branchColorIndex = 0;
      VisBranch.assignedBranchColors = {};
    });

    it('should return the correct color for main', function() {
      expect(VisBranch.randomHueString('main')).toEqual('#00FF7F');
    });

    it('should return the correct color for master', function() {
      expect(VisBranch.randomHueString('master')).toEqual('#0074D9');
    });

    it('should return a color from the palette for other branch names', function() {
      var color = VisBranch.randomHueString('my-branch');
      expect(VisBranch.BRANCH_COLOR_PALETTE).toContain(color);
    });

    it('should return the same color for the same branch name', function() {
      var color1 = VisBranch.randomHueString('my-branch');
      var color2 = VisBranch.randomHueString('my-branch');
      expect(color1).toEqual(color2);
    });
  });

});

describe('GitVisuals', function() {
  it('removeBranch removes the matching visual branch', function() {
    var targetBranch = { id: 'foo' };
    var otherBranch = { id: 'bar' };
    var removed = false;

    var visBranch = {
      get: function(key) {
        if (key === 'branch') return targetBranch;
      },
      remove: function() {
        removed = true;
      }
    };

    var otherVisBranch = {
      get: function(key) {
        if (key === 'branch') return otherBranch;
      },
      remove: function() {}
    };

    var fake = {
      gitEngine: {},
      gitReady: true,
      visBranchCollection: {
        models: [visBranch, otherVisBranch],
        each: function(callback, context) {
          this.models.forEach(callback, context);
        },
        remove: function(model) {
          var index = this.models.indexOf(model);
          if (index > -1) this.models.splice(index, 1);
        }
      },
      removeVisBranch: function(toRemove) {
        this.visBranchCollection.remove(toRemove);
      }
    };

    GitVisuals.prototype.removeBranch.call(fake, targetBranch);

    expect(removed).toBe(true);
    expect(fake.visBranchCollection.models).not.toContain(visBranch);
    expect(fake.visBranchCollection.models).toContain(otherVisBranch);
  });

  it('removeBranch no-ops when the branch is not found', function() {
    var missingBranch = { id: 'missing' };
    var removed = false;

    var visBranch = {
      get: function(key) {
        if (key === 'branch') return { id: 'present' };
      },
      remove: function() {
        removed = true;
      }
    };

    var fake = {
      gitEngine: {},
      gitReady: true,
      visBranchCollection: {
        models: [visBranch],
        each: function(callback, context) {
          this.models.forEach(callback, context);
        },
        remove: function(model) {
          var index = this.models.indexOf(model);
          if (index > -1) this.models.splice(index, 1);
        }
      },
      removeVisBranch: function(toRemove) {
        this.visBranchCollection.remove(toRemove);
      }
    };

    GitVisuals.prototype.removeBranch.call(fake, missingBranch);

    expect(removed).toBe(false);
    expect(fake.visBranchCollection.models.length).toBe(1);
  });

  it('removeBranch defers work when git is not ready', function() {
    var deferred = [];
    var fake = {
      gitEngine: null,
      gitReady: false,
      visBranchCollection: { models: [], each: function() {} },
      removeVisBranch: function() {},
      defer: function(action) {
        deferred.push(action);
      }
    };

    GitVisuals.prototype.removeBranch.call(fake, { id: 'foo' });

    expect(deferred.length).toBe(1);
    expect(typeof deferred[0]).toBe('function');
  });

  it('removeTag removes the matching visual tag', function() {
    var targetTag = { id: 'v1.0' };
    var otherTag = { id: 'v2.0' };
    var removed = false;

    var visTag = {
      get: function(key) {
        if (key === 'tag') return targetTag;
      },
      remove: function() {
        removed = true;
      }
    };

    var otherVisTag = {
      get: function(key) {
        if (key === 'tag') return otherTag;
      },
      remove: function() {}
    };

    var fake = {
      gitEngine: {},
      gitReady: true,
      visTagCollection: {
        models: [visTag, otherVisTag],
        each: function(callback, context) {
          this.models.forEach(callback, context);
        },
        remove: function(model) {
          var index = this.models.indexOf(model);
          if (index > -1) this.models.splice(index, 1);
        }
      },
      removeVisTag: function(toRemove) {
        this.visTagCollection.remove(toRemove);
      }
    };

    GitVisuals.prototype.removeTag.call(fake, targetTag);

    expect(removed).toBe(true);
    expect(fake.visTagCollection.models).not.toContain(visTag);
    expect(fake.visTagCollection.models).toContain(otherVisTag);
  });

  it('removeTag defers work when git is not ready', function() {
    var deferred = [];
    var fake = {
      gitEngine: null,
      gitReady: false,
      visTagCollection: { models: [], each: function() {} },
      removeVisTag: function() {},
      defer: function(action) {
        deferred.push(action);
      }
    };

    GitVisuals.prototype.removeTag.call(fake, { id: 'v1.0' });

    expect(deferred.length).toBe(1);
    expect(typeof deferred[0]).toBe('function');
  });

  it('addBranchFromEvent defers when git is not ready', function() {
    var deferred = [];
    var fake = {
      gitEngine: null,
      gitReady: false,
      defer: function(action) {
        deferred.push(action);
      },
      addBranch: function() {}
    };

    GitVisuals.prototype.addBranchFromEvent.call(fake, { id: 'branch' });

    expect(deferred.length).toBe(1);
    expect(typeof deferred[0]).toBe('function');
  });

  it('addTagFromEvent calls addTag when git is ready', function() {
    var added = false;
    var fake = {
      gitEngine: {},
      gitReady: true,
      defer: function() {},
      addTag: function() {
        added = true;
      }
    };

    GitVisuals.prototype.addTagFromEvent.call(fake, { id: 'v1.0' });

    expect(added).toBe(true);
  });
});
