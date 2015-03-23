var CasperHelp = {

  getRoot: function() {
    // Unfortunately this is hardcoded for now :*( cant get the path
    // variable while in a casper context
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
        return document.querySelectorAll('div.BaseHelperBar').length > 0;
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

exports.CasperHelp = CasperHelp;
