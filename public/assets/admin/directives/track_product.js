(function() {
  angular.module("ofn.admin").directive("ofnTrackProduct", [
    "DirtyProducts", function(DirtyProducts) {
      return {
        require: "ngModel",
        link: function(scope, element, attrs, ngModel) {
          return ngModel.$parsers.push(function(viewValue) {
            if (ngModel.$dirty) {
              DirtyProducts.addProductProperty(scope.product.id, attrs.ofnTrackProduct, viewValue);
              scope.displayDirtyProducts();
            }
            return viewValue;
          });
        }
      };
    }
  ]);

}).call(this);
