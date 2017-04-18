(function() {
  angular.module("admin.indexUtils").controller("ColumnsCtrl", function($scope, Columns) {
    $scope.columns = Columns.columns;
    $scope.predicate = "";
    return $scope.reverse = false;
  });

}).call(this);
