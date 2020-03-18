"use strict";

System.register([], function (_export, _context) {
  "use strict";

  var Negotiation;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  return {
    setters: [],
    execute: function () {
      _export("Negotiation", Negotiation = function () {
        function Negotiation(date, qty, value) {
          _classCallCheck(this, Negotiation);

          this._date = new Date(date.getTime());
          this._qty = qty;
          this._value = value;
          Object.freeze(this);
        }

        _createClass(Negotiation, [{
          key: "isEquals",
          value: function isEquals(anotherNegotiation) {
            return JSON.stringify(this) === JSON.stringify(anotherNegotiation);
          }
        }, {
          key: "amount",
          get: function get() {
            return this._qty * this._value;
          }
        }, {
          key: "date",
          get: function get() {
            return new Date(this._date.getTime());
          }
        }, {
          key: "qty",
          get: function get() {
            return this._qty;
          }
        }, {
          key: "value",
          get: function get() {
            return this._value;
          }
        }]);

        return Negotiation;
      }());

      _export("Negotiation", Negotiation);

      ;
    }
  };
});