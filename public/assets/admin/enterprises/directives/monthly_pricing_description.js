(function() {
  angular.module("admin.enterprises").directive("monthlyPricingDescription", function(monthlyBillDescription) {
    return {
      restrict: 'E',
      scope: {
        joiner: "@"
      },
      template: "<span ng-bind-html='billDescription'></span>",
      link: function(scope, element, attrs) {
        var joiners;
        joiners = {
          comma: ", ",
          newline: "<br>"
        };
        return scope.billDescription = monthlyBillDescription.replace("{joiner}", joiners[scope.joiner]);
      }
    };
  });

}).call(this);
