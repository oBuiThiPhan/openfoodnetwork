(function() {
  var daysFromToday, formatDate, formatTime, parseDate, twoDigitNumber;

  angular.module("admin.lineItems").controller('LineItemsCtrl', function($scope, $timeout, $http, $q, StatusMessage, Columns, Dereferencer, Orders, LineItems, Enterprises, OrderCycles, VariantUnitManager, RequestMonitor) {
    $scope.initialized = false;
    $scope.RequestMonitor = RequestMonitor;
    $scope.filteredLineItems = [];
    $scope.confirmDelete = true;
    $scope.startDate = formatDate(daysFromToday(-7));
    $scope.endDate = formatDate(daysFromToday(1));
    $scope.bulkActions = [
      {
        name: t("admin.orders.bulk_management.actions_delete"),
        callback: 'deleteLineItems'
      }
    ];
    $scope.selectedUnitsProduct = {};
    $scope.selectedUnitsVariant = {};
    $scope.sharedResource = false;
    $scope.columns = Columns.columns;
    $scope.confirmRefresh = function() {
      return LineItems.allSaved() || confirm(t("unsaved_changes_warning"));
    };
    $scope.resetSelectFilters = function() {
      $scope.distributorFilter = 0;
      $scope.supplierFilter = 0;
      $scope.orderCycleFilter = 0;
      return $scope.quickSearch = "";
    };
    $scope.refreshData = function() {
      if (!(($scope.orderCycleFilter == null) || $scope.orderCycleFilter === 0)) {
        $scope.startDate = OrderCycles.byID[$scope.orderCycleFilter].first_order;
        $scope.endDate = OrderCycles.byID[$scope.orderCycleFilter].last_order;
      }
      RequestMonitor.load($scope.orders = Orders.index({
        "q[state_not_eq]": "canceled",
        "q[completed_at_not_null]": "true",
        "q[completed_at_gt]": "" + (parseDate($scope.startDate)),
        "q[completed_at_lt]": "" + (parseDate($scope.endDate))
      }));
      RequestMonitor.load($scope.lineItems = LineItems.index({
        "q[order][state_not_eq]": "canceled",
        "q[order][completed_at_not_null]": "true",
        "q[order][completed_at_gt]": "" + (parseDate($scope.startDate)),
        "q[order][completed_at_lt]": "" + (parseDate($scope.endDate))
      }));
      if (!$scope.initialized) {
        RequestMonitor.load($scope.distributors = Enterprises.index({
          action: "for_line_items",
          ams_prefix: "basic",
          "q[sells_in][]": ["own", "any"]
        }));
        RequestMonitor.load($scope.orderCycles = OrderCycles.index({
          ams_prefix: "basic",
          as: "distributor",
          "q[orders_close_at_gt]": "" + (daysFromToday(-90))
        }));
        RequestMonitor.load($scope.suppliers = Enterprises.index({
          action: "for_line_items",
          ams_prefix: "basic",
          "q[is_primary_producer_eq]": "true"
        }));
      }
      RequestMonitor.load($q.all([$scope.orders.$promise, $scope.distributors.$promise, $scope.orderCycles.$promise]).then(function() {
        Dereferencer.dereferenceAttr($scope.orders, "distributor", Enterprises.byID);
        return Dereferencer.dereferenceAttr($scope.orders, "order_cycle", OrderCycles.byID);
      }));
      return RequestMonitor.load($q.all([$scope.orders.$promise, $scope.suppliers.$promise, $scope.lineItems.$promise]).then(function() {
        Dereferencer.dereferenceAttr($scope.lineItems, "supplier", Enterprises.byID);
        Dereferencer.dereferenceAttr($scope.lineItems, "order", Orders.byID);
        $scope.bulk_order_form.$setPristine();
        StatusMessage.clear();
        if (!$scope.initialized) {
          $scope.initialized = true;
          return $timeout(function() {
            return $scope.resetSelectFilters();
          });
        }
      }));
    };
    $scope.refreshData();
    $scope.$watch('bulk_order_form.$dirty', function(newVal, oldVal) {
      if (newVal === true) {
        return StatusMessage.display('notice', "You have unsaved changes");
      }
    });
    $scope.submit = function() {
      if ($scope.bulk_order_form.$valid) {
        StatusMessage.display('progress', "Saving...");
        return $q.all(LineItems.saveAll()).then(function() {
          StatusMessage.display('success', "All changes saved");
          return $scope.bulk_order_form.$setPristine();
        })["catch"](function() {
          return StatusMessage.display('failure', t("unsaved_changes_error"));
        });
      } else {
        return StatusMessage.display('failure', t("unsaved_changes_error"));
      }
    };
    $scope.deleteLineItem = function(lineItem) {
      if (($scope.confirmDelete && confirm(t("are_you_sure"))) || !$scope.confirmDelete) {
        return LineItems["delete"](lineItem, (function(_this) {
          return function() {
            return $scope.lineItems.splice($scope.lineItems.indexOf(lineItem), 1);
          };
        })(this));
      }
    };
    $scope.deleteLineItems = function(lineItems) {
      var existingState, j, len, lineItem;
      existingState = $scope.confirmDelete;
      $scope.confirmDelete = false;
      for (j = 0, len = lineItems.length; j < len; j++) {
        lineItem = lineItems[j];
        if (lineItem.checked) {
          $scope.deleteLineItem(lineItem);
        }
      }
      return $scope.confirmDelete = existingState;
    };
    $scope.allBoxesChecked = function() {
      var checkedCount;
      checkedCount = $scope.filteredLineItems.reduce(function(count, lineItem) {
        return count + (lineItem.checked ? 1 : 0);
      }, 0);
      return checkedCount === $scope.filteredLineItems.length;
    };
    $scope.toggleAllCheckboxes = function() {
      var changeTo, j, len, lineItem, ref, results;
      changeTo = !$scope.allBoxesChecked();
      ref = $scope.filteredLineItems;
      results = [];
      for (j = 0, len = ref.length; j < len; j++) {
        lineItem = ref[j];
        results.push(lineItem.checked = changeTo);
      }
      return results;
    };
    $scope.setSelectedUnitsVariant = function(unitsProduct, unitsVariant) {
      $scope.selectedUnitsProduct = unitsProduct;
      return $scope.selectedUnitsVariant = unitsVariant;
    };
    $scope.sumUnitValues = function() {
      var sum;
      return sum = $scope.filteredLineItems.reduce(function(sum, lineItem) {
        return sum + lineItem.final_weight_volume;
      }, 0);
    };
    $scope.sumMaxUnitValues = function() {
      var sum;
      return sum = $scope.filteredLineItems.reduce(function(sum, lineItem) {
        return sum + lineItem.max_quantity * lineItem.units_variant.unit_value;
      }, 0);
    };
    $scope.allFinalWeightVolumesPresent = function() {
      var i, lineItem, ref;
      ref = $scope.filteredLineItems;
      for (i in ref) {
        lineItem = ref[i];
        if (!lineItem.hasOwnProperty('final_weight_volume') || !(lineItem.final_weight_volume > 0)) {
          return false;
        }
      }
      return true;
    };
    $scope.formattedValueWithUnitName = function(value, unitsProduct, unitsVariant) {
      var scale;
      if (unitsProduct.hasOwnProperty("variant_unit") && (unitsProduct.variant_unit === "weight" || unitsProduct.variant_unit === "volume") && value > 0) {
        scale = VariantUnitManager.getScale(value, unitsProduct.variant_unit);
        return Math.round(value / scale * 1000) / 1000 + " " + VariantUnitManager.getUnitName(scale, unitsProduct.variant_unit);
      } else {
        return '';
      }
    };
    $scope.fulfilled = function(sumOfUnitValues) {
      if ($scope.selectedUnitsProduct.hasOwnProperty("group_buy_unit_size") && $scope.selectedUnitsProduct.group_buy_unit_size > 0 && $scope.selectedUnitsProduct.hasOwnProperty("variant_unit") && ($scope.selectedUnitsProduct.variant_unit === "weight" || $scope.selectedUnitsProduct.variant_unit === "volume")) {
        return Math.round(sumOfUnitValues / $scope.selectedUnitsProduct.group_buy_unit_size * 1000) / 1000;
      } else {
        return '';
      }
    };
    $scope.unitsVariantSelected = function() {
      return !angular.equals($scope.selectedUnitsVariant, {});
    };
    $scope.weightAdjustedPrice = function(lineItem) {
      var pristine_unit_value, unit_value;
      if (lineItem.final_weight_volume > 0) {
        unit_value = lineItem.final_weight_volume / lineItem.quantity;
        pristine_unit_value = LineItems.pristineByID[lineItem.id].final_weight_volume / LineItems.pristineByID[lineItem.id].quantity;
        return lineItem.price = LineItems.pristineByID[lineItem.id].price * (unit_value / pristine_unit_value);
      }
    };
    $scope.unitValueLessThanZero = function(lineItem) {
      if (lineItem.units_variant.unit_value <= 0) {
        return true;
      } else {
        return false;
      }
    };
    return $scope.updateOnQuantity = function(lineItem) {
      if (lineItem.quantity > 0) {
        lineItem.final_weight_volume = LineItems.pristineByID[lineItem.id].final_weight_volume * lineItem.quantity / LineItems.pristineByID[lineItem.id].quantity;
        return $scope.weightAdjustedPrice(lineItem);
      }
    };
  });

  daysFromToday = function(days) {
    var now;
    now = new Date;
    now.setHours(0);
    now.setMinutes(0);
    now.setSeconds(0);
    now.setDate(now.getDate() + days);
    return now;
  };

  formatDate = function(date) {
    var day, month, year;
    year = date.getFullYear();
    month = twoDigitNumber(date.getMonth() + 1);
    day = twoDigitNumber(date.getDate());
    return year + "-" + month + "-" + day;
  };

  formatTime = function(date) {
    var hours, mins, secs;
    hours = twoDigitNumber(date.getHours());
    mins = twoDigitNumber(date.getMinutes());
    secs = twoDigitNumber(date.getSeconds());
    return hours + ":" + mins + ":" + secs;
  };

  parseDate = function(dateString) {
    return new Date(Date.parse(dateString));
  };

  twoDigitNumber = function(number) {
    var twoDigits;
    twoDigits = "" + number;
    if (number < 10) {
      twoDigits = "0" + number;
    }
    return twoDigits;
  };

}).call(this);
