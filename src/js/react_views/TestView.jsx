var React = require('react');

var reactUtil = require('../util/reactUtil');
var keyMirror = require('react/lib/keyMirror');

var STATUSES = keyMirror({
  IN_QUEUE: null,
  PROCESSING: null,
  FINISHED: null
});

var STATUS_TO_CLASS = {};
STATUS_TO_CLASS[STATUSES.IN_QUEUE] = 'inqueue';
STATUS_TO_CLASS[STATUSES.PROCESSING] = 'processing';
STATUS_TO_CLASS[STATUSES.FINISHED] = 'finished';

var CommandView = React.createClass({

  getInitialState: function() {
    return {
      status: STATUSES.IN_QUEUE,
      rawStr: 'git commit',
      resultType: '',
      result: '',
      formattedWarnings: ''
    };
  },

  render: function() {
    var commandClass = reactUtil.joinClasses([
      STATUS_TO_CLASS[this.state.status],
      'commandLine',
      'transitionBackground'
    ]);

    // TODO add 0px 5px margin to icons

    return (
      <div className="reactCommandView">
        <p className={commandClass}>
          <span className="prompt">{'$'}</span>
          {' ' + this.state.rawStr}
          <span className="icons transitionAllSlow">
            <i className="icon-exclamation-sign"></i>
            <i className="icon-check-empty"></i>
            <i className="icon-retweet"></i>
            <i className="icon-check"></i>
          </span>
        </p>

        <div className={'commandLineResult ' + this.state.resultType}>
          {this.state.result}
        </div>

        <div className="commandLineWarnings">
          {this.state.formattedWarnings}
        </div>
      </div>
    );
  }
});

var Dialog = React.createClass({
  render: function() {
    return (
      <CommandView />
    );
  }
});

exports.Dialog = Dialog;
