(function() {
  angular.module("admin.lineItems").directive("confirmLinkClick", function() {
    return {
      restrict: "A",
      scope: {
        confirmLinkClick: "&"
      },
      link: function(scope, element, attrs) {
        return element.bind("click", function(event) {
          if (!scope.confirmLinkClick()) {
            return event.preventDefault();
          }
        });
      }
    };
  });

}).call(this);
