(function() {
  angular.module("ofn.admin").directive("ofnSelect2MinSearch", function() {
    return {
      require: 'ngModel',
      link: function(scope, element, attrs, ngModel) {
        element.select2({
          minimumResultsForSearch: attrs.ofnSelect2MinSearch
        });
        return ngModel.$formatters.push(function(value) {
          if (value) {
            return element.select2('val', value);
          }
        });
      }
    };
  });

}).call(this);
