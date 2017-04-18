(function() {
  angular.module("admin.customers").directive('newCustomerDialog', function($compile, $templateCache, DialogDefaults, CurrentShop, Customers) {
    return {
      restrict: 'A',
      scope: true,
      link: function(scope, element, attr) {
        var template;
        scope.CurrentShop = CurrentShop;
        scope.submitted = false;
        scope.email = "";
        scope.errors = [];
        scope.addCustomer = function() {
          scope.new_customer_form.$setPristine();
          scope.submitted = true;
          scope.errors = [];
          if (scope.new_customer_form.$valid) {
            Customers.add(scope.email).$promise.then(function(data) {
              if (data.id) {
                scope.email = "";
                scope.submitted = false;
                return template.dialog('close');
              }
            }, function(response) {
              var error, i, len, ref, results;
              if (response.data.errors) {
                ref = response.data.errors;
                results = [];
                for (i = 0, len = ref.length; i < len; i++) {
                  error = ref[i];
                  results.push(scope.errors.push(error));
                }
                return results;
              } else {
                return scope.errors.push("Sorry! Could not create '" + scope.email + "'");
              }
            });
          }
        };
        template = $compile($templateCache.get('admin/new_customer_dialog.html'))(scope);
        template.dialog(DialogDefaults);
        return element.bind('click', function(e) {
          if (CurrentShop.shop.id) {
            return template.dialog('open');
          } else {
            return alert('Please select a shop first');
          }
        });
      }
    };
  });

}).call(this);
