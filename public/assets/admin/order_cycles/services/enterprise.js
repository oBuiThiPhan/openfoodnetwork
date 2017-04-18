(function() {
  angular.module('admin.orderCycles').factory('Enterprise', function($resource) {
    var Enterprise;
    Enterprise = $resource('/admin/enterprises/for_order_cycle/:enterprise_id.json', {}, {
      'index': {
        method: 'GET',
        isArray: true,
        params: {
          order_cycle_id: '@order_cycle_id',
          coordinator_id: '@coordinator_id'
        }
      }
    });
    return {
      Enterprise: Enterprise,
      enterprises: {},
      producer_enterprises: [],
      hub_enterprises: [],
      supplied_products: [],
      loaded: false,
      index: function(params, callback) {
        if (params == null) {
          params = {};
        }
        if (callback == null) {
          callback = null;
        }
        Enterprise.index(params, (function(_this) {
          return function(data) {
            var enterprise, i, j, len, len1, product, ref;
            for (i = 0, len = data.length; i < len; i++) {
              enterprise = data[i];
              _this.enterprises[enterprise.id] = enterprise;
              if (enterprise.is_primary_producer) {
                _this.producer_enterprises.push(enterprise);
              }
              if (enterprise.sells === 'any') {
                _this.hub_enterprises.push(enterprise);
              }
              ref = enterprise.supplied_products;
              for (j = 0, len1 = ref.length; j < len1; j++) {
                product = ref[j];
                _this.supplied_products.push(product);
              }
            }
            _this.loaded = true;
            return (callback || angular.noop)(_this.enterprises);
          };
        })(this));
        return this.enterprises;
      },
      suppliedVariants: function(enterprise_id) {
        var product, ref, vs;
        vs = (function() {
          var i, len, ref, results;
          ref = this.enterprises[enterprise_id].supplied_products;
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            product = ref[i];
            results.push(this.variantsOf(product));
          }
          return results;
        }).call(this);
        return (ref = []).concat.apply(ref, vs);
      },
      variantsOf: function(product) {
        var i, len, ref, results, variant;
        if (product.variants.length > 0) {
          ref = product.variants;
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            variant = ref[i];
            results.push(variant.id);
          }
          return results;
        } else {
          return [product.master_id];
        }
      },
      totalVariants: function(enterprise) {
        var counts, numVariants, product;
        numVariants = 0;
        if (enterprise) {
          counts = (function() {
            var i, len, ref, results;
            ref = enterprise.supplied_products;
            results = [];
            for (i = 0, len = ref.length; i < len; i++) {
              product = ref[i];
              results.push(numVariants += product.variants.length === 0 ? 1 : product.variants.length);
            }
            return results;
          })();
        }
        return numVariants;
      }
    };
  });

}).call(this);
