var _ = require('underscore');
var Backbone = require('backbone');

var VisBase = Backbone.Model.extend({
  removeKeys: function(keys) {
    _.each(keys, function(key) {
      if (this.get(key)) {
        this.get(key).remove();
      }
    }, this);
  },

  animateAttrKeys: function(keys, attrObj, speed, easing) {
    // either we animate a specific subset of keys or all
    // possible things we could animate
    keys = _.extend(
      {},
      {
        include: ['circle', 'arrow', 'rect', 'path', 'text'],
        exclude: []
      },
      keys || {}
    );

    var attr = this.getAttributes();

    // safely insert this attribute into all the keys we want
    _.each(keys.include, function(key) {
      attr[key] = _.extend(
        {},
        attr[key],
        attrObj
      );
    });

    _.each(keys.exclude, function(key) {
      delete attr[key];
    });

    this.animateToAttr(attr, speed, easing);
  }
});

exports.VisBase = VisBase;

