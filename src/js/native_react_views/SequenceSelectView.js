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
var AppViews = require('../native_react_views/AppViews');
var {
  HeaderSpacer,
} = AppViews;
var TerminalCardView = require('../native_react_views/TerminalCardView');
var NavButton = require('../native_react_views/NavButton');

var SequenceSelectView = React.createClass({

  propTypes: {
    navigator: React.PropTypes.object.isRequired,
  },

  render: function() {
    return (
      <View style={styles.background}>
        <HeaderSpacer />
        <ScrollView style={styles.container}>
          <View style={styles.headerSpacer} />
          <TerminalCardView>
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
          </TerminalCardView>
        </ScrollView>
      </View>
    );
  }

});

var styles = StyleSheet.create({
  container: {
    padding: 8,
  },
  headerSpacer: {
    height: 24,
  },
  background: {
    backgroundColor: AppStyles.blueBackground,
    flex: 1
  },
});

module.exports = SequenceSelectView;
