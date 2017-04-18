(function() {
  angular.module("admin.resources").factory('OrderCycleResource', function($resource) {
    return $resource('/admin/order_cycles/:id/:action.json', {}, {
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
