angular.module("admin.indexUtils").factory "pendingChanges", ($q, resources, StatusMessage) ->
  new class pendingChanges
    pendingChanges: {}
    errors: []

    add: (id, attr, change) =>
      @pendingChanges["#{id}"] = {} unless @pendingChanges.hasOwnProperty("#{id}")
      @pendingChanges["#{id}"]["#{attr}"] = change
      StatusMessage.display('notice', "Thay đổi #{@changeCount(@pendingChanges)} chưa được lưu")

    removeAll: =>
      @pendingChanges = {}
      StatusMessage.clear()


    remove: (id, attr) =>
      if @pendingChanges.hasOwnProperty("#{id}")
        delete @pendingChanges["#{id}"]["#{attr}"]
        delete @pendingChanges["#{id}"] if @changeCount( @pendingChanges["#{id}"] ) < 1

    submitAll: (form=null) =>
      all = []
      @errors = []
      StatusMessage.display('progress', "Đang lưu...")
      for id, objectChanges of @pendingChanges
        for attrName, change of objectChanges
          all.push @submit(change)
      $q.all(all).then =>
        if @errors.length == 0
          StatusMessage.display('success', "Tất cả thay đổi đã được lưu")
          form.$setPristine() if form?
        else
          StatusMessage.display('failure', "Ồ không! Thay đổi của bạn không thể lưu!")
      all

    submit: (change) ->
      resources.update(change).$promise.then (data) =>
        @remove change.object.id, change.attr
        change.scope.reset( data["#{change.attr}"] )
        change.scope.success()
      , (error) =>
        @errors.push error
        change.scope.error()

    unsavedCount: ->
      Object.keys(@pendingChanges).length

    changeCount: (objectChanges) ->
      Object.keys(objectChanges).length
