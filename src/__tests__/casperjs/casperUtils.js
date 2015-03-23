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
