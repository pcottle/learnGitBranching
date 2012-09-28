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

var CommandProcessError = MyError.extend({
  defaults: {
    type: 'Command Process Error'
  }
});

var CommandResult = MyError.extend({
  defaults: {
    type: 'Command Result'
  }
});

var Warning = MyError.extend({
  defaults: {
    type: 'Warning'
  }
});

var GitError = MyError.extend({
  defaults: {
    type: 'Git Error'
  }
});
