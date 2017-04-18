(function() {
  angular.module("admin.paymentMethods").controller("ProvidersCtrl", function($scope, paymentMethod) {
    if (paymentMethod.type) {
      return $scope.include_html = "/admin/payment_methods/show_provider_preferences?" + ("provider_type=" + paymentMethod.type + ";") + ("pm_id=" + paymentMethod.id + ";");
    } else {
      return $scope.include_html = "";
    }
  });

}).call(this);
