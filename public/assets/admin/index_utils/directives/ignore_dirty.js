(function() {
  angular.module("admin.indexUtils").directive("ignoreDirty", function() {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function(scope, element, attrs, ngModel) {
        return ngModel.$setDirty = angular.noop;
      }
    };
  });

}).call(this);
