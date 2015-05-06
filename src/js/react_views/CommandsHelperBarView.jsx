var HelperBarView = require('../react_views/HelperBarView.jsx');
var Main = require('../app');
var React = require('react');

var log = require('../log');

var CommandsHelperBarView = React.createClass({

  propTypes: {
    shown: React.PropTypes.bool.isRequired,
    onExit: React.PropTypes.func.isRequired
  },

  render: function() {
    return (
      <HelperBarView
        items={this.getItems()}
        shown={this.props.shown}
      />
    );
  },

  fireCommand: function(command) {
    log.viewInteracted('commandHelperBar');
    Main.getEventBaton().trigger('commandSubmitted', command);
  },

  getItems: function() {
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

});

module.exports = CommandsHelperBarView;
