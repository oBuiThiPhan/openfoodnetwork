(function() {
  angular.module("admin.taxons").factory("Taxons", function(taxons, $filter) {
    var Taxons;
    return new (Taxons = (function() {
      Taxons.prototype.all = [];

      Taxons.prototype.byID = {};

      function Taxons() {
        var i, len, taxon;
        for (i = 0, len = taxons.length; i < len; i++) {
          taxon = taxons[i];
          this.all.push(taxon);
          this.byID[taxon.id] = taxon;
        }
      }

      Taxons.prototype.findByID = function(id) {
        return this.byID[id];
      };

      Taxons.prototype.findByIDs = function(ids) {
        var i, len, ref, results, taxon_id;
        ref = ids.split(",");
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          taxon_id = ref[i];
          if (this.byID[taxon_id]) {
            results.push(this.byID[taxon_id]);
          }
        }
        return results;
      };

      Taxons.prototype.findByTerm = function(term) {
        return $filter('filter')(this.all, term);
      };

      return Taxons;

    })());
  });

}).call(this);
