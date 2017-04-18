(function() {
  angular.module("admin.indexUtils").directive("ofnSelect", function() {
    return {
      restrict: 'E',
      scope: {
        data: "="
      },
      replace: true,
      template: function(element, attrs) {
        var blank, textAttr, valueAttr;
        valueAttr = attrs.valueAttr || 'id';
        textAttr = attrs.textAttr || 'name';
        blank = attrs.includeBlank != null ? "<option value=''>" + attrs.includeBlank + "</option>" : "";
        return "<select ng-options='e." + valueAttr + " as e." + textAttr + " for e in data'>" + blank + "</select>";
      }
    };
  });

}).call(this);
