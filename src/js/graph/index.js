var _ = require('underscore');

function invariant(truthy, reason) {
  if (!truthy) {
    throw new Error(reason);
  }
}

var Graph = {

  getOrMakeRecursive: function(
    tree,
    createdSoFar,
    objID,
    gitVisuals
  ) {
    // circular dependency, should move these base models OUT of
    // the git class to resolve this
    var Git = require('../git');
    var Commit = Git.Commit;
    var Ref = Git.Ref;
    var Branch = Git.Branch;
    var Tag = Git.Tag;
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
      } else if (tree.tags[id]) {
        return 'tag';
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

    if (type == 'tag') {
      var tagJSON = tree.tags[objID];

      var tag = new Tag(_.extend(
        tree.tags[objID],
        {
          target: this.getOrMakeRecursive(tree, createdSoFar, tagJSON.target)
        }
      ));
      createdSoFar[objID] = tag;
      return tag;
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

    throw new Error('ruh rho!! unsupported type for ' + objID);
  },

  descendSortDepth: function(objects) {
    return objects.sort(function(oA, oB) {
      return oB.depth - oA.depth;
    });
  },

  bfsFromLocationWithSet: function(engine, location, set) {
    var result = [];
    var pQueue = [engine.getCommitFromRef(location)];

    while (pQueue.length) {
      var popped = pQueue.pop();
      if (set[popped.get('id')]) {
        continue;
      }

      result.push(popped);
      // keep searching
      pQueue = pQueue.concat(popped.get('parents'));
    }
    return result;
  },

  getUpstreamSet: function(engine, ancestor) {
    var commit = engine.getCommitFromRef(ancestor);
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
  },

  getUniqueObjects: function(objects) {
    var unique = {};
    var result = [];
    _.forEach(objects, function(object) {
      if (unique[object.id]) {
        return;
      }
      unique[object.id] = true;
      result.push(object);
    });
    return result;
  },

  getDefaultTree: function() {
    return JSON.parse(unescape("%7B%22branches%22%3A%7B%22master%22%3A%7B%22target%22%3A%22C1%22%2C%22id%22%3A%22master%22%2C%22type%22%3A%22branch%22%7D%7D%2C%22commits%22%3A%7B%22C0%22%3A%7B%22type%22%3A%22commit%22%2C%22parents%22%3A%5B%5D%2C%22author%22%3A%22Peter%20Cottle%22%2C%22createTime%22%3A%22Mon%20Nov%2005%202012%2000%3A56%3A47%20GMT-0800%20%28PST%29%22%2C%22commitMessage%22%3A%22Quick%20Commit.%20Go%20Bears%21%22%2C%22id%22%3A%22C0%22%2C%22rootCommit%22%3Atrue%7D%2C%22C1%22%3A%7B%22type%22%3A%22commit%22%2C%22parents%22%3A%5B%22C0%22%5D%2C%22author%22%3A%22Peter%20Cottle%22%2C%22createTime%22%3A%22Mon%20Nov%2005%202012%2000%3A56%3A47%20GMT-0800%20%28PST%29%22%2C%22commitMessage%22%3A%22Quick%20Commit.%20Go%20Bears%21%22%2C%22id%22%3A%22C1%22%7D%7D%2C%22HEAD%22%3A%7B%22id%22%3A%22HEAD%22%2C%22target%22%3A%22master%22%2C%22type%22%3A%22general%20ref%22%7D%7D"));
  }
};

module.exports = Graph;
