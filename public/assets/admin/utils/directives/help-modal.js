(function() {
  angular.module("admin.utils").directive('helpModal', function($compile, $templateCache, $window, DialogDefaults) {
    return {
      restrict: 'C',
      scope: {
        template: '@'
      },
      link: function(scope, element, attr) {
        var template;
        template = $compile($templateCache.get(scope.template))(scope);
        template.dialog(DialogDefaults);
        element.bind('click', function(e) {
          return template.dialog('open');
        });
        return scope.close = function() {
          template.dialog('close');
        };
      }
    };
  });

}).call(this);
