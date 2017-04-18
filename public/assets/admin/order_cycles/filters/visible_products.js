(function() {
  angular.module("admin.orderCycles").filter("visibleProducts", function($filter) {
    return function(products, exchange, rules) {
      var product;
      return (function() {
        var i, len, results;
        results = [];
        for (i = 0, len = products.length; i < len; i++) {
          product = products[i];
          if ($filter('visibleVariants')(product.variants, exchange, rules).length > 0) {
            results.push(product);
          }
        }
        return results;
      })();
    };
  });

}).call(this);
