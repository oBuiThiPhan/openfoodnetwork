(function() {
  angular.module("ofn.admin").factory("BulkProducts", function(PagedFetcher, dataFetcher) {
    var BulkProducts;
    return new (BulkProducts = (function() {
      function BulkProducts() {}

      BulkProducts.prototype.products = [];

      BulkProducts.prototype.fetch = function(filters, onComplete) {
        var queryString, url;
        queryString = filters.reduce(function(qs, f) {
          return qs + ("q[" + f.property.db_column + "_" + f.predicate.predicate + "]=" + f.value + ";");
        }, "");
        url = "/api/products/bulk_products?page=::page::;per_page=20;" + queryString;
        return PagedFetcher.fetch(url, (function(_this) {
          return function(data) {
            return _this.addProducts(data.products);
          };
        })(this));
      };

      BulkProducts.prototype.cloneProduct = function(product) {
        return dataFetcher("/admin/products/" + product.permalink_live + "/clone.json").then((function(_this) {
          return function(data) {
            var id;
            id = data.product.id;
            return dataFetcher("/api/products/" + id + "?template=bulk_show").then(function(newProduct) {
              _this.unpackProduct(newProduct);
              return _this.insertProductAfter(product, newProduct);
            });
          };
        })(this));
      };

      BulkProducts.prototype.updateVariantLists = function(serverProducts, productsWithUnsavedVariants) {
        var i, len, product, results, server_product;
        results = [];
        for (i = 0, len = productsWithUnsavedVariants.length; i < len; i++) {
          product = productsWithUnsavedVariants[i];
          server_product = this.findProductInList(product.id, serverProducts);
          product.variants = server_product.variants;
          results.push(this.loadVariantUnitValues(product));
        }
        return results;
      };

      BulkProducts.prototype.find = function(id) {
        return this.findProductInList(id, this.products);
      };

      BulkProducts.prototype.findProductInList = function(id, product_list) {
        var product, products;
        products = (function() {
          var i, len, results;
          results = [];
          for (i = 0, len = product_list.length; i < len; i++) {
            product = product_list[i];
            if (product.id === id) {
              results.push(product);
            }
          }
          return results;
        })();
        if (products.length === 0) {
          return null;
        } else {
          return products[0];
        }
      };

      BulkProducts.prototype.addProducts = function(products) {
        var i, len, product, results;
        results = [];
        for (i = 0, len = products.length; i < len; i++) {
          product = products[i];
          this.unpackProduct(product);
          results.push(this.products.push(product));
        }
        return results;
      };

      BulkProducts.prototype.insertProductAfter = function(product, newProduct) {
        var index;
        index = this.products.indexOf(product);
        return this.products.splice(index + 1, 0, newProduct);
      };

      BulkProducts.prototype.unpackProduct = function(product) {
        return this.loadVariantUnit(product);
      };

      BulkProducts.prototype.loadVariantUnit = function(product) {
        product.variant_unit_with_scale = product.variant_unit && product.variant_unit_scale && product.variant_unit !== 'items' ? product.variant_unit + "_" + product.variant_unit_scale : product.variant_unit ? product.variant_unit : null;
        if (product.variants) {
          this.loadVariantUnitValues(product);
        }
        if (product.master) {
          return this.loadVariantUnitValue(product, product.master);
        }
      };

      BulkProducts.prototype.loadVariantUnitValues = function(product) {
        var i, len, ref, results, variant;
        ref = product.variants;
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          variant = ref[i];
          results.push(this.loadVariantUnitValue(product, variant));
        }
        return results;
      };

      BulkProducts.prototype.loadVariantUnitValue = function(product, variant) {
        var unit_value;
        unit_value = this.variantUnitValue(product, variant);
        unit_value = unit_value != null ? unit_value : '';
        return variant.unit_value_with_description = (unit_value + " " + (variant.unit_description || '')).trim();
      };

      BulkProducts.prototype.variantUnitValue = function(product, variant) {
        if (variant.unit_value != null) {
          if (product.variant_unit_scale) {
            return variant.unit_value / product.variant_unit_scale;
          } else {
            return variant.unit_value;
          }
        } else {
          return null;
        }
      };

      return BulkProducts;

    })());
  });

}).call(this);
