class NegotiationService {
    
  constructor() {
    this._http = new HttpService();
  };
  
  getTradesOfTheWeek() {
              
    return this._http
      .get('negociacoes/semana')
      .then(negotiations => {
        return negotiations.map((obj) => new Negotiation(new Date(obj.data), obj.quantidade, obj.valor));
      })
      .catch((erro) => {
        console.log(erro);
        throw new Error('Não foi possível obter as negociações da semana');
      });
  }
  
  getPreviousWeeksTrades() {
    return this._http
      .get('negociacoes/anterior')
      .then(negotiations => {
        return negotiations.map((obj) => new Negotiation(new Date(obj.data), obj.quantidade, obj.valor));
      })
      .catch((erro) => {
        console.log(erro);
        throw new Error('Não foi possível obter as negociações da semana anterior');
      });
  };
  
  getLastWeeksTrades() {
              
    return this._http
      .get('negociacoes/retrasada')
      .then(negotiations => {
        return negotiations.map((obj) => new Negotiation(new Date(obj.data), obj.quantidade, obj.valor));
      })
      .catch((erro) => {
        console.log(erro);
        throw new Error('Não foi possível obter as negociações da semana retrasada');
      });
  };
  
  getNegotiations() {
    return Promise.all([
      this.getTradesOfTheWeek(),
      this.getPreviousWeeksTrades(),
      this.getLastWeeksTrades()
    ]).then(periods => {

      let negotiations = periods
        .reduce((datas, period) => datas.concat(period), [])
        .map((data) => new Negotiation(new Date(data.date), data.qty, data.value));
      return negotiations;
    }).catch((erro) => {
        console.log(erro);
        throw new Error(erro);
    });
	};
};
