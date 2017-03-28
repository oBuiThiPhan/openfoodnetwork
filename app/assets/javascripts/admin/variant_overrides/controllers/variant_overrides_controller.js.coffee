angular.module("admin.variantOverrides").controller "AdminVariantOverridesCtrl", ($scope, $http, $timeout, Indexer, Columns, Views, SpreeApiAuth, PagedFetcher, StatusMessage, RequestMonitor, hubs, producers, hubPermissions, InventoryItems, VariantOverrides, DirtyVariantOverrides) ->
  $scope.hubs = Indexer.index hubs
  $scope.hub_id = if hubs.length == 1 then hubs[0].id else null
  $scope.products = []
  $scope.producers = producers
  $scope.producersByID = Indexer.index producers
  $scope.hubPermissions = hubPermissions
  $scope.productLimit = 10
  $scope.variantOverrides = VariantOverrides.variantOverrides
  $scope.inventoryItems = InventoryItems.inventoryItems
  $scope.setVisibility = InventoryItems.setVisibility
  $scope.StatusMessage = StatusMessage
  $scope.RequestMonitor = RequestMonitor
  $scope.selectView = Views.selectView
  $scope.currentView = -> Views.currentView

  $scope.views = Views.setViews
    inventory:    { name: "Inventory Products", visible: true }
    hidden:       { name: "Hidden Products",    visible: false }
    new:          { name: "New Products",       visible: false }

  $scope.bulkActions = [ name: "Reset Stock Levels To Defaults", callback: 'resetStock' ]

  $scope.columns = Columns.columns

  $scope.resetSelectFilters = ->
    $scope.producerFilter = 0
    $scope.query = ''

  $scope.resetSelectFilters()

  $scope.filtersApplied = ->
    $scope.producerFilter != 0 || $scope.query != ''

  $scope.initialise = ->
    SpreeApiAuth.authorise()
    .then ->
      $scope.spree_api_key_ok = true
      $scope.fetchProducts()
    .catch (message) ->
      $scope.api_error_msg = message


  $scope.fetchProducts = ->
    url = "/api/products/overridable?page=::page::;per_page=100"
    PagedFetcher.fetch url, (data) => $scope.addProducts data.products


  $scope.addProducts = (products) ->
    $scope.products = $scope.products.concat products
    VariantOverrides.ensureDataFor hubs, products

  $scope.displayDirty = ->
    if DirtyVariantOverrides.count() > 0
      num = if DirtyVariantOverrides.count() == 1 then "one override" else "#{DirtyVariantOverrides.count()} overrides"
      StatusMessage.display 'notice', "Changes to #{num} remain unsaved."
    else
      StatusMessage.clear()

  $scope.update = ->
    if DirtyVariantOverrides.count() == 0
      StatusMessage.display 'alert', 'No changes to save.'
    else
      StatusMessage.display 'progress', 'Saving...'
      DirtyVariantOverrides.save()
      .success (updatedVos) ->
        DirtyVariantOverrides.clear()
        VariantOverrides.updateIds updatedVos
        $scope.variant_overrides_form.$setPristine()
        StatusMessage.display 'success', 'Thay đổi đã lưu.'
        VariantOverrides.updateData updatedVos # Refresh page data
      .error (data, status) ->
        StatusMessage.display 'failure', $scope.updateError(data, status)


  $scope.updateError = (data, status) ->
    if status == 401
      "Tôi không thể có được ủy quyền để lưu các thay đổi đó, do đó, chúng vẫn chưa được lưu."

    else if status == 400 && data.errors?
      errors = []
      for field, field_errors of data.errors
        errors = errors.concat field_errors
      errors = errors.join ', '
      "Có một số vấn đề về việc lưu lại: #{errors}"
    else
      "Ồ không! Thay đổi của bạn không thể lưu."

  $scope.resetStock = ->
    if DirtyVariantOverrides.count() > 0
      StatusMessage.display 'alert', 'Lưu thay đổi trước tiên.'
      $timeout ->
        $scope.displayDirty()
      , 3000 # 3 second delay
    else
      return unless $scope.hub_id?
      StatusMessage.display 'progress', 'Đang thay đổi kho...'
      $http
        method: "POST"
        url: "/admin/variant_overrides/bulk_reset"
        data: { hub_id: $scope.hub_id }
      .success (updatedVos) ->
        VariantOverrides.updateData updatedVos
        StatusMessage.display 'success', 'Kho đã được đặt lại về mặc định.'
      .error (data, status) ->
        $timeout -> StatusMessage.display 'failure', $scope.updateError(data, status)
