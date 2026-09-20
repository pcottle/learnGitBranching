"use strict";

/**
 * DOM-free models for the interactive rebase dialog.
 *
 * Kept separate from the view so the ordering logic behind the keyboard
 * "move up"/"move down" controls (and the pick/omit selection) can be unit
 * tested without a browser.
 */

class RebaseEntry {
  constructor(options = {}) {
    this.attributes = {
      pick: true,
      id: options.id
    };
  }

  get(key) {
    return this.attributes[key];
  }

  set(key, value) {
    this.attributes[key] = value;
  }

  toggle() {
    this.set('pick', !this.get('pick'));
  }

  toJSON() {
    return Object.assign({}, this.attributes);
  }
}

class RebaseEntryCollection {
  constructor() {
    this.models = [];
    this.length = 0;
  }

  add(model) {
    this.models.push(model);
    this.length = this.models.length;
    return model;
  }

  each(callback, context) {
    this.models.forEach(callback, context);
  }

  /**
   * Move a model by `delta` slots, clamped at the ends.
   * @returns {boolean} whether the order changed
   */
  move(model, delta) {
    var from = this.models.indexOf(model);
    if (from === -1) {
      return false;
    }
    var to = from + delta;
    if (to < 0 || to >= this.models.length) {
      return false;
    }
    this.models.splice(from, 1);
    this.models.splice(to, 0, model);
    return true;
  }

  /**
   * Reorder existing models to match `orderedIds` (used to keep the model
   * order in sync with jquery-ui sortable drags).
   * @param {Array<string>} orderedIds
   */
  reorder(orderedIds) {
    var remaining = {};
    this.models.forEach(function(model) {
      remaining[model.get('id')] = model;
    });

    var reordered = [];
    orderedIds.forEach(function(id) {
      if (remaining[id]) {
        reordered.push(remaining[id]);
        delete remaining[id];
      }
    });
    // anything the caller didn't mention keeps its relative position at the end
    Object.keys(remaining).forEach(function(id) {
      reordered.push(remaining[id]);
    });

    this.models = reordered;
    this.length = this.models.length;
  }

  /**
   * Picked entries, in their current (displayed) order.
   * @returns {Array<RebaseEntry>}
   */
  getPicked() {
    return this.models.filter(function(model) {
      return model.get('pick');
    });
  }
}

exports.RebaseEntry = RebaseEntry;
exports.RebaseEntryCollection = RebaseEntryCollection;
