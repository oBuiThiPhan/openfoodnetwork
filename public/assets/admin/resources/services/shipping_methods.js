(function() {
  angular.module("admin.resources").factory("ShippingMethods", function($injector) {
    var ShippingMethods;
    return new (ShippingMethods = (function() {
      ShippingMethods.prototype.shippingMethods = [];

      ShippingMethods.prototype.byID = {};

      ShippingMethods.prototype.pristineByID = {};

      function ShippingMethods() {
        if ($injector.has('shippingMethods')) {
          this.load($injector.get('shippingMethods'));
        }
      }

      ShippingMethods.prototype.load = function(shippingMethods) {
        var i, len, results, shippingMethod;
        results = [];
        for (i = 0, len = shippingMethods.length; i < len; i++) {
          shippingMethod = shippingMethods[i];
          this.shippingMethods.push(shippingMethod);
          this.byID[shippingMethod.id] = shippingMethod;
          results.push(this.pristineByID[shippingMethod.id] = angular.copy(shippingMethod));
        }
        return results;
      };

      return ShippingMethods;

    })());
  });

}).call(this);
