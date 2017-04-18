(function() {
  angular.module("admin.utils").directive("tagsWithTranslation", function($timeout) {
    return {
      restrict: "E",
      templateUrl: "admin/tags_input.html",
      scope: {
        object: "=",
        tagsAttr: "@?",
        tagListAttr: "@?",
        findTags: "&",
        form: '=?',
        onTagAdded: "&",
        onTagRemoved: "&",
        max: "="
      },
      link: function(scope, element, attrs) {
        var compileTagList;
        if (!attrs.hasOwnProperty("findTags")) {
          scope.findTags = void 0;
        }
        scope.limitReached = false;
        compileTagList = function() {
          var tag;
          if (scope.max !== void 0) {
            scope.limitReached = scope.object[scope.tagsAttr].length >= scope.max;
          }
          return scope.object[scope.tagListAttr] = ((function() {
            var i, len, ref, results;
            ref = scope.object[scope.tagsAttr];
            results = [];
            for (i = 0, len = ref.length; i < len; i++) {
              tag = ref[i];
              results.push(tag.text);
            }
            return results;
          })()).join(",");
        };
        return $timeout(function() {
          var base, name;
          scope.tagsAttr || (scope.tagsAttr = "tags");
          scope.tagListAttr || (scope.tagListAttr = "tag_list");
          (base = scope.object)[name = scope.tagsAttr] || (base[name] = []);
          compileTagList();
          scope.tagAdded = function() {
            scope.onTagAdded();
            return compileTagList();
          };
          return scope.tagRemoved = function() {
            if (typeof scope.form !== 'undefined') {
              scope.form.$setDirty(true);
            }
            scope.onTagRemoved();
            return compileTagList();
          };
        });
      }
    };
  });

}).call(this);
