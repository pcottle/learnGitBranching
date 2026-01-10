// Error models - converted from Backbone to plain classes

class MyError {
  constructor(options = {}) {
    this.type = options.type || 'MyError';
    this.msg = options.msg;
  }

  get(key) {
    return this[key];
  }

  set(key, value) {
    this[key] = value;
  }

  toString() {
    return this.get('type') + ': ' + this.get('msg');
  }

  getMsg() {
    if (!this.get('msg')) {
      debugger;
      console.warn('my error without message');
    }
    return this.get('msg');
  }
}

class CommandProcessError extends MyError {
  constructor(options = {}) {
    super(options);
    this.type = 'Command Process Error';
  }
}

class CommandResult extends MyError {
  constructor(options = {}) {
    super(options);
    this.type = 'Command Result';
  }
}

class Warning extends MyError {
  constructor(options = {}) {
    super(options);
    this.type = 'Warning';
  }
}

class GitError extends MyError {
  constructor(options = {}) {
    super(options);
    this.type = 'Git Error';
  }
}

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

exports.CommandProcessError = CommandProcessError;
exports.CommandResult = CommandResult;
exports.Warning = Warning;
exports.GitError = GitError;
exports.filterError = filterError;
