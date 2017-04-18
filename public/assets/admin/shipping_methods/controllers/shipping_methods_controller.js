(function() {
  angular.module("admin.shippingMethods").controller("shippingMethodsCtrl", function($scope, ShippingMethods) {
    return $scope.findShippingMethodByID = function(id) {
      return $scope.ShippingMethod = ShippingMethods.byID[id];
    };
  });

}).call(this);
