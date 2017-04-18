(function() {
  angular.module("admin.utils").directive("alertRow", function() {
    return {
      restrict: "E",
      replace: true,
      scope: {
        message: '@',
        buttonText: '@?',
        buttonAction: '&?',
        dismissed: '=?',
        close: "&?"
      },
      transclude: true,
      templateUrl: "admin/alert_row.html",
      link: function(scope, element, attrs) {
        scope.dismissed = false;
        return scope.dismiss = function() {
          scope.dismissed = true;
          if (scope.close != null) {
            scope.close();
          }
          return false;
        };
      }
    };
  });

}).call(this);
