(function() {
  angular.module("ofn.admin").controller("AdminEnterpriseRolesCtrl", function($scope, EnterpriseRoles, Users, Enterprises) {
    $scope.EnterpriseRoles = EnterpriseRoles;
    $scope.Users = Users;
    $scope.Enterprises = Enterprises;
    $scope.create = function() {
      return $scope.EnterpriseRoles.create($scope.user_id, $scope.enterprise_id);
    };
    return $scope["delete"] = function(enterprise_role) {
      if (confirm(t('are_you_sure'))) {
        return $scope.EnterpriseRoles["delete"](enterprise_role);
      }
    };
  });

}).call(this);
