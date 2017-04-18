(function() {
  angular.module("ofn.admin").controller("ImportOptionsFormCtrl", function($scope, $rootScope, ProductImportService) {
    $scope.toggleResetAbsent = function() {
      var confirmed;
      if ($scope.resetAbsent) {
        confirmed = confirm('This will set stock level to zero on all products for this \n' + 'enterprise that are not present in the uploaded file.');
      }
      if (confirmed || !$scope.resetAbsent) {
        return ProductImportService.updateResetAbsent($scope.supplierId, $scope.resetCount, $scope.resetAbsent);
      } else {
        return $scope.resetAbsent = false;
      }
    };
    $scope.resetTotal = ProductImportService.resetTotal;
    return $rootScope.$watch('resetTotal', function(newValue) {
      if (newValue || newValue === 0) {
        return $scope.resetTotal = newValue;
      }
    });
  });

}).call(this);
