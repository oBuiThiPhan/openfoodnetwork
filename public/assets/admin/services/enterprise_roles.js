(function() {
  angular.module("ofn.admin").factory('EnterpriseRoles', function($http, enterpriseRoles) {
    var EnterpriseRoles;
    return new (EnterpriseRoles = (function() {
      EnterpriseRoles.prototype.create_errors = "";

      function EnterpriseRoles() {
        this.enterprise_roles = enterpriseRoles;
      }

      EnterpriseRoles.prototype.create = function(user_id, enterprise_id) {
        return $http.post('/admin/enterprise_roles', {
          enterprise_role: {
            user_id: user_id,
            enterprise_id: enterprise_id
          }
        }).success((function(_this) {
          return function(data, status) {
            _this.enterprise_roles.unshift(data);
            return _this.create_errors = "";
          };
        })(this)).error((function(_this) {
          return function(response, status) {
            return _this.create_errors = response.errors;
          };
        })(this));
      };

      EnterpriseRoles.prototype["delete"] = function(er) {
        return $http["delete"]('/admin/enterprise_roles/' + er.id).success((function(_this) {
          return function(data) {
            return _this.enterprise_roles.splice(_this.enterprise_roles.indexOf(er), 1);
          };
        })(this));
      };

      return EnterpriseRoles;

    })());
  });

}).call(this);
