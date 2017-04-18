(function() {
  angular.module("admin.indexUtils").directive("datepicker", function() {
    return {
      require: "ngModel",
      link: function(scope, element, attrs, ngModel) {
        return element.datepicker({
          dateFormat: "yy-mm-dd",
          onSelect: function(dateText, inst) {
            return scope.$apply(function(scope) {
              return ngModel.$setViewValue(dateText);
            });
          }
        });
      }
    };
  });

}).call(this);
