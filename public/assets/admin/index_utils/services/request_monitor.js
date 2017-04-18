(function() {
  angular.module("admin.indexUtils").factory('RequestMonitor', function($q) {
    var RequestMonitor;
    return new (RequestMonitor = (function() {
      function RequestMonitor() {}

      RequestMonitor.prototype.loadQueue = $q.when([]);

      RequestMonitor.prototype.loadId = 0;

      RequestMonitor.prototype.loading = false;

      RequestMonitor.prototype.load = function(promise) {
        var loadId;
        loadId = (this.loadId += 1);
        this.loading = true;
        return this.loadQueue = $q.all([this.loadQueue, promise]).then((function(_this) {
          return function() {
            if (_this.loadId === loadId) {
              return _this.loading = false;
            }
          };
        })(this));
      };

      return RequestMonitor;

    })());
  });

}).call(this);
