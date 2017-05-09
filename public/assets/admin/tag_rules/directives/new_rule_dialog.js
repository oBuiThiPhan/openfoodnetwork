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
            name: 'Hiển thị hoặc ẩn mặt hàng trên giao diện cửa hàng'
          }, {
            id: "FilterShippingMethods",
            name: 'Hiển thị hoặc ẩn các phương thức vận chuyển khi thanh toán'
          }, {
            id: "FilterPaymentMethods",
            name: 'Hiển thị hoặc ẩn các phương thức thanh toán khi thanh toán'
          }, {
            id: "FilterOrderCycles",
            name: 'Hiển thị hoặc ẩn chu kỳ đặt hàng trên giao diện cửa hàng'
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
