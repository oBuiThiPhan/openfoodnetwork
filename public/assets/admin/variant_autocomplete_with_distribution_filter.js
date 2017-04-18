(function() {
  var formatVariantResult;

  $(document).ready(function() {
    if ($("#variant_autocomplete_template").length > 0) {
      return window.variantTemplate = Handlebars.compile($("#variant_autocomplete_template").text());
    }
  });

  formatVariantResult = function(variant) {
    if (variant["images"][0] !== void 0 && variant["images"][0].image !== void 0) {
      variant.image = variant.images[0].image.mini_url;
    }
    return variantTemplate({
      variant: variant
    });
  };

  $.fn.variantAutocomplete = function() {
    if (Spree.routes) {
      this.parent().children(".options_placeholder").attr("id", this.parent().data("index"));
      return this.select2({
        placeholder: "Chọn một biến thể",
        minimumInputLength: 3,
        ajax: {
          url: Spree.routes.variants_search,
          datatype: "json",
          data: function(term, page) {
            return {
              q: term,
              distributor_id: $("#order_distributor_id").val(),
              order_cycle_id: $("#order_order_cycle_id").val()
            };
          },
          results: function(data, page) {
            return {
              results: data
            };
          }
        },
        formatResult: formatVariantResult,
        formatSelection: function(variant) {
          $(this.element).parent().children(".options_placeholder").html(variant.options_text);
          return variant.name;
        }
      });
    }
  };

}).call(this);
