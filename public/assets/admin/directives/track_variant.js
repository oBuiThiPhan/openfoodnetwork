(function() {
  angular.module("ofn.admin").directive("ofnTrackVariant", [
    "DirtyProducts", function(DirtyProducts) {
      return {
        require: "ngModel",
        link: function(scope, element, attrs, ngModel) {
          return ngModel.$parsers.push(function(viewValue) {
            if (ngModel.$dirty) {
              DirtyProducts.addVariantProperty(scope.product.id, scope.variant.id, attrs.ofnTrackVariant, viewValue);
              scope.displayDirtyProducts();
            }
            return viewValue;
          });
        }
      };
    }
  ]);

}).call(this);
