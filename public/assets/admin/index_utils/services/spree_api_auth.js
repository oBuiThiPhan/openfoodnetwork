(function() {
  angular.module("admin.indexUtils").factory("SpreeApiAuth", function($q, $http, SpreeApiKey) {
    var SpreeApiAuth;
    return new (SpreeApiAuth = (function() {
      function SpreeApiAuth() {}

      SpreeApiAuth.prototype.authorise = function() {
        var deferred;
        deferred = $q.defer();
        $http.get("/api/users/authorise_api?token=" + SpreeApiKey).success(function(response) {
          if ((response != null ? response.success : void 0) === "Use of API Authorised") {
            $http.defaults.headers.common["X-Spree-Token"] = SpreeApiKey;
            return deferred.resolve();
          }
        }).error(function(response) {
          var error;
          error = (response != null ? response.error : void 0) || "You are unauthorised to access this page.";
          return deferred.reject(error);
        });
        return deferred.promise;
      };

      return SpreeApiAuth;

    })());
  });

}).call(this);
