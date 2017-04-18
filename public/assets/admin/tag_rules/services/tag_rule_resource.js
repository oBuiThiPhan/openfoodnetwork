(function() {
  angular.module("admin.tagRules").factory('TagRuleResource', function($resource) {
    return $resource('/admin/tag_rules/:action.json', {}, {
      'mapByTag': {
        method: 'GET',
        isArray: true,
        cache: true,
        params: {
          action: 'map_by_tag',
          enterprise_id: '@enterprise_id'
        }
      }
    });
  });

}).call(this);
