"use strict";

System.register(["./HttpService", "./ConnectionFactory", "../DAO/NegotiationDAO", "../models/Negotiation"], function (_export, _context) {
  "use strict";

  var HttpService, ConnectionFactory, NegotiationDAO, Negotiation, NegotiationService;

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
    setters: [function (_HttpService) {
      HttpService = _HttpService.HttpService;
    }, function (_ConnectionFactory) {
      ConnectionFactory = _ConnectionFactory.ConnectionFactory;
    }, function (_DAONegotiationDAO) {
      NegotiationDAO = _DAONegotiationDAO.NegotiationDAO;
    }, function (_modelsNegotiation) {
      Negotiation = _modelsNegotiation.Negotiation;
    }],
    execute: function () {
      _export("NegotiationService", NegotiationService = function () {
        function NegotiationService() {
          _classCallCheck(this, NegotiationService);

          this._http = new HttpService();
        }

        _createClass(NegotiationService, [{
          key: "register",
          value: function register(negotiation) {
            return ConnectionFactory.getConnection().then(function (connection) {
              return new NegotiationDAO(connection);
            }).then(function (dao) {
              return dao.add(negotiation);
            }).then(function () {
              return 'Negociação adicionada com sucesso';
            })["catch"](function (error) {
              console.log(error);
              throw new Error('Não foi possível adicionar a negociação');
            });
          }
        }, {
          key: "list",
          value: function list() {
            return ConnectionFactory.getConnection().then(function (connection) {
              return new NegotiationDAO(connection);
            }).then(function (dao) {
              return dao.listAll();
            })["catch"](function (error) {
              console.log(error);
              throw new Error('Não foi possível obter as negociações');
            });
          }
        }, {
          key: "clear",
          value: function clear() {
            return ConnectionFactory.getConnection().then(function (connection) {
              return new NegotiationDAO(connection);
            }).then(function (dao) {
              return dao.clearAll();
            }).then(function () {
              return 'Negociações apagadas com sucesso';
            })["catch"](function (error) {
              console.log(error);
              throw new Error('Não foi possível apagar as negociações');
            });
          }
        }, {
          key: "import",
          value: function _import(currentList) {
            return this.getNegotiations().then(function (negotiations) {
              return negotiations.filter(function (negotiation) {
                return !currentList.some(function (existingNegotiation) {
                  return negotiation.isEquals(existingNegotiation);
                });
              });
            })["catch"](function (error) {
              console.log(error);
              throw new Error('Não foi possível importar negociações');
            });
          }
        }, {
          key: "getTradesOfTheWeek",
          value: function getTradesOfTheWeek() {
            return this._http.get('negociacoes/semana').then(function (negotiations) {
              return negotiations.map(function (obj) {
                return new Negotiation(new Date(obj.data), obj.quantidade, obj.valor);
              });
            })["catch"](function (error) {
              console.log(error);
              throw new Error('Não foi possível obter as negociações da semana');
            });
          }
        }, {
          key: "getPreviousWeeksTrades",
          value: function getPreviousWeeksTrades() {
            return this._http.get('negociacoes/anterior').then(function (negotiations) {
              return negotiations.map(function (obj) {
                return new Negotiation(new Date(obj.data), obj.quantidade, obj.valor);
              });
            })["catch"](function (error) {
              console.log(error);
              throw new Error('Não foi possível obter as negociações da semana anterior');
            });
          }
        }, {
          key: "getLastWeeksTrades",
          value: function getLastWeeksTrades() {
            return this._http.get('negociacoes/retrasada').then(function (negotiations) {
              return negotiations.map(function (obj) {
                return new Negotiation(new Date(obj.data), obj.quantidade, obj.valor);
              });
            })["catch"](function (error) {
              console.log(error);
              throw new Error('Não foi possível obter as negociações da semana retrasada');
            });
          }
        }, {
          key: "getNegotiations",
          value: function getNegotiations() {
            return Promise.all([this.getTradesOfTheWeek(), this.getPreviousWeeksTrades(), this.getLastWeeksTrades()]).then(function (periods) {
              var negotiations = periods.reduce(function (datas, period) {
                return datas.concat(period);
              }, []).map(function (data) {
                return new Negotiation(new Date(data.date), data.qty, data.value);
              });
              return negotiations;
            })["catch"](function (error) {
              console.log(error);
              throw new Error(error);
            });
          }
        }]);

        return NegotiationService;
      }());

      _export("NegotiationService", NegotiationService);

      ;
    }
  };
});