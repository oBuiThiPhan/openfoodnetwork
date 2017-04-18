(function() {
  var filterSubmitProducts, filterSubmitVariant, toObjectWithIDKeys;

  angular.module("ofn.admin").controller("AdminProductEditCtrl", function($scope, $timeout, $http, $window, BulkProducts, DisplayProperties, dataFetcher, DirtyProducts, VariantUnitManager, StatusMessage, producers, Taxons, SpreeApiAuth, Columns, tax_categories) {
    $scope.loading = true;
    $scope.StatusMessage = StatusMessage;
    $scope.columns = Columns.columns;
    $scope.variant_unit_options = VariantUnitManager.variantUnitOptions();
    $scope.filterableColumns = [
      {
        name: t("label_producers"),
        db_column: "producer_name"
      }, {
        name: t("name"),
        db_column: "name"
      }
    ];
    $scope.filterTypes = [
      {
        name: t("equals"),
        predicate: "eq"
      }, {
        name: t("contains"),
        predicate: "cont"
      }
    ];
    $scope.optionTabs = {
      filters: {
        title: t("filter_products"),
        visible: false
      }
    };
    $scope.producers = producers;
    $scope.taxons = Taxons.all;
    $scope.tax_categories = tax_categories;
    $scope.filterProducers = [
      {
        id: "0",
        name: ""
      }
    ].concat($scope.producers);
    $scope.filterTaxons = [
      {
        id: "0",
        name: ""
      }
    ].concat($scope.taxons);
    $scope.producerFilter = "0";
    $scope.categoryFilter = "0";
    $scope.products = BulkProducts.products;
    $scope.filteredProducts = [];
    $scope.currentFilters = [];
    $scope.limit = 15;
    $scope.productsWithUnsavedVariants = [];
    $scope.query = "";
    $scope.DisplayProperties = DisplayProperties;
    $scope.initialise = function() {
      return SpreeApiAuth.authorise().then(function() {
        $scope.spree_api_key_ok = true;
        return $scope.fetchProducts();
      })["catch"](function(message) {
        return $scope.api_error_msg = message;
      });
    };
    $scope.$watchCollection('[query, producerFilter, categoryFilter]', function() {
      return $scope.limit = 15;
    });
    $scope.fetchProducts = function() {
      $scope.loading = true;
      return BulkProducts.fetch($scope.currentFilters).then(function() {
        $scope.resetProducts();
        return $scope.loading = false;
      });
    };
    $scope.resetProducts = function() {
      DirtyProducts.clear();
      return StatusMessage.clear();
    };
    $scope.updateOnHand = function(product) {
      var id, on_demand_variants, variant;
      on_demand_variants = [];
      if (product.variants) {
        on_demand_variants = (function() {
          var ref, results;
          ref = product.variants;
          results = [];
          for (id in ref) {
            variant = ref[id];
            if (variant.on_demand) {
              results.push(variant);
            }
          }
          return results;
        })();
      }
      if (!(product.on_demand || on_demand_variants.length > 0)) {
        return product.on_hand = $scope.onHand(product);
      }
    };
    $scope.onHand = function(product) {
      var id, onHand, ref, variant;
      onHand = 0;
      if (product.hasOwnProperty("variants") && product.variants instanceof Object) {
        ref = product.variants;
        for (id in ref) {
          variant = ref[id];
          onHand = onHand + parseInt(variant.on_hand > 0 ? variant.on_hand : 0);
        }
      } else {
        onHand = "error";
      }
      return onHand;
    };
    $scope.shiftTab = function(tab) {
      if (!($scope.visibleTab === tab || $scope.visibleTab === void 0)) {
        $scope.visibleTab.visible = false;
      }
      tab.visible = !tab.visible;
      return $scope.visibleTab = tab;
    };
    $scope.resetSelectFilters = function() {
      $scope.query = "";
      $scope.producerFilter = "0";
      return $scope.categoryFilter = "0";
    };
    $scope.editWarn = function(product, variant) {
      if ((DirtyProducts.count() > 0 && confirm(t("unsaved_changes_confirmation"))) || (DirtyProducts.count() === 0)) {
        return window.location = "/admin/products/" + product.permalink_live + (variant ? "/variants/" + variant.id : "") + "/edit";
      }
    };
    $scope.toggleShowAllVariants = function() {
      var showVariants;
      showVariants = !DisplayProperties.showVariants(0);
      $scope.filteredProducts.forEach(function(product) {
        return DisplayProperties.setShowVariants(product.id, showVariants);
      });
      return DisplayProperties.setShowVariants(0, showVariants);
    };
    $scope.addVariant = function(product) {
      product.variants.push({
        id: $scope.nextVariantId(),
        unit_value: null,
        unit_description: null,
        on_demand: false,
        display_as: null,
        display_name: null,
        on_hand: null,
        price: null
      });
      $scope.productsWithUnsavedVariants.push(product);
      return DisplayProperties.setShowVariants(product.id, true);
    };
    $scope.nextVariantId = function() {
      if ($scope.variantIdCounter == null) {
        $scope.variantIdCounter = 0;
      }
      $scope.variantIdCounter -= 1;
      return $scope.variantIdCounter;
    };
    $scope.deleteProduct = function(product) {
      if (confirm("Are you sure?")) {
        return $http({
          method: "DELETE",
          url: "/api/products/" + product.id + "/soft_delete"
        }).success(function(data) {
          $scope.products.splice($scope.products.indexOf(product), 1);
          DirtyProducts.deleteProduct(product.id);
          return $scope.displayDirtyProducts();
        });
      }
    };
    $scope.deleteVariant = function(product, variant) {
      if (product.variants.length > 1) {
        if (!$scope.variantSaved(variant)) {
          return $scope.removeVariant(product, variant);
        } else {
          if (confirm(t("are_you_sure"))) {
            return $http({
              method: "DELETE",
              url: "/api/products/" + product.permalink_live + "/variants/" + variant.id + "/soft_delete"
            }).success(function(data) {
              return $scope.removeVariant(product, variant);
            });
          }
        }
      } else {
        return alert(t("delete_product_variant"));
      }
    };
    $scope.removeVariant = function(product, variant) {
      product.variants.splice(product.variants.indexOf(variant), 1);
      DirtyProducts.deleteVariant(product.id, variant.id);
      return $scope.displayDirtyProducts();
    };
    $scope.cloneProduct = function(product) {
      return BulkProducts.cloneProduct(product);
    };
    $scope.hasVariants = function(product) {
      return product.variants.length > 0;
    };
    $scope.hasUnit = function(product) {
      return product.variant_unit_with_scale != null;
    };
    $scope.variantSaved = function(variant) {
      return variant.hasOwnProperty('id') && variant.id > 0;
    };
    $scope.hasOnDemandVariants = function(product) {
      var id, variant;
      return ((function() {
        var ref, results;
        ref = product.variants;
        results = [];
        for (id in ref) {
          variant = ref[id];
          if (variant.on_demand) {
            results.push(variant);
          }
        }
        return results;
      })()).length > 0;
    };
    $scope.submitProducts = function() {
      var id, product, productsToSubmit, ref, ref1;
      ref = $scope.products;
      for (id in ref) {
        product = ref[id];
        $scope.packProduct(product);
      }
      ref1 = DirtyProducts.all();
      for (id in ref1) {
        product = ref1[id];
        $scope.packProduct(product);
      }
      productsToSubmit = filterSubmitProducts(DirtyProducts.all());
      if (productsToSubmit.length > 0) {
        return $scope.updateProducts(productsToSubmit);
      } else {
        return StatusMessage.display('alert', t("products_change"));
      }
    };
    $scope.updateProducts = function(productsToSubmit) {
      $scope.displayUpdating();
      return $http({
        method: "POST",
        url: "/admin/products/bulk_update",
        data: {
          products: productsToSubmit,
          filters: $scope.currentFilters
        }
      }).success(function(data) {
        DirtyProducts.clear();
        BulkProducts.updateVariantLists(data.products, $scope.productsWithUnsavedVariants);
        return $timeout(function() {
          return $scope.displaySuccess();
        });
      }).error(function(data, status) {
        var error, errors, j, len, ref;
        if (status === 400 && (data.errors != null) && data.errors.length > 0) {
          ref = data.errors;
          for (j = 0, len = ref.length; j < len; j++) {
            error = ref[j];
            errors = error + "\n";
          }
          alert(t("products_update_error") + "\n" + errors);
          return $scope.displayFailure(t("products_update_error"));
        } else {
          return $scope.displayFailure(t("products_update_error_data") + status);
        }
      });
    };
    $scope.cancel = function(destination) {
      return $window.location = destination;
    };
    $scope.packProduct = function(product) {
      var id, match, ref, results, variant;
      if (product.variant_unit_with_scale) {
        match = product.variant_unit_with_scale.match(/^([^_]+)_([\d\.]+)$/);
        if (match) {
          product.variant_unit = match[1];
          product.variant_unit_scale = parseFloat(match[2]);
        } else {
          product.variant_unit = product.variant_unit_with_scale;
          product.variant_unit_scale = null;
        }
      } else {
        product.variant_unit = product.variant_unit_scale = null;
      }
      if (product.master) {
        $scope.packVariant(product, product.master);
      }
      if (product.variants) {
        ref = product.variants;
        results = [];
        for (id in ref) {
          variant = ref[id];
          results.push($scope.packVariant(product, variant));
        }
        return results;
      }
    };
    $scope.packVariant = function(product, variant) {
      var match;
      if (variant.hasOwnProperty("unit_value_with_description")) {
        match = variant.unit_value_with_description.match(/^([\d\.]+(?= |$)|)( |)(.*)$/);
        if (match) {
          product = BulkProducts.find(product.id);
          variant.unit_value = parseFloat(match[1]);
          if (isNaN(variant.unit_value)) {
            variant.unit_value = null;
          }
          if (variant.unit_value && product.variant_unit_scale) {
            variant.unit_value *= product.variant_unit_scale;
          }
          return variant.unit_description = match[3];
        }
      }
    };
    $scope.incrementLimit = function() {
      if ($scope.limit < $scope.products.length) {
        return $scope.limit = $scope.limit + 5;
      }
    };
    $scope.displayUpdating = function() {
      return StatusMessage.display('progress', t("saving"));
    };
    $scope.displaySuccess = function() {
      StatusMessage.display('success', t("products_changes_saved"));
      return $scope.bulk_product_form.$setPristine();
    };
    $scope.displayFailure = function(failMessage) {
      return StatusMessage.display('failure', t("products_update_error_msg") + ("" + failMessage));
    };
    return $scope.displayDirtyProducts = function() {
      var count;
      count = DirtyProducts.count();
      switch (count) {
        case 0:
          return StatusMessage.clear();
        case 1:
          return StatusMessage.display('notice', t("one_product_unsaved"));
        default:
          return StatusMessage.display('notice', t("products_unsaved", {
            n: count
          }));
      }
    };
  });

  filterSubmitProducts = function(productsToFilter) {
    var filteredProducts;
    filteredProducts = [];
    if (productsToFilter instanceof Object) {
      angular.forEach(productsToFilter, function(product) {
        var filteredMaster, filteredProduct, filteredVariants, hasUpdatableProperty, ref, ref1, ref2;
        if (product.hasOwnProperty("id")) {
          filteredProduct = {
            id: product.id
          };
          filteredVariants = [];
          filteredMaster = null;
          hasUpdatableProperty = false;
          if (product.hasOwnProperty("variants")) {
            angular.forEach(product.variants, function(variant) {
              var filteredVariant, result, variantHasUpdatableProperty;
              result = filterSubmitVariant(variant);
              filteredVariant = result.filteredVariant;
              variantHasUpdatableProperty = result.hasUpdatableProperty;
              if (variantHasUpdatableProperty) {
                return filteredVariants.push(filteredVariant);
              }
            });
          }
          if ((ref = product.master) != null ? ref.hasOwnProperty("unit_value") : void 0) {
            if (filteredMaster == null) {
              filteredMaster = {
                id: product.master.id
              };
            }
            filteredMaster.unit_value = product.master.unit_value;
          }
          if ((ref1 = product.master) != null ? ref1.hasOwnProperty("unit_description") : void 0) {
            if (filteredMaster == null) {
              filteredMaster = {
                id: product.master.id
              };
            }
            filteredMaster.unit_description = product.master.unit_description;
          }
          if ((ref2 = product.master) != null ? ref2.hasOwnProperty("display_as") : void 0) {
            if (filteredMaster == null) {
              filteredMaster = {
                id: product.master.id
              };
            }
            filteredMaster.display_as = product.master.display_as;
          }
          if (product.hasOwnProperty("sku")) {
            filteredProduct.sku = product.sku;
            hasUpdatableProperty = true;
          }
          if (product.hasOwnProperty("name")) {
            filteredProduct.name = product.name;
            hasUpdatableProperty = true;
          }
          if (product.hasOwnProperty("producer_id")) {
            filteredProduct.supplier_id = product.producer_id;
            hasUpdatableProperty = true;
          }
          if (product.hasOwnProperty("price")) {
            filteredProduct.price = product.price;
            hasUpdatableProperty = true;
          }
          if (product.hasOwnProperty("variant_unit_with_scale")) {
            filteredProduct.variant_unit = product.variant_unit;
            filteredProduct.variant_unit_scale = product.variant_unit_scale;
            hasUpdatableProperty = true;
          }
          if (product.hasOwnProperty("variant_unit_name")) {
            filteredProduct.variant_unit_name = product.variant_unit_name;
            hasUpdatableProperty = true;
          }
          if (product.hasOwnProperty("on_hand") && filteredVariants.length === 0) {
            filteredProduct.on_hand = product.on_hand;
            hasUpdatableProperty = true;
          }
          if (product.hasOwnProperty("on_demand") && filteredVariants.length === 0) {
            filteredProduct.on_demand = product.on_demand;
            hasUpdatableProperty = true;
          }
          if (product.hasOwnProperty("category_id")) {
            filteredProduct.primary_taxon_id = product.category_id;
            hasUpdatableProperty = true;
          }
          if (product.hasOwnProperty("tax_category_id")) {
            filteredProduct.tax_category_id = product.tax_category_id;
            hasUpdatableProperty = true;
          }
          if (product.hasOwnProperty("inherits_properties")) {
            filteredProduct.inherits_properties = product.inherits_properties;
            hasUpdatableProperty = true;
          }
          if (product.hasOwnProperty("available_on")) {
            filteredProduct.available_on = product.available_on;
            hasUpdatableProperty = true;
          }
          if (filteredMaster != null) {
            filteredProduct.master_attributes = filteredMaster;
            hasUpdatableProperty = true;
          }
          if (filteredVariants.length > 0) {
            filteredProduct.variants_attributes = filteredVariants;
            hasUpdatableProperty = true;
          }
          if (hasUpdatableProperty) {
            return filteredProducts.push(filteredProduct);
          }
        }
      });
    }
    return filteredProducts;
  };

  filterSubmitVariant = function(variant) {
    var filteredVariant, hasUpdatableProperty;
    hasUpdatableProperty = false;
    filteredVariant = {};
    if ((variant.deleted_at == null) && variant.hasOwnProperty("id")) {
      if (!(variant.id <= 0)) {
        filteredVariant.id = variant.id;
      }
      if (variant.hasOwnProperty("sku")) {
        filteredVariant.sku = variant.sku;
        hasUpdatableProperty = true;
      }
      if (variant.hasOwnProperty("on_hand")) {
        filteredVariant.on_hand = variant.on_hand;
        hasUpdatableProperty = true;
      }
      if (variant.hasOwnProperty("on_demand")) {
        filteredVariant.on_demand = variant.on_demand;
        hasUpdatableProperty = true;
      }
      if (variant.hasOwnProperty("price")) {
        filteredVariant.price = variant.price;
        hasUpdatableProperty = true;
      }
      if (variant.hasOwnProperty("unit_value")) {
        filteredVariant.unit_value = variant.unit_value;
        hasUpdatableProperty = true;
      }
      if (variant.hasOwnProperty("unit_description")) {
        filteredVariant.unit_description = variant.unit_description;
        hasUpdatableProperty = true;
      }
      if (variant.hasOwnProperty("display_name")) {
        filteredVariant.display_name = variant.display_name;
        hasUpdatableProperty = true;
      }
      if (variant.hasOwnProperty("display_as")) {
        filteredVariant.display_as = variant.display_as;
        hasUpdatableProperty = true;
      }
    }
    return {
      filteredVariant: filteredVariant,
      hasUpdatableProperty: hasUpdatableProperty
    };
  };

  toObjectWithIDKeys = function(array) {
    var i, object;
    object = {};
    for (i in array) {
      if (array[i] instanceof Object && array[i].hasOwnProperty("id")) {
        object[array[i].id] = angular.copy(array[i]);
        if (array[i].hasOwnProperty("variants") && array[i].variants instanceof Array) {
          object[array[i].id].variants = toObjectWithIDKeys(array[i].variants);
        }
      }
    }
    return object;
  };

}).call(this);
