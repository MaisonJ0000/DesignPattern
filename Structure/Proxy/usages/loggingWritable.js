export function createLoggingWritable (writable) {
  return new Proxy(writable, {
    get(...handlerArgs) {
      const [, prop] = handlerArgs;
      if (prop === 'write') {
        return function (...args) {
          const [chunk] = args;
          console.log('[JONGMAN_LOG] Writing chunk', chunk, new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().split('T')[1].slice(0, -1));
          return writable.write(...args);
        }
      }

      return Reflect.get(...handlerArgs);
    }
  })
}
