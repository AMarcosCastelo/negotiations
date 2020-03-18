"use strict";

System.register(["./controllers/NegotiationController"], function (_export, _context) {
  "use strict";

  var currentInstance, negotiationController;
  return {
    setters: [function (_controllersNegotiationController) {
      currentInstance = _controllersNegotiationController.currentInstance;
    }],
    execute: function () {
      negotiationController = currentInstance();
      document.querySelector('#formNegotiation').onsubmit = negotiationController.add.bind(negotiationController);
      document.querySelector('#clearAll').onclick = negotiationController["delete"].bind(negotiationController);
    }
  };
});