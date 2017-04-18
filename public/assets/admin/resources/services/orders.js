(function() {
  angular.module("admin.resources").factory('Orders', function($q, OrderResource) {
    var Orders;
    return new (Orders = (function() {
      function Orders() {}

      Orders.prototype.byID = {};

      Orders.prototype.pristineByID = {};

      Orders.prototype.index = function(params, callback) {
        if (params == null) {
          params = {};
        }
        if (callback == null) {
          callback = null;
        }
        return OrderResource.index(params, (function(_this) {
          return function(data) {
            _this.load(data);
            return (callback || angular.noop)(data);
          };
        })(this));
      };

      Orders.prototype.load = function(orders) {
        var i, len, order, results;
        results = [];
        for (i = 0, len = orders.length; i < len; i++) {
          order = orders[i];
          this.byID[order.id] = order;
          results.push(this.pristineByID[order.id] = angular.copy(order));
        }
        return results;
      };

      Orders.prototype.save = function(order) {
        var deferred;
        deferred = $q.defer();
        order.$update({
          id: order.number
        }).then((function(_this) {
          return function(data) {
            _this.pristineByID[order.id] = angular.copy(order);
            return deferred.resolve(data);
          };
        })(this))["catch"](function(response) {
          return deferred.reject(response);
        });
        return deferred.promise;
      };

      Orders.prototype.saved = function(order) {
        return this.diff(order).length === 0;
      };

      Orders.prototype.diff = function(order) {
        var attr, changed, value;
        changed = [];
        for (attr in order) {
          value = order[attr];
          if (!angular.equals(value, this.pristineByID[order.id][attr])) {
            if (attr !== "$$hashKey") {
              changed.push(attr);
            }
          }
        }
        return changed;
      };

      Orders.prototype.resetAttribute = function(order, attribute) {
        return order[attribute] = this.pristineByID[order.id][attribute];
      };

      return Orders;

    })());
  });

}).call(this);
