(function() {
  angular.module("admin.orders").controller("ordersCtrl", function($scope, $compile, $attrs, shops, orderCycles) {
    var i, j, len, len1, oc, ref, ref1, results, shop;
    $scope.$compile = $compile;
    $scope.shops = shops;
    $scope.orderCycles = orderCycles;
    $scope.distributor_id = parseInt($attrs.ofnDistributorId);
    $scope.order_cycle_id = parseInt($attrs.ofnOrderCycleId);
    $scope.validOrderCycle = function(oc) {
      return $scope.orderCycleHasDistributor(oc, parseInt($scope.distributor_id));
    };
    $scope.distributorHasOrderCycles = function(distributor) {
      var oc;
      return ((function() {
        var i, len, results;
        results = [];
        for (i = 0, len = orderCycles.length; i < len; i++) {
          oc = orderCycles[i];
          if (this.orderCycleHasDistributor(oc, distributor.id)) {
            results.push(oc);
          }
        }
        return results;
      }).call(this)).length > 0;
    };
    $scope.orderCycleHasDistributor = function(oc, distributor_id) {
      var d, distributor_ids;
      distributor_ids = (function() {
        var i, len, ref, results;
        ref = oc.distributors;
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          d = ref[i];
          results.push(d.id);
        }
        return results;
      })();
      return distributor_ids.indexOf(distributor_id) !== -1;
    };
    $scope.distributionChosen = function() {
      return $scope.distributor_id && $scope.order_cycle_id;
    };
    ref = $scope.orderCycles;
    for (i = 0, len = ref.length; i < len; i++) {
      oc = ref[i];
      oc.name_and_status = oc.name + " (" + oc.status + ")";
    }
    ref1 = $scope.shops;
    results = [];
    for (j = 0, len1 = ref1.length; j < len1; j++) {
      shop = ref1[j];
      results.push(shop.disabled = !$scope.distributorHasOrderCycles(shop));
    }
    return results;
  });

}).call(this);
