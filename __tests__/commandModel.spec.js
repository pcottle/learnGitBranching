var Command = require('../src/js/models/commandModel').Command;

describe('Command Model', function() {
  describe('initialization', function() {
    it('should require rawStr', function() {
      expect(function() {
        new Command({});
      }).toThrow();
    });

    it('should set createTime on init', function() {
      var cmd = new Command({rawStr: 'git status'});
      expect(cmd.get('createTime')).toBeTruthy();
    });

    it('should initialize generalArgs as empty array', function() {
      var cmd = new Command({rawStr: 'git status'});
      expect(Array.isArray(cmd.get('generalArgs'))).toBe(true);
    });

    it('should initialize warnings as empty array', function() {
      var cmd = new Command({rawStr: 'git status'});
      expect(Array.isArray(cmd.get('warnings'))).toBe(true);
    });

    it('should initialize supportedMap as empty object', function() {
      var cmd = new Command({rawStr: 'git status'});
      expect(typeof cmd.get('supportedMap')).toBe('object');
    });
  });

  describe('get and set', function() {
    it('should get and set values', function() {
      var cmd = new Command({rawStr: 'git status'});
      cmd.set('status', 'processing');
      expect(cmd.get('status')).toBe('processing');
    });

    it('should handle default status', function() {
      var cmd = new Command({rawStr: 'git status'});
      expect(cmd.get('status')).toBe('inqueue');
    });
  });

  describe('replaceDotWithHead', function() {
    it('should replace dots with HEAD', function() {
      var cmd = new Command({rawStr: 'git status'});
      expect(cmd.replaceDotWithHead('.')).toBe('HEAD');
      expect(cmd.replaceDotWithHead('.~1')).toBe('HEAD~1');
      expect(cmd.replaceDotWithHead('...')).toBe('HEADHEADHEAD');
    });
  });

  describe('generalArgs methods', function() {
    it('should get and set generalArgs', function() {
      var cmd = new Command({rawStr: 'git status'});
      cmd.setGeneralArgs(['arg1', 'arg2']);
      expect(cmd.getGeneralArgs()).toEqual(['arg1', 'arg2']);
    });
  });

  describe('optionsMap methods', function() {
    it('should get and set optionsMap', function() {
      var cmd = new Command({rawStr: 'git status'});
      cmd.setOptionsMap({'-b': ['value']});
      expect(cmd.getOptionsMap()).toEqual({'-b': ['value']});
    });
  });

  describe('deleteOptions', function() {
    it('should delete specified options', function() {
      var cmd = new Command({rawStr: 'git status'});
      cmd.setOptionsMap({'-a': ['1'], '-b': ['2'], '-c': ['3']});
      cmd.deleteOptions(['-a', '-c']);
      expect(cmd.getOptionsMap()).toEqual({'-b': ['2']});
    });
  });

  describe('mapDotToHead', function() {
    it('should replace dots in generalArgs and options', function() {
      var cmd = new Command({rawStr: 'git status'});
      cmd.setGeneralArgs(['.', '.~1']);
      cmd.setOptionsMap({'-b': ['.']});
      cmd.mapDotToHead();
      expect(cmd.getGeneralArgs()).toEqual(['HEAD', 'HEAD~1']);
      expect(cmd.getOptionsMap()).toEqual({'-b': ['HEAD']});
    });
  });

  describe('appendOptionR', function() {
    it('should append -r options to generalArgs', function() {
      var cmd = new Command({rawStr: 'git status'});
      cmd.setGeneralArgs(['existing']);
      cmd.setOptionsMap({'-r': ['rev1', 'rev2']});
      cmd.appendOptionR();
      expect(cmd.getGeneralArgs()).toEqual(['existing', 'rev1', 'rev2']);
    });
  });

  describe('prependOptionR', function() {
    it('should prepend -r options to generalArgs', function() {
      var cmd = new Command({rawStr: 'git status'});
      cmd.setGeneralArgs(['existing']);
      cmd.setOptionsMap({'-r': ['rev1', 'rev2']});
      cmd.prependOptionR();
      expect(cmd.getGeneralArgs()).toEqual(['rev1', 'rev2', 'existing']);
    });
  });

  describe('impliedHead', function() {
    it('should add HEAD when args.length equals min', function() {
      var cmd = new Command({rawStr: 'git status'});
      var args = [];
      cmd.impliedHead(args, 0);
      expect(args).toEqual(['HEAD']);
    });

    it('should not add HEAD when args.length > min', function() {
      var cmd = new Command({rawStr: 'git status'});
      var args = ['branch1'];
      cmd.impliedHead(args, 0);
      expect(args).toEqual(['branch1']);
    });
  });

  describe('setResult', function() {
    it('should set the result', function() {
      var cmd = new Command({rawStr: 'git status'});
      cmd.setResult('test result');
      expect(cmd.get('result')).toBe('test result');
    });
  });

  describe('addWarning', function() {
    it('should add warning to warnings array', function() {
      var cmd = new Command({rawStr: 'git status'});
      cmd.addWarning('warning 1');
      cmd.addWarning('warning 2');
      expect(cmd.get('warnings')).toEqual(['warning 1', 'warning 2']);
    });

    it('should increment numWarnings', function() {
      var cmd = new Command({rawStr: 'git status'});
      cmd.addWarning('warning 1');
      expect(cmd.get('numWarnings')).toBe(1);
      cmd.addWarning('warning 2');
      expect(cmd.get('numWarnings')).toBe(2);
    });
  });

  describe('finishWith', function() {
    it('should set status to finished and resolve deferred', function(done) {
      var cmd = new Command({rawStr: 'git status'});
      var resolved = false;
      var deferred = {
        resolve: function() { resolved = true; }
      };
      cmd.finishWith(deferred);
      expect(cmd.get('status')).toBe('finished');
      expect(resolved).toBe(true);
      done();
    });
  });

  describe('error handling', function() {
    it('should set error status for unsupported commands', function() {
      var cmd = new Command({rawStr: 'git unsupportedcommand'});
      expect(cmd.get('status')).toBe('error');
      expect(cmd.get('error')).toBeTruthy();
    });
  });
});
