(function() {
  angular.module("ofn.admin").controller("DropdownPanelsCtrl", function($scope) {
    $scope.active = false;
    return $scope.togglePanel = function() {
      return $scope.active = !$scope.active;
    };
  });

}).call(this);
