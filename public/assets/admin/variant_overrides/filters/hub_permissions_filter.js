(function() {
  angular.module("admin.variantOverrides").filter("hubPermissions", function($filter) {
    return function(products, hubPermissions, hub_id) {
      if (!hub_id) {
        return [];
      }
      return $filter('filter')(products, (function(product) {
        return hubPermissions[hub_id].indexOf(product.producer_id) > -1;
      }), true);
    };
  });

}).call(this);
