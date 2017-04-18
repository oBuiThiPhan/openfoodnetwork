(function() {
  angular.module("admin.enterprises").controller('indexProducerPanelCtrl', function($scope, $controller) {
    angular.extend(this, $controller('indexPanelCtrl', {
      $scope: $scope
    }));
    $scope.changeToProducer = function() {
      $scope.resetAttribute('sells');
      $scope.resetAttribute('producer_profile_only');
      return $scope.enterprise.is_primary_producer = true;
    };
    return $scope.changeToNonProducer = function() {
      if ($scope.enterprise.sells === 'own') {
        $scope.enterprise.sells = 'any';
      }
      if ($scope.enterprise.producer_profile_only = true) {
        $scope.enterprise.producer_profile_only = false;
      }
      return $scope.enterprise.is_primary_producer = false;
    };
  });

}).call(this);
