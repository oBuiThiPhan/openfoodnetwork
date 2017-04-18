(function() {
  angular.module("admin.enterprise_groups").controller("enterpriseGroupCtrl", function($scope, SideMenu) {
    return $scope.menu = SideMenu;
  });

}).call(this);
