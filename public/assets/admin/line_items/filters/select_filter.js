(function() {
  angular.module("admin.lineItems").filter("selectFilter", function(RequestMonitor) {
    return function(lineItems, selectedSupplier, selectedDistributor, selectedOrderCycle) {
      var filtered, i, len, lineItem;
      filtered = [];
      if (!RequestMonitor.loading) {
        for (i = 0, len = lineItems.length; i < len; i++) {
          lineItem = lineItems[i];
          if ((angular.equals(selectedSupplier, 0) || lineItem.supplier.id === selectedSupplier) && (angular.equals(selectedDistributor, 0) || lineItem.order.distributor.id === selectedDistributor) && (angular.equals(selectedOrderCycle, 0) || lineItem.order.order_cycle.id === selectedOrderCycle)) {
            filtered.push(lineItem);
          }
        }
      }
      return filtered;
    };
  });

}).call(this);
