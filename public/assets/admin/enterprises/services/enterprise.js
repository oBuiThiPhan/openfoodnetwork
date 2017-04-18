(function() {
  angular.module("admin.enterprises").factory('Enterprise', function(enterprise) {
    var Enterprise;
    return new (Enterprise = (function() {
      function Enterprise() {}

      Enterprise.prototype.enterprise = enterprise;

      return Enterprise;

    })());
  });

}).call(this);
