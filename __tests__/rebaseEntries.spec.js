var RebaseEntries = require('../src/js/level/rebaseEntries');
var RebaseEntry = RebaseEntries.RebaseEntry;
var RebaseEntryCollection = RebaseEntries.RebaseEntryCollection;

describe('interactive rebase entry ordering', function() {
  function make(entryIds) {
    var collection = new RebaseEntryCollection();
    entryIds.forEach(function(id) {
      collection.add(new RebaseEntry({ id: id }));
    });
    return collection;
  }

  function ids(collection) {
    return collection.models.map(function(model) {
      return model.get('id');
    });
  }

  it('adds entries picked by default', function() {
    var collection = make(['C1', 'C2', 'C3']);
    expect(ids(collection)).toEqual(['C1', 'C2', 'C3']);
    expect(collection.getPicked()).toEqual(collection.models);
  });

  it('moves an entry down then back up (the keyboard controls)', function() {
    var collection = make(['C1', 'C2', 'C3']);
    var first = collection.models[0];

    expect(collection.move(first, 1)).toEqual(true);
    expect(ids(collection)).toEqual(['C2', 'C1', 'C3']);

    expect(collection.move(first, -1)).toEqual(true);
    expect(ids(collection)).toEqual(['C1', 'C2', 'C3']);
  });

  it('clamps at the ends and rejects unknown models', function() {
    var collection = make(['C1', 'C2']);
    expect(collection.move(collection.models[0], -1)).toEqual(false);
    expect(collection.move(collection.models[1], 1)).toEqual(false);
    expect(collection.move(new RebaseEntry({ id: 'X' }), 1)).toEqual(false);
    expect(ids(collection)).toEqual(['C1', 'C2']);
  });

  it('returns picked entries in displayed order after reordering', function() {
    var collection = make(['C1', 'C2', 'C3']);
    collection.models[1].toggle(); // omit C2
    collection.move(collection.models[2], -1); // C3 up one slot

    expect(ids(collection)).toEqual(['C1', 'C3', 'C2']);
    expect(collection.getPicked().map(function(model) {
      return model.get('id');
    })).toEqual(['C1', 'C3']);
  });

  it('reorders models to match a drag order', function() {
    var collection = make(['C1', 'C2', 'C3']);
    collection.reorder(['C3', 'C1', 'C2']);
    expect(ids(collection)).toEqual(['C3', 'C1', 'C2']);

    // unknown ids are ignored and unmentioned entries stay at the end
    collection.reorder(['C3', 'NOPE']);
    expect(ids(collection)).toEqual(['C3', 'C1', 'C2']);
  });

  it('toggles pick state', function() {
    var collection = make(['C1']);
    expect(collection.models[0].get('pick')).toEqual(true);
    collection.models[0].toggle();
    expect(collection.models[0].get('pick')).toEqual(false);
    expect(collection.getPicked().length).toEqual(0);
  });
});
