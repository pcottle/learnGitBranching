var React = require('react');
var PropTypes = React.PropTypes;

var intl = require('../intl');
var reactUtil = require('../util/reactUtil');

var LevelToolbarView = React.createClass({

  propTypes: {
    name: PropTypes.string.isRequired,
    onGoalClick: PropTypes.func.isRequired,
    onObjectiveClick: PropTypes.func.isRequired,
    parent: PropTypes.object.isRequired
  },

  getInitialState: function() {
    return {
      isHidden: true,
      isGoalExpanded: false
    };
  },

  componentDidMount: function() {
    this.setState({
      isHidden: false
    });
    this.props.parent.on('goalToggled', function() {
      this.setState({
        isGoalExpanded: this.props.parent.getIsGoalExpanded()
      });
    }.bind(this));
  },

  render: function() {
    return (
      <div className={reactUtil.joinClasses([
          'toolbar',
          'level-toolbar',
          'box',
          'vertical',
          'center',
          'transitionAll',
          this.state.isHidden ? 'hidden' : ''
        ])}>
        <div className="clearfix">
          <div className="levelNameWrapper">
            <i className="icon-bolt"></i>
            {' Level '}
            <span className="levelToolbarSpan">
              {this.props.name}
            </span>
          </div>
        </div>
        <div className="buttonsWrapper">
          <div className="showGoalWrapper">
            <button
              onClick={this.props.onGoalClick}
              type="button">
              {this.state.isGoalExpanded ? 
                intl.str('show-goal-button') :
                intl.str('hide-goal-button')
              }
            </button>
          </div>
          <div className="showObjectiveWrapper">
            <button
              onClick={this.props.onObjectiveClick}
              type="button">
              Objective
            </button>
          </div>
        </div>
      </div>
    );
  }

});

module.exports = LevelToolbarView;
