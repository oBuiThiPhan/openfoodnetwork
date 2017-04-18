(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  angular.module("admin.side_menu").factory("SideMenu", function() {
    var SideMenu;
    return new (SideMenu = (function() {
      function SideMenu() {
        this.show_item_by_name = bind(this.show_item_by_name, this);
        this.hide_item_by_name = bind(this.hide_item_by_name, this);
        this.find_by_name = bind(this.find_by_name, this);
        this.select = bind(this.select, this);
        this.setItems = bind(this.setItems, this);
      }

      SideMenu.prototype.items = [];

      SideMenu.prototype.selected = null;

      SideMenu.prototype.setItems = function(items) {
        var i, item, len, ref, results;
        this.items = items;
        ref = this.items;
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          item = ref[i];
          results.push(item.visible = true);
        }
        return results;
      };

      SideMenu.prototype.select = function(index) {
        if (index < this.items.length) {
          if (this.selected) {
            this.selected.selected = false;
          }
          this.selected = this.items[index];
          return this.selected.selected = true;
        }
      };

      SideMenu.prototype.find_by_name = function(name) {
        var i, item, len, ref;
        ref = this.items;
        for (i = 0, len = ref.length; i < len; i++) {
          item = ref[i];
          if (item.name === name) {
            return item;
          }
        }
        return null;
      };

      SideMenu.prototype.hide_item_by_name = function(name) {
        var item;
        item = this.find_by_name(name);
        if (item) {
          return item.visible = false;
        }
      };

      SideMenu.prototype.show_item_by_name = function(name) {
        var item;
        item = this.find_by_name(name);
        if (item) {
          return item.visible = true;
        }
      };

      return SideMenu;

    })());
  });

}).call(this);
