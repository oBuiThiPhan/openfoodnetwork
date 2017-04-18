(function() {
  angular.module("admin.enterpriseFees").directive('ngBindHtmlUnsafeCompiled', function($compile) {
    return function(scope, element, attrs) {
      scope.$watch(attrs.ngBindHtmlUnsafeCompiled, function(value) {
        element.html($compile(value)(scope));
      });
    };
  });

}).call(this);
