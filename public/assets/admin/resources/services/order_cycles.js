(function() {
  angular.module("admin.resources").factory('OrderCycles', function($q, $injector, OrderCycleResource) {
    var OrderCycles;
    return new (OrderCycles = (function() {
      OrderCycles.prototype.all = [];

      OrderCycles.prototype.byID = {};

      OrderCycles.prototype.pristineByID = {};

      function OrderCycles() {
        if ($injector.has('orderCycles')) {
          this.load($injector.get('orderCycles'));
        }
      }

      OrderCycles.prototype.index = function(params, callback) {
        if (params == null) {
          params = {};
        }
        if (callback == null) {
          callback = null;
        }
        return OrderCycleResource.index(params, (function(_this) {
          return function(data) {
            _this.load(data);
            (callback || angular.noop)(data);
            return data;
          };
        })(this));
      };

      OrderCycles.prototype.load = function(orderCycles) {
        var i, len, orderCycle, results;
        results = [];
        for (i = 0, len = orderCycles.length; i < len; i++) {
          orderCycle = orderCycles[i];
          this.all.push(orderCycle);
          this.byID[orderCycle.id] = orderCycle;
          results.push(this.pristineByID[orderCycle.id] = angular.copy(orderCycle));
        }
        return results;
      };

      OrderCycles.prototype.save = function(order_cycle) {
        var deferred;
        deferred = $q.defer();
        order_cycle.$update({
          id: order_cycle.id
        }).then((function(_this) {
          return function(data) {
            _this.pristineByID[order_cycle.id] = angular.copy(order_cycle);
            return deferred.resolve(data);
          };
        })(this))["catch"](function(response) {
          return deferred.reject(response);
        });
        return deferred.promise;
      };

      OrderCycles.prototype.saved = function(order_cycle) {
        return this.diff(order_cycle).length === 0;
      };

      OrderCycles.prototype.diff = function(order_cycle) {
        var attr, changed, value;
        changed = [];
        for (attr in order_cycle) {
          value = order_cycle[attr];
          if (!angular.equals(value, this.pristineByID[order_cycle.id][attr])) {
            if (attr !== "$$hashKey") {
              changed.push(attr);
            }
          }
        }
        return changed;
      };

      OrderCycles.prototype.resetAttribute = function(order_cycle, attribute) {
        return order_cycle[attribute] = this.pristineByID[order_cycle.id][attribute];
      };

      return OrderCycles;

    })());
  });

}).call(this);
