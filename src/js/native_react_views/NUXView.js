var assign = require('object-assign');
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

var NUXView = React.createClass({

  propTypes: {
    navigator: React.PropTypes.object.isRequired,
  },

  render: function() {
    return (
      <View style={styles.background}>
        <HeaderSpacer />
        <View style={styles.container}>
          <TerminalCardView>
            <View style={styles.welcomeTextContainer}>
              <Text style={styles.welcomeText}>
                Welcome To...
              </Text>
              <Text style={styles.welcomeText}>
                Learn Git Branching!
              </Text>
            </View>
            <Text style={styles.introText}>
              Learn Git Branching is the most interactive
              and visual way to master Git. 
            </Text>
            <Text style={styles.introText}>
              With over 30 tutorials and levels, everyone from
              absolute beginners to experienced Git wizards
              should find something challenging and new.
            </Text>
          </TerminalCardView>
          <View style={styles.buttonContainer}>
            <NavButton
              text="Let's Get Started!"
              onPress={() => {
                this.props.navigator.push(
                  Routes.getRouteForID(Routes.SEQUENCE_SELECT)
                );
              }}
            />
          </View>
        </View>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 40,
  },
  background: {
    backgroundColor: AppStyles.blueBackground,
    flex: 1
  },
  container: {
    padding: 12,
  },
  welcomeTextContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: assign({}, AppStyles.terminalTextStyle, {
    fontSize: 24,
    marginBottom: 8
  }),
  introText: assign({}, AppStyles.terminalTextStyle, {
    marginTop: 8,
    flex: 1,
    marginBottom: 8
  }),
});

module.exports = NUXView;
