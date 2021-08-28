// array[array.length - N] 으로 동작하도록

let array = [1, 2, 3];

myArray = new Proxy(array, {
  get: (target, prop) => {
    if (Number(prop) < 0) {
      return target[array.length + Number(prop)];
    }
    return Reflect.get(target, prop);
  }
});

myArray[-1] /*?*/ // 3
myArray[-2] /*?*/ // 2

// 배열 기능은 "변함없이 그대로" 동작해야 합니다.

bestArray = new Proxy(array, {
  get: (target, prop) => {
    if (prop < 0) {
      prop = +prop + target.length;
    }
    return Reflect.get(target, prop);
  }
});

bestArray[-1] /*?*/ // 3
bestArray[-2] /*?*/ // 2
