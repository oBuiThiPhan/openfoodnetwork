(function() {
  angular.module("admin.taxons").directive("ofnTaxonAutocomplete", function(Taxons, $sanitize) {
    return {
      scope: true,
      link: function(scope, element, attrs) {
        var initalSelection, multiple, placeholder;
        multiple = scope.$eval(attrs.multipleSelection);
        placeholder = attrs.placeholder;
        initalSelection = scope.$eval(attrs.ngModel);
        return setTimeout(function() {
          element.select2({
            placeholder: placeholder,
            multiple: multiple,
            initSelection: function(element, callback) {
              if (multiple) {
                return callback(Taxons.findByIDs(initalSelection));
              } else {
                return callback(Taxons.findByID(initalSelection));
              }
            },
            query: function(query) {
              return query.callback({
                results: Taxons.findByTerm(query.term)
              });
            },
            formatResult: function(taxon) {
              return $sanitize(taxon.name);
            },
            formatSelection: function(taxon) {
              return taxon.name;
            }
          });
          if (multiple) {
            return element.select2("container").find("ul.select2-choices").sortable({
              containment: 'parent',
              start: function() {
                return element.select2("onSortStart");
              },
              update: function() {
                return element.select2("onSortEnd");
              }
            });
          }
        });
      }
    };
  });

}).call(this);
