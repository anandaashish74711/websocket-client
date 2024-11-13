import express from 'express';
import { WebSocket } from 'ws';
import { 
  response
} from './utils/types';  


import { generateRandomData,sensorTypes } from './utils/helper';

const app = express();
const PORT = 3001;

const server = app.listen(PORT, () => {
  console.log(`Server A is running on port ${PORT}`);
});

const ws = new WebSocket('ws://localhost:8080');

ws.on('open', () => {
  console.log('Connected to Server B');
  for (let i = 0; i < sensorTypes.length; i++) {
    setInterval(() => {
      const data = generateRandomData(sensorTypes[i], 10);
      const response: response = {
        type:sensorTypes[i],
        Table:  sensorTypes[i],
        offset: Math.floor(Math.random() * 100),
        data: data,
      }
      ws.send(JSON.stringify(response));
    }, 1000);
  }
});

ws.on('error', (error) => {
  console.error('WebSocket error:', error);
});