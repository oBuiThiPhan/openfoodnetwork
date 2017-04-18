(function() {
  angular.module("admin.variantOverrides").directive("trackInheritance", function(VariantOverrides, DirtyVariantOverrides) {
    return {
      require: "ngModel",
      link: function(scope, element, attrs, ngModel) {
        scope.inherit = angular.equals(scope.variantOverrides[scope.hub_id][scope.variant.id], VariantOverrides.newFor(scope.hub_id, scope.variant.id));
        return ngModel.$parsers.push(function(viewValue) {
          if (ngModel.$dirty && viewValue) {
            DirtyVariantOverrides.inherit(scope.hub_id, scope.variant.id, scope.variantOverrides[scope.hub_id][scope.variant.id].id);
            scope.displayDirty();
          }
          return viewValue;
        });
      }
    };
  });

}).call(this);
