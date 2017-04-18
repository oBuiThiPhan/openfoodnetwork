(function() {
  angular.module("admin.indexUtils").factory('Dereferencer', function() {
    var Dereferencer;
    return new (Dereferencer = (function() {
      function Dereferencer() {}

      Dereferencer.prototype.dereference = function(array, data) {
        var i, j, len, match, object, results;
        if (array) {
          results = [];
          for (i = j = 0, len = array.length; j < len; i = ++j) {
            object = array[i];
            match = data[object.id];
            if (match != null) {
              results.push(array[i] = match);
            } else {
              results.push(void 0);
            }
          }
          return results;
        }
      };

      Dereferencer.prototype.dereferenceAttr = function(array, attr, data) {
        var j, len, object, results;
        if (array) {
          results = [];
          for (j = 0, len = array.length; j < len; j++) {
            object = array[j];
            if (object[attr] !== null) {
              results.push(object[attr] = data[object[attr].id]);
            } else {
              results.push(void 0);
            }
          }
          return results;
        }
      };

      return Dereferencer;

    })());
  });

}).call(this);
