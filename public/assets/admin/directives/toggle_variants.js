(function() {
  angular.module("ofn.admin").directive("ofnToggleVariants", function(DisplayProperties) {
    return {
      link: function(scope, element, attrs) {
        if (DisplayProperties.showVariants(scope.product.id)) {
          element.addClass("icon-chevron-down");
        } else {
          element.addClass("icon-chevron-right");
        }
        return element.on("click", function() {
          return scope.$apply(function() {
            if (DisplayProperties.showVariants(scope.product.id)) {
              DisplayProperties.setShowVariants(scope.product.id, false);
              element.removeClass("icon-chevron-down");
              return element.addClass("icon-chevron-right");
            } else {
              DisplayProperties.setShowVariants(scope.product.id, true);
              element.removeClass("icon-chevron-right");
              return element.addClass("icon-chevron-down");
            }
          });
        });
      }
    };
  });

}).call(this);
