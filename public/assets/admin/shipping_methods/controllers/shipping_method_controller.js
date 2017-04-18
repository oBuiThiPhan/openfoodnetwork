(function() {
  angular.module("admin.shippingMethods").controller("shippingMethodCtrl", function($scope, shippingMethod, TagRuleResource, $q) {
    $scope.shippingMethod = shippingMethod;
    return $scope.findTags = function(query) {
      var defer;
      defer = $q.defer();
      TagRuleResource.mapByTag((function(_this) {
        return function(data) {
          var filtered;
          filtered = data.filter(function(tag) {
            return tag.text.toLowerCase().indexOf(query.toLowerCase()) !== -1;
          });
          return defer.resolve(filtered);
        };
      })(this));
      return defer.promise;
    };
  });

}).call(this);
