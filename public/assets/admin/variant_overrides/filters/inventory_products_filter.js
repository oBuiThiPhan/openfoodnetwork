(function() {
  angular.module("admin.variantOverrides").filter("inventoryProducts", function($filter, InventoryItems) {
    return function(products, hub_id, views) {
      if (!hub_id) {
        return [];
      }
      return $filter('filter')(products, function(product) {
        var i, len, ref, variant;
        ref = product.variants;
        for (i = 0, len = ref.length; i < len; i++) {
          variant = ref[i];
          if (InventoryItems.inventoryItems.hasOwnProperty(hub_id) && InventoryItems.inventoryItems[hub_id].hasOwnProperty(variant.id)) {
            if (InventoryItems.inventoryItems[hub_id][variant.id].visible) {
              if (views.inventory.visible) {
                return true;
              }
            } else {
              if (views.hidden.visible) {
                return true;
              }
            }
          } else {
            if (views["new"].visible) {
              return true;
            }
          }
        }
        return false;
      }, true);
    };
  });

}).call(this);
