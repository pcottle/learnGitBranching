var React = require('react');
var PropTypes = require('prop-types');
var HelperBarView = require('../react_views/HelperBarView.jsx');
var Main = require('../app');

var log = require('../log');
var intl = require('../intl');

class CommandsHelperBarView extends React.Component {

  render() {
    return (
      <HelperBarView
        items={this.getItems()}
        shown={this.props.shown}
      />
    );
  }

  fireCommand(command) {
    log.viewInteracted('commandHelperBar');
    Main.getEventBaton().trigger('commandSubmitted', command);
  }

  getItems() {
    return [{
      text: intl.str('command-helper-bar-levels'),
      onClick: function() {
        this.fireCommand('levels');
      }.bind(this),
    }, {
      text: intl.str('command-helper-bar-solution'),
      onClick: function() {
        this.fireCommand('show solution');
      }.bind(this),
    }, {
      text: intl.str('command-helper-bar-reset'),
      onClick: function() {
        this.fireCommand('reset');
      }.bind(this),
    }, {
      text: intl.str('command-helper-bar-undo'),
      onClick: function() {
        this.fireCommand('undo');
      }.bind(this),
    }, {
      text: intl.str('command-helper-bar-objective'),
      onClick: function() {
        this.fireCommand('objective');
      }.bind(this),
    }, {
      text: intl.str('command-helper-bar-help'),
      onClick: function() {
        this.fireCommand('help general; git help');
      }.bind(this)
    }, {
      icon: 'signout',
      onClick: function() {
        this.props.onExit();
      }.bind(this)
    }];
  }

};

CommandsHelperBarView.propTypes = {
  shown: PropTypes.bool.isRequired,
  onExit: PropTypes.func.isRequired
};

module.exports = CommandsHelperBarView;
