(function() {
  angular.module('admin.orderCycles').factory('EnterpriseFee', function($resource) {
    var EnterpriseFee;
    EnterpriseFee = $resource('/admin/enterprise_fees/for_order_cycle/:enterprise_fee_id.json', {}, {
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
      EnterpriseFee: EnterpriseFee,
      enterprise_fees: {},
      loaded: false,
      index: function(params) {
        if (params == null) {
          params = {};
        }
        return EnterpriseFee.index(params, (function(_this) {
          return function(data) {
            _this.enterprise_fees = data;
            return _this.loaded = true;
          };
        })(this));
      },
      forEnterprise: function(enterprise_id) {
        var enterprise_fee, i, len, ref, results;
        ref = this.enterprise_fees;
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          enterprise_fee = ref[i];
          if (enterprise_fee.enterprise_id === enterprise_id) {
            results.push(enterprise_fee);
          }
        }
        return results;
      }
    };
  });

}).call(this);
