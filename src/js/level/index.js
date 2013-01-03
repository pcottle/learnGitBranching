var _ = require('underscore');
var Backbone = require('backbone');
var Q = require('q');

var util = require('../util');
var Main = require('../app');

var Visualization = require('../visuals/visualization').Visualization;
var ParseWaterfall = require('../level/parseWaterfall').ParseWaterfall;
var DisabledMap = require('../level/disabledMap').DisabledMap;
var Command = require('../models/commandModel').Command;
var GitShim = require('../git/gitShim').GitShim;

var ModalTerminal = require('../views').ModalTerminal;
var ModalAlert = require('../views').ModalAlert;

var MultiView = require('../views/multiView').MultiView;

/*
this.beforeDeferHandler = function(deferred) {
  var view = new MultiView({
  });
  view.getPromise()
  .then(function() {
    return Q.delay(700);
  })
  .then(function() {
    deferred.resolve();
  })
  .done();
};*/

