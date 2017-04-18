(function() {
  angular.module("ofn.admin").factory('Enterprises', function(my_enterprises, all_enterprises) {
    var Enterprises;
    return new (Enterprises = (function() {
      function Enterprises() {
        this.my_enterprises = my_enterprises;
        this.all_enterprises = all_enterprises;
      }

      return Enterprises;

    })());
  });

}).call(this);
