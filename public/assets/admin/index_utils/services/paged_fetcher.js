(function() {
  angular.module("admin.indexUtils").factory("PagedFetcher", function(dataFetcher) {
    var PagedFetcher;
    return new (PagedFetcher = (function() {
      function PagedFetcher() {}

      PagedFetcher.prototype.fetch = function(url, processData) {
        return dataFetcher(this.urlForPage(url, 1)).then((function(_this) {
          return function(data) {
            var i, page, ref, results;
            processData(data);
            if (data.pages > 1) {
              results = [];
              for (page = i = 2, ref = data.pages; 2 <= ref ? i <= ref : i >= ref; page = 2 <= ref ? ++i : --i) {
                results.push(dataFetcher(_this.urlForPage(url, page)).then(function(data) {
                  return processData(data);
                }));
              }
              return results;
            }
          };
        })(this));
      };

      PagedFetcher.prototype.urlForPage = function(url, page) {
        return url.replace("::page::", page);
      };

      return PagedFetcher;

    })());
  });

}).call(this);
