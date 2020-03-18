"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ProxyFactory = /*#__PURE__*/function () {
  function ProxyFactory() {
    _classCallCheck(this, ProxyFactory);
  }

  _createClass(ProxyFactory, null, [{
    key: "create",
    value: function create(obj, props, action) {
      return new Proxy(obj, {
        get: function get(target, prop, receiver) {
          if (props.includes(prop) && ProxyFactory._isFunction(target[prop])) {
            return function () {
              var giveBack = Reflect.apply(target[prop], target, arguments);
              action(target);
              return giveBack;
            };
          }

          return Reflect.get(target, prop, receiver);
        },
        set: function set(target, prop, value, receiver) {
          var giveBack = Reflect.set(target, prop, value, receiver);
          if (props.includes(prop)) action(target);
          return giveBack;
        }
      });
    }
  }, {
    key: "_isFunction",
    value: function _isFunction(func) {
      return _typeof(func) === (typeof Function === "undefined" ? "undefined" : _typeof(Function));
    }
  }]);

  return ProxyFactory;
}();

;