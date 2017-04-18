(function() {
  angular.module("admin.resources").factory('OrderResource', function($resource) {
    return $resource('/admin/orders/:id/:action.json', {}, {
      'index': {
        method: 'GET',
        isArray: true
      },
      'update': {
        method: 'PUT'
      }
    });
  });

}).call(this);
