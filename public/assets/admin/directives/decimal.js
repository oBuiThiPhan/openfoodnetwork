(function() {
  angular.module("ofn.admin").directive("ofnDecimal", function() {
    return {
      require: "ngModel",
      link: function(scope, element, attrs, ngModel) {
        var numRegExp;
        numRegExp = /^\d+(\.\d+)?$/;
        element.bind("blur", function() {
          scope.$apply(ngModel.$setViewValue(ngModel.$modelValue));
          return ngModel.$render();
        });
        return ngModel.$parsers.push(function(viewValue) {
          if (angular.isString(viewValue) && numRegExp.test(viewValue)) {
            if (viewValue.indexOf(".") === -1) {
              return viewValue + ".0";
            }
          }
          return viewValue;
        });
      }
    };
  });

}).call(this);
