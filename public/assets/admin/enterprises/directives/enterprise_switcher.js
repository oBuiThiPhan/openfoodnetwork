(function() {
  angular.module('admin.enterprises').directive('enterpriseSwitcher', function(NavigationCheck) {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function(scope, element, attr, ngModel) {
        var initial;
        initial = element[0].getAttribute('data-initial');
        return element.on('change', function() {
          if (!NavigationCheck.confirmLeave()) {
            ngModel.$setViewValue(initial);
            ngModel.$render();
            element.select2('val', initial);
            return;
          }
          NavigationCheck.clear();
          return window.location = element[0].querySelector('option[selected]').getAttribute('data-url');
        });
      }
    };
  });

}).call(this);
