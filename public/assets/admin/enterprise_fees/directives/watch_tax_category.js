(function() {
  angular.module("admin.enterpriseFees").directive('watchTaxCategory', function() {
    return function(scope, element, attrs) {
      scope.$watch('enterprise_fee.tax_category_id', function(value) {
        if (value === -1) {
          scope.enterprise_fee.inherits_tax_category = true;
          return element.val("");
        } else {
          scope.enterprise_fee.inherits_tax_category = false;
          return element.val(value);
        }
      });
      if (scope.enterprise_fee.inherits_tax_category) {
        return scope.enterprise_fee.tax_category_id = -1;
      }
    };
  });

}).call(this);
