/**
 * Various helper tools for working with HTML strings
 *
 * @author Monwara LLC / Branko Vukelic <branko@monwara.com>
 * @version 0.0.3
 * @license MIT
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.html = factory();
  }
}(this, function() {
  
  /**
   * Main module
   */
  var html = {};

  /**
   * Constants
   */

  var TAGS = ('p a strong em button code pre blockquote div li dd dt td th ' +
              'tr h1 h2 h3 h4 h5 h6 tt').split(' ');

  /**
   * Enclose in HTML tags
   *
   * @param {String} s String to enclose
   * @param {String} t Tag name
   * @param {Object} attr Optional attribute-value mapping
   * @return {String} String enclosed in proper HTML
   */
  html.enclose = function(s, t, attr) {
    var r = '<' + t;

    if (typeof attr === 'object') {
      for (k in attr) {
        r += ' ' + k + '="' + attr[k].toString() + '"';
      }
    }

    return r + '>' + s + '</' + t + '>';
  };

  /**
   * Bunch of shortcuts for `html.enclose()` call
   */
  TAGS.forEach(function(t) {
    html[t] = function(s, attr) {
      return html.enclose(s, t, attr);
    };
  });

  /**
   * Aliases
   */
  html.b = html.strong;
  html.i = html.em;

  html.overloadPrototype = function() {
    if (typeof String.prototype.enclose !== 'function') {
      String.prototype.enclose = function(t, attr) {
        return html.enclose(this, t, attr);
      };
    }

    TAGS.forEach(function(tag) {
      if (typeof String.prototype[tag] !== 'function') {
        String.prototype[tag] = function(attr) {
          return this.enclose(tag, attr);
        };
      }
    });

    return html;
  };

  return html;
}));
