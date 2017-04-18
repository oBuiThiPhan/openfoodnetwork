(function() {
  angular.module("ofn.admin").factory("ofnConfirmHandler", function(pendingChanges, $compile, $q) {
    return function(scope, callback) {
      var dialogDiv, template;
      template = "<div id='dialog-div' style='padding: 10px'><h6>Unsaved changes currently exist, save now or ignore?</h6></div>";
      dialogDiv = $compile(template)(scope);
      return function() {
        if (pendingChanges.changeCount(pendingChanges.pendingChanges) > 0) {
          dialogDiv.dialog({
            dialogClass: "no-close",
            resizable: false,
            height: 140,
            modal: true,
            buttons: {
              "SAVE": function() {
                dialogDiv = $(this);
                return $q.all(pendingChanges.submitAll()).then(function() {
                  callback();
                  return dialogDiv.dialog("close");
                });
              },
              "IGNORE": function() {
                callback();
                $(this).dialog("close");
                return scope.$apply();
              }
            }
          });
          return dialogDiv.dialog("open");
        } else {
          return callback();
        }
      };
    };
  });

}).call(this);
