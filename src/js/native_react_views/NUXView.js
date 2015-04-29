var NavButton = require('../native_react_views/NavButton');
var React = require('react-native');
var Routes = require('../constants/Routes');
var {
  ScrollView,
  StyleSheet,
  Text,
  View,
} = React;

var Colors = require('../constants/Colors');
var TerminalCardView = require('../native_react_views/TerminalCardView');

var NUXView = React.createClass({

  propTypes: {
    navigator: React.PropTypes.object.isRequired,
  },

  render: function() {
    return (
      <View style={styles.background}>
        <View style={styles.headerSpacer} />
        <TerminalCardView />
        <NavButton
          text="Level 1"
          onPress={() => {
            this.props.navigator.push(
              Routes.getRouteForID(Routes.LEVEL_SELECT)
            );
          }}
        />
      </View>
    );
  }

});

var styles = StyleSheet.create({
  background: {
    backgroundColor: Colors.blueBackground,
    flex: 1
  },
  headerSpacer: {
    height: 20,
    backgroundColor: '#EFEDEE',
  },
});

module.exports = NUXView;
