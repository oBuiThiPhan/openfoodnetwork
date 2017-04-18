(function() {
  angular.module("admin.enterprises").controller('indexPanelCtrl', function($scope, Enterprises) {
    $scope.enterprise = $scope.object;
    $scope.saving = false;
    $scope.saved = function() {
      return Enterprises.saved($scope.enterprise);
    };
    $scope.save = function() {
      if (!$scope.saved()) {
        $scope.saving = true;
        return Enterprises.save($scope.enterprise).then(function(data) {
          $scope.$emit("enterprise:updated", $scope.enterprise);
          return $scope.saving = false;
        }, function(response) {
          var attr, message, msg, ref;
          $scope.saving = false;
          if (response.status === 422 && (response.data.errors != null)) {
            message = 'Please resolve the following errors:\n';
            ref = response.data.errors;
            for (attr in ref) {
              msg = ref[attr];
              message += attr + " " + msg + "\n";
            }
            return alert(message);
          }
        });
      }
    };
    return $scope.resetAttribute = function(attribute) {
      return Enterprises.resetAttribute($scope.enterprise, attribute);
    };
  });

}).call(this);
