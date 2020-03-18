import {View} from './View';
import {DateHelper} from '../helpers/DateHelper';
import {currentInstance} from '../controllers/NegotiationController';

export class NegotiationsView extends View {
    
  constructor(element) {
    super(element);

    element.addEventListener('click', function(event) {
      if (event.target.nodeName ==='TH')
        currentInstance().orderBy(event.target.textContent.toLowerCase());
    });
  };

  template(model) {
    return `
    <table class="table table-hover table-bordered">
      <thead>
        <tr>
          <th>DATA</th>
          <th>QUANTIDADE</th>
          <th>VALOR</th>
          <th>VOLUME</th>
        </tr>
      </thead>
  
      <tbody>
        ${model.negotiations.map(n => `
          <tr>
            <td>${DateHelper.parseDate(n.date)}</td>
            <td>${n.qty}</td>
            <td>${n.value}</td>
            <td>${n.amount}</td>
          </tr>
        `).join('')}                
      </tbody>
            
      <tfoot>
        <td colspan="3"></td>
        <td>
          ${model.totalVolume}
        </td>
      </tfoot>
    </table>
    `;
  };
};
