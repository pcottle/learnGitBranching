var HelperBarView = require('../react_views/HelperBarView.jsx');
var Main = require('../app');
var React = require('react');

var log = require('../log');

var IntlHelperBarView = React.createClass({

  propTypes: {
    shown: React.PropTypes.bool.isRequired,
    onExit: React.PropTypes.func.isRequired
  },

  render: function() {
    return (
      <HelperBarView
        items={this.getItems()}
        shown={this.props.shown}
      />
    );
  },

  fireCommand: function(command) {
    log.viewInteracted('intlSelect');
    Main.getEventBaton().trigger('commandSubmitted', command);
    this.props.onExit();
  },

  getItems: function() {
    return [{
      text: 'Git Branching',
      onClick: function() {
        this.fireCommand('locale en_US; levels');
      }.bind(this)
    }, {
      text: '日本語版リポジトリ',
      onClick: function() {
        this.fireCommand('locale ja; levels');
      }.bind(this)
    }, {
      text: 'Git 브랜치 배우기',
      onClick: function() {
        this.fireCommand('locale ko; levels');
      }.bind(this)
    }, {
      text: '学习 Git 分支',
      onClick: function() {
        this.fireCommand('locale zh_CN; levels');
      }.bind(this)
    }, {
      text: '學習 Git 分支',
      onClick: function() {
        this.fireCommand('locale zh_TW; levels');
      }.bind(this)
    }, {
      text: 'español',
      onClick: function() {
        this.fireCommand('locale es_AR; levels');
      }.bind(this)
    }, {
      text: 'português',
      onClick: function() {
        this.fireCommand('locale pt_BR; levels');
      }.bind(this)
    }, {
      text: 'français',
      onClick: function() {
        this.fireCommand('locale fr_FR; levels');
      }.bind(this)
    }, {
      text: 'Deutsch',
      onClick: function() {
        this.fireCommand('locale de_DE; levels');
      }.bind(this)
    }, {
      icon: 'signout',
      onClick: function() {
        this.props.onExit();
      }.bind(this)
    }];
  }

});

module.exports = IntlHelperBarView;
