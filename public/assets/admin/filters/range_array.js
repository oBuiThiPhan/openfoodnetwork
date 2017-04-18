(function() {
  angular.module("ofn.admin").filter("rangeArray", function() {
    return function(input, start, end) {
      var i, j, ref, ref1;
      for (i = j = ref = start, ref1 = end; ref <= ref1 ? j <= ref1 : j >= ref1; i = ref <= ref1 ? ++j : --j) {
        input.push(i);
      }
      return input;
    };
  });

}).call(this);
