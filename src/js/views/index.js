var GitError = require('../util/errors').GitError;
var _ = require('underscore');
// horrible hack to get localStorage Backbone plugin
var Backbone = (!require('../util').isBrowser()) ? require('backbone') : window.Backbone;

var ModalView = Backbone.View.extend({
  tagName: 'div',
  className: 'modalView box horizontal center transitionOpacity',
  template: _.template($('#modal-view-template').html()),

  initialize: function(options) {
    this.render();
  },

  render: function() {
    // add ourselves to the DOM
    this.$el.html(this.template({}));
    $('body').append(this.el);
    console.log(this.el);
    var _this = this;
    setTimeout(function() {
      _this.show();
    }, 1050);
  },

  show: function() {
    this.display(true);
  },

  hide: function() {
    this.display(false);
  },

  getInsideElement: function() {
    return this.$('.contentHolder');
  },

  display: function(value) {
    this.$el.toggleClass('show', value);
  },

  tearDown: function() {
    this.hide();
  }
});

exports.ModalView = ModalView;

