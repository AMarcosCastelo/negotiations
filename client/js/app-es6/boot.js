import {currentInstance} from './controllers/NegotiationController';

let negotiationController = currentInstance();

document.querySelector('#formNegotiation').onsubmit = negotiationController
  .add.bind(negotiationController);
document.querySelector('#clearAll').onclick = negotiationController
  .delete.bind(negotiationController);
