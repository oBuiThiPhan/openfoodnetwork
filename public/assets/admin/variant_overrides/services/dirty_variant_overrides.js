(function() {
  var indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  angular.module("admin.variantOverrides").factory("DirtyVariantOverrides", function($http, VariantOverrides) {
    var DirtyVariantOverrides;
    return new (DirtyVariantOverrides = (function() {
      function DirtyVariantOverrides() {}

      DirtyVariantOverrides.prototype.dirtyVariantOverrides = {};

      DirtyVariantOverrides.prototype.add = function(hub_id, variant_id, vo_id) {
        var base, base1;
        (base = this.dirtyVariantOverrides)[hub_id] || (base[hub_id] = {});
        return (base1 = this.dirtyVariantOverrides[hub_id])[variant_id] || (base1[variant_id] = {
          id: vo_id,
          variant_id: variant_id,
          hub_id: hub_id
        });
      };

      DirtyVariantOverrides.prototype.set = function(hub_id, variant_id, vo_id, attr, value) {
        if (indexOf.call(this.requiredAttrs(), attr) >= 0) {
          this.add(hub_id, variant_id, vo_id);
          return this.dirtyVariantOverrides[hub_id][variant_id][attr] = value;
        }
      };

      DirtyVariantOverrides.prototype.inherit = function(hub_id, variant_id, vo_id) {
        var attr, blankVo, value;
        this.add(hub_id, variant_id, vo_id);
        blankVo = angular.copy(VariantOverrides.inherit(hub_id, variant_id));
        for (attr in blankVo) {
          value = blankVo[attr];
          if (indexOf.call(this.requiredAttrs(), attr) < 0) {
            delete blankVo[attr];
          }
        }
        return this.dirtyVariantOverrides[hub_id][variant_id] = blankVo;
      };

      DirtyVariantOverrides.prototype.count = function() {
        var count, hub_id, ref, vos;
        count = 0;
        ref = this.dirtyVariantOverrides;
        for (hub_id in ref) {
          vos = ref[hub_id];
          count += Object.keys(vos).length;
        }
        return count;
      };

      DirtyVariantOverrides.prototype.clear = function() {
        return this.dirtyVariantOverrides = {};
      };

      DirtyVariantOverrides.prototype.all = function() {
        var all_vos, hub_id, ref, variant_id, vo, vos;
        all_vos = [];
        ref = this.dirtyVariantOverrides;
        for (hub_id in ref) {
          vos = ref[hub_id];
          for (variant_id in vos) {
            vo = vos[variant_id];
            all_vos.push(vo);
          }
        }
        return all_vos;
      };

      DirtyVariantOverrides.prototype.save = function() {
        return $http({
          method: "POST",
          url: "/admin/variant_overrides/bulk_update",
          data: {
            variant_overrides: this.all()
          }
        });
      };

      DirtyVariantOverrides.prototype.requiredAttrs = function() {
        return ['id', 'hub_id', 'variant_id', 'sku', 'price', 'count_on_hand', 'on_demand', 'default_stock', 'resettable', 'tag_list'];
      };

      return DirtyVariantOverrides;

    })());
  });

}).call(this);
