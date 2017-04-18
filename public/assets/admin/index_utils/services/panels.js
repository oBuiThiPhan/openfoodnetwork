(function() {
  angular.module("admin.indexUtils").factory('Panels', function() {
    var Panels;
    return new (Panels = (function() {
      function Panels() {}

      Panels.prototype.panels = [];

      Panels.prototype.register = function(ctrl, object, selected) {
        if (selected == null) {
          selected = null;
        }
        if ((ctrl != null) && (object != null)) {
          this.panels.push({
            ctrl: ctrl,
            object: object,
            selected: selected
          });
          if (selected != null) {
            return ctrl.select(selected);
          }
        }
      };

      Panels.prototype.toggle = function(object, name, state) {
        var panel;
        if (state == null) {
          state = null;
        }
        panel = this.findPanelByObject(object);
        if (panel.selected === name) {
          if (state !== "open") {
            return this.select(panel, null);
          }
        } else {
          if (state !== "closed") {
            return this.select(panel, name);
          }
        }
      };

      Panels.prototype.select = function(panel, name) {
        panel.selected = name;
        return panel.ctrl.select(name);
      };

      Panels.prototype.findPanelByObject = function(object) {
        var panel;
        return ((function() {
          var i, len, ref, results;
          ref = this.panels;
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            panel = ref[i];
            if (panel.object === object) {
              results.push(panel);
            }
          }
          return results;
        }).call(this))[0];
      };

      return Panels;

    })());
  });

}).call(this);
