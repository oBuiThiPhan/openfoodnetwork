(function() {
  angular.module("admin.customers").controller("customersCtrl", function($scope, $q, $filter, Customers, TagRuleResource, CurrentShop, RequestMonitor, Columns, pendingChanges, shops, availableCountries) {
    $scope.shops = shops;
    $scope.availableCountries = availableCountries;
    $scope.RequestMonitor = RequestMonitor;
    $scope.submitAll = pendingChanges.submitAll;
    $scope.customerLimit = 20;
    $scope.customers = Customers.all;
    $scope.columns = Columns.columns;
    $scope.confirmRefresh = function(event) {
      if (!(pendingChanges.unsavedCount() === 0 || confirm(t("unsaved_changes_warning")))) {
        return event.preventDefault();
      }
    };
    $scope.$watch("shop_id", function() {
      if ($scope.shop_id != null) {
        CurrentShop.shop = $filter('filter')($scope.shops, {
          id: $scope.shop_id
        })[0];
        return Customers.index({
          enterprise_id: $scope.shop_id
        }).then(function(data) {
          pendingChanges.removeAll();
          return $scope.customers_form.$setPristine();
        });
      }
    });
    if (shops.length === 1) {
      $scope.shop_id = shops[0].id;
    }
    $scope.deleteCustomer = function(customer) {
      if (confirm(t('admin.customers.index.confirm_delete'))) {
        return Customers.remove(customer);
      }
    };
    $scope.checkForDuplicateCodes = function() {
      if (!this.customer.code) {
        delete this.customer.code;
      }
      return this.duplicate = $scope.isDuplicateCode(this.customer.code);
    };
    $scope.isDuplicateCode = function(code) {
      var customers;
      if (!code) {
        return false;
      }
      customers = $scope.findByCode(code);
      return customers.length > 1;
    };
    $scope.findByCode = function(code) {
      if ($scope.customers) {
        return $scope.customers.filter(function(customer) {
          return customer.code === code;
        });
      }
    };
    return $scope.findTags = function(query) {
      var defer, params;
      defer = $q.defer();
      params = {
        enterprise_id: $scope.shop_id
      };
      TagRuleResource.mapByTag(params, (function(_this) {
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
