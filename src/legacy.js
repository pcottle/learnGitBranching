/*
 * this code is adapted from the excellent ArborJS tutorial by
 * Samizdat Drafting Co
 */

Renderer = function(canvas) {
  canvas = $(canvas).get(0);
  var ctx = canvas.getContext("2d");
  var particleSystem = null;
  
  var that = {
    init: function(system){
      particleSystem = system;
      particleSystem.screen({padding:[100, 100, 100, 100],
                            step:.02});
     $(window).resize(that.resize);
     that.resize();
     that.initMouseHandling();
    },

    drawNode: function(node, pt) {
        // node: {mass:#, p:{x,y}, name:"", data:{}}
        // pt:   {x:#, y:#}  node position in screen coords
        node.draw(ctx, pt);
    },

    drawEdge: function(edge, pt1, pt2) {
        // edge: {source:Node, target:Node, length:#, data:{}}
        // pt1:  {x:#, y:#}  source position in screen coords
        // pt2:  {x:#, y:#}  target position in screen coords
        edge.draw(ctx, pt1, pt2);
    },

    redraw: function(){
      if (particleSystem === null) {
        return;
      }

      ctx.clearRect(0,0, canvas.width, canvas.height);
      particleSystem.eachEdge(this.drawEdge);
      particleSystem.eachNode(this.drawNode);
    },
    
    resize: function(){
      var w = $(canvas).width(),
          h = $(canvas).height();
      // resize the canvas element to fill the screen TODO -- fix this
      canvas.width = w; canvas.height = h;
      // inform the system so it can map coords for us
      particleSystem.screenSize(w,h);
      that.redraw();
    },

    initMouseHandling: function(){
      // no-nonsense drag and drop (thanks springy.js)
      selected = null;
      nearest = null;
      var dragged = null;
      var oldmass = 1;

      $(canvas).mousedown(function(e){
        var pos = $(this).offset();
        var p = {x:e.pageX-pos.left, y:e.pageY-pos.top};
        selected = nearest = dragged = particleSystem.nearest(p);

        if (selected && selected.node !== null){
          dragged.node.tempMass = constants.clickDragMass;
          dragged.node.fixed = true;
        }
        return false;
      });

      $(canvas).mousemove(function(e){
        var old_nearest = nearest && nearest.node._id;
        var pos = $(this).offset();
        var s = {x:e.pageX-pos.left, y:e.pageY-pos.top};

        nearest = particleSystem.nearest(s);
        if (!nearest) { return; }

        if (dragged !== null && dragged.node !== null) {
          var p = particleSystem.fromScreen(s);
          dragged.node.p = {x:p.x, y:p.y};
          dragged.tempMass = constants.clickDragMass;
        }

        return false;
      });

      $(window).bind('mouseup',function(e){
        if (dragged===null || dragged.node===undefined) return
        dragged.node.fixed = false;
        dragged.node.tempMass = constants.baseMass;
        dragged = null;
        selected = null;
        return false;
      });
            
    },
  }
  return that;
}

function addRandom() {
  // Add some random nodes and edges to the graph!
  nodes = [];
  for (var i = 0; i < 15; i++) {
    var id = randomString(8);
    var node = sys.addNode(id);
    nodes.push(node);
  }

  var randNode = function() {
    var length = nodes.length;
    var index = Math.floor(Math.random() * length);
    return nodes[index];
  };

  var closures = [];
  for (var i = 0; i < 20; i++) {
    var node1 = randNode();
    var node2 = randNode();
    // lol will it ever end?
    while (node1 === node2) {
      node2 = randNode();
    }
    sys.addEdge(node1, node2);
  }
  for (var i = 0; i < nodes.length; i++) {
    var node2 = randNode();
    while (nodes[i] === node2) {
      node2 = randNode();
    }
    sys.addEdge(nodes[i], node2);
  }
}
