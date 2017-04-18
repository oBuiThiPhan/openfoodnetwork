(function() {
  angular.module("admin.utils").directive("saveBar", function(StatusMessage) {
    return {
      restrict: "E",
      transclude: true,
      scope: {
        dirty: "=",
        persist: "=?"
      },
      templateUrl: "admin/save_bar.html",
      link: function(scope, element, attrs) {
        return scope.StatusMessage = StatusMessage;
      }
    };
  });

}).call(this);
