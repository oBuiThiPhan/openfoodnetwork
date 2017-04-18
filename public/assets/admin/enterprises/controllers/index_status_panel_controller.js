(function() {
  angular.module("admin.enterprises").controller('indexStatusPanelCtrl', function($scope, $filter) {
    $scope.issues = $scope.object.issues;
    return $scope.warnings = $scope.object.warnings;
  });

}).call(this);
