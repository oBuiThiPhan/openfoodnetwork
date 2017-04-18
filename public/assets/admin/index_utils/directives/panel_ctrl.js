(function() {
  angular.module("admin.indexUtils").directive("panelCtrl", function(Panels) {
    return {
      restrict: "C",
      scope: {
        object: "=",
        selected: "@?"
      },
      controller: function($scope, $element) {
        this.toggle = function(name) {
          return Panels.toggle($scope.object, name);
        };
        this.select = function(selection) {
          $scope.$broadcast("selection:changed", selection);
          return $element.toggleClass("expanded", selection != null);
        };
        this.registerSelectionListener = function(callback) {
          return $scope.$on("selection:changed", function(event, selection) {
            return callback(selection);
          });
        };
        return this;
      },
      link: function(scope, element, attrs, ctrl) {
        return Panels.register(ctrl, scope.object, scope.selected);
      }
    };
  });

}).call(this);
