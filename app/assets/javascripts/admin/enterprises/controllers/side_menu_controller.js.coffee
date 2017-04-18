angular.module("admin.enterprises")
  .controller "sideMenuCtrl", ($scope, $parse, enterprise, SideMenu, enterprisePermissions) ->
    $scope.Enterprise = enterprise
    $scope.menu = SideMenu
    $scope.select = SideMenu.select

    $scope.menu.setItems [
      { name: 'primary_details', label: 'Chi tiết chính', icon_class: "icon-home" }
      { name: 'address', label: 'Địa chỉ', icon_class: "icon-map-marker" }
      { name: 'contact', label: 'Liên hệ', icon_class: "icon-phone" }
      { name: 'social', label: 'Xã hội', icon_class: "icon-twitter" }
      { name: 'about', label: 'Giới thiệu', icon_class: "icon-pencil" }
      { name: 'images', label: 'Hình ảnh', icon_class: "icon-picture" }
      { name: 'shipping_methods', label: 'Hình thức vận chuyển', icon_class: "icon-truck", show: "showShippingMethods()" }
      { name: 'payment_methods', label: 'Phương thức thanh toán', icon_class: "icon-money", show: "showPaymentMethods()" }
      { name: 'enterprise_fees', label: 'Phí doanh nghiệp', icon_class: "icon-tasks", show: "showEnterpriseFees()" }
      { name: 'inventory_settings', label: 'Kho', icon_class: "icon-list-ol", show: "enterpriseIsShop()" }
      { name: 'tag_rules', label: 'Quy tắc thẻ', icon_class: "icon-random", show: "enterpriseIsShop()" }
      { name: 'shop_preferences', label: 'Thông tin cửa hàng', icon_class: "icon-shopping-cart", show: "enterpriseIsShop()" }
      { name: 'users', label: 'Người dùng', icon_class: "icon-user" }
    ]

    $scope.select(0)

    $scope.showItem = (item) ->
      if item.show?
        $parse(item.show)($scope)
      else
        true

    $scope.showProperties = ->
      !!$scope.Enterprise.is_primary_producer

    $scope.showShippingMethods = ->
      enterprisePermissions.can_manage_shipping_methods && $scope.Enterprise.sells != "none"

    $scope.showPaymentMethods = ->
      enterprisePermissions.can_manage_payment_methods && $scope.Enterprise.sells != "none"

    $scope.showEnterpriseFees = ->
      enterprisePermissions.can_manage_enterprise_fees && ($scope.Enterprise.sells != "none" || $scope.Enterprise.is_primary_producer)

    $scope.enterpriseIsShop = ->
      $scope.Enterprise.sells != "none"
