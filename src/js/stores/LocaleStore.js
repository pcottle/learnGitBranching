"use strict";

var AppConstants = require('../constants/AppConstants');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var util = require('../util');
var EventEmitter = require('events').EventEmitter;

var ActionTypes = AppConstants.ActionTypes;
var DEFAULT_LOCALE = 'en_US';
var LOCALE_STORAGE_KEY = 'locale';
// A stored preference older than this falls back to the browser language, so
// users who never clear it don't stay pinned forever.
var LOCALE_STORAGE_TTL_MS = 1000 * 60 * 60 * 24 * 180;

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
  ro: 'ro',
  bg: 'bg',
  ru: 'ru_RU',
  uk: 'uk',
  vi: 'vi',
  sl: 'sl_SI',
  pl: 'pl',
  it: 'it_IT',
  ta: 'ta_IN',
  te: 'te_IN',
  hi: 'hi_IN',
  tr: 'tr_TR',
  fa: 'fa',
  hu: 'hu_HU',
  ar: 'ar',
  az: 'az',
};

var headerLocaleMap = {
  'zh-CN': 'zh_CN',
  'zh-TW': 'zh_TW',
  'pt-BR': 'pt_BR',
  'es-MX': 'es_MX',
  'es-ES': 'es_ES',
  'it-IT': 'it_IT',
  'sl-SI': 'sl_SI',
  'tr-TR': 'tr_TR',
  'hu-HU': 'hu_HU',
  'hu': 'hu_HU',
  'te-IN': 'te_IN',
  'hi-IN': 'hi_IN',
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

/**
 * The locale the user last picked, if we can read a supported value back.
 * @returns {string|null}
 */
function getStoredLocale() {
  try {
    var raw = window.localStorage.getItem(LOCALE_STORAGE_KEY);
    if (!raw) { return null; }

    var locale = raw;
    var storedAt = null;
    try {
      var parsed = JSON.parse(raw);
      if (parsed && typeof parsed === 'object') {
        locale = parsed.loc;
        storedAt = parsed.at;
      }
    } catch (e) {
      // legacy format: the raw string was the locale
    }

    if (!locale || supportedLocalesList.indexOf(locale) === -1) {
      return null;
    }
    if (storedAt && (Date.now() - storedAt) > LOCALE_STORAGE_TTL_MS) {
      return null;
    }
    return locale;
  } catch (e) {
    // localStorage unavailable (private mode, disabled, ...) -- fall through
    return null;
  }
}

var LocaleStore = Object.assign(
{},
EventEmitter.prototype,
AppConstants.StoreSubscribePrototype,
{

  getDefaultLocale: function() {
    return DEFAULT_LOCALE;
  },

  getStoredLocale: getStoredLocale,

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
      // ponytail: persisted locale wins over navigator.language on later
      // visits until the user switches again. Acceptable for a preference.
      try {
        window.localStorage.setItem(LOCALE_STORAGE_KEY, JSON.stringify({
          loc: _locale,
          at: Date.now()
        }));
      } catch (e) {
        // not remembering the locale is not worth bothering anyone about
      }
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
