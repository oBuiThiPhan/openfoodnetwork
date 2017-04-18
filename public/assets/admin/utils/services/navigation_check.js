(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  angular.module("admin.utils").factory("NavigationCheck", function($window, $rootScope) {
    var NavigationCheck;
    return new (NavigationCheck = (function() {
      var callbacks;

      callbacks = [];

      function NavigationCheck() {
        this.clear = bind(this.clear, this);
        this.register = bind(this.register, this);
        this.confirmLeave = bind(this.confirmLeave, this);
        this.locationChangeStartHandler = bind(this.locationChangeStartHandler, this);
        this.onBeforeUnloadHandler = bind(this.onBeforeUnloadHandler, this);
        if ($window.addEventListener) {
          $window.addEventListener("beforeunload", this.onBeforeUnloadHandler);
        } else {
          $window.onbeforeunload = this.onBeforeUnloadHandler;
        }
        $rootScope.$on("$locationChangeStart", this.locationChangeStartHandler);
      }

      NavigationCheck.prototype.onBeforeUnloadHandler = function($event) {
        var message;
        message = this.getMessage();
        if (message) {
          ($event || $window.event).returnValue = message;
          return message;
        }
      };

      NavigationCheck.prototype.locationChangeStartHandler = function($event) {
        if (!this.confirmLeave()) {
          if ($event.stopPropagation) {
            $event.stopPropagation();
          }
          if ($event.preventDefault) {
            $event.preventDefault();
          }
          $event.cancelBubble = true;
          return $event.returnValue = false;
        }
      };

      NavigationCheck.prototype.confirmLeave = function() {
        var message;
        message = this.getMessage();
        return !message || $window.confirm(message);
      };

      NavigationCheck.prototype.getMessage = function() {
        var callback, i, len, message, ref;
        message = null;
        for (i = 0, len = callbacks.length; i < len; i++) {
          callback = callbacks[i];
          message = (ref = callback()) != null ? ref : message;
        }
        return message;
      };

      NavigationCheck.prototype.register = function(callback) {
        return callbacks.push(callback);
      };

      NavigationCheck.prototype.clear = function() {
        if ($window.addEventListener) {
          $window.removeEventListener("beforeunload", this.onBeforeUnloadHandler);
        } else {
          $window.onbeforeunload = null;
        }
        return $rootScope.$on("$locationChangeStart", null);
      };

      return NavigationCheck;

    })());
  });

}).call(this);
