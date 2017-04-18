(function() {
  angular.module("admin.enterprises").controller('enterprisesCtrl', function($scope, $q, Enterprises, Columns) {
    var requests;
    requests = [];
    requests.push(($scope.allEnterprises = Enterprises.index({
      ams_prefix: "index"
    })).$promise);
    $q.all(requests).then(function() {
      var enterprise, i, len, ref;
      ref = $scope.allEnterprises;
      for (i = 0, len = ref.length; i < len; i++) {
        enterprise = ref[i];
        $scope.updateStaticFieldsFor(enterprise);
      }
      return $scope.loaded = true;
    });
    $scope.columns = Columns.columns;
    $scope.updateStaticFieldsFor = function(enterprise) {
      enterprise.producer = $scope.producerTextFor(enterprise);
      enterprise["package"] = $scope.packageTextFor(enterprise);
      enterprise.producerError = enterprise.producer === "Choose";
      enterprise.packageError = enterprise["package"] === "Choose";
      return enterprise.status = $scope.statusFor(enterprise);
    };
    $scope.$on("enterprise:updated", function(event, enterprise) {
      return $scope.updateStaticFieldsFor(enterprise);
    });
    $scope.statusFor = function(enterprise) {
      if (enterprise.issues.length > 0) {
        return "issue";
      } else if (enterprise.warnings.length > 0) {
        return "warning";
      } else {
        return "ok";
      }
    };
    $scope.producerTextFor = function(enterprise) {
      switch (enterprise.is_primary_producer) {
        case true:
          return "Nhà sản xuất";
        default:
          return "Không phải nhà sản xuất";
      }
    };
    return $scope.packageTextFor = function(enterprise) {
      switch (enterprise.is_primary_producer) {
        case true:
          switch (enterprise.sells) {
            case "none":
              return "Hồ sơ";
            case "own":
              return "Cửa hàng";
            case "any":
              return "Trung tâm";
            default:
              return "Chọn";
          }
          break;
        default:
          switch (enterprise.sells) {
            case "none":
              return "Hồ sơ";
            case "any":
              return "Trung tâm";
            default:
              return "Chọn";
          }
      }
    };
  });

}).call(this);
