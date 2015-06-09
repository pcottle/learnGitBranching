var React = require('react');

var reactUtil = require('../util/reactUtil');
var keyMirror = require('react/lib/keyMirror');

var STATUSES = keyMirror({
  inqueue: null,
  processing: null,
  finished: null
});

var CommandView = React.createClass({

  propTypes: {
    // the backbone command model
    command: React.PropTypes.object.isRequired,
    id: React.PropTypes.string,
  },

  componentDidMount: function() {
    this.props.command.on('change', this.updateStateFromModel, this);
    this.props.command.on('destroy', this.onModelDestroy, this);
    this.updateStateFromModel();
  },

  componentWillUnmount: function() {
    this.props.command.off('change', this.updateStateFromModel, this);
    this.props.command.off('destroy', this.onModelDestroy, this);
  },

  onModelDestroy: function() {
    if (!this.isMounted()) {
      return;
    }
    if (!this.getDOMNode) {
      // WTF -- only happens in casperjs tests weirdly
      console.error('this.getDOMNode not a function?');
      return;
    }

    React.unmountComponentAtNode(this.getDOMNode().parentNode);
  },

  updateStateFromModel: function() {
    var commandJSON = this.props.command.toJSON();
    this.setState({
      status: commandJSON.status,
      rawStr: commandJSON.rawStr,
      warnings: commandJSON.warnings,
      result: commandJSON.result
    });
  },

  getInitialState: function() {
    return {
      status: STATUSES.inqueue,
      rawStr: 'git commit',
      warnings: [],
      result: ''
    };
  },

  render: function() {
    var commandClass = reactUtil.joinClasses([
      this.state.status,
      'commandLine',
      'transitionBackground'
    ]);

    return (
      <div id={this.props.id} className="reactCommandView">
        <p className={commandClass}>
          <span className="prompt">{'$'}</span>
          {' '}
          <span dangerouslySetInnerHTML={{
              __html: this.state.rawStr
            }}
          />
          <span className="icons transitionAllSlow">
            <i className="icon-exclamation-sign"></i>
            <i className="icon-check-empty"></i>
            <i className="icon-retweet"></i>
            <i className="icon-check"></i>
          </span>
        </p>
        {this.renderResult()}
        <div className="commandLineWarnings">
          {this.renderFormattedWarnings()}
        </div>
      </div>
    );
  },

  renderResult: function() {
    if (!this.state.result) {
      return null;
    }
    // We are going to get a ton of raw markup here
    // so lets split into paragraphs ourselves
    var paragraphs = this.state.result.split("\n");
    var result = [];
    for (var i = 0; i < paragraphs.length; i++) {
      result.push(
        <p
          key={'paragraph_' + i}
          dangerouslySetInnerHTML={{
            __html: paragraphs[i]
          }}
        />
      );
    }
    return (
      <div className={'commandLineResult'}>
        {result}
      </div>
    );
  },

  renderFormattedWarnings: function() {
    var warnings = this.state.warnings;
    var result = [];
    for (var i = 0; i < warnings.length; i++) {
      result.push(
        <p key={'warning_' + i}>
          <i className="icon-exclamation-sign"></i>
          {warnings[i]}
        </p>
      );
    }
    return result;
  }
});

module.exports = CommandView;
