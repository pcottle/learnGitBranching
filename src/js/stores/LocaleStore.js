'use strict';

var AppConstants = require('../constants/AppConstants');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;

var assign = require('object-assign');

var ActionTypes = AppConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var _locale = 'en_US';
var LocaleStore = assign({}, EventEmitter.prototype, {

  subscribe: function(cb) {
    this.on(CHANGE_EVENT, cb);
  },

  unsubscribe: function(cb) {
    this.removeListener(CHANGE_EVENT, cb);
  },

  getLocale: function() {
    return _locale;
  },

  dispatchToken: AppDispatcher.register(function(payload) {
    var action = payload.action;
    var shouldInform = false;

    switch (action.type) {
      case ActionTypes.CHANGE_LOCALE:
        _locale = action.locale;
        shouldInform = true;
        break;
    }

    if (shouldInform) {
      LocaleStore.emit(CHANGE_EVENT);
    }
  })

});

module.exports = LocaleStore;
