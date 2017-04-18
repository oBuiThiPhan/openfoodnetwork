(function() {
  angular.module("admin.utils").directive("ofnWithTip", function($sanitize) {
    return {
      link: function(scope, element, attrs) {
        element.attr('data-powertip', $sanitize(attrs.ofnWithTip));
        return element.powerTip({
          smartPlacement: true,
          fadeInTime: 50,
          fadeOutTime: 50,
          intentPollInterval: 300
        });
      }
    };
  });

}).call(this);
