angular.module("ofn.admin").factory 'EnterpriseRelationships', ($http, enterprise_relationships) ->
  new class EnterpriseRelationships
    create_errors: ""
    all_permissions: [
      'Thêm vào chu kỳ đặt hàng'
      'Quản lý sản phẩm'
      'Chỉnh sửa hồ sơ'
      'Thêm sản phẩm vào kho'
    ]

    constructor: ->
      @enterprise_relationships = enterprise_relationships

    create: (parent_id, child_id, permissions) ->
      permissions = (name for name, enabled of permissions when enabled)
      $http.post('/admin/enterprise_relationships', {enterprise_relationship: {parent_id: parent_id, child_id: child_id, permissions_list: permissions}}).success (data, status) =>
        @enterprise_relationships.unshift(data)
        @create_errors = ""

      .error (response, status) =>
        @create_errors = response.errors

    delete: (er) ->
      $http.delete('/admin/enterprise_relationships/' + er.id).success (data) =>
        @enterprise_relationships.splice @enterprise_relationships.indexOf(er), 1

    permission_presentation: (permission) ->
      switch permission
        when "Thêm vào chu kỳ đặt hàng" then "Thêm vào chu kỳ đặt hàng"
        when "Quản lý sản phẩm" then "Quản lý sản phẩm"
        when "Chỉnh sửa hồ sơ" then "Chỉnh sửa hồ sơ"
        when "Thêm sản phẩm vào kho" then "Thêm sản phẩm vào kho"
