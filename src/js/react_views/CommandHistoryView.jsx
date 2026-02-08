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

  componentDidUpdate() {
    // Ensure we stay pinned to the bottom after any render
    this.scrollDown();
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
    // Run after layout so measurements include freshly-rendered help text
    window.requestAnimationFrame(() => {
      var cD = document.getElementById('commandDisplay');
      var t = document.getElementById('terminal');
      if (!cD || !t) { return; }

      // scrollHeight catches the full rendered content
      var shouldScroll = cD.scrollHeight > t.clientHeight;

      t.classList.toggle('scrolling', shouldScroll);

      if (shouldScroll) {
        t.scrollTop = t.scrollHeight;
      }
    });
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
