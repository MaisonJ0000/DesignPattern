import jsonOverTcp from 'json-over-tcp-2';

export class OfflineState {
  constructor (failsafeSocket) {
    this.failsafeSocket = failsafeSocket;
  }

  send(data) {
    this.failsafeSocket.queue.push(data);
    console.log("[JONGMAN_LOG] send in offline", new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().split('T')[1].slice(0, -1));
    console.log('[JONGMAN_LOG] this.failsafeSocket.queue', this.failsafeSocket.queue, new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().split('T')[1].slice(0, -1));
  }
  activate () {
    const retry = () => {
      console.log("[JONGMAN_LOG] retry here", new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().split('T')[1].slice(0, -1));
      setTimeout(() => this.activate(), 1000);
    }

    console.log('Trying to connenct...');
    this.failsafeSocket.socket = jsonOverTcp.connect(
      this.failsafeSocket.options,
      () => {
        console.log('Connection established');
        this.failsafeSocket.socket.removeListener('error', retry);
        this.failsafeSocket.changeState('online');
      }
    )
    this.failsafeSocket.socket.once('error', retry);
  }
}
