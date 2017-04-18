(function() {
  angular.module("admin.resources").factory("Customers", function($q, InfoDialog, RequestMonitor, CustomerResource, CurrentShop) {
    var Customers;
    return new (Customers = (function() {
      function Customers() {}

      Customers.prototype.all = [];

      Customers.prototype.byID = {};

      Customers.prototype.pristineByID = {};

      Customers.prototype.add = function(email) {
        var params;
        params = {
          enterprise_id: CurrentShop.shop.id,
          email: email
        };
        return CustomerResource.create(params, (function(_this) {
          return function(customer) {
            if (customer.id) {
              _this.all.unshift(customer);
              _this.byID[customer.id] = customer;
              return _this.pristineByID[customer.id] = angular.copy(customer);
            }
          };
        })(this));
      };

      Customers.prototype.remove = function(customer) {
        var params;
        params = {
          id: customer.id
        };
        return CustomerResource.destroy(params, (function(_this) {
          return function() {
            var i;
            i = _this.all.indexOf(customer);
            if (!(i < 0)) {
              return _this.all.splice(i, 1);
            }
          };
        })(this), (function(_this) {
          return function(response) {
            var errors;
            errors = response.data.errors;
            if (errors != null) {
              return InfoDialog.open('error', errors[0]);
            } else {
              return InfoDialog.open('error', "Could not delete customer: " + customer.email);
            }
          };
        })(this));
      };

      Customers.prototype.index = function(params) {
        var request;
        this.clear();
        request = CustomerResource.index(params, (function(_this) {
          return function(data) {
            return _this.load(data);
          };
        })(this));
        RequestMonitor.load(request.$promise);
        return request.$promise;
      };

      Customers.prototype.load = function(customers) {
        var customer, j, len, results;
        results = [];
        for (j = 0, len = customers.length; j < len; j++) {
          customer = customers[j];
          this.all.push(customer);
          this.byID[customer.id] = customer;
          results.push(this.pristineByID[customer.id] = angular.copy(customer));
        }
        return results;
      };

      Customers.prototype.update = function(address, customer, addressType) {
        var obj, params;
        params = {
          id: customer.id,
          customer: (
            obj = {},
            obj[addressType + "_attributes"] = address,
            obj
          )
        };
        return CustomerResource.update(params);
      };

      Customers.prototype.clear = function() {
        return this.all.length = 0;
      };

      return Customers;

    })());
  });

}).call(this);
