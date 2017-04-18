(function() {
  angular.module("admin.dropdown").directive('columnsDropdown', function() {
    return {
      restrict: 'E',
      templateUrl: 'admin/columns_dropdown.html',
      controller: 'ColumnsDropdownCtrl',
      scope: {
        action: '@'
      }
    };
  });

}).call(this);
