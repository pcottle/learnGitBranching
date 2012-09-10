function CommandProcessError(msg) {
  this.msg = msg; 
}

CommandProcessError.prototype = _.copy(Error.prototype);

CommandProcessError.prototype.toString = function() {
  return 'Command Process Error: ' + this.msg;
};

function CommandResult(msg) {
  this.msg = msg; 
}

CommandResult.prototype = _.copy(Error.prototype);

CommandResult.prototype.toString = function() {
  return 'Command Result: ' + this.msg;
};

CommandResult.prototype.toResult = function() {
  return this.msg.replace('\n', '</br>');
};
