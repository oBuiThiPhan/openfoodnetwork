(function() {
  angular.module("admin.lineItems").directive("confirmChange", function() {
    return {
      restrict: "A",
      require: 'ngModel',
      scope: {
        confirmChange: "&"
      },
      link: function(scope, element, attrs, ngModel) {
        var valid;
        valid = null;
        return ngModel.$parsers.push((function(_this) {
          return function(val) {
            if (val === valid) {
              return val;
            }
            if (scope.confirmChange()) {
              return valid = val;
            } else {
              valid = ngModel.$modelValue;
              ngModel.$setViewValue(valid);
              ngModel.$render();
              return valid;
            }
          };
        })(this));
      }
    };
  });

}).call(this);
