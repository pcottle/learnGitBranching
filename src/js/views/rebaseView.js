var GitError = require('../util/errors').GitError;
var _ = require('underscore');
var createDeferred = require('../util/promise').createDeferred;

var ModalTerminal = require('../views').ModalTerminal;
var ContainedBase = require('../views').ContainedBase;
var ConfirmCancelView = require('../views').ConfirmCancelView;

var intl = require('../intl');
var RebaseEntries = require('../level/rebaseEntries');
var RebaseEntry = RebaseEntries.RebaseEntry;

require('jquery-ui/ui/widget');
require('jquery-ui/ui/scroll-parent');
require('jquery-ui/ui/data');
require('jquery-ui/ui/widgets/mouse');
// jquery-ui/ui/ie removed - IE support no longer needed
require('jquery-ui/ui/widgets/sortable');
require('jquery-ui/ui/plugin');
require('jquery-ui/ui/safe-active-element');
require('jquery-ui/ui/safe-blur');
require('jquery-ui/ui/widgets/draggable');

class InteractiveRebaseView extends ContainedBase {
  constructor(options) {
    options = options || {};
    options.tagName = 'div';
    super(options);

    this.template = _.template($('#interactive-rebase-template').html());
    this.deferred = options.deferred;
    this.rebaseMap = {};
    this.options = options;

    this.rebaseEntries = new RebaseEntries.RebaseEntryCollection();
    options.toRebase.reverse();
    options.toRebase.forEach(function(commit) {
      var id = commit.get('id');
      this.rebaseMap[id] = commit;
      this.rebaseEntries.add(new RebaseEntry({ id: id }));
    }, this);

    this.container = new ModalTerminal({
      title: intl.str('interactive-rebase-title')
    });
    this.render();
    this.show();

    if (options.aboveAll) {
      $('#canvasHolder').css('display', 'none');
    }
  }

  restoreVis() {
    $('#canvasHolder').css('display', 'inherit');
  }

  confirm() {
    this.die();
    if (this.options.aboveAll) {
      this.restoreVis();
    }

    // authoritative order is the collection (kept in sync by the view's
    // keyboard move controls), not the DOM
    var toRebase = this.rebaseEntries.getPicked().map(function(entry) {
      return this.rebaseMap[entry.get('id')];
    }, this);

    this.deferred.resolve(toRebase);
    this.$el.html('');
  }

  render() {
    var json = {
      num: Object.keys(this.rebaseMap).length,
      solutionOrder: this.options.initialCommitOrdering
    };

    var destination = this.container.getInsideElement();
    this.$el.html(this.template(json));
    $(destination).append(this.el);

    var listHolder = this.$('ul.rebaseEntries');
    this.rebaseEntries.each(function(entry) {
      new RebaseEntryView({
        el: listHolder,
        model: entry,
        collection: this.rebaseEntries
      });
    }, this);

    listHolder.sortable({
      axis: 'y',
      placeholder: 'rebaseEntry transitionOpacity ui-state-highlight',
      appendTo: 'parent',
      // dragging only moves DOM nodes; keep the model order in sync so
      // confirm() (which reads the collection) sees the dragged order
      stop: function() {
        var orderedIds = listHolder.children('li').map(function() {
          return this.id;
        }).get();
        this.rebaseEntries.reorder(orderedIds);
      }.bind(this)
    });

    this.makeButtons();
  }

  cancel() {
    this.hide();
    if (this.options.aboveAll) {
      this.restoreVis();
    }
    this.deferred.resolve([]);
  }

  makeButtons() {
    var deferred = createDeferred();
    deferred.promise
    .then(function() {
      this.confirm();
    }.bind(this))
    .catch(function() {
      this.cancel();
    }.bind(this));

    new ConfirmCancelView({
      destination: this.$('.confirmCancel'),
      deferred: deferred,
      disableCancelButton: !!this.options.aboveAll,
    });
  }
}

class RebaseEntryView {
  constructor(options) {
    this.el = options.el;
    this.$el = $(this.el);
    this.model = options.model;
    this.collection = options.collection;
    this.tagName = 'li';
    this.template = _.template($('#interactive-rebase-entry-template').html());

    this.render();
  }

  $(selector) {
    return this.$el.find(selector);
  }

  toggle() {
    this.model.toggle();
    var picked = this.model.get('pick');
    this.listEntry.toggleClass('notPicked', !picked);
    this.listEntry.find('.toggleButton').attr('aria-pressed', String(picked));
  }

  moveUp() {
    this.move(-1, 'prev');
  }

  moveDown() {
    this.move(1, 'next');
  }

  move(delta, siblingDirection) {
    if (!this.collection.move(this.model, delta)) {
      return; // already at the end
    }

    // re-inserting the <li> detaches it, which blurs the pressed button;
    // restore focus so repeated presses (the keyboard flow) keep working
    var focused = document.activeElement;

    var sibling = this.listEntry[siblingDirection]('li');
    if (sibling.length) {
      if (delta < 0) {
        this.listEntry.insertBefore(sibling);
      } else {
        this.listEntry.insertAfter(sibling);
      }
    }

    if (focused && this.listEntry[0].contains(focused)) {
      focused.focus();
    }
    this.announcePosition();
  }

  announcePosition() {
    if (typeof document === 'undefined') { return; }
    var status = document.getElementById('a11yStatus');
    if (!status) { return; }
    status.textContent = intl.str('interactive-rebase-moved', {
      id: this.model.get('id'),
      position: this.collection.models.indexOf(this.model) + 1,
      total: this.collection.length
    });
  }

  render() {
    var json = Object.assign({}, this.model.toJSON(), {
      moveUpText: intl.str('interactive-rebase-move-up'),
      moveDownText: intl.str('interactive-rebase-move-down')
    });
    this.$el.append(this.template(json));
    this.listEntry = this.$el.children(':last');

    this.listEntry.delegate('.toggleButton', 'click', function() {
      this.toggle();
    }.bind(this));
    this.listEntry.delegate('.moveUpButton', 'click', function() {
      this.moveUp();
    }.bind(this));
    this.listEntry.delegate('.moveDownButton', 'click', function() {
      this.moveDown();
    }.bind(this));
  }
}

exports.InteractiveRebaseView = InteractiveRebaseView;
