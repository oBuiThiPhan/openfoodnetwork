(function() {
  angular.module("admin.customers").directive('editAddressDialog', function($compile, $templateCache, $filter, DialogDefaults, Customers, StatusMessage) {
    return {
      restrict: 'A',
      scope: true,
      link: function(scope, element, attr) {
        var template;
        scope.errors = [];
        scope.$watch('address.country_id', function(newVal) {
          if (newVal) {
            return scope.states = scope.filter_states(newVal);
          }
        });
        scope.updateAddress = function() {
          scope.edit_address_form.$setPristine();
          if (scope.edit_address_form.$valid) {
            return Customers.update(scope.address, scope.customer, scope.addressType).$promise.then(function(data) {
              scope.customer = data;
              template.dialog('close');
              return StatusMessage.display('success', t('admin.customers.index.update_address_success'));
            });
          } else {
            return scope.errors.push(t('admin.customers.index.update_address_error'));
          }
        };
        template = $compile($templateCache.get('admin/edit_address_dialog.html'))(scope);
        template.dialog(DialogDefaults);
        element.bind('click', function(e) {
          if (e.target.id === 'bill-address-link') {
            scope.addressType = 'bill_address';
          } else {
            scope.addressType = 'ship_address';
          }
          scope.address = scope.customer[scope.addressType];
          template.dialog('open');
          return scope.$apply();
        });
        return scope.filter_states = function(countryID) {
          return $filter('filter')(scope.availableCountries, {
            id: countryID
          })[0].states;
        };
      }
    };
  });

}).call(this);
