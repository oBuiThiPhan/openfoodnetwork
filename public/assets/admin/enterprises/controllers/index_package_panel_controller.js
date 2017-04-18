(function() {
  angular.module("admin.enterprises").controller('indexPackagePanelCtrl', function($scope, $controller) {
    return angular.extend(this, $controller('indexPanelCtrl', {
      $scope: $scope
    }));
  });

}).call(this);
