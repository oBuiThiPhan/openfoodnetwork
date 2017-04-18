(function() {
  angular.module("admin.tagRules").directive('newTagRuleDialog', function($compile, $templateCache, DialogDefaults) {
    return {
      restrict: 'A',
      scope: {
        tagGroup: '=',
        addNewRuleTo: '='
      },
      link: function(scope, element, attr) {
        var template;
        template = $compile($templateCache.get('admin/new_tag_rule_dialog.html'))(scope);
        scope.ruleTypes = [
          {
            id: "FilterProducts",
            name: 'Show or Hide variants in my shopfront'
          }, {
            id: "FilterShippingMethods",
            name: 'Show or Hide shipping methods at checkout'
          }, {
            id: "FilterPaymentMethods",
            name: 'Show or Hide payment methods at checkout'
          }, {
            id: "FilterOrderCycles",
            name: 'Show or Hide order cycles in my shopfront'
          }
        ];
        scope.ruleType = scope.ruleTypes[0].id;
        template.dialog(DialogDefaults);
        element.bind('click', function(e) {
          return template.dialog('open');
        });
        return scope.addRule = function(tagGroup, ruleType) {
          scope.addNewRuleTo(tagGroup, ruleType);
          template.dialog('close');
        };
      }
    };
  });

}).call(this);
