var React = require('react');
var ReactDOM = require('react-dom');
var PropTypes = require('prop-types');

var reactUtil = require('../util/reactUtil');
var keyMirror = require('../util/keyMirror');

var STATUSES = keyMirror({
  inqueue: null,
  processing: null,
  finished: null
});

class CommandView extends React.Component{

  componentDidMount() {
    this.props.command.on('change', this.updateStateFromModel, this);
    this.updateStateFromModel();
  }

  componentWillUnmount() {
    this.props.command.off('change', this.updateStateFromModel, this);
  }

  updateStateFromModel() {
    var commandJSON = this.props.command.toJSON();
    this.setState({
      status: commandJSON.status,
      rawStr: commandJSON.rawStr,
      warnings: commandJSON.warnings,
      result: commandJSON.result
    });
  }

  constructor(props, context) {
    super(props, context);
    this.state = {
      status: STATUSES.inqueue,
      rawStr: 'git commit',
      warnings: [],
      result: ''
    };
  }

  render() {
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
  }

  renderResult() {
    if (!this.state.result) {
      return null;
    }
    // We are going to get a ton of raw markup here
    // so lets split into paragraphs ourselves
    var paragraphs = this.state.result.split("\n");
    var result = [];
    for (var i = 0; i < paragraphs.length; i++) {
      if (paragraphs[i].startsWith('https://')) {
        result.push(
          <a
            href={paragraphs[i]}
            key={'paragraph_' + i}
            dangerouslySetInnerHTML={{
              __html: paragraphs[i]
            }}
          />
        );
      } else {
        result.push(
          <p
            key={'paragraph_' + i}
            dangerouslySetInnerHTML={{
              __html: paragraphs[i]
            }}
          />
        );
      }
    }
    return (
      <div className={'commandLineResult'}>
        {result}
      </div>
    );
  }

  renderFormattedWarnings() {
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
};

CommandView.propTypes = {
  // the backbone command model
  command: PropTypes.object.isRequired,
  id: PropTypes.string,
};

module.exports = CommandView;
