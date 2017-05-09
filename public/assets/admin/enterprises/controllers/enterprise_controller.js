(function() {
  angular.module("admin.enterprises").controller("enterpriseCtrl", function($scope, $window, NavigationCheck, enterprise, EnterprisePaymentMethods, EnterpriseShippingMethods, SideMenu, StatusMessage) {
    var enterpriseNavCallback;
    $scope.Enterprise = enterprise;
    $scope.PaymentMethods = EnterprisePaymentMethods.paymentMethods;
    $scope.ShippingMethods = EnterpriseShippingMethods.shippingMethods;
    $scope.navClear = NavigationCheck.clear;
    $scope.pristineEmail = $scope.Enterprise.email;
    $scope.menu = SideMenu;
    $scope.newManager = {
      id: '',
      email: t('add_manager')
    };
    $scope.StatusMessage = StatusMessage;
    $scope.$watch('enterprise_form.$dirty', function(newValue) {
      if (newValue) {
        return StatusMessage.display('notice', 'Các thay đổi của bạn chưa được lưu lại');
      }
    });
    $scope.setFormDirty = function() {
      return $scope.$apply(function() {
        return $scope.enterprise_form.$setDirty();
      });
    };
    $scope.cancel = function(destination) {
      return $window.location = destination;
    };
    $scope.submit = function() {
      $scope.navClear();
      return enterprise_form.submit();
    };
    enterpriseNavCallback = function() {
      if ($scope.enterprise_form.$dirty) {
        return t('admin.unsaved_confirm_leave');
      }
    };
    NavigationCheck.register(enterpriseNavCallback);
    $scope.removeManager = function(manager) {
      var i, ref, user;
      if (manager.id != null) {
        ref = $scope.Enterprise.users;
        for (i in ref) {
          user = ref[i];
          if (user.id === manager.id) {
            $scope.Enterprise.users.splice(i, 1);
          }
        }
        if ($scope.enterprise_form != null) {
          return $scope.enterprise_form.$setDirty();
        }
      }
    };
    return $scope.addManager = function(manager) {
      var user;
      if ((manager.id != null) && (manager.email != null)) {
        manager = {
          id: manager.id,
          email: manager.email
        };
        if (((function() {
          var j, len, ref, results;
          ref = $scope.Enterprise.users;
          results = [];
          for (j = 0, len = ref.length; j < len; j++) {
            user = ref[j];
            if (user.id === manager.id) {
              results.push(user);
            }
          }
          return results;
        })()).length === 0) {
          return $scope.Enterprise.users.push(manager);
        } else {
          return alert(("" + manager.email) + " " + t("is_already_manager"));
        }
      }
    };
  });

}).call(this);
