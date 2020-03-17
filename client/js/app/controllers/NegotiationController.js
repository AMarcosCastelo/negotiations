class NegotiationController {
  constructor() {
    let $ = document.querySelector.bind(document);
    
    this._inputDate = $('#date');
    this._inputQty = $('#qty');
    this._inputValue = $('#value');
    this._currentOrder = '';

    this._negotiationsList = new Bind(
      new NegotiationsList(), 
      new NegotiationsView($('#negotiationsView')),
      'add', 'clear' , 'orderBy', 'reverseOrder'
    );
    
    this._message = new Bind(
      new Message(), new MessageView($('#messageView')),
      'text'
    );

    ConnectionFactory.getConnection().then((connection) => new NegotiationDAO(connection))
      .then((dao) => dao.listAll()).then((negotiations) => 
        negotiations.forEach((negotiation) => 
          this._negotiationsList.add(negotiation)
        )
      ).catch((error) => {
        console.log(error);
        this._message.text = error;
      });
  };
  
  add(event) {
    event.preventDefault();

    ConnectionFactory.getConnection()
      .then((connection) => {
        let negotiation = this._criateNegotiation();
        new NegotiationDAO(connection).add(negotiation)
          .then(() => {
            this._negotiationsList.add(negotiation);
            this._message.text = 'Negociação adicionada com sucesso'; 
            this._clearForm();
          });
      }).catch((error) => this._message.text = error);
  };
  
  importNegotiations() {
    let service = new NegotiationService();
    service
      .getNegotiations()
      .then(negotiations => negotiations.forEach(negotiation => {
        this._negotiationsList.add(negotiation);
        this._message.text = 'Negociações do período importadas'; 
      }))
      .catch(erro => {
        console.log(erro);
        this._message.text = erro;
      });
  };
  
  delete() {
    ConnectionFactory.getConnection().then((connection) => new NegotiationDAO(connection))
      .then((dao) => dao.clearAll()).then((mensagem) => {

        this._message.text = mensagem;
        this._negotiationsList.clear();
      });
  };
  
  _criateNegotiation() {
      
    return new Negotiation(
      DateHelper.dateStringfy(this._inputDate.value),
      Number(this._inputQty.value),
      Number(this._inputValue.value));
  };
  
  _clearForm() {
    
    this._inputDate.value = '';
    this._inputQty.value = 1;
    this._inputValue.value = 0.0;
    this._inputDate.focus();   
  };
  
  orderBy(column) {
      
    if(this._currentOrder == column) {
      this._negotiationsList.reverseOrder(); 
    } else {
      this._negotiationsList.orderBy((p, s) => p[column] - s[column]);    
    }
    this._currentOrder = column;    
  };
}
