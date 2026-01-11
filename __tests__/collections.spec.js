var collections = require('../src/js/models/collections');
var Command = require('../src/js/models/commandModel').Command;

describe('Collections', function() {
  describe('CommandCollection', function() {
    it('should create an empty collection', function() {
      var col = new collections.CommandCollection();
      expect(col.length).toBe(0);
    });

    it('should add items', function() {
      var col = new collections.CommandCollection();
      // Use 'git commit' which is a supported command
      var cmd = new Command({rawStr: 'git commit'});
      col.add(cmd);
      expect(col.length).toBe(1);
    });

    it('should retrieve items by index with at()', function() {
      var col = new collections.CommandCollection();
      var cmd = new Command({rawStr: 'git commit'});
      col.add(cmd);
      expect(col.at(0)).toBe(cmd);
    });

    it('should support toArray()', function() {
      var col = new collections.CommandCollection();
      var cmd1 = new Command({rawStr: 'git commit'});
      var cmd2 = new Command({rawStr: 'git checkout main'});
      col.add(cmd1);
      col.add(cmd2);
      var arr = col.toArray();
      expect(arr.length).toBe(2);
      expect(arr[0]).toBe(cmd1);
      expect(arr[1]).toBe(cmd2);
    });
  });

  describe('CommitCollection', function() {
    it('should create an empty collection', function() {
      var col = new collections.CommitCollection();
      expect(col.length).toBe(0);
    });
  });

  describe('BranchCollection', function() {
    it('should create an empty collection', function() {
      var col = new collections.BranchCollection();
      expect(col.length).toBe(0);
    });
  });

  describe('TagCollection', function() {
    it('should create an empty collection', function() {
      var col = new collections.TagCollection();
      expect(col.length).toBe(0);
    });
  });

  describe('CommandBuffer', function() {
    it('should be created with a collection', function() {
      var col = new collections.CommandCollection();
      var buffer = new collections.CommandBuffer({collection: col});
      expect(buffer).toBeTruthy();
    });

    it('should have an empty buffer initially', function() {
      var col = new collections.CommandCollection();
      var buffer = new collections.CommandBuffer({collection: col});
      expect(buffer.buffer.length).toBe(0);
    });

    it('should add commands to buffer when collection receives add', function() {
      var col = new collections.CommandCollection();
      var buffer = new collections.CommandBuffer({collection: col});
      var cmd = new Command({rawStr: 'git commit'});
      col.add(cmd);
      expect(buffer.buffer.length).toBe(1);
      buffer.clear();
    });

    it('should clear timeout on clear()', function() {
      var col = new collections.CommandCollection();
      var buffer = new collections.CommandBuffer({collection: col});
      buffer.setTimeout();
      expect(buffer.timeout).toBeTruthy();
      buffer.clear();
      expect(buffer.timeout).toBe(null);
    });
  });
});
