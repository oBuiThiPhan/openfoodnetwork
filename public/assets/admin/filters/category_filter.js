(function() {
  angular.module("ofn.admin").filter("category", function($filter) {
    return function(products, taxonID) {
      if (taxonID === "0") {
        return products;
      }
      return $filter('filter')(products, {
        category_id: taxonID
      }, true);
    };
  });

}).call(this);
