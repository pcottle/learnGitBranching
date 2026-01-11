var eventEmitter = require('../src/js/util/eventEmitter');

describe('EventEmitter', function() {
  describe('on() and trigger()', function() {
    it('should call callback when event is triggered', function() {
      var emitter = new eventEmitter.EventEmitter();
      var called = false;
      emitter.on('test', function() {
        called = true;
      });
      emitter.trigger('test');
      expect(called).toBe(true);
    });

    it('should pass arguments to callback', function() {
      var emitter = new eventEmitter.EventEmitter();
      var receivedArgs = null;
      emitter.on('test', function(arg1, arg2) {
        receivedArgs = [arg1, arg2];
      });
      emitter.trigger('test', 'hello', 'world');
      expect(receivedArgs).toEqual(['hello', 'world']);
    });

    it('should use EventEmitter as default context when no context provided', function() {
      var emitter = new eventEmitter.EventEmitter();
      var receivedContext = null;
      emitter.on('test', function() {
        receivedContext = this;
      });
      emitter.trigger('test');
      expect(receivedContext).toBe(emitter);
    });

    it('should use provided context when context is passed', function() {
      var emitter = new eventEmitter.EventEmitter();
      var customContext = { name: 'custom' };
      var receivedContext = null;
      emitter.on('test', function() {
        receivedContext = this;
      }, customContext);
      emitter.trigger('test');
      expect(receivedContext).toBe(customContext);
    });

    it('should allow callback to access properties on custom context', function() {
      var emitter = new eventEmitter.EventEmitter();
      var obj = {
        value: 42,
        handler: function() {
          return this.value;
        }
      };
      var result = null;
      emitter.on('test', function() {
        result = this.value;
      }, obj);
      emitter.trigger('test');
      expect(result).toBe(42);
    });
  });

  describe('off()', function() {
    it('should remove all listeners for an event when no callback specified', function() {
      var emitter = new eventEmitter.EventEmitter();
      var count = 0;
      emitter.on('test', function() { count++; });
      emitter.on('test', function() { count++; });
      emitter.off('test');
      emitter.trigger('test');
      expect(count).toBe(0);
    });

    it('should remove specific callback', function() {
      var emitter = new eventEmitter.EventEmitter();
      var count1 = 0;
      var count2 = 0;
      var callback1 = function() { count1++; };
      var callback2 = function() { count2++; };
      emitter.on('test', callback1);
      emitter.on('test', callback2);
      emitter.off('test', callback1);
      emitter.trigger('test');
      expect(count1).toBe(0);
      expect(count2).toBe(1);
    });
  });

  describe('once()', function() {
    it('should only fire callback once', function() {
      var emitter = new eventEmitter.EventEmitter();
      var count = 0;
      emitter.once('test', function() {
        count++;
      });
      emitter.trigger('test');
      emitter.trigger('test');
      emitter.trigger('test');
      expect(count).toBe(1);
    });
  });

  describe('createEvents() with bound methods', function() {
    it('should demonstrate context issue when on() is bound to emitter', function() {
      // This test demonstrates the bug that was fixed
      // When createEvents() is used and methods are bound to the emitter,
      // the default context becomes the emitter, not the calling object
      var events = eventEmitter.createEvents();

      var myObject = {
        value: 'myObject',
        _events: events._events,
        on: events.on.bind(events),
        trigger: events.trigger.bind(events)
      };

      var receivedContext = null;
      // Without explicit context, 'this' inside callback will be the EventEmitter
      myObject.on('test', function() {
        receivedContext = this;
      });
      myObject.trigger('test');

      // The context is the EventEmitter, NOT myObject
      expect(receivedContext).toBe(events);
      expect(receivedContext).not.toBe(myObject);
    });

    it('should use correct context when explicitly passed', function() {
      // This is the FIX - always pass 'this' as the third argument
      var events = eventEmitter.createEvents();

      var myObject = {
        value: 'myObject',
        _events: events._events,
        on: events.on.bind(events),
        trigger: events.trigger.bind(events)
      };

      var receivedContext = null;
      // With explicit context, 'this' inside callback will be myObject
      myObject.on('test', function() {
        receivedContext = this;
      }, myObject);  // <-- Pass myObject as context
      myObject.trigger('test');

      expect(receivedContext).toBe(myObject);
      expect(receivedContext.value).toBe('myObject');
    });

    it('should allow method to access instance properties with correct context', function() {
      // Simulates the Level.minimizeGoal scenario
      var events = eventEmitter.createEvents();

      var level = {
        mainVis: { name: 'visualization' },
        _events: events._events,
        on: events.on.bind(events),
        trigger: events.trigger.bind(events),
        minimizeGoal: function() {
          return this.mainVis;
        }
      };

      var result = null;
      level.on('minimizeCanvas', function() {
        result = this.mainVis;
      }, level);  // <-- Pass level as context
      level.trigger('minimizeCanvas');

      expect(result).toBe(level.mainVis);
      expect(result.name).toBe('visualization');
    });

    it('should fail to access instance properties without correct context', function() {
      // Demonstrates what happens WITHOUT the fix
      var events = eventEmitter.createEvents();

      var level = {
        mainVis: { name: 'visualization' },
        _events: events._events,
        on: events.on.bind(events),
        trigger: events.trigger.bind(events)
      };

      var result = 'not-called';
      level.on('minimizeCanvas', function() {
        // 'this' is EventEmitter, which doesn't have mainVis
        result = this.mainVis;
      });  // <-- No context passed
      level.trigger('minimizeCanvas');

      // mainVis is undefined on EventEmitter
      expect(result).toBeUndefined();
    });
  });

  describe('listenTo()', function() {
    it('should listen to events on another object', function() {
      var emitter1 = new eventEmitter.EventEmitter();
      var emitter2 = new eventEmitter.EventEmitter();
      var called = false;

      emitter1.listenTo(emitter2, 'test', function() {
        called = true;
      });
      emitter2.trigger('test');

      expect(called).toBe(true);
    });

    it('should use listener as context', function() {
      var emitter1 = new eventEmitter.EventEmitter();
      var emitter2 = new eventEmitter.EventEmitter();
      var receivedContext = null;

      emitter1.listenTo(emitter2, 'test', function() {
        receivedContext = this;
      });
      emitter2.trigger('test');

      expect(receivedContext).toBe(emitter1);
    });
  });

  describe('stopListening()', function() {
    it('should stop listening to all events', function() {
      var emitter1 = new eventEmitter.EventEmitter();
      var emitter2 = new eventEmitter.EventEmitter();
      var count = 0;

      emitter1.listenTo(emitter2, 'test', function() {
        count++;
      });
      emitter2.trigger('test');
      expect(count).toBe(1);

      emitter1.stopListening();
      emitter2.trigger('test');
      expect(count).toBe(1);
    });
  });

  describe('multiple events', function() {
    it('should handle space-separated event names in on()', function() {
      var emitter = new eventEmitter.EventEmitter();
      var count = 0;
      emitter.on('event1 event2', function() {
        count++;
      });
      emitter.trigger('event1');
      emitter.trigger('event2');
      expect(count).toBe(2);
    });
  });

  // Tests for bugs found during Backbone removal
  describe('off() with context (bug fix)', function() {
    it('should remove listener when callback and context both match', function() {
      var emitter = new eventEmitter.EventEmitter();
      var context1 = { name: 'context1' };
      var count = 0;
      var callback = function() { count++; };

      emitter.on('test', callback, context1);
      emitter.off('test', callback, context1);
      emitter.trigger('test');

      expect(count).toBe(0);
    });

    it('should keep listener when callback matches but context differs', function() {
      var emitter = new eventEmitter.EventEmitter();
      var context1 = { name: 'context1' };
      var context2 = { name: 'context2' };
      var count = 0;
      var callback = function() { count++; };

      emitter.on('test', callback, context1);
      emitter.off('test', callback, context2);  // Different context
      emitter.trigger('test');

      expect(count).toBe(1);  // Should still fire
    });

    it('should remove listener when only callback specified (no context check)', function() {
      var emitter = new eventEmitter.EventEmitter();
      var context1 = { name: 'context1' };
      var count = 0;
      var callback = function() { count++; };

      emitter.on('test', callback, context1);
      emitter.off('test', callback);  // No context = remove regardless of context
      emitter.trigger('test');

      expect(count).toBe(0);
    });

    it('should handle multiple listeners with same callback different contexts', function() {
      var emitter = new eventEmitter.EventEmitter();
      var context1 = { name: 'context1' };
      var context2 = { name: 'context2' };
      var results = [];
      var callback = function() { results.push(this.name); };

      emitter.on('test', callback, context1);
      emitter.on('test', callback, context2);
      emitter.off('test', callback, context1);  // Only remove context1
      emitter.trigger('test');

      expect(results).toEqual(['context2']);
    });
  });

  describe('Sandbox/Level event pattern', function() {
    it('should simulate Sandbox event setup with bound methods', function() {
      // This simulates how Sandbox sets up events
      var events = eventEmitter.createEvents();

      function Sandbox() {
        this._events = events._events;
        this.on = events.on.bind(events);
        this.off = events.off.bind(events);
        this.trigger = events.trigger.bind(events);
        this.mainVis = { myResize: function() { return 'resized'; } };
      }

      var sandbox = new Sandbox();
      var result = null;

      // BUG: Without context, 'this' is EventEmitter
      sandbox.on('resize', function() {
        result = this.mainVis;
      });
      sandbox.trigger('resize');
      expect(result).toBeUndefined();  // mainVis not found on EventEmitter
    });

    it('should work correctly when context is passed (the fix)', function() {
      var events = eventEmitter.createEvents();

      function Sandbox() {
        this._events = events._events;
        this.on = events.on.bind(events);
        this.off = events.off.bind(events);
        this.trigger = events.trigger.bind(events);
        this.mainVis = { myResize: function() { return 'resized'; } };
      }

      var sandbox = new Sandbox();
      var result = null;

      // FIX: Pass 'this' as context
      sandbox.on('resize', function() {
        result = this.mainVis.myResize();
      }, sandbox);
      sandbox.trigger('resize');

      expect(result).toBe('resized');
    });

    it('should simulate Level extending Sandbox with proper event binding', function() {
      var events = eventEmitter.createEvents();

      function Level() {
        this._events = events._events;
        this.on = events.on.bind(events);
        this.off = events.off.bind(events);
        this.trigger = events.trigger.bind(events);

        this.mainVis = { myResize: function() { return 'main resized'; } };
        this.goalVis = { hide: function() { return 'goal hidden'; } };

        // FIX: Always pass 'this' as context
        this.on('minimizeCanvas', this.minimizeGoal, this);
        this.on('resizeCanvas', this.resizeGoal, this);
      }

      Level.prototype.minimizeGoal = function() {
        return this.goalVis.hide();
      };

      Level.prototype.resizeGoal = function() {
        return this.mainVis.myResize();
      };

      var level = new Level();

      var minimizeResult = null;
      var resizeResult = null;

      // Override to capture results
      level.on('minimizeCanvas', function() {
        minimizeResult = this.goalVis.hide();
      }, level);
      level.on('resizeCanvas', function() {
        resizeResult = this.mainVis.myResize();
      }, level);

      level.trigger('minimizeCanvas');
      level.trigger('resizeCanvas');

      expect(minimizeResult).toBe('goal hidden');
      expect(resizeResult).toBe('main resized');
    });
  });

  describe('Event cleanup in die() pattern', function() {
    it('should properly unbind events before destroying objects', function() {
      var events = eventEmitter.createEvents();
      var callCount = 0;

      function Level() {
        this._events = events._events;
        this.on = events.on.bind(events);
        this.off = events.off.bind(events);
        this.trigger = events.trigger.bind(events);

        this.mainVis = { myResize: function() { callCount++; } };

        this.resizeHandler = function() {
          this.mainVis.myResize();
        };

        this.on('resize', this.resizeHandler, this);
      }

      Level.prototype.die = function() {
        // CORRECT: Unbind BEFORE deleting
        this.off('resize');
        delete this.mainVis;
      };

      var level = new Level();
      level.trigger('resize');
      expect(callCount).toBe(1);

      level.die();
      level.trigger('resize');  // Should not throw or increment
      expect(callCount).toBe(1);
    });

    it('should throw if events fire after objects deleted without cleanup', function() {
      var events = eventEmitter.createEvents();

      function Level() {
        this._events = events._events;
        this.on = events.on.bind(events);
        this.off = events.off.bind(events);
        this.trigger = events.trigger.bind(events);

        this.mainVis = { myResize: function() {} };
        this.on('resize', function() {
          this.mainVis.myResize();  // Will throw if mainVis deleted
        }, this);
      }

      Level.prototype.badDie = function() {
        // BUG: Delete without unbinding
        delete this.mainVis;
      };

      var level = new Level();
      level.badDie();

      expect(function() {
        level.trigger('resize');
      }).toThrow();
    });
  });

  describe('CanvasTerminalHolder parent.trigger pattern', function() {
    it('should trigger events on parent with correct context', function() {
      var events = eventEmitter.createEvents();

      function Level() {
        this._events = events._events;
        this.on = events.on.bind(events);
        this.off = events.off.bind(events);
        this.trigger = events.trigger.bind(events);

        this.mainVis = { myResize: function() { return 'resized'; } };
        this.goalVis = { hide: function() { return 'hidden'; } };
        this.results = [];

        this.on('minimizeCanvas', this.minimizeGoal, this);
      }

      Level.prototype.minimizeGoal = function(position, size) {
        this.results.push('minimizeGoal called');
        this.results.push('goalVis: ' + this.goalVis.hide());
        this.results.push('position: ' + JSON.stringify(position));
      };

      function CanvasTerminalHolder(parent) {
        this.parent = parent;
      }

      CanvasTerminalHolder.prototype.minimize = function() {
        this.parent.trigger('minimizeCanvas', { left: 100, top: 50 }, { width: 200, height: 300 });
      };

      var level = new Level();
      var holder = new CanvasTerminalHolder(level);

      holder.minimize();

      expect(level.results).toContain('minimizeGoal called');
      expect(level.results).toContain('goalVis: hidden');
      expect(level.results).toContain('position: {"left":100,"top":50}');
    });
  });
});
