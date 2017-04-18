(function() {
  angular.module("admin.inventoryItems").factory('InventoryItemResource', function($resource) {
    return $resource('/admin/inventory_items/:id/:action.json', {}, {
      'update': {
        method: 'PUT'
      }
    });
  });

}).call(this);
