"use strict";

System.register([], function (_export, _context) {
  "use strict";

  var Message;

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
      _export("Message", Message = function () {
        function Message(text) {
          _classCallCheck(this, Message);

          this._text = text || '';
        }

        _createClass(Message, [{
          key: "text",
          get: function get() {
            return this._text;
          },
          set: function set(text) {
            this._text = text;
          }
        }]);

        return Message;
      }());

      _export("Message", Message);

      ;
    }
  };
});