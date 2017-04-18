(function() {
  angular.module("ofn.admin").factory("DisplayProperties", function() {
    var DisplayProperties;
    return new (DisplayProperties = (function() {
      function DisplayProperties() {}

      DisplayProperties.prototype.displayProperties = {};

      DisplayProperties.prototype.showVariants = function(product_id) {
        return this.productProperties(product_id).showVariants;
      };

      DisplayProperties.prototype.setShowVariants = function(product_id, showVariants) {
        return this.productProperties(product_id).showVariants = showVariants;
      };

      DisplayProperties.prototype.productProperties = function(product_id) {
        var base;
        return (base = this.displayProperties)[product_id] || (base[product_id] = {
          showVariants: false
        });
      };

      return DisplayProperties;

    })());
  });

}).call(this);
