var assign = require('object-assign');
var React = require('react-native');
var {
  PixelRatio,
  StyleSheet,
  Text,
  View,
} = React;

var AppStyles = require('../constants/AppStyles');

var TerminalCardView = React.createClass({
  propTypes: {
    text: React.PropTypes.string,
  },

  render: function() {
    return (
      <View style={styles.terminalWindow}>
        <View style={styles.terminalHeader}>
          <View style={styles.closeButton} />
          <View style={styles.minimizeButton} />
          <View style={styles.maximizeButton} />
        </View>
        <View style={styles.terminalTextContainer}>
          {this.renderInner()}
        </View>
      </View>
    );
  },

  renderInner: function() {
    return this.props.text ? 
      <Text style={styles.terminalText}>
        {this.props.text}
      </Text> :
      this.props.children;
  }

});

var BORDER_WIDTH = 1 / PixelRatio.get();
var BORDER_RADIUS = 4;
var BUTTON_SIZE = 12;
var BUTTON_BORDER_RADIUS = BUTTON_SIZE - 2;
var buttonStyle = {
  height: BUTTON_SIZE,
  width: BUTTON_SIZE,
  borderRadius: BUTTON_BORDER_RADIUS,
};

var styles = StyleSheet.create({
  terminalHeader: {
    height: 16,
    backgroundColor: AppStyles.terminalHeader,
    borderRadius: BORDER_RADIUS,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 4
  },

  closeButton: assign({}, buttonStyle, {
    backgroundColor: '#fb625f',
  }),

  minimizeButton: assign({}, buttonStyle, {
    backgroundColor: '#f9c57a',
  }),

  maximizeButton: assign({}, buttonStyle, {
    backgroundColor: '#8ac872',
  }),

  terminalWindow: {
    backgroundColor: AppStyles.terminalBackground,
    borderRadius: BORDER_RADIUS,
    shadowOpacity: 0.5,
    shadowRadius: 4,
    shadowOffset: {
      h: 2,
      w: 2,
    },
  },

  terminalTextContainer: {
    borderWidth: 1 / PixelRatio.get(),
    borderColor: AppStyles.terminalBorder,
    borderRadius: BORDER_RADIUS
  },

  terminalText: {
    color: AppStyles.terminalText,
    fontFamily: AppStyles.terminalFontFamily,
    fontSize: 16,
    fontWeight: 'bold'
  },

});

module.exports = TerminalCardView;
