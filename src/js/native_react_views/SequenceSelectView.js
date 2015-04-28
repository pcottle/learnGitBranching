var NavButton = require('../native_react_views/NavButton');
var React = require('react-native');
var Routes = require('../constants/Routes');
var {
  PixelRatio,
  ScrollView,
  StyleSheet,
  Text,
  View,
} = React;

var SequenceSelectView = React.createClass({

  propTypes: {
    navigator: React.PropTypes.object.isRequired,
  },

  render: function() {
    return (
      <ScrollView>
        <View style={styles.headerSpacer} />
        <View>
          <NavButton
            text="Level 1"
            onPress={() => {
              this.props.navigator.push(
                Routes.getRouteForID(Routes.LEVEL_SELECT)
              );
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

module.exports = SequenceSelectView;
