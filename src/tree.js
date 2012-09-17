var VisNode = Backbone.Model.extend({
  defaults: {
    id: null,
    pos: null,
    commit: null
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
        y: Math.random(),
      });
    }
  },

  initialize: function() {
    this.validateAtInit();
  },

  calcPositionInTree: function() {

  },

  getScreenCoords: function() {
    var pos = this.get('pos');
    return gitVisuals.toScreenCoords(pos);
  },

  genGraphics: function(paper) {
    var pos = this.getScreenCoords();
    //var circle = paper.circle(pos.x, pos.y, GRAPHICS.nodeRadius);
    var circle = cuteSmallCircle(paper, pos.x, pos.y, {
      radius: GRAPHICS.nodeRadius
    });
    this.set('circle', circle);
  }
});

var VisEdge = Backbone.Model.extend({
  defaults: {
    tail: null,
    head: null
  },

  validateAtInit: function() {
    required = ['tail', 'head'];
    _.each(required, function(key) {
      if (!this.get(key)) {
        throw new Error(key + ' is required!');
      }
    }, this);
  },

  initialize: function() {
    this.validateAtInit();
  },

  genGraphics: function(paper) {
    var tailPos = this.get('tail').getScreenCoords();
    var headPos = this.get('head').getScreenCoords();
    var pathString = constructPathStringFromCoords([tailPos, headPos]);
    var path = cutePath(paper, pathString);
    this.set('path', path);
  },

});

var VisEdgeCollection = Backbone.Collection.extend({
  model: VisEdge
});
