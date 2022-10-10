var React = require('react');
var PropTypes = require('prop-types');

var reactUtil = require('../util/reactUtil');

class HelperBarView extends React.Component {

  render() {
    var topClassName = reactUtil.joinClasses([
      'helperBar',
      'transitionAll',
      this.props.shown ? 'show' : '',
      this.props.className ? this.props.className : ''
    ]);

    return (
      <div className={topClassName}>
        {this.props.items.map(function(item, index) {
          return [
            this.renderItem(item, index),
            // ugh -- we need this spacer at the end only
            // if we are not the last element
            index === this.props.items.length - 1 ?
              null :
              <span key={'helper_bar_span_' + index}>{' '}</span>
          ];
        }.bind(this))}
      </div>
    );
  }

  renderItem(item, index) {
    var testID = item.icon || item.testID ||
      item.text.toLowerCase();
    if (item.newPageLink) {
      return (
        <a
          data-testid={testID}
          key={'helper_bar_' + index}
          onClick={item.onClick}
          target="_blank"
          href={item.href}
          title={item.title}>
          <i className={'icon-' + item.icon} />
          {' '}
        </a>
      );
    }
    return (
      <a
        data-testid={testID}
        key={'helper_bar_' + index}
        onClick={item.onClick}
        title={item.title}>
        {item.text ? item.text :
          <i className={'icon-' + item.icon} />
        }
        {' '}
      </a>
    );
  }

};

HelperBarView.propTypes = {
  className: PropTypes.string,
  shown: PropTypes.bool.isRequired,
  items: PropTypes.array.isRequired
};


module.exports = HelperBarView;
