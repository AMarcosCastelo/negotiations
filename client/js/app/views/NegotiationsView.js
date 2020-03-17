class NegotiationsView extends View {
    
  constructor(element) {
    super(element);
  };

  template(model) {
    return `
    <table class="table table-hover table-bordered">
      <thead>
        <tr>
          <th onclick="negotiationController.orderBy('date')">DATA</th>
          <th onclick="negotiationController.orderBy('qty')">QUANTIDADE</th>
          <th onclick="negotiationController.orderBy('value')">VALOR</th>
          <th onclick="negotiationController.orderBy('amount')">VOLUME</th>
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
