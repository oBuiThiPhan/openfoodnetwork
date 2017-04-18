(function() {
  angular.module("admin.indexUtils").factory("dataFetcher", function($http, $q, RequestMonitor) {
    return function(dataLocation) {
      var deferred;
      deferred = $q.defer();
      RequestMonitor.load($http.get(dataLocation).success(function(data) {
        return deferred.resolve(data);
      }).error(function() {
        return deferred.reject();
      }));
      return deferred.promise;
    };
  });

}).call(this);
