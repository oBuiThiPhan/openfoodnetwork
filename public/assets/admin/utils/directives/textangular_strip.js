(function() {
  angular.module("admin.utils").directive("textangularStrip", function() {
    return {
      restrict: 'CA',
      link: function(scope, element, attrs) {
        return scope.stripFormatting = function($html) {
          return String($html).replace(/<[^>]+>/gm, '');
        };
      }
    };
  });

}).call(this);
