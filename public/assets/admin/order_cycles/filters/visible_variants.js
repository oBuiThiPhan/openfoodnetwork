(function() {
  var indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  angular.module("admin.orderCycles").filter("visibleVariants", function() {
    return function(variants, exchange, rules) {
      var variant;
      return (function() {
        var i, len, ref, results;
        results = [];
        for (i = 0, len = variants.length; i < len; i++) {
          variant = variants[i];
          if (ref = variant.id, indexOf.call(rules[exchange.enterprise_id], ref) >= 0) {
            results.push(variant);
          }
        }
        return results;
      })();
    };
  });

}).call(this);
