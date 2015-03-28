"use strict";

var keyMirror = require('react/lib/keyMirror');

module.exports = {

  ActionTypes: keyMirror({
    SUBMIT_COMMAND: null,
    CHANGE_LOCALE: null
  }),

  PayloadSources: keyMirror({
    VIEW_ACTION: null,
    URI_ACTION: null
  })
};
