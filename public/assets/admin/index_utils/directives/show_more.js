(function() {
  angular.module("admin.indexUtils").component('showMore', {
    templateUrl: 'admin/show_more.html',
    bindings: {
      data: "=",
      limit: "=",
      increment: "="
    }
  });

}).call(this);
