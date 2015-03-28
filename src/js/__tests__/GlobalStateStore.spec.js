var GlobalStateActions = require('../actions/GlobalStateActions');
var GlobalStateStore = require('../stores/GlobalStateStore');

describe('this store', function() {
  it('is can change animating', function() {
    expect(GlobalStateStore.getIsAnimating()).toEqual(false);
    GlobalStateActions.changeIsAnimating(true);
    expect(GlobalStateStore.getIsAnimating()).toEqual(true);
    GlobalStateActions.changeIsAnimating(false);
    expect(GlobalStateStore.getIsAnimating()).toEqual(false);
  });

});
