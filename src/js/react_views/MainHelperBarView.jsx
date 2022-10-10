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

class MainHelperBarView extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      shownBar: BARS.SELF
    };
  }

  render() {
    return (
      <div>
        <HelperBarView
          className="BaseHelperBar"
          items={this.getItems()}
          shown={this.state.shownBar === BARS.SELF}
        />
        <CommandsHelperBarView
          shown={this.state.shownBar === BARS.COMMANDS}
          onExit={this.showSelf.bind(this)}
        />
        <IntlHelperBarView
          shown={this.state.shownBar === BARS.INTL}
          onExit={this.showSelf.bind(this)}
        />
      </div>
    );
  }

  showSelf() {
    this.setState({
      shownBar: BARS.SELF
    });
  }

  getItems() {
    return [{
      icon: 'question-sign',
      onClick: function() {
        this.setState({
          shownBar: BARS.COMMANDS
        });
      }.bind(this),
      title: 'Show commands'
    }, {
      icon: 'globe',
      onClick: function() {
        this.setState({
          shownBar: BARS.INTL
        });
      }.bind(this),
      title: 'Show available languages'
    }, {
      newPageLink: true,
      icon: 'twitter',
      href: 'https://twitter.com/petermcottle',
      title: 'Follow me on Twitter'
    }];
  }

};

module.exports = MainHelperBarView;
