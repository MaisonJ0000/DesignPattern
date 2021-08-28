import { FailsafeSocket } from "./failsafeSocket";
const failsafeSocket = new FailsafeSocket({port: 5000});

setInterval(() => {
  failsafeSocket.send(process.memoryUsage().arrayBuffers)}, 2000);
