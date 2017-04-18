(function() {
  angular.module("admin.enterprises").controller("sideMenuCtrl", function($scope, $parse, enterprise, SideMenu, enterprisePermissions) {
    $scope.Enterprise = enterprise;
    $scope.menu = SideMenu;
    $scope.select = SideMenu.select;
    $scope.menu.setItems([
      {
        name: 'primary_details',
        label: t('primary_details'),
        icon_class: "icon-home"
      }, {
        name: 'address',
        label: t('address'),
        icon_class: "icon-map-marker"
      }, {
        name: 'contact',
        label: t('contact'),
        icon_class: "icon-phone"
      }, {
        name: 'social',
        label: t('social'),
        icon_class: "icon-twitter"
      }, {
        name: 'about',
        label: t('about'),
        icon_class: "icon-pencil"
      }, {
        name: 'business_details',
        label: t('business_details'),
        icon_class: "icon-briefcase"
      }, {
        name: 'images',
        label: t('images'),
        icon_class: "icon-picture"
      }, {
        name: 'properties',
        label: t('properties'),
        icon_class: "icon-tags",
        show: "showProperties()"
      }, {
        name: 'shipping_methods',
        label: t('shipping_methods'),
        icon_class: "icon-truck",
        show: "showShippingMethods()"
      }, {
        name: 'payment_methods',
        label: t('payment_methods'),
        icon_class: "icon-money",
        show: "showPaymentMethods()"
      }, {
        name: 'enterprise_fees',
        label: t('enterprise_fees'),
        icon_class: "icon-tasks",
        show: "showEnterpriseFees()"
      }, {
        name: 'inventory_settings',
        label: t('inventory_settings'),
        icon_class: "icon-list-ol",
        show: "enterpriseIsShop()"
      }, {
        name: 'tag_rules',
        label: t('tag_rules'),
        icon_class: "icon-random",
        show: "enterpriseIsShop()"
      }, {
        name: 'shop_preferences',
        label: t('shop_preferences'),
        icon_class: "icon-shopping-cart",
        show: "enterpriseIsShop()"
      }, {
        name: 'users',
        label: t('users'),
        icon_class: "icon-user"
      }
    ]);
    $scope.select(0);
    $scope.showItem = function(item) {
      if (item.show != null) {
        return $parse(item.show)($scope);
      } else {
        return true;
      }
    };
    $scope.showProperties = function() {
      return !!$scope.Enterprise.is_primary_producer;
    };
    $scope.showShippingMethods = function() {
      return enterprisePermissions.can_manage_shipping_methods && $scope.Enterprise.sells !== "none";
    };
    $scope.showPaymentMethods = function() {
      return enterprisePermissions.can_manage_payment_methods && $scope.Enterprise.sells !== "none";
    };
    $scope.showEnterpriseFees = function() {
      return enterprisePermissions.can_manage_enterprise_fees && ($scope.Enterprise.sells !== "none" || $scope.Enterprise.is_primary_producer);
    };
    return $scope.enterpriseIsShop = function() {
      return $scope.Enterprise.sells !== "none";
    };
  });

}).call(this);
