import {HttpService} from './HttpService';
import {ConnectionFactory} from './ConnectionFactory';
import {NegotiationDAO} from '../DAO/NegotiationDAO';
import {Negotiation} from '../models/Negotiation'

export class NegotiationService {
    
  constructor() {
    this._http = new HttpService();
  };

  register(negotiation) {
    return ConnectionFactory.getConnection()
      .then((connection) => new NegotiationDAO(connection))
      .then((dao) => dao.add(negotiation))
      .then(() => 'Negociação adicionada com sucesso')
      .catch((error) => {
        console.log(error)
        throw new Error('Não foi possível adicionar a negociação');
      });
  };

  list() {
    return ConnectionFactory.getConnection()
      .then((connection) => new NegotiationDAO(connection))
      .then((dao) => dao.listAll())
      .catch((error) => {
        console.log(error)
        throw new Error('Não foi possível obter as negociações');
      });
  };

  clear() {
    return ConnectionFactory.getConnection().then((connection) => 
      new NegotiationDAO(connection))
      .then((dao) => dao.clearAll())
      .then(() => 'Negociações apagadas com sucesso')
      .catch((error) => {
        console.log(error);
        throw new Error('Não foi possível apagar as negociações')
      })
  };

  import(currentList) {
    return this.getNegotiations()
      .then((negotiations) =>
        negotiations.filter((negotiation) =>
          !currentList.some((existingNegotiation) =>
            negotiation.isEquals(existingNegotiation)
          )
        )
      ).catch((error) => {
        console.log(error);
        throw new Error('Não foi possível importar negociações');
      })
  }
  
  getTradesOfTheWeek() {
              
    return this._http
      .get('http://localhost:3000/negociacoes/semana')
      .then(negotiations => {
        return negotiations.map((obj) => new Negotiation(new Date(obj.data), obj.quantidade, obj.valor));
      })
      .catch((error) => {
        console.log(error);
        throw new Error('Não foi possível obter as negociações da semana');
      });
  }
  
  getPreviousWeeksTrades() {
    return this._http
      .get('http://localhost:3000/negociacoes/anterior')
      .then(negotiations => {
        return negotiations.map((obj) => new Negotiation(new Date(obj.data), obj.quantidade, obj.valor));
      })
      .catch((error) => {
        console.log(error);
        throw new Error('Não foi possível obter as negociações da semana anterior');
      });
  };
  
  getLastWeeksTrades() {
              
    return this._http
      .get('http://localhost:3000/negociacoes/retrasada')
      .then(negotiations => {
        return negotiations.map((obj) => new Negotiation(new Date(obj.data), obj.quantidade, obj.valor));
      })
      .catch((error) => {
        console.log(error);
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
    }).catch((error) => {
        console.log(error);
        throw new Error(error);
    });
	};
};
