var Animation = Backbone.Model.extend({
  defaults: {
    duration: 300,
    closure: null
  },

  validateAtInit: function() {
    if (!this.get('closure')) {
      throw new Error('give me a closure!');
    }
  },

  initialize: function(options) {
    this.validateAtInit();
  },

  run: function() {
    this.get('closure')();
  }
});

var AnimationQueue = Backbone.Model.extend({
  defaults: {
    animations: null,
    index: 0,
    callback: null
  },

  initialize: function(options) {
    this.set('animations', []);
    if (!options.callback) {
      console.warn('no callback');
    }
  },

  add: function(animation) {
    if (!animation instanceof Animation) {
      throw new Error("Need animation not something else");
    }

    this.get('animations').push(animation);
  },

  start: function() {
    this.set('index', 0);
    this.next();
  },

  finish: function() {
    this.get('callback')();
  },

  next: function() {
    // ok so call the first animation, and then set a timeout to call the next
    // TODO: animations with callbacks!!
    var animations = this.get('animations');
    var index = this.get('index');
    if (index >= animations.length) {
      this.finish();
      return;
    }

    var next = animations[index];
    var duration = next.get('duration');

    next.run();

    this.set('index', index + 1);
    setTimeout(_.bind(function() {
      this.next();
    }, this), duration);
  },
});

