// 에러 던지기
let user = {
  name: "John"
};

function wrap(target) {
  return new Proxy(target, {
    get: (target, prop) => {
      if (!(prop in target)) throw Error(`Prop doenst exist ${prop}`);
      return Reflect.get(target, prop);
    }
  });
}

user = wrap(user);

user.name; /*?*/ // John
user.age; /*?*/ // ReferenceError: Property doesn't exist "age"




