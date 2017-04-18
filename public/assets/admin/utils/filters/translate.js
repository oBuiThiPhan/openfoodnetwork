(function() {
  angular.module("admin.utils").filter("translate", function() {
    return function(key, options) {
      return t(key, options);
    };
  });

  angular.module("admin.utils").filter("t", function() {
    return function(key, options) {
      return t(key, options);
    };
  });

}).call(this);
