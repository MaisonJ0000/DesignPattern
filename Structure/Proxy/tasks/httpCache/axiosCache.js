import axios, {Method} from 'axios';
const cache = {};


const axiosCache = new Proxy(axios, {
  get: (...args) => {
    const [target, prop] = args;
    if (String(prop) === 'get') {
      return async (...args) => {
        const [uri] = args;
        if (cache[uri]) {
          return cache[uri];
        }
        console.info('axios get is called');
        const result = await axios.get(...args);
        cache[uri] = result;
        return result;
      }
    }
    console.log("[JONGMAN_LOG] reach here", new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().split('T')[1].slice(0, -1));

    return Reflect.get(...args);
  }
});
export default axiosCache;
