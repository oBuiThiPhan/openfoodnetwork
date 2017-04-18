(function() {
  angular.module("ofn.admin").factory('Users', function(users) {
    var Users;
    return new (Users = (function() {
      function Users() {
        this.users = users;
      }

      return Users;

    })());
  });

}).call(this);
