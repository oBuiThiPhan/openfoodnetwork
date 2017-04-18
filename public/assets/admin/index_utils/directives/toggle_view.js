(function() {
  angular.module("admin.indexUtils").directive("toggleView", function(Views) {
    return {
      link: function(scope, element, attrs) {
        Views.register;
        if (scope.view.visible) {
          element.addClass("selected");
        }
        element.click("click", function() {
          return scope.$apply(function() {
            return Views.selectView(scope.viewKey);
          });
        });
        return scope.$watch("view.visible", function(newValue, oldValue) {
          return element.toggleClass("selected", scope.view.visible);
        });
      }
    };
  });

}).call(this);
