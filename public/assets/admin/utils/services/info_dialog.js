(function() {
  angular.module("admin.customers").factory('InfoDialog', function($rootScope, $compile, $injector, $templateCache, DialogDefaults) {
    var InfoDialog;
    return new (InfoDialog = (function() {
      function InfoDialog() {}

      InfoDialog.prototype.open = function(type, message) {
        var scope, template;
        scope = $rootScope.$new();
        scope.message = message;
        scope.dialog_class = type;
        template = $compile($templateCache.get('admin/info_dialog.html'))(scope);
        template.dialog(DialogDefaults);
        template.dialog('open');
        return scope.close = function() {
          template.dialog('close');
          return null;
        };
      };

      return InfoDialog;

    })());
  });

}).call(this);
