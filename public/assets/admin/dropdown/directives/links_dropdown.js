(function() {
  angular.module("admin.dropdown").directive("linksDropdown", function($window) {
    return {
      restrict: "C",
      scope: {
        links: "="
      },
      templateUrl: "admin/links_dropdown.html"
    };
  });

}).call(this);
