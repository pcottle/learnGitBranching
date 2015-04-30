/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  Navigator,
} = React;

var Routes = require('../constants/Routes');
var SequenceSelectView = require('../native_react_views/SequenceSelectView');
var LevelSelectView = require('../native_react_views/LevelSelectView');
var NUXView = require('../native_react_views/NUXView');

var INITIAL_ROUTE = Routes.NUX;

var LearnGitBranching = React.createClass({

  _renderScene: function(route, navigator) {
    switch (route.id) {
      case Routes.SEQUENCE_SELECT:
        return <SequenceSelectView navigator={navigator} />;
      case Routes.LEVEL_SELECT:
        return <LevelSelectView navigator={navigator} />;
      case Routes.NUX:
        return <NUXView navigator={navigator} />;
    }
    throw new Exception('No route found for ' + route.id);
  },

  render: function() {
    return (
      <Navigator
        initialRoute={Routes.getRouteForID(INITIAL_ROUTE)}
        renderScene={this._renderScene}
      />
    );
  },

});

AppRegistry.registerComponent('LearnGitBranching', () => LearnGitBranching);
