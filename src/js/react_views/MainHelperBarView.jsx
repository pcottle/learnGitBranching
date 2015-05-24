var HelperBarView = require('../react_views/HelperBarView.jsx');
var IntlHelperBarView =
  require('../react_views/IntlHelperBarView.jsx');
var CommandsHelperBarView =
  require('../react_views/CommandsHelperBarView.jsx');
var React = require('react');

var keyMirror = require('../util/keyMirror');
var log = require('../log');

var BARS = keyMirror({
  SELF: null,
  INTL: null,
  COMMANDS: null
});

var MainHelperBarView = React.createClass({

  getInitialState: function() {
    return {
      shownBar: BARS.SELF
    };
  },

  render: function() {
    return (
      <div>
        <HelperBarView
          className="BaseHelperBar"
          items={this.getItems()}
          shown={this.state.shownBar === BARS.SELF}
        />
        <CommandsHelperBarView
          shown={this.state.shownBar === BARS.COMMANDS}
          onExit={this.showSelf}
        />
        <IntlHelperBarView
          shown={this.state.shownBar === BARS.INTL}
          onExit={this.showSelf}
        />
      </div>
    );
  },

  showSelf: function() {
    this.setState({
      shownBar: BARS.SELF
    });
  },

  getItems: function() {
    return [{
      icon: 'question-sign',
      onClick: function() {
        this.setState({
          shownBar: BARS.COMMANDS
        });
      }.bind(this)
    }, {
      icon: 'globe',
      onClick: function() {
        this.setState({
          shownBar: BARS.INTL
        });
      }.bind(this)
    }, {
      newPageLink: true,
      icon: 'twitter',
      href: 'https://twitter.com/petermcottle'
    }, {
      newPageLink: true,
      icon: 'facebook',
      href: 'https://www.facebook.com/LearnGitBranching'
    }];
  }

});

module.exports = MainHelperBarView;
