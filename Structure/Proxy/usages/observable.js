export const createObservable = (target, observer) => {
  const observable = new Proxy(target, {
    set(obj, prop, val) {
      if (val !== obj[prop]) {
        const prev = obj[prop];
        obj[prop] = val;
        observer({ prop, prev, curr: val });
      }
      return true;
    }
  });
  return observable;
};
