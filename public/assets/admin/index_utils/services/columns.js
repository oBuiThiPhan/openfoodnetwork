(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  angular.module("admin.indexUtils").factory('Columns', function($rootScope, $http, $injector) {
    var Columns;
    return new (Columns = (function() {
      Columns.prototype.savedColumns = {};

      Columns.prototype.columns = {};

      Columns.prototype.visibleCount = 0;

      function Columns() {
        this.savePreferences = bind(this.savePreferences, this);
        this.preferencesSaved = bind(this.preferencesSaved, this);
        this.calculateVisibleCount = bind(this.calculateVisibleCount, this);
        this.toggleColumn = bind(this.toggleColumn, this);
        var column, i, len, ref;
        this.columns = {};
        ref = this.injectColumns();
        for (i = 0, len = ref.length; i < len; i++) {
          column = ref[i];
          this.columns[column.column_name] = column;
          this.savedColumns[column.column_name] = angular.copy(column);
        }
        this.calculateVisibleCount();
      }

      Columns.prototype.injectColumns = function() {
        if ($injector.has('columns')) {
          return $injector.get('columns');
        } else {
          return [];
        }
      };

      Columns.prototype.toggleColumn = function(column) {
        column.visible = !column.visible;
        return this.calculateVisibleCount();
      };

      Columns.prototype.calculateVisibleCount = function() {
        var column, name;
        this.visibleCount = ((function() {
          var ref, results;
          ref = this.columns;
          results = [];
          for (name in ref) {
            column = ref[name];
            if (column.visible) {
              results.push(column);
            }
          }
          return results;
        }).call(this)).length;
        return $rootScope.$broadcast("columnCount:changed", this.visibleCount);
      };

      Columns.prototype.preferencesSaved = function() {
        return angular.equals(this.columns, this.savedColumns);
      };

      Columns.prototype.savePreferences = function(action_name) {
        var column_name, preference;
        return $http({
          method: "PUT",
          url: "/admin/column_preferences/bulk_update",
          data: {
            action_name: action_name,
            column_preferences: (function() {
              var ref, results;
              ref = this.columns;
              results = [];
              for (column_name in ref) {
                preference = ref[column_name];
                results.push(preference);
              }
              return results;
            }).call(this)
          }
        }).success((function(_this) {
          return function(data) {
            var column, i, len, results;
            results = [];
            for (i = 0, len = data.length; i < len; i++) {
              column = data[i];
              angular.extend(_this.columns[column.column_name], column);
              results.push(angular.extend(_this.savedColumns[column.column_name], column));
            }
            return results;
          };
        })(this));
      };

      return Columns;

    })());
  });

}).call(this);
