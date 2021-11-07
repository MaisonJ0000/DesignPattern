import zeromq from 'zeromq';
import { ZmqMiddlewareManager } from "./zmqMiddlewareManager";
import { jsonMiddleware } from "./jsonMiddleware";
import { zlibMiddleware } from "./zlibMiddleware";

const main = async () => {
  const socket = new zeromq.Reply();
  await socket.bind('tcp://127.0.0.1:5000');

  const zmqm = new ZmqMiddlewareManager(socket);
  zmqm.use(zlibMiddleware());
  zmqm.use(jsonMiddleware());
  zmqm.use({
    async inbound (message) {
      console.info('Received', message);
      if (message.action === 'ping') {
        await this.send({ action: 'pong', echo: message.echo })
      }
      return message;
    }
  })

};

main();
