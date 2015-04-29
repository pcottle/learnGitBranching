/**
 * Simple views for the app that dont really change.
 */

var React = require('react-native');
var Routes = require('../constants/Routes');
var {
  StyleSheet,
  View,
} = React;

var HeaderSpacer = React.createClass({

  render: function() {
    return <View style={styles.headerSpacer} />;
  }
  
});

var styles = StyleSheet.create({
  headerSpacer: {
    height: 20,
    backgroundColor: '#FFF'
  },
});

module.exports.HeaderSpacer = HeaderSpacer;
