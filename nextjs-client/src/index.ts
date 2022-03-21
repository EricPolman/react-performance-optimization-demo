import WebSocket from 'ws';
import { logger } from './logger';

const ws = new WebSocket('ws://localhost:8080');

ws.on('open', function open() {
  ws.send('something');
});

ws.on('message', function message(data) {
  logger.info(`received: ${data.toString()}`);
});

