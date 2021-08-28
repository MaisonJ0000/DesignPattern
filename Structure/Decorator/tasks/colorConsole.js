const consolDeco = (console) => {
  return new Proxy(console, {
    get: (target, prop) => {
      if (prop === 'red') {
        return (...args) => {
          console.log('\x1b[31m', ...args, '\x1b[0m');
        }
      }
      return Reflect.get(target, prop);
    },
  })
}

const colorConsole = consolDeco(console);
colorConsole.red('hihi');

const a = 1;
const b = 2;
colorConsole.info('hey', a, b);
