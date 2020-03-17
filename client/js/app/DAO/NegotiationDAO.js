class NegotiationDAO {
  constructor(connection) {
    this._connection = connection;
    this._store = 'negotiations';
  };

  add(negotiation) {
    return new Promise((resolve, reject) => {
      const request = this._connection.transaction([this._store], 'readwrite')
        .objectStore(this._store)
          .add(negotiation);

      request.onsuccess = () => {
        resolve();
      };

      request.onerror = (e) => {
        console.log(e.target.error);
        reject('Não foi possível adicionar a negociação');
      }
    });
  };

  listAll() {
    return new Promise((resolve, reject) => {

      let cursor = this._connection.transaction([this._store], 'readwrite')
        .objectStore(this._store).openCursor();

      let negotiations = [];

      cursor.onsuccess = (e) => {
        let current = e.target.result;

        if (current) {
          let data = current.value;
          negotiations.push(new Negotiation(data._date, data._qty, data._value));
          current.continue();
        } else {
          resolve(negotiations);
        }
      };

      cursor.onerror = (e) => {
        console.log(e.target.error);
        reject('Não foi possível listar as negociaçōes');
      };

    });
  };

  clearAll() {
    return new Promise((resolve, reject) => {
      let request = this._connection.transaction([this._store], 'readwrite')
        .objectStore(this._store).clear();

      request.onsuccess = () => resolve('Negociaçōes removidas com sucesso.');
      request.onerror = (e) => {
        console.log(e.target.error);
        reject('Negociaçōes removidas com sucesso.');
      };
    });
  };

};
 