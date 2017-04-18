(function() {
  var indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  angular.module("admin.enterprises").factory("EnterpriseShippingMethods", function(enterprise, ShippingMethods) {
    var EnterpriseShippingMethods;
    return new (EnterpriseShippingMethods = (function() {
      EnterpriseShippingMethods.prototype.shippingMethods = ShippingMethods.shippingMethods;

      function EnterpriseShippingMethods() {
        var i, len, ref, ref1, shipping_method;
        ref = this.shippingMethods;
        for (i = 0, len = ref.length; i < len; i++) {
          shipping_method = ref[i];
          shipping_method.selected = (ref1 = shipping_method.id, indexOf.call(enterprise.shipping_method_ids, ref1) >= 0);
        }
      }

      EnterpriseShippingMethods.prototype.displayColor = function() {
        if (this.shippingMethods.length > 0 && this.selectedCount() > 0) {
          return "blue";
        } else {
          return "red";
        }
      };

      EnterpriseShippingMethods.prototype.selectedCount = function() {
        return this.shippingMethods.reduce(function(count, shipping_method) {
          if (shipping_method.selected) {
            count++;
          }
          return count;
        }, 0);
      };

      return EnterpriseShippingMethods;

    })());
  });

}).call(this);
