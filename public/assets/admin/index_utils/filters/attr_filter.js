(function() {
  angular.module("admin.indexUtils").filter("attrFilter", function($filter) {
    return function(objects, filters) {
      return Object.keys(filters).reduce(function(filtered, attr) {
        var filter;
        filter = filters[attr];
        if ((filter == null) || filter === 0) {
          return filtered;
        }
        return $filter('filter')(filtered, function(object) {
          return object[attr] === filter;
        });
      }, objects);
    };
  });

}).call(this);
