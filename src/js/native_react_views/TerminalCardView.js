var React = require('react-native');
var {
  StyleSheet,
  Text,
  View,
} = React;

var Colors = require('../constants/Colors');

var TerminalCardView = React.createClass({
  render: function() {
    return (
      <View style={styles.terminalWindow}>
        <Text style={styles.terminalText}>
          Welcome to learn git branching
        </Text>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  terminalWindow: {
    backgroundColor: Colors.terminalBackground,
  },

  terminalText: {
    color: Colors.terminalText,
    fontFamily: 'Courier',
    fontSize: 16,
    fontWeight: 'bold'
  },

});

module.exports = TerminalCardView;
