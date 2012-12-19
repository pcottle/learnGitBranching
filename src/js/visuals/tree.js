var _ = require('underscore');
var Backbone = require('backbone');

var VisBase = Backbone.Model.extend({
  removeKeys: function(keys) {
    _.each(keys, function(key) {
      if (this.get(key)) {
        this.get(key).remove();
      }
    }, this);
  }
});

exports.VisBase = VisBase;
