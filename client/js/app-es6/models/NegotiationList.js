export class NegotiationsList {

  constructor() {
    this._negotiations = [];
  };

  add(negotiation) {
    this._negotiations.push(negotiation);
  };

  get negotiations() {
    return [].concat(this._negotiations);
  };

  clear() {
    this._negotiations = [];
  };
  
  get totalVolume() {
    return this._negotiations.reduce((total, n) => total + n.amount, 0.0);
  };
  
  orderBy(criterion) {
    this._negotiations.sort(criterion);
  };
  
  reverseOrder() {
    this._negotiations.reverse();
  };
};
