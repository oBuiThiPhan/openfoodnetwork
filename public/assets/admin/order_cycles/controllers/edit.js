(function() {
  angular.module('admin.orderCycles').controller('AdminEditOrderCycleCtrl', function($scope, $filter, $location, $window, OrderCycle, Enterprise, EnterpriseFee, StatusMessage) {
    var order_cycle_id;
    order_cycle_id = $location.absUrl().match(/\/admin\/order_cycles\/(\d+)/)[1];
    $scope.enterprises = Enterprise.index({
      order_cycle_id: order_cycle_id
    });
    $scope.supplier_enterprises = Enterprise.producer_enterprises;
    $scope.distributor_enterprises = Enterprise.hub_enterprises;
    $scope.supplied_products = Enterprise.supplied_products;
    $scope.enterprise_fees = EnterpriseFee.index({
      order_cycle_id: order_cycle_id
    });
    $scope.OrderCycle = OrderCycle;
    $scope.order_cycle = OrderCycle.load(order_cycle_id);
    $scope.StatusMessage = StatusMessage;
    $scope.$watch('order_cycle_form.$dirty', function(newValue) {
      if (newValue) {
        return StatusMessage.display('notice', 'You have unsaved changes');
      }
    });
    $scope.loaded = function() {
      return Enterprise.loaded && EnterpriseFee.loaded && OrderCycle.loaded;
    };
    $scope.suppliedVariants = function(enterprise_id) {
      return Enterprise.suppliedVariants(enterprise_id);
    };
    $scope.exchangeSelectedVariants = function(exchange) {
      return OrderCycle.exchangeSelectedVariants(exchange);
    };
    $scope.setExchangeVariants = function(exchange, variants, selected) {
      return OrderCycle.setExchangeVariants(exchange, variants, selected);
    };
    $scope.enterpriseTotalVariants = function(enterprise) {
      return Enterprise.totalVariants(enterprise);
    };
    $scope.productSuppliedToOrderCycle = function(product) {
      return OrderCycle.productSuppliedToOrderCycle(product);
    };
    $scope.variantSuppliedToOrderCycle = function(variant) {
      return OrderCycle.variantSuppliedToOrderCycle(variant);
    };
    $scope.incomingExchangeVariantsFor = function(enterprise_id) {
      return $filter('filterExchangeVariants')(OrderCycle.incomingExchangesVariants(), $scope.order_cycle.visible_variants_for_outgoing_exchanges[enterprise_id]);
    };
    $scope.exchangeDirection = function(exchange) {
      return OrderCycle.exchangeDirection(exchange);
    };
    $scope.enterprisesWithFees = function() {
      var i, id, len, ref, results;
      ref = OrderCycle.participatingEnterpriseIds();
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        id = ref[i];
        if ($scope.enterpriseFeesForEnterprise(id).length > 0) {
          results.push($scope.enterprises[id]);
        }
      }
      return results;
    };
    $scope.enterpriseFeesForEnterprise = function(enterprise_id) {
      return EnterpriseFee.forEnterprise(parseInt(enterprise_id));
    };
    $scope.addSupplier = function($event) {
      $event.preventDefault();
      return OrderCycle.addSupplier($scope.new_supplier_id);
    };
    $scope.addDistributor = function($event) {
      $event.preventDefault();
      return OrderCycle.addDistributor($scope.new_distributor_id);
    };
    $scope.removeExchange = function($event, exchange) {
      $event.preventDefault();
      OrderCycle.removeExchange(exchange);
      return $scope.order_cycle_form.$dirty = true;
    };
    $scope.addCoordinatorFee = function($event) {
      $event.preventDefault();
      return OrderCycle.addCoordinatorFee();
    };
    $scope.removeCoordinatorFee = function($event, index) {
      $event.preventDefault();
      OrderCycle.removeCoordinatorFee(index);
      return $scope.order_cycle_form.$dirty = true;
    };
    $scope.addExchangeFee = function($event, exchange) {
      $event.preventDefault();
      return OrderCycle.addExchangeFee(exchange);
    };
    $scope.removeExchangeFee = function($event, exchange, index) {
      $event.preventDefault();
      OrderCycle.removeExchangeFee(exchange, index);
      return $scope.order_cycle_form.$dirty = true;
    };
    $scope.removeDistributionOfVariant = function(variant_id) {
      return OrderCycle.removeDistributionOfVariant(variant_id);
    };
    $scope.submit = function(destination) {
      $event.preventDefault();
      return StatusMessage.display('progress', "Saving...");
    };
    $scope.submit = function($event, destination) {
      $event.preventDefault();
      StatusMessage.display('progress', "Saving...");
      return OrderCycle.update(destination, $scope.order_cycle_form);
    };
    return $scope.cancel = function(destination) {
      return $window.location = destination;
    };
  });

}).call(this);
