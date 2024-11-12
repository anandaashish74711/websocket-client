import express from 'express';
import { WebSocket } from 'ws';
import { 
  SensorData,
  BiosensorData, 
  TemperatureData, 
  GlucoseData, 
  GsrData 
} from './types.js';  // Note the .js extension
import { 
  isValidBiosensorData, 
  isValidTemperatureData, 
  isValidGlucoseData, 
  isValidGsrData 
} from './validator.js';  // Note the .js extension

const app = express();
const PORT = 3001;

const server = app.listen(PORT, () => {
  console.log(`Server A is running on port ${PORT}`);
});

const ws = new WebSocket('ws://localhost:8080');

let currentId = 1;
const generateId = () => currentId++;


type bioSensor = {
  bioImpedance: number;
  phaseAngle: number;
  time: string; // Timestamp as string
}

type clientFormat = {
  sensorType: "bioSensor";
  time: string;
  visit_id: string;
  config: string;
  frequency: number; // Corrected spelling to 'frequency'
  createdAt: string;
  data: bioSensor[];
};

const generateRandomData = (batch: number): clientFormat => {
  const data = [];
  
  for (let i = 0; i < batch; i++) { // Adjusted to iterate correctly
    const dataObject = {
      bioImpedance: Math.random() * 1000, // Generates a random bioimpedance value
      phaseAngle: Math.random() * 1000,   // Generates a random phase angle
      time: (Date.now() + i * 1000).toString() // Generates a unique timestamp for each entry
    };

    data.push(dataObject);
  }

  const response: clientFormat = {
    sensorType: "bioSensor",
    time: Date.now().toString(), // Current timestamp for the response
    visit_id: "Visit1344",       // Example visit ID
    config: "RLCL",              // Example config
    frequency: 1000,             // Corrected spelling to 'frequency'
    createdAt: Date.now().toString(), // Timestamp when data is created
    data: data                   // The generated data array
  };

  return response;
}

ws.on('open', () => {
  console.log('Connected to Server B');

  setInterval(() => {
    const response = generateRandomData(100)
      ws.send(JSON.stringify(response));

  }, 1000);
});

ws.on('error', (error) => {
  console.error('WebSocket error:', error);
});