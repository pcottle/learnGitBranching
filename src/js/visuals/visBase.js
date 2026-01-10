// VisBase - converted from Backbone.Model to ES6 class

class VisBase {
  constructor(options = {}) {
    this._events = {};
    this.attributes = Object.assign({}, options);
  }

  get(key) {
    return this.attributes[key];
  }

  set(key, value) {
    if (typeof key === 'object') {
      Object.keys(key).forEach(function(k) {
        this.attributes[k] = key[k];
      }, this);
    } else {
      this.attributes[key] = value;
    }
    return this;
  }

  on(eventName, callback, context) {
    if (!this._events[eventName]) {
      this._events[eventName] = [];
    }
    this._events[eventName].push({ callback: callback, context: context || this });
  }

  off(eventName, callback) {
    if (!this._events[eventName]) return;
    if (!callback) {
      delete this._events[eventName];
    } else {
      this._events[eventName] = this._events[eventName].filter(function(listener) {
        return listener.callback !== callback;
      });
    }
  }

  trigger(eventName) {
    var listeners = this._events[eventName];
    if (!listeners) return;
    var args = Array.prototype.slice.call(arguments, 1);
    listeners.forEach(function(listener) {
      listener.callback.apply(listener.context, args);
    });
  }

  toJSON() {
    return Object.assign({}, this.attributes);
  }

  removeKeys(keys) {
    keys.forEach(function(key) {
      if (this.get(key)) {
        this.get(key).remove();
      }
    }, this);
  }

  getNonAnimateKeys() {
    return [
      'stroke-dasharray'
    ];
  }

  getIsInOrigin() {
    if (!this.get('gitEngine')) {
      return false;
    }
    return this.get('gitEngine').isOrigin();
  }

  animateToAttr(attr, speed, easing) {
    if (speed === 0) {
      this.setAttr(attr, /* instant */ true);
      return;
    }

    var s = speed !== undefined ? speed : this.get('animationSpeed');
    var e = easing || this.get('animationEasing');
    this.setAttr(attr, /* instance */ false, s, e);
  }

  setAttrBase(keys, attr, instant, speed, easing) {
    keys.forEach(function(key) {
      if (instant) {
        this.get(key).attr(attr[key]);
      } else {
        this.get(key).stop();
        this.get(key).animate(attr[key], speed, easing);
        // some keys don't support animating too, so set those instantly here
        this.getNonAnimateKeys().forEach(function(nonAnimateKey) {
          if (attr[key] && attr[key][nonAnimateKey] !== undefined) {
            this.get(key).attr(nonAnimateKey, attr[key][nonAnimateKey]);
          }
        }, this);
      }

      if (attr.css) {
        $(this.get(key).node).css(attr.css);
      }
    }, this);
  }

  animateAttrKeys(keys, attrObj, speed, easing) {
    // either we animate a specific subset of keys or all
    // possible things we could animate
    keys = Object.assign(
      {},
      {
        include: ['circle', 'arrow', 'rect', 'path', 'text'],
        exclude: []
      },
      keys || {}
    );

    var attr = this.getAttributes();

    // safely insert this attribute into all the keys we want
    keys.include.forEach(function(key) {
      attr[key] = Object.assign(
        {},
        attr[key],
        attrObj
      );
    });

    keys.exclude.forEach(function(key) {
      delete attr[key];
    });

    this.animateToAttr(attr, speed, easing);
  }
}

exports.VisBase = VisBase;
