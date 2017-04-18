(function() {
  angular.module("admin.users").directive("userSelect", function($sanitize) {
    return {
      scope: {
        user: '&userSelect',
        model: '=ngModel'
      },
      link: function(scope, element, attrs) {
        return setTimeout(function() {
          return element.select2({
            multiple: false,
            initSelection: function(element, callback) {
              var ref, ref1;
              return callback({
                id: (ref = scope.user()) != null ? ref.id : void 0,
                email: (ref1 = scope.user()) != null ? ref1.email : void 0
              });
            },
            ajax: {
              url: '/admin/search/known_users',
              datatype: 'json',
              data: function(term, page) {
                return {
                  q: term
                };
              },
              results: function(data, page) {
                var i, item, len;
                for (i = 0, len = data.length; i < len; i++) {
                  item = data[i];
                  item.email = $sanitize(item.email);
                }
                return {
                  results: data
                };
              }
            },
            formatResult: function(user) {
              return user.email;
            },
            formatSelection: function(user) {
              scope.$apply(function() {
                if (scope.model != null) {
                  return scope.model = user;
                }
              });
              return user.email;
            }
          });
        });
      }
    };
  });

}).call(this);
