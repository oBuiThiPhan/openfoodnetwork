(function() {
  angular.module("admin.dropdown").controller("ColumnsDropdownCtrl", function($scope, Columns) {
    $scope.columns = Columns.columns;
    $scope.toggle = Columns.toggleColumn;
    $scope.saved = Columns.preferencesSaved;
    $scope.saving = false;
    return $scope.saveColumnPreferences = function(action_name) {
      $scope.saving = true;
      return Columns.savePreferences(action_name).then(function() {
        return $scope.saving = false;
      });
    };
  });

}).call(this);
