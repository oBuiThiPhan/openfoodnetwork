(function() {
  angular.module("admin.indexUtils").factory("switchClass", function($timeout) {
    return function(element, classToAdd, removeClasses, timeout) {
      var className, i, intRegex, len;
      if (element.timeout) {
        $timeout.cancel(element.timeout);
      }
      for (i = 0, len = removeClasses.length; i < len; i++) {
        className = removeClasses[i];
        element.removeClass(className);
      }
      element.addClass(classToAdd);
      intRegex = /^\d+$/;
      if (timeout && intRegex.test(timeout)) {
        return element.timeout = $timeout(function() {
          return element.removeClass(classToAdd);
        }, timeout, true);
      }
    };
  });

}).call(this);
