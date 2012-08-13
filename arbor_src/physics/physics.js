//
// physics.js
//
// the particle system itself. either run inline or in a worker (see worker.js)
//

  var Physics = function(dt, stiffness, repulsion, friction, updateFn, integrator){
    var bhTree = BarnesHutTree() // for computing particle repulsion
    var active = {particles:{}, springs:{}}
    var free = {particles:{}}
    var particles = []
    var springs = []
    var _epoch=0
    var _energy = {sum:0, max:0, mean:0}
    var _bounds = {topleft:new Point(-1,-1), bottomright:new Point(1,1)}

    var SPEED_LIMIT = 1000 // the max particle velocity per tick
    
    var that = {
      integrator:['verlet','euler'].indexOf(integrator)>=0 ? integrator : 'verlet',
      stiffness:(stiffness!==undefined) ? stiffness : 1000,
      repulsion:(repulsion!==undefined)? repulsion : 600,
      friction:(friction!==undefined)? friction : .3,
      gravity:false,
      dt:(dt!==undefined)? dt : 0.02,
      theta:.4, // the criterion value for the barnes-hut s/d calculation
      
      init:function(){
        return that
      },

      modifyPhysics:function(param){
        $.each(['stiffness','repulsion','friction','gravity','dt','precision', 'integrator'], function(i, p){
          if (param[p]!==undefined){
            if (p=='precision'){
              that.theta = 1-param[p]
              return
            }
            that[p] = param[p]

            if (p=='stiffness'){
              var stiff=param[p]
              $.each(active.springs, function(id, spring){
                spring.k = stiff
              })             
            }
          }
        })
      },

      addNode:function(c){
        var id = c.id
        var mass = c.m

        var w = _bounds.bottomright.x - _bounds.topleft.x
        var h = _bounds.bottomright.y - _bounds.topleft.y
        var randomish_pt = new Point((c.x != null) ? c.x: _bounds.topleft.x + w*Math.random(),
                                     (c.y != null) ? c.y: _bounds.topleft.y + h*Math.random())

        
        active.particles[id] = new Particle(randomish_pt, mass);
        active.particles[id].connections = 0
        active.particles[id].fixed = (c.f===1)
        free.particles[id] = active.particles[id]
        particles.push(active.particles[id])        
      },

      dropNode:function(c){
        var id = c.id
        var dropping = active.particles[id]
        var idx = $.inArray(dropping, particles)
        if (idx>-1) particles.splice(idx,1)
        delete active.particles[id]
        delete free.particles[id]
      },

      modifyNode:function(id, mods){
        if (id in active.particles){
          var pt = active.particles[id]
          if ('x' in mods) pt.p.x = mods.x
          if ('y' in mods) pt.p.y = mods.y
          if ('m' in mods) pt.m = mods.m
          if ('f' in mods) pt.fixed = (mods.f===1)
          if ('_m' in mods){
            if (pt._m===undefined) pt._m = pt.m
            pt.m = mods._m            
          }
        }
      },

      addSpring:function(c){
        var id = c.id
        var length = c.l
        var from = active.particles[c.fm]
        var to = active.particles[c.to]
        
        if (from!==undefined && to!==undefined){
          active.springs[id] = new Spring(from, to, length, that.stiffness)
          springs.push(active.springs[id])
          
          from.connections++
          to.connections++
          
          delete free.particles[c.fm]
          delete free.particles[c.to]
        }
      },

      dropSpring:function(c){
        var id = c.id
        var dropping = active.springs[id]
        
        dropping.point1.connections--
        dropping.point2.connections--
        
        var idx = $.inArray(dropping, springs)
        if (idx>-1){
           springs.splice(idx,1)
        }
        delete active.springs[id]
      },

      _update:function(changes){
        // batch changes phoned in (automatically) by a ParticleSystem
        _epoch++
        
        $.each(changes, function(i, c){
          if (c.t in that) that[c.t](c)
        })
        return _epoch
      },

      tick:function(){
        that.tendParticles()
        if (that.integrator=='euler'){
          that.updateForces()
          that.updateVelocity(that.dt)
          that.updatePosition(that.dt)
        }else{
          // default to verlet
          that.updateForces();
          that.cacheForces();           // snapshot f(t)
          that.updatePosition(that.dt); // update position to x(t + 1)
          that.updateForces();          // calculate f(t+1)
          that.updateVelocity(that.dt); // update using f(t) and f(t+1) 
        }
        that.tock()
      },

      tock:function(){
        var coords = []
        $.each(active.particles, function(id, pt){
          coords.push(id)
          coords.push(pt.p.x)
          coords.push(pt.p.y)
        })

        if (updateFn) updateFn({geometry:coords, epoch:_epoch, energy:_energy, bounds:_bounds})
      },

      tendParticles:function(){
        $.each(active.particles, function(id, pt){
          // decay down any of the temporary mass increases that were passed along
          // by using an {_m:} instead of an {m:} (which is to say via a Node having
          // its .tempMass attr set)
          if (pt._m!==undefined){
            if (Math.abs(pt.m-pt._m)<1){
              pt.m = pt._m
              delete pt._m
            }else{
              pt.m *= .98
            }
          }

          // zero out the velocity from one tick to the next
          pt.v.x = pt.v.y = 0           
        })

      },
      
      
      // Physics stuff      
      updateForces:function() {
        if (that.repulsion>0){
          if (that.theta>0) that.applyBarnesHutRepulsion()
          else that.applyBruteForceRepulsion()
        }
        if (that.stiffness>0) that.applySprings()
        that.applyCenterDrift()
        if (that.gravity) that.applyCenterGravity()
      },
      
      cacheForces:function() {
        // keep a snapshot of the current forces for the verlet integrator
        $.each(active.particles, function(id, point) {
           point._F = point.f;
           point._m = point.m;
        });
      },
      
      applyBruteForceRepulsion:function(){
        $.each(active.particles, function(id1, point1){
          $.each(active.particles, function(id2, point2){
            if (point1 !== point2){
              var d = point1.p.subtract(point2.p);
              var distance = Math.max(1.0, d.magnitude());
              var direction = ((d.magnitude()>0) ? d : Point.random(1)).normalize()

              // apply force to each end point
              // (consult the cached `real' mass value if the mass is being poked to allow
              // for repositioning. the poked mass will still be used in .applyforce() so
              // all should be well)
              point1.applyForce(direction.multiply(that.repulsion*(point2._m||point2.m)*.5)
                                         .divide(distance * distance * 0.5) );
              point2.applyForce(direction.multiply(that.repulsion*(point1._m||point1.m)*.5)
                                         .divide(distance * distance * -0.5) );

            }
          })          
        })
      },
      
      applyBarnesHutRepulsion:function(){
        if (!_bounds.topleft || !_bounds.bottomright) return
        var bottomright = new Point(_bounds.bottomright)
        var topleft = new Point(_bounds.topleft)

        // build a barnes-hut tree...
        bhTree.init(topleft, bottomright, that.theta)        
        $.each(active.particles, function(id, particle){
          bhTree.insert(particle)
        })
        
        // ...and use it to approximate the repulsion forces
        $.each(active.particles, function(id, particle){
          bhTree.applyForces(particle, that.repulsion)
        })
      },
      
      applySprings:function(){
        $.each(active.springs, function(id, spring){
          var d = spring.point2.p.subtract(spring.point1.p); // the direction of the spring
          var displacement = spring.length - d.magnitude()//Math.max(.1, d.magnitude());
          var direction = ( (d.magnitude()>0) ? d : Point.random(1) ).normalize()

          // BUG:
          // since things oscillate wildly for hub nodes, should probably normalize spring
          // forces by the number of incoming edges for each node. naive normalization 
          // doesn't work very well though. what's the `right' way to do it?

          // apply force to each end point
          spring.point1.applyForce(direction.multiply(spring.k * displacement * -0.5))
          spring.point2.applyForce(direction.multiply(spring.k * displacement * 0.5))
        });
      },


      applyCenterDrift:function(){
        // find the centroid of all the particles in the system and shift everything
        // so the cloud is centered over the origin
        var numParticles = 0
        var centroid = new Point(0,0)
        $.each(active.particles, function(id, point) {
          centroid.add(point.p)
          numParticles++
        });

        if (numParticles==0) return
        
        var correction = centroid.divide(-numParticles)
        $.each(active.particles, function(id, point) {
          point.applyForce(correction)
        })
        
      },
      applyCenterGravity:function(){
        // attract each node to the origin
        $.each(active.particles, function(id, point) {
          var direction = point.p.multiply(-1.0);
          point.applyForce(direction.multiply(that.repulsion / 100.0));
        });
      },
      
      updateVelocity:function(timestep){
        // translate forces to a new velocity for this particle
        var sum=0, max=0, n = 0;
        $.each(active.particles, function(id, point) {
          if (point.fixed){
             point.v = new Point(0,0)
             point.f = new Point(0,0)
             return
          }

          if (that.integrator=='euler'){
            point.v = point.v.add(point.f.multiply(timestep)).multiply(1-that.friction);
          }else{
            point.v = point.v.add(point.f.add(point._F.divide(point._m)).multiply(timestep*0.5)).multiply(1-that.friction);
          }
          point.f.x = point.f.y = 0

          var speed = point.v.magnitude()          
          if (speed>SPEED_LIMIT) point.v = point.v.divide(speed*speed)

          var speed = point.v.magnitude();
          var e = speed*speed
          sum += e
          max = Math.max(e,max)
          n++
        });
        _energy = {sum:sum, max:max, mean:sum/n, n:n}
        
      },

      updatePosition:function(timestep){
        // translate velocity to a position delta
        var bottomright = null
        var topleft = null        
        
        $.each(active.particles, function(i, point) {

          // move the node to its new position
          if (that.integrator=='euler'){
            point.p = point.p.add(point.v.multiply(timestep));
          }else{
            //this should follow the equation
            //x(t+1) = x(t) + v(t) * timestep + 1/2 * timestep^2 * a(t)
            var accelPart = point.f.multiply(0.5 * timestep * timestep).divide(point.m);
            point.p = point.p.add(point.v.multiply(timestep)).add(accelPart);
          }
          
          if (!bottomright){
            bottomright = new Point(point.p.x, point.p.y)
            topleft = new Point(point.p.x, point.p.y)
            return
          }
        
          var pt = point.p
          if (pt.x===null || pt.y===null) return
          if (pt.x > bottomright.x) bottomright.x = pt.x;
          if (pt.y > bottomright.y) bottomright.y = pt.y;          
          if (pt.x < topleft.x)     topleft.x = pt.x;
          if (pt.y < topleft.y)     topleft.y = pt.y;
        });
        
        _bounds = {topleft:topleft||new Point(-1,-1), bottomright:bottomright||new Point(1,1)}
      },

      systemEnergy:function(timestep){
        // system stats
        return _energy
      }

      
    }
    return that.init()
  }
  
  var _nearParticle = function(center_pt, r){
      var r = r || .0
      var x = center_pt.x
      var y = center_pt.y
      var d = r*2
      return new Point(x-r+Math.random()*d, y-r+Math.random()*d)
  }
