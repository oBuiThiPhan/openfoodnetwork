(function() {
  angular.module("admin.variantOverrides").factory("VariantOverrides", function(variantOverrides) {
    var VariantOverrides;
    return new (VariantOverrides = (function() {
      VariantOverrides.prototype.variantOverrides = {};

      function VariantOverrides() {
        var base, i, len, name, vo;
        for (i = 0, len = variantOverrides.length; i < len; i++) {
          vo = variantOverrides[i];
          (base = this.variantOverrides)[name = vo.hub_id] || (base[name] = {});
          this.variantOverrides[vo.hub_id][vo.variant_id] = vo;
        }
      }

      VariantOverrides.prototype.ensureDataFor = function(hubs, products) {
        var base, hub, hub_id, name, product, results, variant;
        results = [];
        for (hub_id in hubs) {
          hub = hubs[hub_id];
          (base = this.variantOverrides)[name = hub.id] || (base[name] = {});
          results.push((function() {
            var i, len, results1;
            results1 = [];
            for (i = 0, len = products.length; i < len; i++) {
              product = products[i];
              results1.push((function() {
                var j, len1, ref, results2;
                ref = product.variants;
                results2 = [];
                for (j = 0, len1 = ref.length; j < len1; j++) {
                  variant = ref[j];
                  if (!this.variantOverrides[hub.id][variant.id]) {
                    results2.push(this.inherit(hub.id, variant.id));
                  } else {
                    results2.push(void 0);
                  }
                }
                return results2;
              }).call(this));
            }
            return results1;
          }).call(this));
        }
        return results;
      };

      VariantOverrides.prototype.inherit = function(hub_id, variant_id) {
        var base;
        (base = this.variantOverrides[hub_id])[variant_id] || (base[variant_id] = {});
        return angular.extend(this.variantOverrides[hub_id][variant_id], this.newFor(hub_id, variant_id));
      };

      VariantOverrides.prototype.newFor = function(hub_id, variant_id) {
        return {
          hub_id: hub_id,
          variant_id: variant_id,
          sku: null,
          price: null,
          count_on_hand: null,
          on_demand: null,
          default_stock: null,
          resettable: false,
          tag_list: '',
          tags: []
        };
      };

      VariantOverrides.prototype.updateIds = function(updatedVos) {
        var i, len, results, vo;
        results = [];
        for (i = 0, len = updatedVos.length; i < len; i++) {
          vo = updatedVos[i];
          results.push(this.variantOverrides[vo.hub_id][vo.variant_id].id = vo.id);
        }
        return results;
      };

      VariantOverrides.prototype.updateData = function(updatedVos) {
        var i, len, results, vo;
        results = [];
        for (i = 0, len = updatedVos.length; i < len; i++) {
          vo = updatedVos[i];
          results.push(this.variantOverrides[vo.hub_id][vo.variant_id] = vo);
        }
        return results;
      };

      return VariantOverrides;

    })());
  });

}).call(this);
