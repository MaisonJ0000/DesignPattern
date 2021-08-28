function myMakeObservable(target) {
  let handlerStore = null;
  target.observe = (handler) => {
    handlerStore = handler;
  };

  return new Proxy(target, {
    set: (target, prop, val) => {
      handlerStore(prop, val);
      return Reflect.set(target, prop, val);
    }
  });
}

let user = {};
user = myMakeObservable(user);

user.observe((key, value) => {
  console.info(`SET ${key}=${value}`);
});

user.name = "John"; // alerts: SET name=John


let handlers = Symbol('handlers'); // symbol for uniq access

function bestMakeObservable(target) {
  target[handlers] = [];

  target.observe = function(handler) {
    this[handlers].push(handler);
    // this인데, target으로 해도 되지 않나?
    // this는 함수를 호출한 부분이다. 이 경우 user2?
  };

  return new Proxy(target, {
    set: (target, prop, val) => {
      let success = Reflect.set(...arguments);
      if (success) {
        // 성공할 때만 실행하는 처리
        target[handlers].forEach(handler => handler(prop, val));
      }
      return success;
    }
  });
}

let user2 = {};
user2 = bestMakeObservable(user2);

user2.observe((key, value) => {
  console.info(`SET ${key}=${value}`);
});

user2.observe((key, value) => {
  console.info(`[another observer] SET ${key}=${value}`);
});

user2.name = "John"; // alerts: SET name=John


