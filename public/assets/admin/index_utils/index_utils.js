(function() {
  angular.module("admin.indexUtils", ['admin.resources', 'ngSanitize', 'templates', 'admin.utils']).config(function($httpProvider) {
    $httpProvider.defaults.headers.common["X-CSRF-Token"] = $("meta[name=csrf-token]").attr("content");
    return $httpProvider.defaults.headers.common["Accept"] = "application/json, text/javascript, */*";
  });

}).call(this);
