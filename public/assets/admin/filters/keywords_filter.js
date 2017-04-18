(function() {
  angular.module("ofn.admin").filter("keywords", function($filter) {
    return function(array, query) {
      var keywords;
      if (!query) {
        return array;
      }
      keywords = query.split(' ');
      keywords.forEach(function(key) {
        return array = $filter('filter')(array, key);
      });
      return array;
    };
  });

}).call(this);
