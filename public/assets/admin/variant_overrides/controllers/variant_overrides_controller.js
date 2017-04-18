(function() {
  angular.module("admin.variantOverrides").controller("AdminVariantOverridesCtrl", function($scope, $http, $timeout, Indexer, Columns, Views, SpreeApiAuth, PagedFetcher, StatusMessage, RequestMonitor, hubs, producers, hubPermissions, InventoryItems, VariantOverrides, DirtyVariantOverrides) {
    $scope.hubs = Indexer.index(hubs);
    $scope.hub_id = hubs.length === 1 ? hubs[0].id : null;
    $scope.products = [];
    $scope.producers = producers;
    $scope.producersByID = Indexer.index(producers);
    $scope.hubPermissions = hubPermissions;
    $scope.productLimit = 10;
    $scope.variantOverrides = VariantOverrides.variantOverrides;
    $scope.inventoryItems = InventoryItems.inventoryItems;
    $scope.setVisibility = InventoryItems.setVisibility;
    $scope.StatusMessage = StatusMessage;
    $scope.RequestMonitor = RequestMonitor;
    $scope.selectView = Views.selectView;
    $scope.currentView = function() {
      return Views.currentView;
    };
    $scope.views = Views.setViews({
      inventory: {
        name: "Các sản phẩm tồn kho",
        visible: true
      },
      hidden: {
        name: "Các sản phẩm bị ẩn",
        visible: false
      },
      "new": {
        name: "Sản phẩm mới",
        visible: false
      }
    });
    $scope.bulkActions = [
      {
        name: "Đặt lại lượng hàng trong kho thành mặc định",
        callback: 'resetStock'
      }
    ];
    $scope.columns = Columns.columns;
    $scope.resetSelectFilters = function() {
      $scope.producerFilter = 0;
      return $scope.query = '';
    };
    $scope.resetSelectFilters();
    $scope.filtersApplied = function() {
      return $scope.producerFilter !== 0 || $scope.query !== '';
    };
    $scope.initialise = function() {
      return SpreeApiAuth.authorise().then(function() {
        $scope.spree_api_key_ok = true;
        return $scope.fetchProducts();
      })["catch"](function(message) {
        return $scope.api_error_msg = message;
      });
    };
    $scope.fetchProducts = function() {
      var url;
      url = "/api/products/overridable?page=::page::;per_page=100";
      return PagedFetcher.fetch(url, (function(_this) {
        return function(data) {
          return $scope.addProducts(data.products);
        };
      })(this));
    };
    $scope.addProducts = function(products) {
      $scope.products = $scope.products.concat(products);
      return VariantOverrides.ensureDataFor(hubs, products);
    };
    $scope.displayDirty = function() {
      var num;
      if (DirtyVariantOverrides.count() > 0) {
        num = DirtyVariantOverrides.count() === 1 ? "one override" : (DirtyVariantOverrides.count()) + " overrides";
        return StatusMessage.display('notice', "Changes to " + num + " remain unsaved.");
      } else {
        return StatusMessage.clear();
      }
    };
    $scope.update = function() {
      if (DirtyVariantOverrides.count() === 0) {
        return StatusMessage.display('alert', 'Không có thay đổi để lưu.');
      } else {
        StatusMessage.display('progress', 'Saving...');
        return DirtyVariantOverrides.save().success(function(updatedVos) {
          DirtyVariantOverrides.clear();
          VariantOverrides.updateIds(updatedVos);
          $scope.variant_overrides_form.$setPristine();
          StatusMessage.display('success', 'Thay đổi đã lưu.');
          return VariantOverrides.updateData(updatedVos);
        }).error(function(data, status) {
          return StatusMessage.display('failure', $scope.updateError(data, status));
        });
      }
    };
    $scope.updateError = function(data, status) {
      var errors, field, field_errors, ref;
      if (status === 401) {
        return "Tôi không thể có được ủy quyền để lưu các thay đổi đó, do đó, chúng vẫn chưa được lưu.";
      } else if (status === 400 && (data.errors != null)) {
        errors = [];
        ref = data.errors;
        for (field in ref) {
          field_errors = ref[field];
          errors = errors.concat(field_errors);
        }
        errors = errors.join(', ');
        return "Có một số vấn đề về việc lưu lại: " + errors;
      } else {
        return "Ồ không! Thay đổi của bạn không thể lưu.";
      }
    };
    return $scope.resetStock = function() {
      if (DirtyVariantOverrides.count() > 0) {
        StatusMessage.display('alert', 'Lưu thay đổi trước tiên.');
        return $timeout(function() {
          return $scope.displayDirty();
        }, 3000);
      } else {
        if ($scope.hub_id == null) {
          return;
        }
        StatusMessage.display('progress', 'Đang thay đổi kho...');
        return $http({
          method: "POST",
          url: "/admin/variant_overrides/bulk_reset",
          data: {
            hub_id: $scope.hub_id
          }
        }).success(function(updatedVos) {
          VariantOverrides.updateData(updatedVos);
          return StatusMessage.display('success', 'Kho đã được đặt lại về mặc định.');
        }).error(function(data, status) {
          return $timeout(function() {
            return StatusMessage.display('failure', $scope.updateError(data, status));
          });
        });
      }
    };
  });

}).call(this);
