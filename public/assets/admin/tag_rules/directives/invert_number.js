(function() {
  angular.module("admin.tagRules").directive("invertNumber", function() {
    return {
      restrict: "A",
      require: "ngModel",
      link: function(scope, element, attrs, ngModel) {
        ngModel.$parsers.push(function(viewValue) {
          if (!isNaN(parseInt(viewValue))) {
            return -parseInt(viewValue);
          }
          return viewValue;
        });
        return ngModel.$formatters.push(function(modelValue) {
          if (!isNaN(parseInt(modelValue))) {
            return -parseInt(modelValue);
          }
          return modelValue;
        });
      }
    };
  });

}).call(this);
