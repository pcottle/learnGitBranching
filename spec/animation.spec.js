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

  it('Will resolve a deferred', function() {
    var value = 0;
    var closure = function() {
      value++;
    };

    var animation = new PromiseAnimation({
      closure: closure
    });
    animation
    .then(function() {
      value++;
    })
    .then(function() {
      if (value !== 2) {
        console.log('second promise failed!!');
      } else {
        console.log('1 more test passed');
      }
      // TODO -- make this work (aka the tests keep running until
      // this assertion finishes
      expect(value).toBe(2);
    });

    animation.play();
    expect(value).toBe(1);
  });

  it('will make one from a normal animation', function() {
    // poor mans spy function
    var value = 0;
    var anim = new Animation({
      closure: function() { value++; }
    });

    var animPromise = PromiseAnimation.fromAnimation(anim);
    animPromise
    .then(function() {
      value++;
    }).then(function() {
      // TODO fix
      expect(value).toBe(2);
      if (value !== 2) {
        console.log('a test failed!!');
      } else {
        console.log('another test passed');
      }
    });

    animPromise.play();
    expect(value).toBe(1);
  });
});
