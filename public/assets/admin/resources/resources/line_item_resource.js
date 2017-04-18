(function() {
  angular.module("admin.resources").factory('LineItemResource', function($resource) {
    return $resource('/admin/:orders/:order_number/line_items/:id.json', {}, {
      'index': {
        method: 'GET',
        isArray: true
      },
      'update': {
        method: 'PUT',
        transformRequest: (function(_this) {
          return function(data, headersGetter) {
            var attr, i, len, line_item, ref;
            line_item = {};
            ref = ["price", "quantity", "final_weight_volume"];
            for (i = 0, len = ref.length; i < len; i++) {
              attr = ref[i];
              line_item[attr] = data[attr];
            }
            return angular.toJson({
              line_item: line_item
            });
          };
        })(this)
      }
    });
  });

}).call(this);
