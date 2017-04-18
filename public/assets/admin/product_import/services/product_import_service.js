(function() {
  angular.module("ofn.admin").factory("ProductImportService", function($rootScope) {
    var ProductImportService;
    return new (ProductImportService = (function() {
      function ProductImportService() {}

      ProductImportService.prototype.suppliers = {};

      ProductImportService.prototype.resetTotal = 0;

      ProductImportService.prototype.updateResetAbsent = function(supplierId, resetCount, resetAbsent) {
        if (resetAbsent) {
          this.suppliers[supplierId] = resetCount;
          this.resetTotal += resetCount;
        } else {
          this.suppliers[supplierId] = null;
          this.resetTotal -= resetCount;
        }
        return $rootScope.resetTotal = this.resetTotal;
      };

      return ProductImportService;

    })());
  });

}).call(this);
