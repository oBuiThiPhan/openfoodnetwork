angular.module("admin.tagRules").directive 'newTagRuleDialog', ($compile, $templateCache, DialogDefaults) ->
  restrict: 'A'
  scope:
    tagGroup: '='
    addNewRuleTo: '='
  link: (scope, element, attr) ->
    # Compile modal template
    template = $compile($templateCache.get('admin/new_tag_rule_dialog.html'))(scope)

    scope.ruleTypes = [
      # { id: "DiscountOrder", name: 'Áp dụng giảm giá cho đơn đặt hàng' }
      { id: "FilterProducts", name: 'Hiển thị hoặc ẩn mặt hàng trên giao diện cửa hàng' }
      { id: "FilterShippingMethods", name: 'Hiển thị hoặc ẩn các phương thức vận chuyển khi thanh toán' }
      { id: "FilterPaymentMethods", name: 'Hiển thị hoặc ẩn các phương thức thanh toán khi thanh toán' }
      { id: "FilterOrderCycles", name: 'Hiển thị hoặc ẩn chu kỳ đặt hàng trên giao diện cửa hàng' }
    ]

    scope.ruleType = scope.ruleTypes[0].id

    # Set Dialog options
    template.dialog(DialogDefaults)

    # Link opening of dialog to click event on element
    element.bind 'click', (e) ->
      template.dialog('open')

    scope.addRule = (tagGroup, ruleType) ->
      scope.addNewRuleTo(tagGroup, ruleType)
      template.dialog('close')
      return
