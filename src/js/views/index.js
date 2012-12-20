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

var ModalTerminal = Backbone.View.extend({
  tagName: 'div',
  className: 'ModalTerminal box',

  initialize: function(options) {
    options = options || {};
    this.text = options.text || 'alert!';
    this.container = new ModalView();
    this.render();
  },

  render: function() {
    var destination = this.container.getInsideElement();
    $(destination).html('<p> lol wut </p>');
  },

  show: function() {
    this.container.show();
  },

  hide: function() {
    this.container.hide();
  }
});

exports.ModalView = ModalView;
exports.ModalTerminal = ModalTerminal;

