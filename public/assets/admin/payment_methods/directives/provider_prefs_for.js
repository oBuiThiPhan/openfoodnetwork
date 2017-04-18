(function() {
  angular.module("admin.paymentMethods").directive("providerPrefsFor", function($http) {
    return {
      link: function(scope, element, attrs) {
        return element.on("change blur load", function() {
          return scope.$apply(function() {
            return scope.include_html = "/admin/payment_methods/show_provider_preferences?" + ("provider_type=" + (element.val()) + ";") + ("pm_id=" + attrs.providerPrefsFor + ";");
          });
        });
      }
    };
  });

}).call(this);
