var React = require('react');
var PropTypes = require('prop-types');
var HelperBarView = require('../react_views/HelperBarView.jsx');
var Main = require('../app');

var log = require('../log');

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
      text: 'Levels',
      onClick: function() {
        this.fireCommand('levels');
      }.bind(this),
    }, {
      text: 'Solution',
      onClick: function() {
        this.fireCommand('show solution');
      }.bind(this),
    }, {
      text: 'Reset',
      onClick: function() {
        this.fireCommand('reset');
      }.bind(this),
    }, {
      text: 'Undo',
      onClick: function() {
        this.fireCommand('undo');
      }.bind(this),
    }, {
      text: 'Objective',
      onClick: function() {
        this.fireCommand('objective');
      }.bind(this),
    }, {
      text: 'Help',
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
