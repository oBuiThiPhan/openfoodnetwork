(function() {
  angular.module("admin.indexUtils").factory('Indexer', function() {
    var Indexer;
    return new (Indexer = (function() {
      function Indexer() {}

      Indexer.prototype.index = function(data, key) {
        var e, i, index, len;
        if (key == null) {
          key = 'id';
        }
        index = {};
        for (i = 0, len = data.length; i < len; i++) {
          e = data[i];
          index[e[key]] = e;
        }
        return index;
      };

      return Indexer;

    })());
  });

}).call(this);
