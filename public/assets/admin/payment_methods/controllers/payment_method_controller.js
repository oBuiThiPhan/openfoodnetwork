(function() {
  angular.module("admin.paymentMethods").controller("paymentMethodCtrl", function($scope, paymentMethod) {
    return $scope.paymentMethod = paymentMethod;
  });

}).call(this);
