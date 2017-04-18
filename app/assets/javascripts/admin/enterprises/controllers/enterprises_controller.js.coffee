angular.module("admin.enterprises").controller 'enterprisesCtrl', ($scope, $q, Enterprises, Columns) ->
    requests = []
    requests.push ($scope.allEnterprises = Enterprises.index(ams_prefix: "index")).$promise

    $q.all(requests).then ->
      $scope.updateStaticFieldsFor(enterprise) for enterprise in $scope.allEnterprises
      $scope.loaded = true

    $scope.columns = Columns.columns

    $scope.updateStaticFieldsFor = (enterprise) ->
      enterprise.producer = $scope.producerTextFor(enterprise)
      enterprise.package = $scope.packageTextFor(enterprise)
      enterprise.producerError = (enterprise.producer == "Choose")
      enterprise.packageError = (enterprise.package == "Choose")
      enterprise.status = $scope.statusFor(enterprise)

    $scope.$on "enterprise:updated", (event, enterprise) ->
      $scope.updateStaticFieldsFor(enterprise)

    $scope.statusFor = (enterprise) ->
      if enterprise.issues.length > 0
        "issue"
      else if enterprise.warnings.length > 0
        "warning"
      else
        "ok"


    $scope.producerTextFor = (enterprise) ->
      switch enterprise.is_primary_producer
        when true
          "Nhà sản xuất"
        else
          "Không phải nhà sản xuất"

    $scope.packageTextFor = (enterprise) ->
      switch enterprise.is_primary_producer
        when true
          switch enterprise.sells
            when "none"
              "Hồ sơ"
            when "own"
              "Cửa hàng"
            when "any"
              "Trung tâm"
            else
              "Chọn"
        else
          switch enterprise.sells
            when "none"
              "Hồ sơ"
            when "any"
              "Trung tâm"
            else
              "Chọn"
