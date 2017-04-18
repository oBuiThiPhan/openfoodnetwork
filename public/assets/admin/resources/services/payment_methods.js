(function() {
  angular.module("admin.resources").factory("PaymentMethods", function($injector) {
    var PaymentMethods;
    return new (PaymentMethods = (function() {
      PaymentMethods.prototype.paymentMethods = [];

      PaymentMethods.prototype.byID = {};

      PaymentMethods.prototype.pristineByID = {};

      function PaymentMethods() {
        if ($injector.has('paymentMethods')) {
          this.load($injector.get('paymentMethods'));
        }
      }

      PaymentMethods.prototype.load = function(paymentMethods) {
        var i, len, paymentMethod, results;
        results = [];
        for (i = 0, len = paymentMethods.length; i < len; i++) {
          paymentMethod = paymentMethods[i];
          this.paymentMethods.push(paymentMethod);
          this.byID[paymentMethod.id] = paymentMethod;
          results.push(this.pristineByID[paymentMethod.id] = angular.copy(paymentMethod));
        }
        return results;
      };

      return PaymentMethods;

    })());
  });

}).call(this);
