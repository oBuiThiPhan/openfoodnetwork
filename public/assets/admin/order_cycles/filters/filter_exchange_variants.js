(function() {
  var indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  angular.module("admin.orderCycles").filter("filterExchangeVariants", function() {
    return function(variants, rules) {
      var variant;
      if ((variants != null) && (rules != null)) {
        return (function() {
          var i, len, results;
          results = [];
          for (i = 0, len = variants.length; i < len; i++) {
            variant = variants[i];
            if (indexOf.call(rules, variant) >= 0) {
              results.push(variant);
            }
          }
          return results;
        })();
      } else {
        return [];
      }
    };
  });

}).call(this);
