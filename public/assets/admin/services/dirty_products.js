(function() {
  angular.module("ofn.admin").factory("DirtyProducts", function($parse) {
    var addDirtyProperty, dirtyProducts;
    dirtyProducts = {};
    addDirtyProperty = function(dirtyObjects, objectID, propertyName, propertyValue) {
      if (!dirtyObjects.hasOwnProperty(objectID)) {
        dirtyObjects[objectID] = {
          id: objectID
        };
      }
      return $parse(propertyName).assign(dirtyObjects[objectID], propertyValue);
    };
    return {
      all: function() {
        return dirtyProducts;
      },
      addProductProperty: function(productID, propertyName, propertyValue) {
        return addDirtyProperty(dirtyProducts, productID, propertyName, propertyValue);
      },
      addMasterProperty: function(productID, masterID, propertyName, propertyValue) {
        if (!dirtyProducts.hasOwnProperty(productID) || !dirtyProducts[productID].hasOwnProperty("master")) {
          addDirtyProperty(dirtyProducts, productID, "master", {
            id: masterID
          });
        }
        return $parse(propertyName).assign(dirtyProducts[productID]["master"], propertyValue);
      },
      addVariantProperty: function(productID, variantID, propertyName, propertyValue) {
        if (!dirtyProducts.hasOwnProperty(productID) || !dirtyProducts[productID].hasOwnProperty("variants")) {
          addDirtyProperty(dirtyProducts, productID, "variants", {});
        }
        return addDirtyProperty(dirtyProducts[productID]["variants"], variantID, propertyName, propertyValue);
      },
      removeProductProperty: function(productID, propertyName) {
        if (dirtyProducts.hasOwnProperty("" + productID) && dirtyProducts["" + productID].hasOwnProperty("" + propertyName)) {
          delete dirtyProducts["" + productID]["" + propertyName];
          if (Object.keys(dirtyProducts["" + productID]).length === 1) {
            return this.deleteProduct(productID);
          }
        }
      },
      removeVariantProperty: function(productID, variantID, propertyName) {
        if (dirtyProducts.hasOwnProperty("" + productID) && dirtyProducts["" + productID].hasOwnProperty("variants") && dirtyProducts["" + productID]["variants"].hasOwnProperty(variantID) && dirtyProducts["" + productID]["variants"]["" + variantID].hasOwnProperty("" + propertyName)) {
          delete dirtyProducts["" + productID]["variants"]["" + variantID]["" + propertyName];
          if (Object.keys(dirtyProducts["" + productID]["variants"]["" + variantID]).length === 1) {
            return this.deleteVariant(productID, variantID);
          }
        }
      },
      deleteProduct: function(productID) {
        if (dirtyProducts.hasOwnProperty(productID)) {
          return delete dirtyProducts[productID];
        }
      },
      deleteVariant: function(productID, variantID) {
        if (dirtyProducts.hasOwnProperty(productID) && dirtyProducts[productID].hasOwnProperty("variants") && dirtyProducts[productID].variants.hasOwnProperty(variantID)) {
          delete dirtyProducts["" + productID]["variants"]["" + variantID];
          if (Object.keys(dirtyProducts["" + productID]["variants"]).length < 1) {
            return this.removeProductProperty(productID, "variants");
          }
        }
      },
      count: function() {
        return Object.keys(dirtyProducts).length;
      },
      clear: function() {
        return dirtyProducts = {};
      }
    };
  });

}).call(this);
