(function() {
  angular.module("admin.enterpriseFees").directive('spreeEnsureCalculatorPreferencesMatchType', function() {
    return function(scope, element, attrs) {
      var orig_calculator_type;
      orig_calculator_type = scope.enterprise_fee.calculator_type;
      scope.$watch("enterprise_fee.calculator_type", function(value) {
        var settings;
        settings = element.parent().parent().find('div.calculator-settings');
        if (value === orig_calculator_type) {
          settings.show();
          settings.find('input').prop('disabled', false);
        } else {
          settings.hide();
          settings.find('input').prop('disabled', true);
        }
      });
    };
  });

}).call(this);
