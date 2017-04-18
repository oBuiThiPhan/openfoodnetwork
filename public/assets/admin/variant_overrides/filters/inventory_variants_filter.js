(function() {
  angular.module("admin.variantOverrides").filter("inventoryVariants", function($filter, InventoryItems) {
    return function(variants, hub_id, views) {
      if (!hub_id) {
        return [];
      }
      return $filter('filter')(variants, function(variant) {
        if (InventoryItems.inventoryItems.hasOwnProperty(hub_id) && InventoryItems.inventoryItems[hub_id].hasOwnProperty(variant.id)) {
          if (InventoryItems.inventoryItems[hub_id][variant.id].visible) {
            return views.inventory.visible;
          } else {
            return views.hidden.visible;
          }
        } else {
          return views["new"].visible;
        }
      }, true);
    };
  });

}).call(this);
