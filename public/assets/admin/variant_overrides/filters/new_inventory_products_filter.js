(function() {
  angular.module("admin.variantOverrides").filter("newInventoryProducts", function($filter, InventoryItems) {
    return function(products, hub_id) {
      if (!hub_id) {
        return [];
      }
      if (!InventoryItems.inventoryItems.hasOwnProperty(hub_id)) {
        return products;
      }
      return $filter('filter')(products, function(product) {
        var i, len, ref, variant;
        ref = product.variants;
        for (i = 0, len = ref.length; i < len; i++) {
          variant = ref[i];
          if (!InventoryItems.inventoryItems[hub_id].hasOwnProperty(variant.id)) {
            return true;
          }
        }
        return false;
      }, true);
    };
  });

}).call(this);
