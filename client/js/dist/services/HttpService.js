"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var HttpService = /*#__PURE__*/function () {
  function HttpService() {
    _classCallCheck(this, HttpService);
  }

  _createClass(HttpService, [{
    key: "_handleErrors",
    value: function _handleErrors(res) {
      if (!res.ok) throw new Error(res.statusText);
      return res;
    }
  }, {
    key: "get",
    value: function get(url) {
      var _this = this;

      return fetch(url).then(function (res) {
        return _this._handleErrors(res);
      }).then(function (res) {
        return res.json();
      });
    }
  }, {
    key: "post",
    value: function post(url, data) {
      var _this2 = this;

      return fetch(url, {
        headers: {
          'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(data)
      }).then(function (res) {
        return _this2._handleErrors(res);
      });
    }
  }]);

  return HttpService;
}();

;