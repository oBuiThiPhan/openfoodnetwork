(function() {
  angular.module("admin.products").factory("OptionValueNamer", function(VariantUnitManager) {
    var OptionValueNamer;
    return OptionValueNamer = (function() {
      function OptionValueNamer(variant) {
        this.variant = variant;
      }

      OptionValueNamer.prototype.name = function() {
        var name_fields, ref, separator, unit, value;
        ref = this.option_value_value_unit(), value = ref[0], unit = ref[1];
        separator = this.value_scaled() ? '' : ' ';
        name_fields = [];
        if ((value != null) && (unit != null)) {
          name_fields.push("" + value + separator + unit);
        }
        if (this.variant.unit_description != null) {
          name_fields.push(this.variant.unit_description);
        }
        return name_fields.join(' ');
      };

      OptionValueNamer.prototype.value_scaled = function() {
        return this.variant.product.variant_unit_scale != null;
      };

      OptionValueNamer.prototype.option_value_value_unit = function() {
        var ref, ref1, unit_name, value;
        if (this.variant.unit_value != null) {
          if ((ref = this.variant.product.variant_unit) === "weight" || ref === "volume") {
            ref1 = this.option_value_value_unit_scaled(), value = ref1[0], unit_name = ref1[1];
          } else {
            value = this.variant.unit_value;
            unit_name = this.variant.product.variant_unit_name;
          }
          if (value === parseInt(value, 10)) {
            value = parseInt(value, 10);
          }
        } else {
          value = unit_name = null;
        }
        return [value, unit_name];
      };

      OptionValueNamer.prototype.option_value_value_unit_scaled = function() {
        var ref, unit_name, unit_scale, value;
        ref = this.scale_for_unit_value(), unit_scale = ref[0], unit_name = ref[1];
        value = this.variant.unit_value / unit_scale;
        return [value, unit_name];
      };

      OptionValueNamer.prototype.scale_for_unit_value = function() {
        var scale, unit, unit_name;
        unit = ((function() {
          var ref, results;
          ref = VariantUnitManager.unitNames[this.variant.product.variant_unit];
          results = [];
          for (scale in ref) {
            unit_name = ref[scale];
            if (this.variant.unit_value / scale >= 1) {
              results.push([scale, unit_name]);
            }
          }
          return results;
        }).call(this)).reduce(function(unit, arg) {
          var scale, unit_name;
          scale = arg[0], unit_name = arg[1];
          if ((unit && scale > unit[0]) || (unit == null)) {
            return [scale, unit_name];
          } else {
            return unit;
          }
        }, null);
        if (unit == null) {
          unit = ((function() {
            var ref, results;
            ref = VariantUnitManager.unitNames[this.variant.product.variant_unit];
            results = [];
            for (scale in ref) {
              unit_name = ref[scale];
              results.push([scale, unit_name]);
            }
            return results;
          }).call(this)).reduce(function(unit, arg) {
            var scale, unit_name;
            scale = arg[0], unit_name = arg[1];
            if (scale < unit[0]) {
              return [scale, unit_name];
            } else {
              return unit;
            }
          }, [Infinity, ""]);
        }
        return unit;
      };

      return OptionValueNamer;

    })();
  });

}).call(this);
