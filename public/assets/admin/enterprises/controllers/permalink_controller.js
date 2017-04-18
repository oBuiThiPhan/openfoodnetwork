(function() {
  angular.module("admin.enterprises").controller("permalinkCtrl", function($scope, PermalinkChecker) {
    var initialPermalink, pendingRequest;
    initialPermalink = $scope.Enterprise.permalink;
    pendingRequest = null;
    $scope.availablility = "";
    $scope.checking = false;
    return $scope.$watch("Enterprise.permalink", function(newValue, oldValue) {
      $scope.checking = true;
      pendingRequest = PermalinkChecker.check(newValue);
      return pendingRequest.then(function(data) {
        if (data.permalink === initialPermalink) {
          $scope.availability = "";
        } else {
          $scope.availability = data.available;
        }
        $scope.Enterprise.permalink = data.permalink;
        return $scope.checking = false;
      }, function(data) {});
    });
  });

}).call(this);
