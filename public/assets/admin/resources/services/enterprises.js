(function() {
  var indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  angular.module("admin.resources").factory('Enterprises', function($q, EnterpriseResource) {
    var Enterprises;
    return new (Enterprises = (function() {
      function Enterprises() {}

      Enterprises.prototype.byID = {};

      Enterprises.prototype.pristineByID = {};

      Enterprises.prototype.index = function(params, callback) {
        if (params == null) {
          params = {};
        }
        if (callback == null) {
          callback = null;
        }
        return EnterpriseResource.index(params, (function(_this) {
          return function(data) {
            _this.load(data);
            (callback || angular.noop)(data);
            return data;
          };
        })(this));
      };

      Enterprises.prototype.load = function(enterprises) {
        var enterprise, i, len, results;
        results = [];
        for (i = 0, len = enterprises.length; i < len; i++) {
          enterprise = enterprises[i];
          this.byID[enterprise.id] = enterprise;
          results.push(this.pristineByID[enterprise.id] = angular.copy(enterprise));
        }
        return results;
      };

      Enterprises.prototype.save = function(enterprise) {
        var deferred;
        deferred = $q.defer();
        enterprise.$update({
          id: enterprise.permalink
        }).then((function(_this) {
          return function(data) {
            _this.pristineByID[enterprise.id] = angular.copy(enterprise);
            return deferred.resolve(data);
          };
        })(this))["catch"](function(response) {
          return deferred.reject(response);
        });
        return deferred.promise;
      };

      Enterprises.prototype.saved = function(enterprise) {
        return this.diff(enterprise).length === 0;
      };

      Enterprises.prototype.diff = function(enterprise) {
        var attr, changed, value;
        changed = [];
        for (attr in enterprise) {
          value = enterprise[attr];
          if (!angular.equals(value, this.pristineByID[enterprise.id][attr])) {
            if (indexOf.call(this.ignoredAttrs(), attr) < 0) {
              changed.push(attr);
            }
          }
        }
        return changed;
      };

      Enterprises.prototype.ignoredAttrs = function() {
        return ["$$hashKey", "producer", "package", "producerError", "packageError", "status"];
      };

      Enterprises.prototype.resetAttribute = function(enterprise, attribute) {
        return enterprise[attribute] = this.pristineByID[enterprise.id][attribute];
      };

      return Enterprises;

    })());
  });

}).call(this);
