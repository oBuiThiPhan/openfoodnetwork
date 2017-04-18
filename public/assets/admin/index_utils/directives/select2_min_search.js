(function() {
  angular.module("admin.indexUtils").directive("select2MinSearch", function($timeout) {
    return {
      require: 'ngModel',
      link: function(scope, element, attrs, ngModel) {
        element.select2({
          minimumResultsForSearch: attrs.select2MinSearch
        });
        return ngModel.$formatters.push(function(value) {
          element.select2('val', value);
          return value;
        });
      }
    };
  });

}).call(this);
