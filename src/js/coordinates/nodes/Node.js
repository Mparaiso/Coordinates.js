// Generated by CoffeeScript 1.3.3

define(function(require) {
  var Node;
  return Node = (function() {

    function Node(link) {
      this.getLink = function() {
        return link;
      };
      this.setLink = function(value) {
        return link = value;
      };
    }

    Node.prototype.toObject = function() {
      throw "Method must be called in Node descendant";
    };

    Node.prototype.toString = function() {
      return "[object Node]";
    };

    return Node;

  })();
});
