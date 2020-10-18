"use strict";

var AppConstants = require('../constants/AppConstants');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var util = require('../util');
var EventEmitter = require('events').EventEmitter;

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
  uk: 'uk',
  vi: 'vi',
  sl: 'sl_SI'
};

var headerLocaleMap = {
  'zh-CN': 'zh_CN',
  'zh-TW': 'zh_TW',
  'pt-BR': 'pt_BR',
  'es-MX': 'es_MX',
  'es-ES': 'es_ES',
  'sl-SI': 'sl_SI'
};

var supportedLocalesList = Object.values(langLocaleMap)
                                 .concat(Object.values(headerLocaleMap))
                                 .filter(function (value, index, self) { return self.indexOf(value) === index;});

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
var LocaleStore = Object.assign(
{},
EventEmitter.prototype,
AppConstants.StoreSubscribePrototype,
{

  getDefaultLocale: function() {
    return DEFAULT_LOCALE;
  },

  getLangLocaleMap: function() {
    return Object.assign({}, langLocaleMap);
  },

  getHeaderLocaleMap: function() {
    return Object.assign({}, headerLocaleMap);
  },

  getLocale: function() {
    return _locale;
  },

  getSupportedLocales: function() {
    return supportedLocalesList.slice();
  },

  dispatchToken: AppDispatcher.register(function(payload) {
    var action = payload.action;
    var shouldInform = false;
    var oldLocale = _locale;

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

    if (util.isBrowser() && oldLocale !== _locale) {
      var url = new URL(document.location.href);
      url.searchParams.set('locale', _locale);
      window.history.replaceState({}, '', url.href);
    }

    if (shouldInform) {
      LocaleStore.emit(AppConstants.CHANGE_EVENT);
    }
  })

});

module.exports = LocaleStore;
