"use strict";

var AppConstants = require('../constants/AppConstants');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;

var assign = require('object-assign');

var ActionTypes = AppConstants.ActionTypes;
var DEFAULT_LOCALE = 'en_US';

// resolve the messy mapping between browser language
// and our supported locales
var langLocaleMap = {
  en: 'en_US',
  zh: 'zh_CN',
  ja: 'ja',
  ko: 'ko',
  es: 'es_AR',
  fr: 'fr_FR',
  de: 'de_DE',
  pt: 'pt_BR',
  ru: 'ru_RU',
  uk: 'uk'
};

var headerLocaleMap = {
  'zh-CN': 'zh_CN',
  'zh-TW': 'zh_TW',
  'pt-BR': 'pt_BR'
};

function _getLocaleFromHeader(langString) {
  var languages = langString.split(',');
  var desiredLocale;
  for (var i = 0; i < languages.length; i++) {
    var header = languages[i].split(';')[0];
    // first check the full string raw
    if (headerLocaleMap[header]) {
      desiredLocale = headerLocaleMap[header];
      break;
    }

    var lang = header.slice(0, 2);
    if (langLocaleMap[lang]) {
      desiredLocale = langLocaleMap[lang];
      break;
    }
  }
  return desiredLocale;
}

var _locale = DEFAULT_LOCALE;
var LocaleStore = assign(
{},
EventEmitter.prototype,
AppConstants.StoreSubscribePrototype,
{

  getDefaultLocale: function() {
    return DEFAULT_LOCALE;
  },

  getLangLocaleMap: function() {
    return assign({}, langLocaleMap);
  },

  getHeaderLocaleMap: function() {
    return assign({}, headerLocaleMap);
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
      case ActionTypes.CHANGE_LOCALE_FROM_HEADER:
        var value = _getLocaleFromHeader(action.header);
        if (value) {
          _locale = value;
          shouldInform = true;
        }
        break;
    }

    if (shouldInform) {
      LocaleStore.emit(AppConstants.CHANGE_EVENT);
    }
  })

});

module.exports = LocaleStore;
