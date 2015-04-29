var assign = require('object-assign');
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
var Levels = require('../../levels');

var intl = require('../intl');

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
              {Object.keys(Levels.levelSequences).map(
                sequenceID => this.renderSelector(sequenceID)
              )}
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
  },

  renderSelector: function(sequenceID) {
    var info = Levels.sequenceInfo[sequenceID];
    var name = intl.getIntlKey(info, 'displayName');
    var about = intl.getIntlKey(info, 'about');

    return (
      <View>
        <Text style={styles.sequenceName}>
          {name}
        </Text>
        <Text style={styles.sequenceAbout}>
          {about}
        </Text>
      </View>
    );
  }

});

var styles = StyleSheet.create({
  sequenceName: assign({}, AppStyles.terminalTextStyle, {
    fontSize: 20,
  }),
  sequenceAbout: assign({}, AppStyles.terminalTextStyle, {
    fontSize: 10,
    marginTop: 8,
    marginBottom: 8,
  }),
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
