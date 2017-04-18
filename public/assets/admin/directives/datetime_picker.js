(function() {
  angular.module("ofn.admin").directive("datetimepicker", function() {
    return {
      require: "ngModel",
      link: function(scope, element, attrs, ngModel) {
        return element.datetimepicker({
          dateFormat: "yy-mm-dd",
          timeFormat: "HH:mm:ss",
          stepMinute: 15,
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
