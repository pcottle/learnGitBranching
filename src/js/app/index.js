var Backbone = require('backbone');
var jQuery = require('jquery');
var EventEmitter = require('events').EventEmitter;
var React = require('react');
var ReactDOM = require('react-dom');

var util = require('../util');
var intl = require('../intl');
var LocaleStore = require('../stores/LocaleStore');
var LocaleActions = require('../actions/LocaleActions');

/**
 * Globals
 */

Backbone.$ = jQuery;

// Bypass jasmine
if (util.isBrowser()) {
  window.jQuery = jQuery;
  window.$ = jQuery;
  window.Raphael = require('raphael');
}

var events = Object.assign(
  {},
  EventEmitter.prototype,
  {
    trigger: function() {
      // alias this for backwards compatibility
      this.emit.apply(this, arguments);
    }
  }
);
// Allow unlimited listeners, so FF doesn't break
events.setMaxListeners(0);
var commandUI;
var sandbox;
var eventBaton;
var levelDropdown;

///////////////////////////////////////////////////////////////////////

var init = function() {
  /**
    * There is a decent amount of bootstrapping we need just to hook
    * everything up. The init() method takes on these responsibilities,
    * including but not limited to:
    *   - setting up Events and EventBaton
    *   - calling the constructor for the main visualization
    *   - initializing the command input bar
    *   - handling window.focus and zoom events
  **/
  var Sandbox = require('../sandbox/').Sandbox;
  var EventBaton = require('../util/eventBaton').EventBaton;
  var LevelDropdownView = require('../views/levelDropdownView').LevelDropdownView;

  eventBaton = new EventBaton();
  commandUI = new CommandUI();
  sandbox = new Sandbox();
  levelDropdown = new LevelDropdownView({
    wait: true
  });

  LocaleStore.subscribe(intlRefresh);
  events.on('vcsModeChange', vcsModeRefresh);

  initRootEvents(eventBaton);
  initDemo(sandbox);
  // unfortunate global export for casper tests
  window.LocaleStore = LocaleStore;
  window.LocaleActions = LocaleActions;
  window.intl = intl;

  $(window).on('beforeunload', function(e) {
    return GlobalStateStore.getIsSolvingLevel() ? 'you have a level in progress' : null;
  });
};

var vcsModeRefresh = function(eventData) {
  if (!window.$) { return; }

  var mode = eventData.mode;
  var isGit = eventData.mode === 'git';

  var displayMode = mode.slice(0, 1).toUpperCase() + mode.slice(1);
  var otherMode = (displayMode === 'Git') ? 'Hg' : 'Git';
  var regex = new RegExp(otherMode, 'g');

  document.title = intl.str('learn-git-branching').replace(regex, displayMode);
  $('span.vcs-mode-aware').each(function(i, el) {
    var text = $(el).text().replace(regex, displayMode);
    $(el).text(text);
  });

  $('body').toggleClass('gitMode', isGit);
  $('body').toggleClass('hgMode', !isGit);
};

var insertAlternateLinks = function(pageId) {
  // For now pageId is null, which would link to the main page.
  // In future if pageId is provided this method should link to a specific page

  // The value of the hreflang attribute identifies the language (in ISO 639-1 format)
  // and optionally a region (in ISO 3166-1 Alpha 2 format) of an alternate URL

  var altLinks = LocaleStore.getSupportedLocales().map(function(langCode) {
    var url = "https://learngitbranching.js.org/?locale=" + langCode;
    return '<link rel="alternate" hreflang="'+langCode+'" href="' + url +'" />';
  });
  var defaultUrl = "https://learngitbranching.js.org/?locale=" + LocaleStore.getDefaultLocale();
  altLinks.push('<link rel="alternate" hreflang="x-default" href="' + defaultUrl +'" />');
  $('head').prepend(altLinks);

};

var intlRefresh = function() {
  if (!window.$) { return; }
  var countryCode = LocaleStore.getLocale().split("_")[0];
  $("html").attr('lang', countryCode);
  $("meta[http-equiv='content-language']").attr("content", countryCode);
  $('span.intl-aware').each(function(i, el) {
    var intl = require('../intl');
    var key = $(el).attr('data-intl');
    $(el).text(intl.str(key));
  });
};

var initRootEvents = function(eventBaton) {
  // we always want to focus the text area to collect input
  var focusTextArea = function() {
    $('#commandTextField').focus();
  };
  focusTextArea();

  $(window).focus(function(e) {
    eventBaton.trigger('windowFocus', e);
  });
  $(document).click(function(e) {
    eventBaton.trigger('documentClick', e);
  });
  $(document).bind('keydown', function(e) {
    eventBaton.trigger('docKeydown', e);
  });
  $(document).bind('keyup', function(e) {
    eventBaton.trigger('docKeyup', e);
  });
  $(window).on('resize', function(e) {
    events.trigger('resize', e);
  });

  eventBaton.stealBaton('docKeydown', function() { });
  eventBaton.stealBaton('docKeyup', function() { });

  // the default action on window focus and document click is to just focus the text area
  eventBaton.stealBaton('windowFocus', focusTextArea);
  eventBaton.stealBaton('documentClick', focusTextArea);

  // but when the input is fired in the text area, we pipe that to whoever is
  // listenining
  var makeKeyListener = function(name) {
    return function() {
      var args = [name];
      Array.prototype.slice.apply(arguments).forEach(function(arg) {
        args.push(arg);
      });
      eventBaton.trigger.apply(eventBaton, args);
    };
  };

  $('#commandTextField').on('keydown', makeKeyListener('keydown'));
  $('#commandTextField').on('keyup', makeKeyListener('keyup'));
  $(window).trigger('resize');
};

var initDemo = function(sandbox) {
  var params = util.parseQueryString(window.location.href);

  // being the smart programmer I am (not), I don't include a true value on demo, so
  // I have to check if the key exists here
  var commands;
  if (/(iPhone|iPod|iPad).*AppleWebKit/i.test(navigator.userAgent) || /android/i.test(navigator.userAgent)) {
    sandbox.mainVis.customEvents.on('gitEngineReady', function() {
      eventBaton.trigger('commandSubmitted', 'mobile alert');
    });
  }

  if (params.hasOwnProperty('demo')) {
    commands = [
      "git commit; git checkout -b bugFix C1; git commit; git merge main; git checkout main; git commit; git rebase bugFix;",
      "delay 1000; reset;",
      "level advanced1 --noFinishDialog --noStartCommand --noIntroDialog;",
      "delay 2000; show goal; delay 1000; hide goal;",
      "git checkout bugFix; git rebase main; git checkout side; git rebase bugFix;",
      "git checkout another; git rebase side; git rebase another main;",
      "help; levels"
    ];
  } else if (params.hasOwnProperty('hgdemo')) {
    commands = [
      'importTreeNow {"branches":{"main":{"target":"C3","id":"main"},"feature":{"target":"C2","id":"feature"},"debug":{"target":"C4","id":"debug"}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"},"C3":{"parents":["C1"],"id":"C3"},"C4":{"parents":["C2"],"id":"C4"}},"HEAD":{"target":"feature","id":"HEAD"}}',
      'delay 1000',
      'git rebase main',
      'delay 1000',
      'undo',
      'hg book',
      'delay 1000',
      'hg rebase -d main'
    ];
    commands = commands.join(';#').split('#'); // hax
  } else if (params.hasOwnProperty('hgdemo2')) {
    commands = [
      'importTreeNow {"branches":{"main":{"target":"C3","id":"main"},"feature":{"target":"C2","id":"feature"},"debug":{"target":"C4","id":"debug"}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"},"C3":{"parents":["C1"],"id":"C3"},"C4":{"parents":["C2"],"id":"C4"}},"HEAD":{"target":"debug","id":"HEAD"}}',
      'delay 1000',
      'git rebase main',
      'delay 1000',
      'undo',
      'hg sum',
      'delay 1000',
      'hg rebase -d main'
    ];
    commands = commands.join(';#').split('#'); // hax
  } else if (params.hasOwnProperty('remoteDemo')) {
    commands = [
      'git clone',
      'git commit',
      'git fakeTeamwork',
      'git pull',
      'git push',
      'git commit',
      'git fakeTeamwork',
      'git pull --rebase',
      'git push',
      'levels'
    ];
    commands = commands.join(';#').split('#'); // hax
  } else if (params.hasOwnProperty('level')) {
    commands = [
      'level ' + unescape(params.level),
    ];
  } else if (params.gist_level_id) {
    $.ajax({
      url: 'https://api.github.com/gists/' + params.gist_level_id,
      type: 'GET',
      dataType: 'jsonp',
      success: function(response) {
        var data = response.data || {};
        var files = data.files || {};
        if (!Object.keys(files).length) {
          console.warn('no files found');
          return;
        }
        var file = files[Object.keys(files)[0]];
        if (!file.content) {
          console.warn('file empty');
        }
        eventBaton.trigger(
          'commandSubmitted',
          'importLevelNow ' + escape(file.content) + '; clear; show goal;'
        );
      }
    });
  } else if (!params.hasOwnProperty('NODEMO')) {
    commands = [
      "help;",
      "levels"
    ];
  }
  if (params.hasOwnProperty('STARTREACT')) {
    /*
    ReactDOM.render(
      React.createElement(CommandView, {}),
      document.getElementById(params['STARTREACT'])
      );*/
  }
  if (commands) {
    sandbox.mainVis.customEvents.on('gitEngineReady', function() {
      eventBaton.trigger('commandSubmitted', commands.join(''));
    });
  }

  if (params.locale !== undefined && params.locale.length) {
    LocaleActions.changeLocaleFromURI(params.locale);
  } else {
    tryLocaleDetect();
  }

  insertAlternateLinks();

  if (params.command) {
    var command = unescape(params.command);
    sandbox.mainVis.customEvents.on('gitEngineReady', function() {
      eventBaton.trigger('commandSubmitted', command);
    });
  }

};

function tryLocaleDetect() {
  // use navigator to get the locale setting
  changeLocaleFromHeaders(navigator.language || navigator.browserLanguage);
}

function changeLocaleFromHeaders(langString) {
  LocaleActions.changeLocaleFromHeader(langString);
}

if (require('../util').isBrowser()) {
  // this file gets included via node sometimes as well
  $(document).ready(init);
}

/**
  * the UI method simply bootstraps the command buffer and
  * command prompt views. It only interacts with user input
  * and simply pipes commands to the main events system
**/
function CommandUI() {
  Backbone.$ = $; // lol WTF BACKBONE MANAGE YOUR DEPENDENCIES
  var Views = require('../views');
  var Collections = require('../models/collections');
  var CommandViews = require('../views/commandViews');
  var CommandHistoryView = require('../react_views/CommandHistoryView.jsx');
  var MainHelperBarView = require('../react_views/MainHelperBarView.jsx');

  this.commandCollection = new Collections.CommandCollection();
  this.commandBuffer = new Collections.CommandBuffer({
    collection: this.commandCollection
  });

  this.commandPromptView = new CommandViews.CommandPromptView({
    el: $('#commandLineBar')
  });

  ReactDOM.render(
    React.createElement(MainHelperBarView),
    document.getElementById('helperBarMount')
  );
  ReactDOM.render(
    React.createElement(
      CommandHistoryView,
      { commandCollection: this.commandCollection }
    ),
    document.getElementById('commandDisplay')
  );
}

exports.getEvents = function() {
  return events;
};

exports.getSandbox = function() {
  return sandbox;
};

exports.getEventBaton = function() {
  return eventBaton;
};

exports.getCommandUI = function() {
  return commandUI;
};

exports.getLevelDropdown = function() {
  return levelDropdown;
};

exports.init = init;
