var CasperUtils = {

  getRoot: function() {
    // Unfortunately this is hardcoded for now :*( cant get the path
    // variable synchronously when running this test, and CasperJS does
    // not like being started asynchronously.
    return '/Users/pcottle/Dropbox/wip/learnGitBranching/';
  },

  getUrl: function () {
    return 'file://localhost/' + this.getRoot() + '/index.html?NODEMO';
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
          this.test.assertExists(selector);
        }.bind(this));
      };
    },
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

    allCommandsFinished: function () {
      return this.evaluate(function() {
        return document.querySelectorAll('p.commandLine').length ===
          document.querySelectorAll('p.finished').length;
      });
    },
  },
  
};

exports.CasperUtils = CasperUtils;
