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
      Object.assign(this.attributes, key);
    } else {
      this.attributes[key] = value;
    }
    return this;
  }

  on(eventName, callback, context) {
    if (!this._events[eventName]) this._events[eventName] = [];
    this._events[eventName].push({ callback, context: context || this });
  }

  trigger(eventName, ...args) {
    var listeners = this._events[eventName];
    if (listeners) listeners.forEach(l => l.callback.apply(l.context, args));
  }

  removeKeys(keys) {
    keys.forEach(function(key) {
      if (this.get(key)) {
        this.get(key).remove();
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
