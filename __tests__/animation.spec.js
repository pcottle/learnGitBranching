var AnimationModule = require('../src/js/visuals/animation/index');
var PromiseAnimation = AnimationModule.PromiseAnimation;
var Animation = AnimationModule.Animation;
var Q = require('q');

describe('Promise animation', function() {
  it('Will execute the closure', function() {
    var value = 0;
    var closure = function() {
      value++;
    };

    var animation = new PromiseAnimation({
      deferred: Q.defer(),
      closure: closure
    });
    animation.play();
    expect(value).toBe(1);
  });

  it('also takes animation packs', function() {
    var value = 0;
    var animation = new PromiseAnimation({
      animation: function() { value++; }
    });
    animation.play();
    expect(value).toBe(1);
  });
});
