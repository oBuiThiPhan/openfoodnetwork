(function() {
  angular.module("admin.indexUtils").directive("panelToggle", function() {
    return {
      restrict: "C",
      transclude: true,
      template: '<div ng-transclude></div><i class=\'icon-chevron\'></i>',
      require: "^^panelCtrl",
      scope: {
        name: "@"
      },
      link: function(scope, element, attrs, ctrl) {
        element.on("click", function() {
          return scope.$apply(function() {
            return ctrl.toggle(scope.name);
          });
        });
        return ctrl.registerSelectionListener(function(selection) {
          return element.toggleClass('selected', selection === scope.name);
        });
      }
    };
  });

}).call(this);
