const MODIFIER_NAMES = ['swap', 'write', 'fill'];

export class ImmutableBuffer {
  constructor (size, executor) {
    const buffer = Buffer.alloc(size);
    const modifiers = {};
    for (const prop in buffer){
      if (typeof buffer[prop] !== 'function') {
        continue;
      }

      if (MODIFIER_NAMES.some(m => prop.startsWith(m))) {
        modifiers[prop] = buffer[prop].bind(buffer)
        // modifiers에 한 번 등록하여, 최초에만 실행된다.
      } else { // 다른 것들은 그대로 사용
        this[prop]= buffer[prop].bind(buffer);
      }
    }
    console.log('[JONGMAN_LOG] modifiers', modifiers, new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().split('T')[1].slice(0, -1));
    executor(modifiers);
  }
}
