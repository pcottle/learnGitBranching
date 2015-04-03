
var screenshotCounter = 0;
var screenshotRoot = './src/__tests__/casperjs/screenshots/entirePage';

var CasperUtils = {

  getRoot: function() {
    // Unfortunately this is hardcoded for now :*( cant get the path
    // variable synchronously when running this test, and CasperJS does
    // not like being started asynchronously.
    return '/Users/pcottle/Dropbox (Personal)/wip/learnGitBranching/';
  },

  getUrl: function () {
    return 'file://localhost/' + this.getRoot() + 'index.html?NODEMO';
  },

  getUrlWithQueryParams: function(params) {
    var paramsString = '';
    Object.keys(params).forEach(function(key) {
      paramsString = paramsString + '&' + key + '=' + params[key];
    });
    return this.getUrl() + paramsString;
  },

  getUrlForCommands: function(commands) {
    return this.getUrl() + '&command=' + commands.join(';');
  },

  testDone: function() {
    this.test.done();
  },

  multiAssert: function() {
    // Copy the args into a variable we can reference inside
    // our closure.
    var asserts = [];
    for (var i = 0; i < arguments.length; i++) {
      asserts.push(arguments[i]);
    }

    return function then() {
      for (var i = 0; i < asserts.length; i++) {
        var assert = asserts[i];
        assert.bind(this)();
      }
    };
  },

  asserts: {

    visibleIDs: function(visibleIDs) {
      return function then() {
        visibleIDs.forEach(function(id) {
          this.test.assertVisible('#' + id);
        }.bind(this));
      };
    },

    visibleSelectors: function(selectors) {
      return function then() {
        selectors.forEach(function(selector) {
          this.test.assertVisible(selector);
        }.bind(this));
      };
    },

    visibleSelector: function(selector) {
      return function then() {
        this.test.assertVisible(selector);
      };
    },

    selectorContainsText: function(selector, text) {
      return function then() {
        this.test.assertEvalEquals(function(selector) {
            return document.querySelector(selector).innerText;
          },
          text,
          'Checking that selector "' + selector + '" contains "' +
            text + '".',
          {selector: selector}
        );
      };
    },

    intlKeyReturns: function(key, text) {
      return function then() {
        this.test.assertEvalEquals(function(key) {
            return debug_Intl_str(key);
          },
          text,
          'Checking that intl key "' + key + '" contains "' +
            text + '".',
          {key: key}
        );
      };
    },

    existingIDs: function(existingIDs) {
      return function then() {
        existingIDs.forEach(function(id) {
          this.test.assertExists('#' + id);
        }.bind(this));
      };
    },

    existingSelectors: function(existingSelectors) {
      return function then() {
        existingSelectors.forEach(function(selector) {
          this.test.assertExists(selector);
        }.bind(this));
      };
    },

  },

  screenshot: {
    entirePage: function () {
      screenshotCounter++;

      casper.capture(screenshotRoot + screenshotCounter + '.png', {
        top: 0,
        left: 0,
        // These seem to be the hardcoded viewport dimensions
        height: 600,
        width: 1000
      });
      casper.echo('<<< Took screenshot ' + screenshotCounter + ' >>>', 'COMMENT');
    }
  },

  waits: {
    jsMount: function() {
      return this.evaluate(function() {
        var hasHelper = document.querySelectorAll('div.BaseHelperBar').length > 0;
        if (hasHelper) {
          __utils__.echo('<<< JS mounted >>>');
        }
        return hasHelper;
      });
    },

    allCommandsFinished: function() {
      return this.evaluate(function() {
        return document.querySelectorAll('p.commandLine').length ===
          document.querySelectorAll('p.finished').length;
      });
    },

    selectorVisible: function(selector) {
      return function waitFor() {
        return this.evaluate(function() {
          return document.querySelectorAll(selector).length > 0;
        });
      };
    },

    idsVisible: function(ids) {
      return function waitFor() {
        return this.evaluate(function() {
          var allVisible = true;
          for (var i = 0; i < ids.length; i++) {
            allVisible = allVisible && __utils__.visible('#' + ids[i]);
          }
          return allVisible;
        });
      };
    },

    idVisible: function(id) {
      return function waitFor() {
        return this.evaluate(function() {
          return __utils__.visible(id);
        });
      };
    },

    commandVisible: function() {
      return this.evaluate(function() {
        return document.querySelectorAll('p.commandLine').length > 0;
      });
    }
  }
  
};

exports.CasperUtils = CasperUtils;
