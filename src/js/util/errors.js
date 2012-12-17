var _;
var Backbone;
// horrible hack to get localStorage Backbone plugin
if (!require('../util').isBrowser()) {
  _ = require('underscore');
  Backbone = require('backbone');
} else {
  Backbone = window.Backbone;
  _ = window._;
}

var MyError = Backbone.Model.extend({
  defaults: {
    type: 'MyError',
    msg: 'Unknown Error'
  },
  toString: function() {
    return this.get('type') + ': ' + this.get('msg');
  },

  getMsg: function() {
    return this.get('msg') || 'Unknown Error';
  },

  toResult: function() {
    if (!this.get('msg').length) {
      return '';
    }
    return '<p>' + this.get('msg').replace(/\n/g, '</p><p>') + '</p>';
  }
});

var CommandProcessError = exports.CommandProcessError = MyError.extend({
  defaults: {
    type: 'Command Process Error'
  }
});

var CommandResult = exports.CommandResult = MyError.extend({
  defaults: {
    type: 'Command Result'
  }
});

var Warning = exports.Warning = MyError.extend({
  defaults: {
    type: 'Warning'
  }
});

var GitError = exports.GitError = MyError.extend({
  defaults: {
    type: 'Git Error'
  }
});

