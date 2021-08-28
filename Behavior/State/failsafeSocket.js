import { OnlineState } from "./onlineState";
import { OfflineState } from "./offlineState";

export class FailsafeSocket {
  constructor(options) {
    this.options = options;
    this.currentState = null;
    this.queue = [];
    this.socket = null;
    this.states = {
      online: new OnlineState(this),
      offline: new OfflineState(this),
    }
    this.changeState('offline');
  }

  changeState (state) {
    console.log(`Activating state: ${state}`);
    this.currentState = this.states[state];
    this.currentState.activate();
  }

  send (data) {
    this.currentState.send(data);
  }
}
