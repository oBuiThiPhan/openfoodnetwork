(function() {
  angular.module("admin.resources").factory('CustomerResource', function($resource) {
    return $resource('/admin/customers/:id.json', {}, {
      'index': {
        method: 'GET',
        isArray: true,
        params: {
          enterprise_id: '@enterprise_id'
        }
      },
      'create': {
        method: 'POST',
        params: {
          enterprise_id: '@enterprise_id',
          email: '@email'
        }
      },
      'destroy': {
        method: 'DELETE',
        params: {
          id: '@id'
        }
      },
      'update': {
        method: 'PUT',
        params: {
          id: '@id'
        }
      }
    });
  });

}).call(this);
