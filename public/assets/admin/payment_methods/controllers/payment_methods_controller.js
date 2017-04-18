(function() {
  angular.module("admin.paymentMethods").controller("paymentMethodsCtrl", function($scope, PaymentMethods) {
    return $scope.findPaymentMethodByID = function(id) {
      return $scope.PaymentMethod = PaymentMethods.byID[id];
    };
  });

}).call(this);
