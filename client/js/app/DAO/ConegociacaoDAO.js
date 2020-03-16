class NegociacaoDAO {
  constructor(connection) {
    this._connection = connection;
    this._store = 'negotiations';
  };

  add(negotiation) {
    return new Promise((resolve, reject) => {
      const request = this._connection.transaction([this._store], 'readwrite')
        .objectStore(this._store)
          .add(negotiation);

      request.onsuccess = (e) => {
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

      let negociacoes = [];

      cursor.onsuccess = (e) => {
        let current = e.target.result;

        if (current) {
          let data = current.value;
          negociacoes.push(new Negociacao(data._data, data._quantidade, data._valor));
          current.continue();
        } else {
          resolve(negociacoes);
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
        reject('Negociaçōes removidas com sucesso.')
      };
    });
  };

};
 