(function() {
  angular.module("admin.resources").factory('EnterpriseResource', function($resource) {
    var ignoredAttrs;
    ignoredAttrs = function() {
      return ["$$hashKey", "producer", "package", "producerError", "packageError", "status"];
    };
    return $resource('/admin/enterprises/:id/:action.json', {}, {
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
