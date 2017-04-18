(function() {
  angular.module("admin.utils").factory("StatusMessage", function($timeout) {
    var StatusMessage;
    return new (StatusMessage = (function() {
      function StatusMessage() {}

      StatusMessage.prototype.types = {
        progress: {
          timeout: false,
          style: {
            color: '#ff9906'
          }
        },
        alert: {
          timeout: 5000,
          style: {
            color: 'grey'
          }
        },
        notice: {
          timeout: false,
          style: {
            color: 'grey'
          }
        },
        success: {
          timeout: 5000,
          style: {
            color: '#9fc820'
          }
        },
        failure: {
          timeout: false,
          style: {
            color: '#da5354'
          }
        }
      };

      StatusMessage.prototype.statusMessage = {
        text: "",
        style: {}
      };

      StatusMessage.prototype.active = function() {
        return this.statusMessage.text !== '';
      };

      StatusMessage.prototype.display = function(type, text) {
        var timeout;
        this.statusMessage.text = text;
        this.statusMessage.style = this.types[type].style;
        if (this.statusMessage.timeout) {
          $timeout.cancel(this.statusMessage.timeout);
        }
        timeout = this.types[type].timeout;
        if (timeout) {
          this.statusMessage.timeout = $timeout((function(_this) {
            return function() {
              return _this.clear();
            };
          })(this), timeout, true);
        }
        return null;
      };

      StatusMessage.prototype.clear = function() {
        this.statusMessage.text = '';
        return this.statusMessage.style = {};
      };

      return StatusMessage;

    })());
  });

}).call(this);
