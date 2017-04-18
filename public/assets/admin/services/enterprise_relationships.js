(function() {
  angular.module("ofn.admin").factory('EnterpriseRelationships', function($http, enterprise_relationships) {
    var EnterpriseRelationships;
    return new (EnterpriseRelationships = (function() {
      EnterpriseRelationships.prototype.create_errors = "";

      EnterpriseRelationships.prototype.all_permissions = ['Thêm vào chu kỳ đặt hàng', 'Quản lý sản phẩm', 'Chỉnh sửa hồ sơ', 'Thêm sản phẩm vào kho'];

      function EnterpriseRelationships() {
        this.enterprise_relationships = enterprise_relationships;
      }

      EnterpriseRelationships.prototype.create = function(parent_id, child_id, permissions) {
        var enabled, name;
        permissions = (function() {
          var results;
          results = [];
          for (name in permissions) {
            enabled = permissions[name];
            if (enabled) {
              results.push(name);
            }
          }
          return results;
        })();
        return $http.post('/admin/enterprise_relationships', {
          enterprise_relationship: {
            parent_id: parent_id,
            child_id: child_id,
            permissions_list: permissions
          }
        }).success((function(_this) {
          return function(data, status) {
            _this.enterprise_relationships.unshift(data);
            return _this.create_errors = "";
          };
        })(this)).error((function(_this) {
          return function(response, status) {
            return _this.create_errors = response.errors;
          };
        })(this));
      };

      EnterpriseRelationships.prototype["delete"] = function(er) {
        return $http["delete"]('/admin/enterprise_relationships/' + er.id).success((function(_this) {
          return function(data) {
            return _this.enterprise_relationships.splice(_this.enterprise_relationships.indexOf(er), 1);
          };
        })(this));
      };

      EnterpriseRelationships.prototype.permission_presentation = function(permission) {
        switch (permission) {
          case "Thêm vào chu kỳ đặt hàng":
            return "Thêm vào chu kỳ đặt hàng";
          case "Quản lý sản phẩm":
            return "Quản lý sản phẩm";
          case "Chỉnh sửa hồ sơ":
            return "Chỉnh sửa hồ sơ";
          case "Thêm sản phẩm vào kho":
            return "Thêm sản phẩm vào kho";
        }
      };

      return EnterpriseRelationships;

    })());
  });

}).call(this);
