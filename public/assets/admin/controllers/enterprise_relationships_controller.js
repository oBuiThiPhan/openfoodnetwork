(function() {
  angular.module("ofn.admin").controller("AdminEnterpriseRelationshipsCtrl", function($scope, EnterpriseRelationships, Enterprises) {
    $scope.EnterpriseRelationships = EnterpriseRelationships;
    $scope.Enterprises = Enterprises;
    $scope.permissions = {};
    $scope.create = function() {
      return $scope.EnterpriseRelationships.create($scope.parent_id, $scope.child_id, $scope.permissions);
    };
    $scope["delete"] = function(enterprise_relationship) {
      if (confirm(t("are_you_sure"))) {
        return $scope.EnterpriseRelationships["delete"](enterprise_relationship);
      }
    };
    $scope.toggleKeyword = function(string, key) {
      var index, words;
      if (!string) {
        string = '';
      }
      words = string.split(' ');
      words = words.filter(function(s) {
        return s;
      });
      index = words.indexOf(key);
      if (index > -1) {
        words.splice(index, 1);
      } else {
        words.push(key);
      }
      return words.join(' ');
    };
    $scope.allPermissionsChecked = function() {
      var i, j, len, ref;
      ref = EnterpriseRelationships.all_permissions;
      for (j = 0, len = ref.length; j < len; j++) {
        i = ref[j];
        if (!$scope.permissions[i]) {
          return false;
        }
      }
      return true;
    };
    return $scope.checkAllPermissions = function() {
      var newValue;
      newValue = !$scope.allPermissionsChecked();
      return EnterpriseRelationships.all_permissions.forEach(function(p) {
        return $scope.permissions[p] = newValue;
      });
    };
  });

}).call(this);
