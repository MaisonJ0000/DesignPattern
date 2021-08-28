// 존재하지 않는 요소 읽을 때

let numbers = [0, 1, 2];

numbers = new Proxy(numbers, {
  get(target, prop) {
    if (prop in target) {
      return target[prop]; // can be replaced as return Reflect.get(target, prop)
    } else return 0;
  }
})

numbers[333] /*?*/


// _로 시작하는 변수는제외하기
let user = {
  name: "John",
  age: 30,
  _password: "***"
};

user = new Proxy(user, {
  ownKeys(target) {
    return Object.keys(target).filter(key => !key.startsWith('_'));
  }
})

Object.keys(user) /*?*/


// enumerable 플래그 프로퍼티만 반환함.
let user2 = {};

user2 = new Proxy(user2, {
  ownKeys(target) {
    return ['a', 'b', 'c'];
  },

  getOwnPropertyDescriptor(target, prop) {
    return {
      enumerable: true,
      configurable: true
    };
  }
});

Object.keys(user2) /*?*/


const evenNumbers = new Proxy([], {
  get(target,index) { return index * 2 },
  has: (target, number) => number % 2 === 0 // 개인적으론 이 코딩 스타일이 더 선호됨.
})

let q1 = (4 in evenNumbers); /*?*/
let q2 = evenNumbers[7]; /*?*/
