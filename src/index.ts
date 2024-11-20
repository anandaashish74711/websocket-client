import express from 'express';
import { WebSocket } from 'ws';
import { response } from './utils/types';
import { generateRandomData, sensorTypes, Tables } from './utils/helper';

const app = express();
const PORT = 3001;

const server = app.listen(PORT, () => {
  console.log(`Server A is running on port ${PORT}`);
});

const ws = new WebSocket('ws://localhost:8081/ws');

ws.on('open', () => {
  console.log('Connected to Server B');
  
  // Start sending random data for each sensor type
  sensorTypes.forEach((sensorType, i) => {
    const intervalId = setInterval(() => {
      const data = generateRandomData(sensorType, 10);
      const response: response = {
        type: 'sync_data',
        Table: Tables[i],
        offset: Math.floor(Math.random() * 100),
        data: data,
      };
      ws.send(JSON.stringify(response));
    }, 1000);

    // Save the interval ID so we can clear it later if necessary
    ws.on('close', () => {
      clearInterval(intervalId); // Clear the interval when WebSocket closes
    });
  });
});

ws.on('error', (error) => {
  console.error('WebSocket error:', error);
});

// Handle WebSocket connection close
ws.on('close', () => {
  console.log('Disconnected from Server B');
});

// Graceful shutdown of server and WebSocket connection
process.on('SIGINT', () => {
  console.log('Closing connections...');
  ws.close(); // Close WebSocket connection
  server.close(() => {
    console.log('Server A shut down');
    process.exit(0);
  });
});
