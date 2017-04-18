(function() {
  angular.module("ofn.admin").directive("ofnTrackMaster", function(DirtyProducts) {
    return {
      require: "ngModel",
      link: function(scope, element, attrs, ngModel) {
        return ngModel.$parsers.push(function(viewValue) {
          if (ngModel.$dirty) {
            DirtyProducts.addMasterProperty(scope.product.id, scope.product.master.id, attrs.ofnTrackMaster, viewValue);
            scope.displayDirtyProducts();
          }
          return viewValue;
        });
      }
    };
  });

}).call(this);
