var _ = require('underscore');
var Backbone = require('backbone');

var Main = require('../main');

function InputWaterfall() {

  Main.getEvents().on('processCommand', this.process)

};

InputWaterfall.prototype.listen = function() {
  Main.getEvents().

};

exports.InputWaterfall = InputWaterfall;
