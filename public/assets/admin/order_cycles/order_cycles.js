(function() {
  angular.module('admin.orderCycles', ['admin.utils', 'admin.indexUtils', 'ngTagsInput']).config(function($httpProvider) {
    return $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');
  }).directive('datetimepicker', function($parse) {
    return function(scope, element, attrs) {
      return $(element).datetimepicker({
        dateFormat: 'yy-mm-dd',
        timeFormat: 'HH:mm:ss',
        showOn: "button",
        buttonImage: "/assets/datepicker/cal.gif",
        buttonImageOnly: true,
        stepMinute: 15,
        onSelect: function(dateText, inst) {
          return scope.$apply(function() {
            var parsed;
            parsed = $parse(attrs.datetimepicker);
            return parsed.assign(scope, dateText);
          });
        }
      });
    };
  }).directive('ofnOnChange', function() {
    return function(scope, element, attrs) {
      return element.bind('change', function() {
        return scope.$apply(attrs.ofnOnChange);
      });
    };
  }).directive('ofnSyncDistributions', function() {
    return function(scope, element, attrs) {
      return element.bind('change', function() {
        if (!$(this).is(':checked')) {
          return scope.$apply(function() {
            return scope.removeDistributionOfVariant(attrs.ofnSyncDistributions);
          });
        }
      });
    };
  });

}).call(this);
