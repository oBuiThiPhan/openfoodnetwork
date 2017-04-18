(function() {
  angular.module("admin.customers").factory("CurrentShop", function() {
    var CurrentShop;
    return new (CurrentShop = (function() {
      function CurrentShop() {}

      CurrentShop.prototype.shop = {};

      return CurrentShop;

    })());
  });

}).call(this);
