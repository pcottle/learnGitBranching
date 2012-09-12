function CommandProcessError(msg) {
  this.msg = msg; 
}

CommandProcessError.prototype.toString = function() {
  return 'Command Process Error: ' + this.msg;
};

CommandProcessError.prototype.toResult = function() {
  return this.msg.replace('\n', '</br>');
};

function CommandResult(msg) {
  this.msg = msg; 
}

CommandResult.prototype.toString = function() {
  return 'Command Result: ' + this.msg;
};

CommandResult.prototype.toResult = function() {
  return this.msg.replace('\n', '</br>');
};

function GitError(msg) {
  this.msg = msg;
}

GitError.prototype.toString = function() {
  return 'Git Error: ' + this.msg;
};
