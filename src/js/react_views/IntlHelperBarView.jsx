var PropTypes = require('prop-types');

var HelperBarView = require('../react_views/HelperBarView.jsx');
var Main = require('../app');
var React = require('react');

var log = require('../log');

class IntlHelperBarView extends React.Component{

  render() {
    return (
      <HelperBarView
        items={this.getItems()}
        shown={this.props.shown}
      />
    );
  }

  fireCommand(command) {
    log.viewInteracted('intlSelect');
    Main.getEventBaton().trigger('commandSubmitted', command);
    this.props.onExit();
  }

  getItems() {
    return [{
      text: 'English',
      testID: 'english',
      onClick: function() {
        this.fireCommand('locale en_US; levels');
      }.bind(this)
    }, {
      text: '日本語',
      testID: 'japanese',
      onClick: function() {
        this.fireCommand('locale ja; levels');
      }.bind(this)
    }, {
      text: '한국어 배우기',
      testID: 'korean',
      onClick: function() {
        this.fireCommand('locale ko; levels');
      }.bind(this)
    }, {
      text: '简体中文',
      testID: 'simplifiedChinese',
      onClick: function() {
        this.fireCommand('locale zh_CN; levels');
      }.bind(this)
    }, {
      text: '繁體中文',
      testID: 'traditionalChinese',
      onClick: function() {
        this.fireCommand('locale zh_TW; levels');
      }.bind(this)
    }, {
      text: 'Español',
      testID: 'spanish',
      onClick: function() {
        this.fireCommand('locale es_ES; levels');
      }.bind(this)
    }, {
      text: 'Español (Argentina)',
      testID: 'argentinian',
      onClick: function() {
        this.fireCommand('locale es_AR; levels');
      }.bind(this)
    }, {
      text: 'Español (México)',
      testID: 'mexican',
      onClick: function() {
        this.fireCommand('locale es_MX; levels');
      }.bind(this)
    }, {
      text: 'Português',
      testID: 'portuguese',
      onClick: function() {
        this.fireCommand('locale pt_BR; levels');
      }.bind(this)
    }, {
      text: 'Français',
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
      text: "Română",
      testID: "romanian",
      onClick: function () {
        this.fireCommand("locale ro; levels");
      }.bind(this),
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
      text: 'Tiếng Việt',
      testID: 'vietnamese',
      onClick: function() {
        this.fireCommand('locale vi; levels');
      }.bind(this)
    }, {
      text: 'Türkçe',
      testID: 'turkish',
      onClick: function() {
        this.fireCommand('locale tr_TR; levels');
      }.bind(this)
    }, {
      text: 'Galego',
      testID: 'galician',
      onClick: function() {
        this.fireCommand('locale gl; levels');
      }.bind(this)
    }, {
      text: 'Slovenščina',
      testID: 'slovenian',
      onClick: function() {
        this.fireCommand('locale sl_SI; levels');
      }.bind(this)
    }, {
      text: 'Polski',
      testID: 'polish',
      onClick: function() {
        this.fireCommand('locale pl; levels');
      }.bind(this)
    }, {
      text: 'தமிழ்',
      testID: 'tamil',
      onClick: function() {
        this.fireCommand('locale ta_IN; levels');
      }.bind(this)
    }, {
        text: "Italiano",
        testID: "italian",
        onClick: function () {
          this.fireCommand("locale it_IT; levels");
        }.bind(this),
    },{
      icon: 'fa-solid fa-right-from-bracket',
      onClick: function() {
        this.props.onExit();
      }.bind(this)
    }
    ];
  }

};

IntlHelperBarView.propTypes = {
  shown: PropTypes.bool.isRequired,
  onExit: PropTypes.func.isRequired
}

module.exports = IntlHelperBarView;
