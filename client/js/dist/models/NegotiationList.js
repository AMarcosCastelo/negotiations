"use strict";

System.register([], function (_export, _context) {
  "use strict";

  var NegotiationsList;

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
      _export("NegotiationsList", NegotiationsList = function () {
        function NegotiationsList() {
          _classCallCheck(this, NegotiationsList);

          this._negotiations = [];
        }

        _createClass(NegotiationsList, [{
          key: "add",
          value: function add(negotiation) {
            this._negotiations.push(negotiation);
          }
        }, {
          key: "clear",
          value: function clear() {
            this._negotiations = [];
          }
        }, {
          key: "orderBy",
          value: function orderBy(criterion) {
            this._negotiations.sort(criterion);
          }
        }, {
          key: "reverseOrder",
          value: function reverseOrder() {
            this._negotiations.reverse();
          }
        }, {
          key: "negotiations",
          get: function get() {
            return [].concat(this._negotiations);
          }
        }, {
          key: "totalVolume",
          get: function get() {
            return this._negotiations.reduce(function (total, n) {
              return total + n.amount;
            }, 0.0);
          }
        }]);

        return NegotiationsList;
      }());

      _export("NegotiationsList", NegotiationsList);

      ;
    }
  };
});