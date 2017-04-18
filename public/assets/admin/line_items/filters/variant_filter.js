(function() {
  angular.module("admin.lineItems").filter("variantFilter", function() {
    return function(lineItems, selectedUnitsProduct, selectedUnitsVariant, sharedResource) {
      var filtered, i, len, lineItem;
      filtered = [];
      for (i = 0, len = lineItems.length; i < len; i++) {
        lineItem = lineItems[i];
        if (angular.equals(selectedUnitsProduct, {}) || (lineItem.units_product.id === selectedUnitsProduct.id && (sharedResource || lineItem.units_variant.id === selectedUnitsVariant.id))) {
          filtered.push(lineItem);
        }
      }
      return filtered;
    };
  });

}).call(this);
