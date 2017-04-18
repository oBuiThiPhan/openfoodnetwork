(function() {
  angular.module('admin.enterpriseFees').directive('spreeDeleteResource', function() {
    return function(scope, element, attrs) {
      var html, url;
      if (scope.enterprise_fee.id) {
        url = '/admin/enterprise_fees/' + scope.enterprise_fee.id;
        html = '<a href="' + url + '" class="delete-resource icon_link icon-trash no-text" data-action="remove" data-confirm="Are you sure?" url="' + url + '"></a>';
        element.append(html);
      }
    };
  });

}).call(this);
