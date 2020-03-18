"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var NegotiationController = /*#__PURE__*/function () {
  function NegotiationController() {
    _classCallCheck(this, NegotiationController);

    var $ = document.querySelector.bind(document);
    this._inputDate = $('#date');
    this._inputQty = $('#qty');
    this._inputValue = $('#value');
    this._currentOrder = '';
    this._service = new NegotiationService();
    this._negotiationsList = new Bind(new NegotiationsList(), new NegotiationsView($('#negotiationsView')), 'add', 'clear', 'orderBy', 'reverseOrder');
    this._message = new Bind(new Message(), new MessageView($('#messageView')), 'text');

    this._init();
  }

  _createClass(NegotiationController, [{
    key: "_init",
    value: function _init() {
      var _this = this;

      this._importNegotiations();

      this._service.list().then(function (negotiations) {
        return negotiations.forEach(function (negotiation) {
          return _this._negotiationsList.add(negotiation);
        });
      })["catch"](function (error) {
        return _this._message.text = error;
      });

      setInterval(function () {
        _this._importNegotiations();
      }, 3000);
    }
  }, {
    key: "add",
    value: function add(event) {
      var _this2 = this;

      event.preventDefault();

      var negotiation = this._criateNegotiation();

      this._service.register(negotiation).then(function (message) {
        _this2._negotiationsList.add(negotiation);

        _this2._message.text = message;

        _this2._clearForm();
      })["catch"](function (error) {
        return _this2._message.text = error;
      });
    }
  }, {
    key: "_importNegotiations",
    value: function _importNegotiations() {
      var _this3 = this;

      this._service["import"](this._negotiationsList.negotiations).then(function (negotiations) {
        return negotiations.forEach(function (negotiation) {
          _this3._negotiationsList.add(negotiation);

          _this3._message.text = 'Negociações do período importadas';
        });
      })["catch"](function (erro) {
        return _this3._message.text = erro;
      });
    }
  }, {
    key: "delete",
    value: function _delete() {
      var _this4 = this;

      this._service.clear().then(function (message) {
        _this4._message.text = message;

        _this4._negotiationsList.clear();
      });
    }
  }, {
    key: "_criateNegotiation",
    value: function _criateNegotiation() {
      return new Negotiation(DateHelper.dateStringfy(this._inputDate.value), Number(this._inputQty.value), Number(this._inputValue.value));
    }
  }, {
    key: "_clearForm",
    value: function _clearForm() {
      this._inputDate.value = '';
      this._inputQty.value = 1;
      this._inputValue.value = 0.0;

      this._inputDate.focus();
    }
  }, {
    key: "orderBy",
    value: function orderBy(column) {
      if (this._currentOrder === column) {
        this._negotiationsList.reverseOrder();
      } else {
        this._negotiationsList.orderBy(function (p, s) {
          return p[column] - s[column];
        });
      }

      this._currentOrder = column;
    }
  }]);

  return NegotiationController;
}();