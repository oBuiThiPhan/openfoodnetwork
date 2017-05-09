(function() {
  angular.module("admin.enterprise_groups").controller("sideMenuCtrl", function($scope, SideMenu) {
    $scope.menu = SideMenu;
    $scope.select = SideMenu.select;
    $scope.menu.setItems([
      {
        name: 'primary_details',
        label: 'Chi tiết chính',
        icon_class: "icon-user"
      }, {
        name: 'users',
        label: 'Người dùng',
        icon_class: "icon-user"
      }, {
        name: 'about',
        label: 'Giới thiệu',
        icon_class: "icon-pencil"
      }, {
        name: 'images',
        label: 'Hình ảnh',
        icon_class: "icon-picture"
      }, {
        name: 'contact',
        label: 'Liên hệ',
        icon_class: "icon-phone"
      }, {
        name: 'web',
        label: 'Trang web',
        icon_class: "icon-globe"
      }
    ]);
    return $scope.select(0);
  });

}).call(this);
