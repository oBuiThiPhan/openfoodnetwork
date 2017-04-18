(function() {
  angular.module("admin.businessModelConfiguration").controller("BusinessModelConfigCtrl", function($scope, $filter) {
    $scope.turnover = 1000;
    $scope.bill = function() {
      if (!($scope.fixed || $scope.rate)) {
        return $filter('currency')(0);
      }
      return Number($scope.fixed) + Number($scope.turnover) * Number($scope.rate);
    };
    $scope.cappedBill = function() {
      if (($scope.cap == null) || Number($scope.cap) === 0) {
        return $scope.bill();
      }
      return Math.min($scope.bill(), Number($scope.cap));
    };
    $scope.finalBill = function() {
      if (Number($scope.turnover) < Number($scope.minBillableTurnover)) {
        return 0;
      }
      return $scope.cappedBill();
    };
    $scope.capReached = function() {
      if (($scope.cap == null) || Number($scope.cap) === 0) {
        return "No";
      }
      if ($scope.bill() >= Number($scope.cap)) {
        return "Yes";
      } else {
        return "No";
      }
    };
    $scope.includedTax = function() {
      if (($scope.taxRate == null) || Number($scope.taxRate) === 0) {
        return 0;
      }
      return $scope.cappedBill() * Number($scope.taxRate);
    };
    return $scope.total = function() {
      return $scope.finalBill() + $scope.includedTax();
    };
  });

}).call(this);
