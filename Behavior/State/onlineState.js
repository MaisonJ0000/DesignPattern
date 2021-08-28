export class OnlineState {
  constructor(failsafeSocket) {
    this.failsafeSocket = failsafeSocket;
    this.hasDisconnected = false;

  }
  send (data) {
    this.failsafeSocket.queue.push(data);
    this._safeWrite(data);
    console.log("[JONGMAN_LOG] send in online", new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().split('T')[1].slice(0, -1));
    console.log('[JONGMAN_LOG] this.failsafeSocket.queue', this.failsafeSocket.queue, new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().split('T')[1].slice(0, -1));
  }
  _safeWrite(data) {
    this.failsafeSocket.socket.write(data, err => {
      if(!this.hasDisconnected && !err) {
        this.failsafeSocket.queue.shift();
      }
    })
  }

  activate () {
    this.hasDisconnected = false;
    for (const data of this.failsafeSocket.queue) {
      this._safeWrite(data);
    }


    // below not working
    this.failsafeSocket.socket.once('error', () => {
      console.log("[JONGMAN_LOG] error", new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().split('T')[1].slice(0, -1));
      this.hasDisconnected = true;
      this.failsafeSocket.changeState('offline');
    })
  }
}
