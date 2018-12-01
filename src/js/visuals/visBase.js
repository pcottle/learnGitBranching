var Backbone = require('backbone');

var VisBase = Backbone.Model.extend({
  removeKeys: function(keys) {
    keys.forEach(function(key) {
      if (this.get(key)) {
        this.get(key).remove();
      }
    }, this);
  },

  getNonAnimateKeys: function() {
    return [
      'stroke-dasharray'
    ];
  },

  getIsInOrigin: function() {
    if (!this.get('gitEngine')) {
      return false;
    }
    return this.get('gitEngine').isOrigin();
  },

  animateToAttr: function(attr, speed, easing) {
    if (speed === 0) {
      this.setAttr(attr, /* instant */ true);
      return;
    }

    var s = speed !== undefined ? speed : this.get('animationSpeed');
    var e = easing || this.get('animationEasing');
    this.setAttr(attr, /* instance */ false, s, e);
  },

  setAttrBase: function(keys, attr, instant, speed, easing) {
    keys.forEach(function(key) {
      if (instant) {
        this.get(key).attr(attr[key]);
      } else {
        this.get(key).stop();
        this.get(key).animate(attr[key], speed, easing);
        // some keys don't support animating too, so set those instantly here
        this.getNonAnimateKeys().forEach(function(nonAnimateKey) {
          if (attr[key] && attr[key][nonAnimateKey] !== undefined) {
            this.get(key).attr(nonAnimateKey, attr[key][nonAnimateKey]);
          }
        }, this);
      }

      if (attr.css) {
        $(this.get(key).node).css(attr.css);
      }
    }, this);
  },

  animateAttrKeys: function(keys, attrObj, speed, easing) {
    // either we animate a specific subset of keys or all
    // possible things we could animate
    keys = Object.assign(
      {},
      {
        include: ['circle', 'arrow', 'rect', 'path', 'text'],
        exclude: []
      },
      keys || {}
    );

    var attr = this.getAttributes();

    // safely insert this attribute into all the keys we want
    keys.include.forEach(function(key) {
      attr[key] = Object.assign(
        {},
        attr[key],
        attrObj
      );
    });

    keys.exclude.forEach(function(key) {
      delete attr[key];
    });

    this.animateToAttr(attr, speed, easing);
  }
});

exports.VisBase = VisBase;
