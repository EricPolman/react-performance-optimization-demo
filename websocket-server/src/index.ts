import { WebSocketServer } from 'ws';
import { logger } from './logger';
import config from "./config.json";


const wss = new WebSocketServer({
  port: 8080,
});

wss.on('connection', function connection(ws) {
  let shouldSendUpdates = false;

  logger.info("New connection established");
  ws.on('message', function message(data) {
    if (data.toString() === "start") {
      shouldSendUpdates = true;
    } else if (data.toString() === "start") {
      shouldSendUpdates = false;
    }
  });

  setInterval(() => {
    ws.send("message");
  }, config.updateInterval);

  // ws.send('something');
});