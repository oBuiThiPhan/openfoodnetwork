(function() {
  angular.module("admin.dropdown").directive("ofnDropDown", function($document) {
    return {
      restrict: 'C',
      scope: true,
      link: function(scope, element, attrs) {
        var outsideClickListener;
        scope.expanded = false;
        outsideClickListener = function(event) {
          if (!($(event.target).is("div.ofn-drop-down#" + attrs.id + " div.menu") || $(event.target).parents("div.ofn-drop-down#" + attrs.id + " div.menu").length > 0)) {
            return scope.$emit("offClick");
          }
        };
        return element.click(function(event) {
          if (!scope.expanded) {
            event.stopPropagation();
            scope.deregistrationCallback = scope.$on("offClick", function() {
              $document.off("click", outsideClickListener);
              return scope.$apply(function() {
                scope.expanded = false;
                element.removeClass("expanded");
                return scope.deregistrationCallback();
              });
            });
            $document.on("click", outsideClickListener);
            return scope.$apply(function() {
              scope.expanded = true;
              return element.addClass("expanded");
            });
          }
        });
      }
    };
  });

}).call(this);
