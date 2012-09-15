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

      events.trigger('fixNodePositions', particleSystem);

      ctx.clearRect(0,0, canvas.width, canvas.height);
      particleSystem.eachEdge(this.drawEdge);
      particleSystem.eachNode(this.drawNode);

      events.trigger('drawGitVisuals', particleSystem, ctx, canvas);
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

