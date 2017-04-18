(function() {
  angular.module("admin.utils").directive("watchValueAs", function() {
    return {
      restrict: 'A',
      scope: {
        value: "=watchValueAs"
      },
      link: function(scope, element, attrs) {
        scope.value = element.val();
        return element.on("change blur load", function() {
          return scope.$apply(function() {
            return scope.value = element.val();
          });
        });
      }
    };
  });

}).call(this);
