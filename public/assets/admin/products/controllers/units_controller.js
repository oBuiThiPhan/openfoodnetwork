(function() {
  angular.module("admin.products").controller("unitsCtrl", function($scope, VariantUnitManager, OptionValueNamer) {
    $scope.product = {
      master: {}
    };
    $scope.product.master.product = $scope.product;
    $scope.placeholder_text = "";
    $scope.$watchCollection('[product.variant_unit_with_scale, product.master.unit_value_with_description]', function() {
      $scope.processVariantUnitWithScale();
      $scope.processUnitValueWithDescription();
      return $scope.placeholder_text = new OptionValueNamer($scope.product.master).name();
    });
    $scope.variant_unit_options = VariantUnitManager.variantUnitOptions();
    $scope.processVariantUnitWithScale = function() {
      var match;
      if ($scope.product.variant_unit_with_scale) {
        match = $scope.product.variant_unit_with_scale.match(/^([^_]+)_([\d\.]+)$/);
        if (match) {
          $scope.product.variant_unit = match[1];
          return $scope.product.variant_unit_scale = parseFloat(match[2]);
        } else {
          $scope.product.variant_unit = $scope.product.variant_unit_with_scale;
          return $scope.product.variant_unit_scale = null;
        }
      } else {
        return $scope.product.variant_unit = $scope.product.variant_unit_scale = null;
      }
    };
    $scope.processUnitValueWithDescription = function() {
      var match;
      if ($scope.product.master.hasOwnProperty("unit_value_with_description")) {
        match = $scope.product.master.unit_value_with_description.match(/^([\d\.]+(?= *|$)|)( *)(.*)$/);
        if (match) {
          $scope.product.master.unit_value = parseFloat(match[1]);
          if (isNaN($scope.product.master.unit_value)) {
            $scope.product.master.unit_value = null;
          }
          if ($scope.product.master.unit_value && $scope.product.variant_unit_scale) {
            $scope.product.master.unit_value *= $scope.product.variant_unit_scale;
          }
          return $scope.product.master.unit_description = match[3];
        }
      }
    };
    $scope.hasVariants = function(product) {
      return Object.keys(product.variants).length > 0;
    };
    return $scope.hasUnit = function(product) {
      return product.variant_unit_with_scale != null;
    };
  });

}).call(this);
