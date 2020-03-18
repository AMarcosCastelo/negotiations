const stores = ['negotiations'];
const version = 4;
const dbName = 'aluraframe';

let connection = null;

let close = null;

export class ConnectionFactory {
  constructor() {
    throw new Error('Não é possível criar instâncias de ConnectionFactory');
  };

  static getConnection() {
    return new Promise((resolve, reject) => {
      const openRequest = window.indexedDB.open(dbName, version);

      openRequest.onupgradeneeded = (e) => {
        ConnectionFactory._createStores(e.target.result);
      };
      
      openRequest.onsuccess = (e) => {
        if (!connection) {
          connection = e.target.result;
          close = connection.close.bind(connection);
          connection.close = () => {
            throw new Error('Você não pode fechar diretamente a conexão');
          };
        }
        resolve(connection);
      };

      openRequest.onerror = (e) => {
        console.log(e.target.result);
        reject(e.target.error.name);
      };
    });
  };
  
  static _createStores(connection) {
    stores.forEach((store) => {
      if (connection.objectStoreNames.contains(store))
        connection.deleteObjectStore(store);
  
      connection.createObjectStore(store, { autoIncrement: true});
    });
  };

  static closeConnection() {
    if (connection) {
      close();
      connection = null;
    }
  };
};
