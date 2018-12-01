var Backbone = require('backbone');

var VisBase = Backbone.Model.extend({
  removeKeys: function(keys) {
    keys.forEach(function(key) {
      if (this.get(key)) {
        this.get(key).remove();
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
