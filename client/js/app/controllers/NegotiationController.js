class NegotiationController {
  constructor() {
    const $ = document.querySelector.bind(document);

    this._inputDate = $('#date');
    this._inputQty = $('#qty');
    this._inputValue = $('#value');
    this._currentOrder = '';
    this._service = new NegotiationService();
    this._negotiationsList = new Bind(
      new NegotiationsList(),
      new NegotiationsView($('#negotiationsView')),
      'add', 'clear' , 'orderBy', 'reverseOrder'
    );

    this._message = new Bind(
      new Message(), new MessageView($('#messageView')),
      'text'
    );
    this._init();
  };

  _init() {
    this._importNegotiations();

    this._service.list().then((negotiations) =>
      negotiations.forEach((negotiation) => this._negotiationsList.add(negotiation))
    ).catch((error) => this._message.text = error);

    setInterval(() => {
      this._importNegotiations();
    }, 3000);
  };

  add(event) {
    event.preventDefault();
    let negotiation = this._criateNegotiation();

    this._service.register(negotiation)
      .then((message) => {
        this._negotiationsList.add(negotiation)
        this._message.text = message;
        this._clearForm();
      })
      .catch((error) => this._message.text = error);
  };

  _importNegotiations() {
    this._service.import(this._negotiationsList.negotiations)
      .then(negotiations => negotiations.forEach(negotiation => {
        this._negotiationsList.add(negotiation);
        this._message.text = 'Negociações do período importadas';
      }))
      .catch(erro => this._message.text = erro);
  };

  delete() {
    this._service.clear().then((message) => {
      this._message.text = message;
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
      
    if(this._currentOrder === column) {
      this._negotiationsList.reverseOrder(); 
    } else {
      this._negotiationsList.orderBy((p, s) => p[column] - s[column]);    
    }
    this._currentOrder = column;    
  };
}
