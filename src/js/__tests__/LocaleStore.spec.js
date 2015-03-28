var AppConstants = require('../constants/AppConstants');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var LocaleActions = require('../actions/LocaleActions');
var LocaleStore = require('../stores/LocaleStore');

var ActionTypes = AppConstants.ActionTypes;

describe('LocaleStore', function() {

  it('changes locales', function() {
    expect(LocaleStore.getLocale()).toEqual('en_US');
    LocaleActions.changeLocale('ja_JP');
    expect(LocaleStore.getLocale()).toEqual('ja_JP');
  });
});
