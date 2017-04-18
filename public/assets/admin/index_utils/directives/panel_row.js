(function() {
  angular.module("admin.indexUtils").directive("panelRow", function(Panels, Columns) {
    return {
      restrict: "C",
      require: "^^panelCtrl",
      templateUrl: "admin/panel.html",
      scope: {
        object: "=",
        panels: "=",
        colspan: "=?",
        locals: '@?'
      },
      link: function(scope, element, attrs, ctrl) {
        var i, len, local, ref;
        scope.template = null;
        scope.columnCount = scope.colspan || Columns.visibleCount;
        if (scope.locals) {
          ref = scope.locals.split(',');
          for (i = 0, len = ref.length; i < len; i++) {
            local = ref[i];
            scope[local] = scope.$parent.$eval(local.trim());
          }
        }
        scope.$on("columnCount:changed", function(event, count) {
          return scope.columnCount = count;
        });
        return ctrl.registerSelectionListener(function(selection) {
          if (selection != null) {
            return scope.template = "admin/panels/" + scope.panels[selection] + ".html";
          } else {
            return scope.template = null;
          }
        });
      }
    };
  });

}).call(this);
