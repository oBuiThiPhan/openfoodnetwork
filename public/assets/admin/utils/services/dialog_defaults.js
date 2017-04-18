(function() {
  angular.module("admin.utils").factory("DialogDefaults", function($window) {
    return {
      show: {
        effect: "fade",
        duration: 400
      },
      hide: {
        effect: "fade",
        duration: 300
      },
      autoOpen: false,
      resizable: false,
      width: $window.innerWidth * 0.4,
      modal: true,
      open: function(event, ui) {
        return $('.ui-widget-overlay').bind('click', function() {
          return $(this).siblings('.ui-dialog').find('.ui-dialog-content').dialog('close');
        });
      }
    };
  });

}).call(this);
