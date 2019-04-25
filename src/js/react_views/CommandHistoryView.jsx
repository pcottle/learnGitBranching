var React = require('react');
var PropTypes = require('prop-types');

var CommandView = require('../react_views/CommandView.jsx');
var Main = require('../app');

var _subscribeEvents = [
  'add',
  'reset',
  'change',
  'all'
];

class CommandHistoryView extends React.Component {

  componentDidMount() {
    for (var i = 0; i < _subscribeEvents.length; i++) {
      this.props.commandCollection.on(
        _subscribeEvents[i],
        this.updateFromCollection,
        this
      );
    }

    this.props.commandCollection.on('change', this.scrollDown, this);
    Main.getEvents().on('commandScrollDown', this.scrollDown, this);
    Main.getEvents().on('clearOldCommands', () => this.clearOldCommands(), this);
  }

  componentWillUnmount() {
    for (var i = 0; i < _subscribeEvents.length; i++) {
      this.props.commandCollection.off(
        _subscribeEvents[i],
        this.updateFromCollection,
        this
      );
    }
  }

  updateFromCollection() {
    this.forceUpdate();
  }

  render() {
    var allCommands = [];
    this.props.commandCollection.each(function(command, index) {
      allCommands.push(
        <CommandView
          id={'command_' + index}
          command={command}
          key={command.cid}
        />
      );
    }, this);
    return (
      <div>
        {allCommands}
      </div>
    );
  }

  scrollDown() {
    var cD = document.getElementById('commandDisplay');
    var t = document.getElementById('terminal');

    // firefox hack
    var shouldScroll = (cD.clientHeight > t.clientHeight) ||
      (window.innerHeight < cD.clientHeight);

    // ugh sometimes i wish i had toggle class
    var hasScroll = t.className.match(/scrolling/g);
    if (shouldScroll && !hasScroll) {
      t.className += ' scrolling';
    } else if (!shouldScroll && hasScroll) {
      t.className = t.className.replace(/shouldScroll/g, '');
    }

    if (shouldScroll) {
      t.scrollTop = t.scrollHeight;
    }
  }

  clearOldCommands() {
    // go through and get rid of every command that is "processed" or done
    var toDestroy = [];

    this.props.commandCollection.each(function(command) {
      if (command.get('status') !== 'inqueue' &&
          command.get('status') !== 'processing') {
        toDestroy.push(command);
      }
    }, this);
    for (var i = 0; i < toDestroy.length; i++) {
      toDestroy[i].destroy();
    }
    this.updateFromCollection();
    this.scrollDown();
  }

}

CommandHistoryView.propTypes = {
  // the backbone command model collection
  commandCollection: PropTypes.object.isRequired
};

module.exports = CommandHistoryView;
