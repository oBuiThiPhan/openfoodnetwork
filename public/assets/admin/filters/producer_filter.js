(function() {
  angular.module("ofn.admin").filter("producer", function($filter) {
    return function(products, producerID) {
      if (producerID === "0") {
        return products;
      }
      return $filter('filter')(products, {
        producer_id: producerID
      }, true);
    };
  });

}).call(this);
