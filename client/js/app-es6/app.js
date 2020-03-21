import {currentInstance} from './controllers/NegotiationController';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import 'bootstrap/js/modal.js';
import '../../css/styles.css';
let negotiationController = currentInstance();

document.querySelector('#formNegotiation').onsubmit = negotiationController
  .add.bind(negotiationController);
document.querySelector('#clearAll').onclick = negotiationController
  .delete.bind(negotiationController);
