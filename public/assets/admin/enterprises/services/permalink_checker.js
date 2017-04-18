(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  angular.module("admin.enterprises").factory('PermalinkChecker', function($q, $http) {
    var PermalinkChecker;
    return new (PermalinkChecker = (function() {
      function PermalinkChecker() {
        this.check = bind(this.check, this);
      }

      PermalinkChecker.prototype.deferredRequest = null;

      PermalinkChecker.prototype.deferredAbort = null;

      PermalinkChecker.prototype.MAX_PERMALINK_LENGTH = 255;

      PermalinkChecker.prototype.check = function(permalink) {
        var deferredAbort, deferredRequest, request;
        if (this.deferredRequest && this.deferredRequest.promise) {
          this.abort(this.deferredAbort);
        }
        this.deferredRequest = deferredRequest = $q.defer();
        this.deferredAbort = deferredAbort = $q.defer();
        request = $http({
          method: "GET",
          url: "/enterprises/check_permalink?permalink=" + permalink,
          headers: {
            Accept: 'application/javascript'
          },
          timeout: deferredAbort.promise
        }).success((function(_this) {
          return function(data) {
            if (data.length > _this.MAX_PERMALINK_LENGTH || !data.match(/^[\w-]+$/)) {
              return deferredRequest.resolve({
                permalink: permalink,
                available: "Error"
              });
            } else {
              return deferredRequest.resolve({
                permalink: data,
                available: "Available"
              });
            }
          };
        })(this)).error((function(_this) {
          return function(data, status) {
            if (status === 409) {
              return deferredRequest.resolve({
                permalink: data,
                available: "Unavailable"
              });
            } else {
              return deferredRequest.reject();
            }
          };
        })(this));
        deferredRequest.promise["finally"](function() {
          return request = deferredRequest.promise = null;
        });
        return deferredRequest.promise;
      };

      PermalinkChecker.prototype.abort = function(deferredAbort) {
        return deferredAbort.resolve();
      };

      return PermalinkChecker;

    })());
  });

}).call(this);
