(function() {
  angular.module("admin.accounts_and_billing_settings").directive("methodSettingsFor", function() {
    return {
      template: "<div ng-include='include_html'></div>",
      restrict: 'A',
      scope: {
        enterprise_id: '=methodSettingsFor'
      },
      link: function(scope, element, attrs) {
        scope.include_html = "";
        return scope.$watch("enterprise_id", function(newVal, oldVal) {
          if ((newVal == null) || newVal === "") {
            return scope.include_html = "";
          } else {
            return scope.include_html = "/admin/accounts_and_billing_settings/show_methods?enterprise_id=" + newVal + ";";
          }
        });
      }
    };
  });

}).call(this);
