(function() {
  angular.module('admin.enterpriseFees').controller('enterpriseFeesCtrl', function($scope, $http, $window, enterprises, tax_categories, calculators) {
    $scope.enterprises = enterprises;
    $scope.tax_categories = [
      {
        id: -1,
        name: "Kế thừa từ sản phẩm"
      }
    ].concat(tax_categories);
    $scope.calculators = calculators;
    $scope.enterpriseFeesUrl = function() {
      var match, url;
      url = '/admin/enterprise_fees.json?include_calculators=1';
      match = $window.location.search.match(/enterprise_id=(\d+)/);
      if (match) {
        url += '&' + match[0];
      }
      return url;
    };
    return $http.get($scope.enterpriseFeesUrl()).success(function(data) {
      return $scope.enterprise_fees = data;
    });
  });

}).call(this);
