function * twoWayGenerator () {
  const what = yield null;
  console.info(what);
  yield 'Hello ' + what;
}

const twoWay = twoWayGenerator();
console.info(twoWay.next('33'));
console.info(twoWay.next());


