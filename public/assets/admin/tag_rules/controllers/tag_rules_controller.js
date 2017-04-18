(function() {
  angular.module("admin.tagRules").controller("TagRulesCtrl", function($scope, $http, $filter, enterprise) {
    $scope.tagGroups = enterprise.tag_groups;
    $scope.defaultTagGroup = enterprise.default_tag_group;
    $scope.visibilityOptions = [
      {
        id: "visible",
        name: "VISIBLE"
      }, {
        id: "hidden",
        name: "NOT VISIBLE"
      }
    ];
    $scope.updateRuleCounts = function() {
      var i, index, len, ref, results, tagGroup;
      index = $scope.defaultTagGroup.rules.length;
      ref = $filter('orderBy')($scope.tagGroups, 'position');
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        tagGroup = ref[i];
        tagGroup.startIndex = index;
        results.push(index = index + tagGroup.rules.length);
      }
      return results;
    };
    $scope.updateRuleCounts();
    $scope.updateTagsRulesFor = function(tagGroup) {
      var i, len, ref, results, tag, tagRule;
      ref = tagGroup.rules;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        tagRule = ref[i];
        results.push(tagRule.preferred_customer_tags = ((function() {
          var j, len1, ref1, results1;
          ref1 = tagGroup.tags;
          results1 = [];
          for (j = 0, len1 = ref1.length; j < len1; j++) {
            tag = ref1[j];
            results1.push(tag.text);
          }
          return results1;
        })()).join(","));
      }
      return results;
    };
    $scope.addNewRuleTo = function(tagGroup, ruleType) {
      var newRule, tag;
      newRule = {
        id: null,
        is_default: tagGroup === $scope.defaultTagGroup,
        preferred_customer_tags: ((function() {
          var i, len, ref, results;
          ref = tagGroup.tags;
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            tag = ref[i];
            results.push(tag.text);
          }
          return results;
        })()).join(","),
        type: "TagRule::" + ruleType
      };
      switch (ruleType) {
        case "DiscountOrder":
          newRule.calculator = {
            preferred_flat_percent: 0
          };
          break;
        case "FilterShippingMethods":
          newRule.peferred_shipping_method_tags = [];
          newRule.preferred_matched_shipping_methods_visibility = "visible";
          break;
        case "FilterPaymentMethods":
          newRule.peferred_payment_method_tags = [];
          newRule.preferred_matched_payment_methods_visibility = "visible";
          break;
        case "FilterProducts":
          newRule.peferred_variant_tags = [];
          newRule.preferred_matched_variants_visibility = "visible";
          break;
        case "FilterOrderCycles":
          newRule.peferred_exchange_tags = [];
          newRule.preferred_matched_order_cycles_visibility = "visible";
      }
      tagGroup.rules.push(newRule);
      return $scope.updateRuleCounts();
    };
    $scope.addNewTag = function() {
      return $scope.tagGroups.push({
        tags: [],
        rules: [],
        position: $scope.tagGroups.length + 1
      });
    };
    return $scope.deleteTagRule = function(tagGroup, tagRule) {
      var index;
      index = tagGroup.rules.indexOf(tagRule);
      if (!(index >= 0)) {
        return;
      }
      if (tagRule.id === null) {
        tagGroup.rules.splice(index, 1);
        return $scope.updateRuleCounts();
      } else {
        if (confirm("Are you sure?")) {
          return $http({
            method: "DELETE",
            url: "/admin/enterprises/" + enterprise.id + "/tag_rules/" + tagRule.id + ".json"
          }).success(function() {
            tagGroup.rules.splice(index, 1);
            $scope.updateRuleCounts();
            return $scope.enterprise_form.$setDirty();
          });
        }
      }
    };
  });

}).call(this);
