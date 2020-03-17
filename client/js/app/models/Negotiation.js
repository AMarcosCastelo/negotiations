class Negotiation {
  constructor(date, qty, value) {
    this._date = new Date(date.getTime());
    this._qty = qty;
    this._value = value;
    Object.freeze(this);
  };
  
  get amount() {
    return this._qty * this._value;
  }
  
  get date() {
    return new Date(this._date.getTime());
  };
  
  get qty() {
    return this._qty;
  };
  
  get value() {
    return this._value;
  };
};
