(function() {
  angular.module("admin.indexUtils").directive("ofnSelect2", function($sanitize, $timeout, $filter) {
    return {
      require: 'ngModel',
      restrict: 'C',
      scope: {
        data: "=",
        minSearch: "@",
        text: "@",
        blank: "=?",
        filter: "=?",
        onSelecting: "=?",
        multiple: '@'
      },
      link: function(scope, element, attrs, ngModel) {
        var init;
        $timeout(function() {
          if (scope.text == null) {
            scope.text = 'name';
          }
          if (scope.multiple == null) {
            scope.multiple = false;
          }
          if (scope.filter == null) {
            scope.filter = function() {
              return true;
            };
          }
          if (scope.data.$promise) {
            return scope.data.$promise.then(function() {
              return init();
            });
          } else {
            return init();
          }
        });
        element.on("select2-opening", scope.onSelecting || angular.noop);
        attrs.$observe('disabled', function(value) {
          return element.select2('enable', !value);
        });
        ngModel.$formatters.push(function(value) {
          element.select2('val', value);
          return value;
        });
        ngModel.$parsers.push(function(value) {
          if (scope.multiple) {
            return value.split(",");
          }
          return value;
        });
        return init = function() {
          var i, item, len, ref;
          if ((scope.blank != null) && typeof scope.blank === "object") {
            scope.data.unshift(scope.blank);
          }
          ref = scope.data;
          for (i = 0, len = ref.length; i < len; i++) {
            item = ref[i];
            item.name = $sanitize(item.name);
          }
          return element.select2({
            multiple: scope.multiple,
            minimumResultsForSearch: scope.minSearch || 0,
            data: function() {
              var filtered;
              filtered = $filter('filter')(scope.data, scope.filter);
              return {
                results: filtered,
                text: scope.text
              };
            },
            formatSelection: function(item) {
              return item[scope.text];
            },
            formatResult: function(item) {
              return item[scope.text];
            }
          });
        };
      }
    };
  });

}).call(this);
