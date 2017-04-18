(function() {
  angular.module("admin.indexUtils").directive("objForUpdate", function(switchClass, pendingChanges) {
    return {
      scope: {
        object: "&objForUpdate",
        type: "@objForUpdate",
        attr: "@attrForUpdate"
      },
      link: function(scope, element, attrs) {
        scope.savedValue = scope.object()[scope.attr];
        scope.$watch("object()." + scope.attr, function(value) {
          var change;
          if (value === scope.savedValue) {
            pendingChanges.remove(scope.object().id, scope.attr);
            return scope.clear();
          } else {
            change = {
              object: scope.object(),
              type: scope.type,
              attr: scope.attr,
              value: value != null ? value : "",
              scope: scope
            };
            scope.pending();
            return pendingChanges.add(scope.object().id, scope.attr, change);
          }
        });
        scope.reset = function(value) {
          return scope.savedValue = value;
        };
        scope.success = function() {
          return switchClass(element, "update-success", ["update-pending", "update-error"], 5000);
        };
        scope.pending = function() {
          return switchClass(element, "update-pending", ["update-error", "update-success"], false);
        };
        scope.error = function() {
          return switchClass(element, "update-error", ["update-pending", "update-success"], false);
        };
        return scope.clear = function() {
          return switchClass(element, "", ["update-pending", "update-error", "update-success"], false);
        };
      }
    };
  });

}).call(this);
