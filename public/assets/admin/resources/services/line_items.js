(function() {
  angular.module("admin.resources").factory('LineItems', function($q, LineItemResource) {
    var LineItems;
    return new (LineItems = (function() {
      function LineItems() {}

      LineItems.prototype.byID = {};

      LineItems.prototype.pristineByID = {};

      LineItems.prototype.index = function(params, callback) {
        if (params == null) {
          params = {};
        }
        if (callback == null) {
          callback = null;
        }
        return LineItemResource.index(params, (function(_this) {
          return function(data) {
            _this.load(data);
            return (callback || angular.noop)(data);
          };
        })(this));
      };

      LineItems.prototype.resetData = function() {
        this.byID = {};
        return this.pristineByID = {};
      };

      LineItems.prototype.load = function(lineItems) {
        var i, len, lineItem, results;
        this.resetData();
        results = [];
        for (i = 0, len = lineItems.length; i < len; i++) {
          lineItem = lineItems[i];
          this.byID[lineItem.id] = lineItem;
          results.push(this.pristineByID[lineItem.id] = angular.copy(lineItem));
        }
        return results;
      };

      LineItems.prototype.saveAll = function() {
        var id, lineItem, ref, results;
        ref = this.byID;
        results = [];
        for (id in ref) {
          lineItem = ref[id];
          lineItem.errors = {};
          if (!this.isSaved(lineItem)) {
            results.push(this.save(lineItem));
          } else {
            results.push(void 0);
          }
        }
        return results;
      };

      LineItems.prototype.save = function(lineItem) {
        var deferred;
        deferred = $q.defer();
        lineItem.errors = {};
        lineItem.$update({
          id: lineItem.id,
          orders: "orders",
          order_number: lineItem.order.number
        }).then((function(_this) {
          return function(data) {
            _this.pristineByID[lineItem.id] = angular.copy(lineItem);
            return deferred.resolve(data);
          };
        })(this))["catch"](function(response) {
          if (response.data.errors != null) {
            lineItem.errors = response.data.errors;
          }
          return deferred.reject(response);
        });
        return deferred.promise;
      };

      LineItems.prototype.allSaved = function() {
        var id, lineItem, ref;
        ref = this.byID;
        for (id in ref) {
          lineItem = ref[id];
          if (!this.isSaved(lineItem)) {
            return false;
          }
        }
        return true;
      };

      LineItems.prototype.isSaved = function(lineItem) {
        return this.diff(lineItem).length === 0;
      };

      LineItems.prototype.diff = function(lineItem) {
        var attr, changed, value;
        changed = [];
        for (attr in lineItem) {
          value = lineItem[attr];
          if (!angular.equals(value, this.pristineByID[lineItem.id][attr])) {
            if (attr === "price" || attr === "quantity" || attr === "final_weight_volume") {
              changed.push(attr);
            }
          }
        }
        return changed;
      };

      LineItems.prototype.resetAttribute = function(lineItem, attribute) {
        return lineItem[attribute] = this.pristineByID[lineItem.id][attribute];
      };

      LineItems.prototype["delete"] = function(lineItem, callback) {
        var deferred;
        if (callback == null) {
          callback = null;
        }
        deferred = $q.defer();
        lineItem.$delete({
          id: lineItem.id,
          orders: "orders",
          order_number: lineItem.order.number
        }).then((function(_this) {
          return function(data) {
            delete _this.byID[lineItem.id];
            delete _this.pristineByID[lineItem.id];
            (callback || angular.noop)(data);
            return deferred.resolve(data);
          };
        })(this))["catch"](function(response) {
          return deferred.reject(response);
        });
        return deferred.promise;
      };

      return LineItems;

    })());
  });

}).call(this);
