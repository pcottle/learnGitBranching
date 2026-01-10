var errors = require('../src/js/util/errors');

describe('Error Models', function() {
  describe('GitError', function() {
    it('should store and retrieve msg', function() {
      var err = new errors.GitError({msg: 'test message'});
      expect(err.getMsg()).toBe('test message');
    });

    it('should have correct type', function() {
      var err = new errors.GitError({msg: 'test'});
      expect(err.get('type')).toBe('Git Error');
    });

    it('should convert to string', function() {
      var err = new errors.GitError({msg: 'oops'});
      expect(err.toString()).toBe('Git Error: oops');
    });

    it('should be instanceof GitError', function() {
      var err = new errors.GitError({msg: 'test'});
      expect(err instanceof errors.GitError).toBe(true);
    });
  });

  describe('Warning', function() {
    it('should store and retrieve msg', function() {
      var err = new errors.Warning({msg: 'warning message'});
      expect(err.getMsg()).toBe('warning message');
    });

    it('should have correct type', function() {
      var err = new errors.Warning({msg: 'test'});
      expect(err.get('type')).toBe('Warning');
    });
  });

  describe('CommandProcessError', function() {
    it('should store and retrieve msg', function() {
      var err = new errors.CommandProcessError({msg: 'process error'});
      expect(err.getMsg()).toBe('process error');
    });

    it('should have correct type', function() {
      var err = new errors.CommandProcessError({msg: 'test'});
      expect(err.get('type')).toBe('Command Process Error');
    });
  });

  describe('CommandResult', function() {
    it('should store and retrieve msg', function() {
      var err = new errors.CommandResult({msg: 'result'});
      expect(err.getMsg()).toBe('result');
    });

    it('should have correct type', function() {
      var err = new errors.CommandResult({msg: 'test'});
      expect(err.get('type')).toBe('Command Result');
    });
  });

  describe('filterError', function() {
    it('should not throw for GitError', function() {
      var err = new errors.GitError({msg: 'test'});
      expect(function() {
        errors.filterError(err);
      }).not.toThrow();
    });

    it('should not throw for Warning', function() {
      var err = new errors.Warning({msg: 'test'});
      expect(function() {
        errors.filterError(err);
      }).not.toThrow();
    });

    it('should not throw for CommandProcessError', function() {
      var err = new errors.CommandProcessError({msg: 'test'});
      expect(function() {
        errors.filterError(err);
      }).not.toThrow();
    });

    it('should not throw for CommandResult', function() {
      var err = new errors.CommandResult({msg: 'test'});
      expect(function() {
        errors.filterError(err);
      }).not.toThrow();
    });

    it('should throw for unknown errors', function() {
      var err = new Error('unknown');
      expect(function() {
        errors.filterError(err);
      }).toThrow();
    });
  });
});
