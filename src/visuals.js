function GitVisuals(options) {
  this.collection = options.collection;
  this.nodeMap = {};

  this.collection.on('change', _.bind(this.collectionChanged, this));
}

GitVisuals.prototype.addNode = function(id) {
  var visNode = new VisNode({
    id: id
  });
  this.nodeMap[id] = visNode;

  return visNode;
};

GitVisuals.prototype.addEdge = function(idTail, idHead) {
  var visNodeTail = this.nodeMap[idTail];
  var visNodeHead = this.nodeMap[idHead];

  if (!visNodeTail || !visNodeHead) {
    throw new Error('one of the ids in (' + idTail +
                    ', ' + idHead + ') does not exist');
  }

  var edge = new VisEdge({
    tail: visNodeTail,
    head: visNodeHead
  });
};

GitVisuals.prototype.collectionChanged = function() {
  // redo stuff
};

