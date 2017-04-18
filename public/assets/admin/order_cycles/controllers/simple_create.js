(function() {
  angular.module('admin.orderCycles').controller("AdminSimpleCreateOrderCycleCtrl", function($scope, $window, OrderCycle, Enterprise, EnterpriseFee, StatusMessage, ocInstance) {
    $scope.StatusMessage = StatusMessage;
    $scope.OrderCycle = OrderCycle;
    $scope.order_cycle = OrderCycle["new"]({
      coordinator_id: ocInstance.coordinator_id
    }, (function(_this) {
      return function() {
        $scope.enterprises = Enterprise.index({
          coordinator_id: ocInstance.coordinator_id
        }, function(enterprises) {
          return $scope.init(enterprises);
        });
        return $scope.enterprise_fees = EnterpriseFee.index({
          coordinator_id: ocInstance.coordinator_id
        });
      };
    })(this));
    $scope.$watch('order_cycle_form.$dirty', function(newValue) {
      if (newValue) {
        return StatusMessage.display('notice', 'You have unsaved changes');
      }
    });
    $scope.init = function(enterprises) {
      var enterprise;
      enterprise = enterprises[Object.keys(enterprises)[0]];
      OrderCycle.addSupplier(enterprise.id);
      OrderCycle.addDistributor(enterprise.id);
      $scope.outgoing_exchange = OrderCycle.order_cycle.outgoing_exchanges[0];
      OrderCycle.setExchangeVariants(OrderCycle.order_cycle.incoming_exchanges[0], Enterprise.suppliedVariants(enterprise.id), true);
      return OrderCycle.order_cycle.coordinator_id = enterprise.id;
    };
    $scope.loaded = function() {
      return Enterprise.loaded && EnterpriseFee.loaded && OrderCycle.loaded;
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
    $scope.enterpriseFeesForEnterprise = function(enterprise_id) {
      return EnterpriseFee.forEnterprise(parseInt(enterprise_id));
    };
    $scope.submit = function($event, destination) {
      $event.preventDefault();
      StatusMessage.display('progress', "Saving...");
      OrderCycle.mirrorIncomingToOutgoingProducts();
      return OrderCycle.create(destination);
    };
    return $scope.cancel = function(destination) {
      return $window.location = destination;
    };
  });

}).call(this);
