var NavButton = require('../native_react_views/NavButton');
var React = require('react-native');
var Routes = require('../constants/Routes');
var {
  ScrollView,
  StyleSheet,
  Text,
  View,
} = React;

var AppStyles = require('../constants/AppStyles');

var SequenceSelectView = React.createClass({

  propTypes: {
    navigator: React.PropTypes.object.isRequired,
  },

  render: function() {
    return (
      <View style={styles.background}>
        <View style={styles.headerSpacer} />
        <ScrollView>
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
      </View>
    );
  }

});

var styles = StyleSheet.create({
  background: {
    backgroundColor: AppStyles.blueBackground,
    flex: 1
  },
  headerSpacer: {
    height: 20,
    backgroundColor: '#EFEDEE',
  },
});

module.exports = SequenceSelectView;
