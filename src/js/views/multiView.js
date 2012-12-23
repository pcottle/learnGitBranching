var GitError = require('../util/errors').GitError;
var _ = require('underscore');
var Q = require('q');
// horrible hack to get localStorage Backbone plugin
var Backbone = (!require('../util').isBrowser()) ? require('backbone') : window.Backbone;

var ModalTerminal = require('../views').ModalTerminal;
var ContainedBase = require('../views').ContainedBase;
var ConfirmCancelView = require('../views').ConfirmCancelView;
var LeftRightView = require('../views').LeftRightView;
var ModalAlert = require('../views').ModalAlert;

var MultiView = Backbone.View.extend({
  tagName: 'div',
  className: 'multiView',
  typeToConstructor: {
    ModalAlert: ModalAlert
  },
  initialize: function(options) {
    options = options || {};
    if (!options.childViews) {
      options.childViews = [{
        type: 'ModalAlert',
        options: {
          markdown: 'Woah wtf!!'
        }
      }, {
        type: 'ModalAlert',
        options: {
          markdown: 'Im second'
        }
      }];
    }
    this.childViewJSONs = options.childViews;
    this.childViews = [];
    this.render();
  },

  createChildView: function(viewJSON) {
    var type = viewJSON.type;
    if (!this.typeToConstructor[type]) {
      throw new Error('wut');
    }
    var view = new this.typeToConstructor[type](viewJSON.options);
    this.childViews.push(view);
    view.show();
  },

  render: function() {
    // go through each and render... show the first
    _.each(this.childViewJSONs, function(childView) {
      this.createChildView(childView);
    }, this);
  }
});

exports.MultiView = MultiView;


