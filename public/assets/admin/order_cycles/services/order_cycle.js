(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  angular.module('admin.orderCycles').factory('OrderCycle', function($resource, $window, StatusMessage, Panels) {
    var OrderCycle, OrderCycleResource;
    OrderCycleResource = $resource('/admin/order_cycles/:action_name/:order_cycle_id.json', {}, {
      'index': {
        method: 'GET',
        isArray: true
      },
      'new': {
        method: 'GET',
        params: {
          action_name: "new"
        }
      },
      'create': {
        method: 'POST'
      },
      'update': {
        method: 'PUT'
      }
    });
    return new (OrderCycle = (function() {
      function OrderCycle() {
        this.novelDistributor = bind(this.novelDistributor, this);
        this.novelSupplier = bind(this.novelSupplier, this);
      }

      OrderCycle.prototype.order_cycle = {
        incoming_exchanges: [],
        outgoing_exchanges: []
      };

      OrderCycle.prototype.showProducts = {
        incoming: false,
        outgoing: false
      };

      OrderCycle.prototype.loaded = false;

      OrderCycle.prototype.exchangeIds = function(direction) {
        var exchange, i, len, ref, results;
        ref = this.exchangesByDirection(direction);
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          exchange = ref[i];
          results.push(parseInt(exchange.enterprise_id));
        }
        return results;
      };

      OrderCycle.prototype.novelSupplier = function(enterprise) {
        var id;
        id = (enterprise != null ? enterprise.id : void 0) || parseInt(enterprise);
        return this.exchangeIds('incoming').indexOf(id) === -1;
      };

      OrderCycle.prototype.novelDistributor = function(enterprise) {
        var id;
        id = (enterprise != null ? enterprise.id : void 0) || parseInt(enterprise);
        return this.exchangeIds('outgoing').indexOf(id) === -1;
      };

      OrderCycle.prototype.exchangeSelectedVariants = function(exchange) {
        var active, id, numActiveVariants, ref;
        numActiveVariants = 0;
        ref = exchange.variants;
        for (id in ref) {
          active = ref[id];
          if (active) {
            numActiveVariants++;
          }
        }
        return numActiveVariants;
      };

      OrderCycle.prototype.exchangeDirection = function(exchange) {
        if (this.order_cycle.incoming_exchanges.indexOf(exchange) === -1) {
          return 'outgoing';
        } else {
          return 'incoming';
        }
      };

      OrderCycle.prototype.toggleAllProducts = function(direction) {
        var exchange, exchanges, i, len, results, state;
        this.showProducts[direction] = !this.showProducts[direction];
        state = this.showProducts[direction] ? "open" : "closed";
        exchanges = this.exchangesByDirection(direction);
        results = [];
        for (i = 0, len = exchanges.length; i < len; i++) {
          exchange = exchanges[i];
          results.push(Panels.toggle(exchange, 'products', state));
        }
        return results;
      };

      OrderCycle.prototype.setExchangeVariants = function(exchange, variants, selected) {
        var direction, editable, i, len, results, variant;
        direction = exchange.incoming ? "incoming" : "outgoing";
        editable = this.order_cycle["editable_variants_for_" + direction + "_exchanges"][exchange.enterprise_id] || [];
        results = [];
        for (i = 0, len = variants.length; i < len; i++) {
          variant = variants[i];
          if (!(indexOf.call(editable, variant) >= 0)) {
            continue;
          }
          exchange.variants[variant] = selected;
          if (exchange.incoming) {
            results.push(this.removeDistributionOfVariant(variant.id));
          } else {
            results.push(void 0);
          }
        }
        return results;
      };

      OrderCycle.prototype.addSupplier = function(new_supplier_id) {
        return this.order_cycle.incoming_exchanges.push({
          enterprise_id: new_supplier_id,
          incoming: true,
          active: true,
          variants: {},
          enterprise_fees: []
        });
      };

      OrderCycle.prototype.addDistributor = function(new_distributor_id) {
        return this.order_cycle.outgoing_exchanges.push({
          enterprise_id: new_distributor_id,
          incoming: false,
          active: true,
          variants: {},
          enterprise_fees: []
        });
      };

      OrderCycle.prototype.removeExchange = function(exchange) {
        var active, incoming_index, outgoing_index, ref, results, variant_id;
        if (exchange.incoming) {
          incoming_index = this.order_cycle.incoming_exchanges.indexOf(exchange);
          this.order_cycle.incoming_exchanges.splice(incoming_index, 1);
          ref = exchange.variants;
          results = [];
          for (variant_id in ref) {
            active = ref[variant_id];
            if (active) {
              results.push(this.removeDistributionOfVariant(variant_id));
            }
          }
          return results;
        } else {
          outgoing_index = this.order_cycle.outgoing_exchanges.indexOf(exchange);
          if (outgoing_index > -1) {
            return this.order_cycle.outgoing_exchanges.splice(outgoing_index, 1);
          }
        }
      };

      OrderCycle.prototype.addCoordinatorFee = function() {
        return this.order_cycle.coordinator_fees.push({});
      };

      OrderCycle.prototype.removeCoordinatorFee = function(index) {
        return this.order_cycle.coordinator_fees.splice(index, 1);
      };

      OrderCycle.prototype.addExchangeFee = function(exchange) {
        return exchange.enterprise_fees.push({});
      };

      OrderCycle.prototype.removeExchangeFee = function(exchange, index) {
        return exchange.enterprise_fees.splice(index, 1);
      };

      OrderCycle.prototype.productSuppliedToOrderCycle = function(product) {
        var ids, incomingExchangesVariants, product_variant_ids, variant, variant_id, variant_ids;
        product_variant_ids = (function() {
          var i, len, ref, results;
          ref = product.variants;
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            variant = ref[i];
            results.push(variant.id);
          }
          return results;
        })();
        variant_ids = [product.master_id].concat(product_variant_ids);
        incomingExchangesVariants = this.incomingExchangesVariants();
        ids = (function() {
          var i, len, results;
          results = [];
          for (i = 0, len = variant_ids.length; i < len; i++) {
            variant_id = variant_ids[i];
            if (incomingExchangesVariants.indexOf(variant_id) !== -1) {
              results.push(variant_id);
            }
          }
          return results;
        })();
        return ids.length > 0;
      };

      OrderCycle.prototype.variantSuppliedToOrderCycle = function(variant) {
        return this.incomingExchangesVariants().indexOf(variant.id) !== -1;
      };

      OrderCycle.prototype.incomingExchangesVariants = function() {
        var active, exchange, i, id, len, ref, ref1, variant_ids;
        variant_ids = [];
        ref = this.order_cycle.incoming_exchanges;
        for (i = 0, len = ref.length; i < len; i++) {
          exchange = ref[i];
          ref1 = exchange.variants;
          for (id in ref1) {
            active = ref1[id];
            if (active) {
              variant_ids.push(parseInt(id));
            }
          }
        }
        return variant_ids;
      };

      OrderCycle.prototype.participatingEnterpriseIds = function() {
        var distributors, exchange, suppliers;
        suppliers = (function() {
          var i, len, ref, results;
          ref = this.order_cycle.incoming_exchanges;
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            exchange = ref[i];
            results.push(exchange.enterprise_id);
          }
          return results;
        }).call(this);
        distributors = (function() {
          var i, len, ref, results;
          ref = this.order_cycle.outgoing_exchanges;
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            exchange = ref[i];
            results.push(exchange.enterprise_id);
          }
          return results;
        }).call(this);
        return jQuery.unique(suppliers.concat(distributors)).sort();
      };

      OrderCycle.prototype.exchangesByDirection = function(direction) {
        if (direction === 'incoming') {
          return this.order_cycle.incoming_exchanges;
        } else {
          return this.order_cycle.outgoing_exchanges;
        }
      };

      OrderCycle.prototype.removeDistributionOfVariant = function(variant_id) {
        var exchange, i, len, ref, results;
        ref = this.order_cycle.outgoing_exchanges;
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          exchange = ref[i];
          results.push(exchange.variants[variant_id] = false);
        }
        return results;
      };

      OrderCycle.prototype["new"] = function(params, callback) {
        if (callback == null) {
          callback = null;
        }
        OrderCycleResource["new"](params, (function(_this) {
          return function(oc) {
            delete oc.$promise;
            delete oc.$resolved;
            angular.extend(_this.order_cycle, oc);
            _this.order_cycle.incoming_exchanges = [];
            _this.order_cycle.outgoing_exchanges = [];
            delete _this.order_cycle.exchanges;
            _this.loaded = true;
            return (callback || angular.noop)(_this.order_cycle);
          };
        })(this));
        return this.order_cycle;
      };

      OrderCycle.prototype.load = function(order_cycle_id, callback) {
        var service;
        if (callback == null) {
          callback = null;
        }
        service = this;
        OrderCycleResource.get({
          order_cycle_id: order_cycle_id
        }, function(oc) {
          var exchange, i, len, ref;
          delete oc.$promise;
          delete oc.$resolved;
          angular.extend(service.order_cycle, oc);
          service.order_cycle.incoming_exchanges = [];
          service.order_cycle.outgoing_exchanges = [];
          ref = service.order_cycle.exchanges;
          for (i = 0, len = ref.length; i < len; i++) {
            exchange = ref[i];
            if (exchange.incoming) {
              angular.extend(exchange, {
                enterprise_id: exchange.sender_id,
                active: true
              });
              delete exchange.receiver_id;
              service.order_cycle.incoming_exchanges.push(exchange);
            } else {
              angular.extend(exchange, {
                enterprise_id: exchange.receiver_id,
                active: true
              });
              delete exchange.sender_id;
              service.order_cycle.outgoing_exchanges.push(exchange);
            }
          }
          delete service.order_cycle.exchanges;
          service.loaded = true;
          return (callback || angular.noop)(service.order_cycle);
        });
        return this.order_cycle;
      };

      OrderCycle.prototype.create = function(destination) {
        var oc;
        if (!this.confirmNoDistributors()) {
          return;
        }
        oc = new OrderCycleResource({
          order_cycle: this.dataForSubmit()
        });
        return oc.$create(function(data) {
          if (data['success']) {
            return $window.location = destination;
          } else {
            return console.log('Failed to create order cycle');
          }
        });
      };

      OrderCycle.prototype.update = function(destination, form) {
        var oc;
        if (!this.confirmNoDistributors()) {
          return;
        }
        oc = new OrderCycleResource({
          order_cycle: this.dataForSubmit()
        });
        return oc.$update({
          order_cycle_id: this.order_cycle.id,
          reloading: (destination != null ? 1 : 0)
        }, (function(_this) {
          return function(data) {
            if (data['success']) {
              if (form) {
                form.$setPristine();
              }
              if (destination != null) {
                return $window.location = destination;
              } else {
                return StatusMessage.display('success', 'Chu kỳ đặt hàng của bạn đã được cập nhật.');
              }
            } else {
              return console.log('Failed to update order cycle');
            }
          };
        })(this));
      };

      OrderCycle.prototype.confirmNoDistributors = function() {
        if (this.order_cycle.outgoing_exchanges.length === 0) {
          return confirm('Không có nhà phân phối nào trong chu kỳ đặt hàng này. Chu trình đặt hàng này sẽ không hiển thị cho khách hàng. Bạn có muốn tiếp tục lưu chu kỳ đặt hàng này không?');
        } else {
          return true;
        }
      };

      OrderCycle.prototype.dataForSubmit = function() {
        var data;
        data = this.deepCopy();
        data = this.stripNonSubmittableAttributes(data);
        data = this.removeInactiveExchanges(data);
        data = this.translateCoordinatorFees(data);
        data = this.translateExchangeFees(data);
        return data;
      };

      OrderCycle.prototype.deepCopy = function() {
        var all_exchanges, data, exchange, fee, i, len;
        data = angular.extend({}, this.order_cycle);
        if (this.order_cycle.incoming_exchanges != null) {
          data.incoming_exchanges = (function() {
            var i, len, ref, results;
            ref = this.order_cycle.incoming_exchanges;
            results = [];
            for (i = 0, len = ref.length; i < len; i++) {
              exchange = ref[i];
              results.push(angular.extend({}, exchange));
            }
            return results;
          }).call(this);
        }
        if (this.order_cycle.outgoing_exchanges != null) {
          data.outgoing_exchanges = (function() {
            var i, len, ref, results;
            ref = this.order_cycle.outgoing_exchanges;
            results = [];
            for (i = 0, len = ref.length; i < len; i++) {
              exchange = ref[i];
              results.push(angular.extend({}, exchange));
            }
            return results;
          }).call(this);
        }
        all_exchanges = (data.incoming_exchanges || []) + (data.outgoing_exchanges || []);
        for (i = 0, len = all_exchanges.length; i < len; i++) {
          exchange = all_exchanges[i];
          if (exchange.enterprise_fees != null) {
            exchange.enterprise_fees = (function() {
              var j, len1, ref, results;
              ref = exchange.enterprise_fees;
              results = [];
              for (j = 0, len1 = ref.length; j < len1; j++) {
                fee = ref[j];
                results.push(angular.extend({}, fee));
              }
              return results;
            })();
          }
        }
        return data;
      };

      OrderCycle.prototype.stripNonSubmittableAttributes = function(order_cycle) {
        delete order_cycle.id;
        delete order_cycle.viewing_as_coordinator;
        delete order_cycle.editable_variants_for_incoming_exchanges;
        delete order_cycle.editable_variants_for_outgoing_exchanges;
        delete order_cycle.visible_variants_for_outgoing_exchanges;
        return order_cycle;
      };

      OrderCycle.prototype.removeInactiveExchanges = function(order_cycle) {
        var exchange;
        order_cycle.incoming_exchanges = (function() {
          var i, len, ref, results;
          ref = order_cycle.incoming_exchanges;
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            exchange = ref[i];
            if (exchange.active) {
              results.push(exchange);
            }
          }
          return results;
        })();
        order_cycle.outgoing_exchanges = (function() {
          var i, len, ref, results;
          ref = order_cycle.outgoing_exchanges;
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            exchange = ref[i];
            if (exchange.active) {
              results.push(exchange);
            }
          }
          return results;
        })();
        return order_cycle;
      };

      OrderCycle.prototype.translateCoordinatorFees = function(order_cycle) {
        var fee;
        order_cycle.coordinator_fee_ids = (function() {
          var i, len, ref, results;
          ref = order_cycle.coordinator_fees;
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            fee = ref[i];
            results.push(fee.id);
          }
          return results;
        })();
        delete order_cycle.coordinator_fees;
        return order_cycle;
      };

      OrderCycle.prototype.translateExchangeFees = function(order_cycle) {
        var exchange, fee, i, j, len, len1, ref, ref1;
        ref = order_cycle.incoming_exchanges;
        for (i = 0, len = ref.length; i < len; i++) {
          exchange = ref[i];
          exchange.enterprise_fee_ids = (function() {
            var j, len1, ref1, results;
            ref1 = exchange.enterprise_fees;
            results = [];
            for (j = 0, len1 = ref1.length; j < len1; j++) {
              fee = ref1[j];
              results.push(fee.id);
            }
            return results;
          })();
          delete exchange.enterprise_fees;
        }
        ref1 = order_cycle.outgoing_exchanges;
        for (j = 0, len1 = ref1.length; j < len1; j++) {
          exchange = ref1[j];
          exchange.enterprise_fee_ids = (function() {
            var k, len2, ref2, results;
            ref2 = exchange.enterprise_fees;
            results = [];
            for (k = 0, len2 = ref2.length; k < len2; k++) {
              fee = ref2[k];
              results.push(fee.id);
            }
            return results;
          })();
          delete exchange.enterprise_fees;
        }
        return order_cycle;
      };

      OrderCycle.prototype.mirrorIncomingToOutgoingProducts = function() {
        var active, id, incoming, outgoing, ref, results;
        incoming = this.order_cycle.incoming_exchanges[0];
        outgoing = this.order_cycle.outgoing_exchanges[0];
        ref = incoming.variants;
        results = [];
        for (id in ref) {
          active = ref[id];
          results.push(outgoing.variants[id] = active);
        }
        return results;
      };

      return OrderCycle;

    })());
  });

}).call(this);
