var NavButton = require('../native_react_views/NavButton');
var React = require('react-native');
var Routes = require('../constants/Routes');

var {
  ScrollView,
  StyleSheet,
  Text,
  View,
} = React;

var LevelSelectView = React.createClass({

  propTypes: {
    navigator: React.PropTypes.object.isRequired,
  },

  render: function() {
    return (
      <ScrollView>
        <View style={styles.headerSpacer} />
        <View>
          <NavButton
            text="Go to top"
            onPress={() => {
              this.props.navigator.popToTop();
            }}
          />
        </View>
      </ScrollView>
    );
  }

});

var styles = StyleSheet.create({
  headerSpacer: {
    height: 40
  },
});

module.exports = LevelSelectView;
