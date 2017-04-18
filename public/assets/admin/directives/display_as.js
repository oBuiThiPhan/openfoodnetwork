(function() {
  angular.module("ofn.admin").directive("ofnDisplayAs", function(OptionValueNamer) {
    return {
      link: function(scope, element, attrs) {
        var productUnitProperties, variantUnitProperties;
        scope.$watchCollection(function() {
          return [scope.$eval(attrs.ofnDisplayAs).unit_value_with_description, scope.product.variant_unit_name, scope.product.variant_unit_with_scale];
        }, function() {
          var ref, ref1, unit_description, unit_value, variant_object, variant_unit, variant_unit_scale;
          ref = productUnitProperties(), variant_unit = ref[0], variant_unit_scale = ref[1];
          ref1 = variantUnitProperties(variant_unit_scale), unit_value = ref1[0], unit_description = ref1[1];
          variant_object = {
            unit_value: unit_value,
            unit_description: unit_description,
            product: {
              variant_unit_scale: variant_unit_scale,
              variant_unit: variant_unit,
              variant_unit_name: scope.product.variant_unit_name
            }
          };
          return scope.placeholder_text = new OptionValueNamer(variant_object).name();
        });
        productUnitProperties = function() {
          var match, variant_unit, variant_unit_scale;
          if (scope.product.variant_unit_with_scale != null) {
            match = scope.product.variant_unit_with_scale.match(/^([^_]+)_([\d\.]+)$/);
            if (match) {
              variant_unit = match[1];
              variant_unit_scale = parseFloat(match[2]);
            } else {
              variant_unit = scope.product.variant_unit_with_scale;
              variant_unit_scale = null;
            }
          } else {
            variant_unit = variant_unit_scale = null;
          }
          return [variant_unit, variant_unit_scale];
        };
        return variantUnitProperties = function(variant_unit_scale) {
          var match, unit_description, unit_value, variant;
          variant = scope.$eval(attrs.ofnDisplayAs);
          if (variant.unit_value_with_description != null) {
            match = variant.unit_value_with_description.match(/^([\d\.]+(?= |$)|)( |)(.*)$/);
            if (match) {
              unit_value = parseFloat(match[1]);
              if (isNaN(unit_value)) {
                unit_value = null;
              }
              if (unit_value && variant_unit_scale) {
                unit_value *= variant_unit_scale;
              }
              unit_description = match[3];
            }
          }
          return [unit_value, unit_description];
        };
      }
    };
  });

}).call(this);
