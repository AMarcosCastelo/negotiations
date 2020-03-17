class ProxyFactory {
  static create(obj, props, action) {
    
    return new Proxy(obj, {
            
      get(target, prop, receiver) {
          
        if(props.includes(prop) && ProxyFactory._isFunction(target[prop])) {
            
          return function() {
              
            let giveBack = Reflect.apply(target[prop], target, arguments);
            action(target);
            return giveBack;
          }
        }
          
        return Reflect.get(target, prop, receiver);
      },
      
      set(target, prop, value, receiver) {
          
        let giveBack = Reflect.set(target, prop, value, receiver);
        if(props.includes(prop)) action(target);
        return giveBack;
      }
    });
  };
    
  static _isFunction(func) {
      
    return typeof(func) === typeof(Function);
  };
};
