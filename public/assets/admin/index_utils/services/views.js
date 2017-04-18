(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  angular.module("admin.indexUtils").factory('Views', function($rootScope) {
    var Views;
    return new (Views = (function() {
      function Views() {
        this.selectView = bind(this.selectView, this);
        this.setViews = bind(this.setViews, this);
      }

      Views.prototype.views = {};

      Views.prototype.currentView = null;

      Views.prototype.setViews = function(views) {
        var key, view;
        this.views = {};
        for (key in views) {
          view = views[key];
          this.views[key] = view;
          if (view.visible) {
            this.selectView(key);
          }
        }
        return this.views;
      };

      Views.prototype.selectView = function(selectedKey) {
        var key, ref, results, view;
        this.currentView = this.views[selectedKey];
        ref = this.views;
        results = [];
        for (key in ref) {
          view = ref[key];
          results.push(view.visible = key === selectedKey);
        }
        return results;
      };

      return Views;

    })());
  });

}).call(this);
