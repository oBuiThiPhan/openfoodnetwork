(function() {
  angular.module("admin.utils").directive("ofnSortable", function($timeout, $parse) {
    return {
      restrict: "E",
      scope: {
        items: '@',
        position: '@',
        afterSort: '&',
        handle: "@",
        axis: "@"
      },
      link: function(scope, element, attrs) {
        return $timeout(function() {
          var getScopePos, setScopePos;
          scope.axis || (scope.axis = "y");
          scope.handle || (scope.handle = ".handle");
          getScopePos = $parse(scope.position);
          setScopePos = getScopePos.assign;
          return element.sortable({
            handle: scope.handle,
            helper: 'clone',
            axis: scope.axis,
            items: scope.items,
            appendTo: element,
            update: function(event, ui) {
              return scope.$apply(function() {
                var i, j, len, len1, newPos, offset, oldPos, pos, ref, ref1, sibScope, sortableSiblings, ss;
                sortableSiblings = (function() {
                  var i, len, ref, results;
                  ref = ui.item.siblings(scope.items);
                  results = [];
                  for (i = 0, len = ref.length; i < len; i++) {
                    ss = ref[i];
                    results.push($(ss));
                  }
                  return results;
                })();
                offset = Math.min(ui.item.index(), sortableSiblings[0].index());
                newPos = ui.item.index() - offset + 1;
                oldPos = getScopePos(ui.item.scope());
                if (newPos < oldPos) {
                  ref = sortableSiblings.map(function(ss) {
                    return ss.scope();
                  });
                  for (i = 0, len = ref.length; i < len; i++) {
                    sibScope = ref[i];
                    pos = getScopePos(sibScope);
                    if (pos >= newPos && pos < oldPos) {
                      setScopePos(sibScope, pos + 1);
                    }
                  }
                } else if (newPos > oldPos) {
                  ref1 = sortableSiblings.map(function(ss) {
                    return ss.scope();
                  });
                  for (j = 0, len1 = ref1.length; j < len1; j++) {
                    sibScope = ref1[j];
                    pos = getScopePos(sibScope);
                    if (pos > oldPos && pos <= newPos) {
                      setScopePos(sibScope, pos - 1);
                    }
                  }
                }
                setScopePos(ui.item.scope(), newPos);
                return scope.afterSort();
              });
            }
          });
        });
      }
    };
  });

}).call(this);
