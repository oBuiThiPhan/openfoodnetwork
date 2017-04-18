(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  angular.module("admin.indexUtils").factory("pendingChanges", function($q, resources, StatusMessage) {
    var pendingChanges;
    return new (pendingChanges = (function() {
      function pendingChanges() {
        this.submitAll = bind(this.submitAll, this);
        this.remove = bind(this.remove, this);
        this.removeAll = bind(this.removeAll, this);
        this.add = bind(this.add, this);
      }

      pendingChanges.prototype.pendingChanges = {};

      pendingChanges.prototype.errors = [];

      pendingChanges.prototype.add = function(id, attr, change) {
        if (!this.pendingChanges.hasOwnProperty("" + id)) {
          this.pendingChanges["" + id] = {};
        }
        this.pendingChanges["" + id]["" + attr] = change;
        return StatusMessage.display('notice', "Thay đổi " + (this.changeCount(this.pendingChanges)) + " chưa được lưu");
      };

      pendingChanges.prototype.removeAll = function() {
        this.pendingChanges = {};
        return StatusMessage.clear();
      };

      pendingChanges.prototype.remove = function(id, attr) {
        if (this.pendingChanges.hasOwnProperty("" + id)) {
          delete this.pendingChanges["" + id]["" + attr];
          if (this.changeCount(this.pendingChanges["" + id]) < 1) {
            return delete this.pendingChanges["" + id];
          }
        }
      };

      pendingChanges.prototype.submitAll = function(form) {
        var all, attrName, change, id, objectChanges, ref;
        if (form == null) {
          form = null;
        }
        all = [];
        this.errors = [];
        StatusMessage.display('progress', "Đang lưu...");
        ref = this.pendingChanges;
        for (id in ref) {
          objectChanges = ref[id];
          for (attrName in objectChanges) {
            change = objectChanges[attrName];
            all.push(this.submit(change));
          }
        }
        $q.all(all).then((function(_this) {
          return function() {
            if (_this.errors.length === 0) {
              StatusMessage.display('success', "Tất cả thay đổi đã được lưu");
              if (form != null) {
                return form.$setPristine();
              }
            } else {
              return StatusMessage.display('failure', "Ồ không! Thay đổi của bạn không thể lưu!");
            }
          };
        })(this));
        return all;
      };

      pendingChanges.prototype.submit = function(change) {
        return resources.update(change).$promise.then((function(_this) {
          return function(data) {
            _this.remove(change.object.id, change.attr);
            change.scope.reset(data["" + change.attr]);
            return change.scope.success();
          };
        })(this), (function(_this) {
          return function(error) {
            _this.errors.push(error);
            return change.scope.error();
          };
        })(this));
      };

      pendingChanges.prototype.unsavedCount = function() {
        return Object.keys(this.pendingChanges).length;
      };

      pendingChanges.prototype.changeCount = function(objectChanges) {
        return Object.keys(objectChanges).length;
      };

      return pendingChanges;

    })());
  });

}).call(this);
