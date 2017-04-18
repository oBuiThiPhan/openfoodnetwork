(function() {
  angular.module("admin.variantOverrides").directive("ofnTrackVariantOverride", function(DirtyVariantOverrides) {
    return {
      require: "ngModel",
      link: function(scope, element, attrs, ngModel) {
        return ngModel.$parsers.push(function(viewValue) {
          var vo_id;
          if (ngModel.$dirty) {
            scope.inherit = false;
            vo_id = scope.variantOverrides[scope.hub_id][scope.variant.id].id;
            DirtyVariantOverrides.set(scope.hub_id, scope.variant.id, vo_id, attrs.ofnTrackVariantOverride, viewValue);
            scope.displayDirty();
          }
          return viewValue;
        });
      }
    };
  });

}).call(this);
