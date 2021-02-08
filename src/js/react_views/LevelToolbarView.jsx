var React = require('react');
var PropTypes = require('prop-types');

var intl = require('../intl');
var reactUtil = require('../util/reactUtil');

class LevelToolbarView extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      isHidden: true,
      isGoalExpanded: this.props.parent.getIsGoalExpanded()
    };
  }

  componentWillUnmount() {
    this._isMounted = false;
  }
  componentDidMount() {
    this._isMounted = true;
    this.setState({
      isHidden: this.props.parent.getIsGoalExpanded(),
      isGoalExpanded: this.props.parent.getIsGoalExpanded()
    });
    this.props.parent.on('goalToggled', function() {
      if (!this._isMounted) {
        return;
      }

      this.setState({
        isGoalExpanded: this.props.parent.getIsGoalExpanded()
      });
    }.bind(this));
  }

  render() {
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
            { intl.str('level-label') }
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
                intl.str('hide-goal-button') :
                intl.str('show-goal-button')
              }
            </button>
          </div>
          <div className="showObjectiveWrapper">
            <button
              onClick={this.props.onObjectiveClick}
              type="button">
              {intl.str('objective-button')}
            </button>
          </div>
        </div>
      </div>
    );
  }

};

LevelToolbarView.propTypes = {
  name: PropTypes.string.isRequired,
  onGoalClick: PropTypes.func.isRequired,
  onObjectiveClick: PropTypes.func.isRequired,
  parent: PropTypes.object.isRequired
}

module.exports = LevelToolbarView;
