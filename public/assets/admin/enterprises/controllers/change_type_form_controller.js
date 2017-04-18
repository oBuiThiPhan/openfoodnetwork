(function() {
  angular.module("admin.enterprises").controller("changeTypeFormCtrl", function($scope, enterprise) {
    $scope.sells = enterprise.sells;
    $scope.producer_profile_only = enterprise.producer_profile_only;
    $scope.submitted = false;
    $scope.valid = function(form) {
      $scope.submitted = !form.$valid;
      return form.$valid;
    };
    return $scope.submit = function(form) {
      if (!$scope.valid(form)) {
        return event.preventDefault();
      }
    };
  });

}).call(this);
