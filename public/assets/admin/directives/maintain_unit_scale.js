(function() {
  angular.module("ofn.admin").directive("ofnMaintainUnitScale", function() {
    return {
      require: "ngModel",
      link: function(scope, element, attrs, ngModel) {
        return scope.$watch('product.variant_unit_with_scale', function(newValue, oldValue) {
          if (!(oldValue === newValue)) {
            return ngModel.$setViewValue(ngModel.$viewValue);
          }
        });
      }
    };
  });

}).call(this);
