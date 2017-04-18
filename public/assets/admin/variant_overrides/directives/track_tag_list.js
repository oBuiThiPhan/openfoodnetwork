(function() {
  angular.module("admin.variantOverrides").directive("trackTagList", function(VariantOverrides, DirtyVariantOverrides) {
    return {
      link: function(scope, element, attrs) {
        var watchString;
        watchString = "variantOverrides[" + scope.hub_id + "][" + scope.variant.id + "].tag_list";
        return scope.$watch(watchString, function(newValue, oldValue) {
          var vo_id;
          if (typeof newValue !== 'undefined' && newValue !== oldValue) {
            scope.inherit = false;
            vo_id = scope.variantOverrides[scope.hub_id][scope.variant.id].id;
            DirtyVariantOverrides.set(scope.hub_id, scope.variant.id, vo_id, 'tag_list', newValue);
            return scope.displayDirty();
          }
        });
      }
    };
  });

}).call(this);
