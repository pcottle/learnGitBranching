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
      testID: 'english',
      onClick: function() {
        this.fireCommand('locale en_US; levels');
      }.bind(this)
    }, {
      text: '日本語版リポジトリ',
      testID: 'japanese',
      onClick: function() {
        this.fireCommand('locale ja; levels');
      }.bind(this)
    }, {
      text: 'Git 브랜치 배우기',
      testID: 'korean',
      onClick: function() {
        this.fireCommand('locale ko; levels');
      }.bind(this)
    }, {
      text: '学习 Git 分支',
      testID: 'simplifiedChinese',
      onClick: function() {
        this.fireCommand('locale zh_CN; levels');
      }.bind(this)
    }, {
      text: '學習 Git 分支',
      testID: 'traditionalChinese',
      onClick: function() {
        this.fireCommand('locale zh_TW; levels');
      }.bind(this)
    }, {
      text: 'español',
      testID: 'spanish',
      onClick: function() {
        this.fireCommand('locale es_AR; levels');
      }.bind(this)
    }, {
      text: 'português',
      testID: 'portuguese',
      onClick: function() {
        this.fireCommand('locale pt_BR; levels');
      }.bind(this)
    }, {
      text: 'français',
      testID: 'french',
      onClick: function() {
        this.fireCommand('locale fr_FR; levels');
      }.bind(this)
    }, {
      text: 'Deutsch',
      testID: 'german',
      onClick: function() {
        this.fireCommand('locale de_DE; levels');
      }.bind(this)
    }, {
      text: 'Русский',
      testID: 'russian',
      onClick: function() {
        this.fireCommand('locale ru_RU; levels');
      }.bind(this)
    }, {
      text: 'Українська',
      testID: 'ukrainian',
      onClick: function() {
        this.fireCommand('locale uk; levels');
      }.bind(this)
    }, {
      text: 'Galego',
      testID: 'galician',
      onClick: function() {
        this.fireCommand('locale gl; levels');
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
