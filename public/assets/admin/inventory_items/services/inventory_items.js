(function() {
  angular.module("admin.inventoryItems").factory("InventoryItems", function(inventoryItems, InventoryItemResource) {
    var InventoryItems;
    return new (InventoryItems = (function() {
      InventoryItems.prototype.inventoryItems = {};

      InventoryItems.prototype.errors = {};

      function InventoryItems() {
        var base, i, ii, len, name;
        for (i = 0, len = inventoryItems.length; i < len; i++) {
          ii = inventoryItems[i];
          (base = this.inventoryItems)[name = ii.enterprise_id] || (base[name] = {});
          this.inventoryItems[ii.enterprise_id][ii.variant_id] = new InventoryItemResource(ii);
        }
      }

      InventoryItems.prototype.setVisibility = function(hub_id, variant_id, visible) {
        var inventory_item;
        if (this.inventoryItems[hub_id] && this.inventoryItems[hub_id][variant_id]) {
          inventory_item = angular.extend(angular.copy(this.inventoryItems[hub_id][variant_id]), {
            visible: visible
          });
          return InventoryItemResource.update({
            id: inventory_item.id
          }, inventory_item, (function(_this) {
            return function(data) {
              return _this.inventoryItems[hub_id][variant_id] = data;
            };
          })(this), (function(_this) {
            return function(response) {
              var base;
              (base = _this.errors)[hub_id] || (base[hub_id] = {});
              return _this.errors[hub_id][variant_id] = response.data.errors;
            };
          })(this));
        } else {
          return InventoryItemResource.save({
            enterprise_id: hub_id,
            variant_id: variant_id,
            visible: visible
          }, (function(_this) {
            return function(data) {
              var base;
              (base = _this.inventoryItems)[hub_id] || (base[hub_id] = {});
              return _this.inventoryItems[hub_id][variant_id] = data;
            };
          })(this), (function(_this) {
            return function(response) {
              var base;
              (base = _this.errors)[hub_id] || (base[hub_id] = {});
              return _this.errors[hub_id][variant_id] = response.data.errors;
            };
          })(this));
        }
      };

      return InventoryItems;

    })());
  });

}).call(this);
