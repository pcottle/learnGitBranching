var _ = require('underscore');
var Backbone = require('backbone');

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

var filterError = function(err) {
  if (err instanceof CommandProcessError ||
      err instanceof GitError ||
      err instanceof CommandResult ||
      err instanceof Warning) {
    // yay! one of ours
    return;
  } else {
    throw err;
  }
};

exports.filterError = filterError;
