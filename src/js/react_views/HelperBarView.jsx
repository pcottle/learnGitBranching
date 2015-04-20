var React = require('react');

var reactUtil = require('../util/reactUtil');

var HelperBarView = React.createClass({

  propTypes: {
    className: React.PropTypes.string,
    shown: React.PropTypes.bool.isRequired,
    items: React.PropTypes.array.isRequired
  },

  render: function() {
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
            this.renderItem(item),
            // ugh -- we need this spacer at the end only
            // if we are not the last element
            index === this.props.items.length - 1 ?
              null :
              <span key={'helper_bar_' + index}>{' '}</span>
          ];
        }.bind(this))}
      </div>
    );
  },

  renderItem: function(item, index) {
    if (item.newPageLink) {
      return (
        <a
          key={'helper_bar_' + index}
          onClick={item.onClick}
          target="_blank"
          href={item.href}>
          <i className={'icon-' + item.icon} />
          {' '}
        </a>
      );
    }
    return (
      <a
        key={'helper_bar_' + index}
        onClick={item.onClick}>
        {item.text ? item.text :
          <i className={'icon-' + item.icon} />
        }
        {' '}
      </a>
    );
  }

});

module.exports = HelperBarView;
