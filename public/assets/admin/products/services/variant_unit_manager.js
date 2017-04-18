(function() {
  angular.module("admin.products").factory("VariantUnitManager", function() {
    var VariantUnitManager;
    return VariantUnitManager = (function() {
      function VariantUnitManager() {}

      VariantUnitManager.unitNames = {
        'trọng lượng': {
          1.0: 'g',
          1000.0: 'kg',
          10000.0: 'Yến',
          1000000.0: 'Tấn'
        },
        'thể tích': {
          0.001: 'ml',
          1.0: 'l',
          1000.0: 'Khối'
        }
      };

      VariantUnitManager.variantUnitOptions = function() {
        var name, options, ref, scale, scale_with_name, unit_type, unit_type_cap;
        options = (function() {
          var ref, results;
          ref = this.unitNames;
          results = [];
          for (unit_type in ref) {
            scale_with_name = ref[unit_type];
            unit_type_cap = unit_type[0].toUpperCase() + unit_type.slice(1);
            results.push((function() {
              var i, len, ref1, results1;
              ref1 = this.unitScales(unit_type);
              results1 = [];
              for (i = 0, len = ref1.length; i < len; i++) {
                scale = ref1[i];
                name = this.getUnitName(scale, unit_type);
                results1.push([unit_type_cap + " (" + name + ")", unit_type + "_" + scale]);
              }
              return results1;
            }).call(this));
          }
          return results;
        }).call(this);
        options.push([['Quả', 'Quả'], ['Mớ', 'mớ']]);
        return (ref = []).concat.apply(ref, options);
      };

      VariantUnitManager.getScale = function(value, unitType) {
        var i, len, scale, scaledValue, unitScales, validScales;
        scaledValue = null;
        validScales = [];
        unitScales = VariantUnitManager.unitScales(unitType);
        for (i = 0, len = unitScales.length; i < len; i++) {
          scale = unitScales[i];
          if (value / scale >= 1) {
            validScales.unshift(scale);
          }
        }
        if (validScales.length > 0) {
          return validScales[0];
        } else {
          return unitScales[0];
        }
      };

      VariantUnitManager.getUnitName = function(scale, unitType) {
        return this.unitNames[unitType][scale];
      };

      VariantUnitManager.unitScales = function(unitType) {
        var scale;
        return ((function() {
          var i, len, ref, results;
          ref = Object.keys(this.unitNames[unitType]);
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            scale = ref[i];
            results.push(parseFloat(scale));
          }
          return results;
        }).call(this)).sort();
      };

      return VariantUnitManager;

    })();
  });

}).call(this);
