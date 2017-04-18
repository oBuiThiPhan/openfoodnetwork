(function() {
  angular.module('admin.orderCycles').controller("AdminSimpleEditOrderCycleCtrl", function($scope, $location, $window, OrderCycle, Enterprise, EnterpriseFee, StatusMessage) {
    $scope.orderCycleId = function() {
      return $location.absUrl().match(/\/admin\/order_cycles\/(\d+)/)[1];
    };
    $scope.StatusMessage = StatusMessage;
    $scope.enterprises = Enterprise.index({
      order_cycle_id: $scope.orderCycleId()
    });
    $scope.enterprise_fees = EnterpriseFee.index({
      order_cycle_id: $scope.orderCycleId()
    });
    $scope.OrderCycle = OrderCycle;
    $scope.order_cycle = OrderCycle.load($scope.orderCycleId(), (function(_this) {
      return function(order_cycle) {
        return $scope.init();
      };
    })(this));
    $scope.$watch('order_cycle_form.$dirty', function(newValue) {
      if (newValue) {
        return StatusMessage.display('notice', 'You have unsaved changes');
      }
    });
    $scope.loaded = function() {
      return Enterprise.loaded && EnterpriseFee.loaded && OrderCycle.loaded;
    };
    $scope.init = function() {
      return $scope.outgoing_exchange = OrderCycle.order_cycle.outgoing_exchanges[0];
    };
    $scope.enterpriseFeesForEnterprise = function(enterprise_id) {
      return EnterpriseFee.forEnterprise(parseInt(enterprise_id));
    };
    $scope.removeDistributionOfVariant = angular.noop;
    $scope.setExchangeVariants = function(exchange, variants, selected) {
      return OrderCycle.setExchangeVariants(exchange, variants, selected);
    };
    $scope.suppliedVariants = function(enterprise_id) {
      return Enterprise.suppliedVariants(enterprise_id);
    };
    $scope.addCoordinatorFee = function($event) {
      $event.preventDefault();
      return OrderCycle.addCoordinatorFee();
    };
    $scope.removeCoordinatorFee = function($event, index) {
      $event.preventDefault();
      return OrderCycle.removeCoordinatorFee(index);
    };
    $scope.submit = function($event, destination) {
      $event.preventDefault();
      StatusMessage.display('progress', "Saving...");
      OrderCycle.mirrorIncomingToOutgoingProducts();
      return OrderCycle.update(destination, $scope.order_cycle_form);
    };
    return $scope.cancel = function(destination) {
      return $window.location = destination;
    };
  });

}).call(this);
