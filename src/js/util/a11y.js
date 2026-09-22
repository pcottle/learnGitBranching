"use strict";

var intl = require('../intl');

/**
 * Accessibility helpers for the commit graph.
 *
 * The graph is an SVG, which screen readers cannot meaningfully describe, so we
 * publish a plain-text summary of the current tree into a labelled region that
 * assistive tech can read on demand. Never throws and never blocks the app.
 */

/**
 * @param {Object} tree plain object from GitEngine.exportTree()
 * @returns {string}
 */
function describeTree(tree) {
  if (!tree) { return ''; }

  var parts = [];
  var head = tree.HEAD || {};
  var headTarget = head.target;
  var branches = tree.branches || {};

  parts.push(branches[headTarget]
    ? intl.str('a11y-head-on-branch', { branch: headTarget })
    : intl.str('a11y-head-detached', { id: headTarget || 'unknown' }));

  var branchNames = Object.keys(branches);
  if (branchNames.length) {
    parts.push(intl.str('a11y-branches', {
      branches: branchNames.map(function(name) {
        var branch = branches[name];
        return branch.remote
          ? intl.str('a11y-branch-at-remote', { branch: name, target: branch.target })
          : intl.str('a11y-branch-at', { branch: name, target: branch.target });
      }).join(', ')
    }));
  }

  var tags = tree.tags || {};
  var tagNames = Object.keys(tags);
  if (tagNames.length) {
    parts.push(intl.str('a11y-tags', {
      tags: tagNames.map(function(name) {
        return intl.str('a11y-tag-at', { tag: name, target: tags[name].target });
      }).join(', ')
    }));
  }

  var commits = tree.commits || {};
  var commitIds = Object.keys(commits);
  if (commitIds.length) {
    parts.push(intl.str('a11y-commits', {
      commits: commitIds.map(function(id) {
        var parents = commits[id].parents || [];
        return parents.length
          ? intl.str('a11y-commit-after', { id: id, parents: parents.join(' and ') })
          : intl.str('a11y-commit-root', { id: id });
      }).join('; ')
    }));
  }

  return parts.join('. ') + '.';
}

/**
 * Refresh the graph summary region, if present.
 * @param {Object} gitEngine
 */
function updateGraphSummary(gitEngine) {
  if (typeof document === 'undefined' || !gitEngine) { return; }
  var el = document.getElementById('a11yGraphSummary');
  if (!el) { return; }

  var text;
  try {
    text = describeTree(gitEngine.exportTree());
  } catch (e) {
    return; // a summary is never worth breaking the app for
  }
  if (text) {
    el.textContent = text;
  }
}

exports.describeTree = describeTree;
exports.updateGraphSummary = updateGraphSummary;
