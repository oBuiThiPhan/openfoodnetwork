(function() {
  angular.module("admin.dropdown").directive("closeOnClick", function() {
    return {
      link: function(scope, element, attrs) {
        return element.click(function(event) {
          event.stopPropagation();
          return scope.$emit("offClick");
        });
      }
    };
  });

}).call(this);
