function GitEngine() {
  this.detachedHead = false;
}

GitEngine.prototype.commit = function() {

};

var Commit = Backbone.Model.extend({
  initialize: function() {
    // validation / defaults
    if (!this.get('name')) {
      this.set('name', _.uniqueId('C'));
    }
    if (!this.get('parent') && !this.get('rootCommit')) {
      throw new Error('needs parent commit');
    }

    // make a node and start drawing?
  }
});
