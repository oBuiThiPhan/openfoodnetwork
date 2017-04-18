(function() {
  var indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  angular.module("admin.enterprises").factory("EnterprisePaymentMethods", function(enterprise, PaymentMethods) {
    var EnterprisePaymentMethods;
    return new (EnterprisePaymentMethods = (function() {
      EnterprisePaymentMethods.prototype.paymentMethods = PaymentMethods.paymentMethods;

      function EnterprisePaymentMethods() {
        var i, len, payment_method, ref, ref1;
        ref = this.paymentMethods;
        for (i = 0, len = ref.length; i < len; i++) {
          payment_method = ref[i];
          payment_method.selected = (ref1 = payment_method.id, indexOf.call(enterprise.payment_method_ids, ref1) >= 0);
        }
      }

      EnterprisePaymentMethods.prototype.displayColor = function() {
        if (this.paymentMethods.length > 0 && this.selectedCount() > 0) {
          return "blue";
        } else {
          return "red";
        }
      };

      EnterprisePaymentMethods.prototype.selectedCount = function() {
        return this.paymentMethods.reduce(function(count, payment_method) {
          if (payment_method.selected) {
            count++;
          }
          return count;
        }, 0);
      };

      return EnterprisePaymentMethods;

    })());
  });

}).call(this);
