import express from 'express';
import { WebSocket } from 'ws';
import { isValidBiosensorData, isValidTemperatureData, isValidGlucoseData, isValidGsrData } from './validator.js'; // Note the .js extension
const app = express();
const PORT = 3001;
const server = app.listen(PORT, () => {
    console.log(`Server A is running on port ${PORT}`);
});
const ws = new WebSocket('ws://localhost:8080');
let currentId = 1;
const generateId = () => currentId++;
const sensorTypes = [
    {
        sensorType: 'BIOSENSOR',
        generateData: () => ({
            timestamp: new Date().toISOString(),
            frequency: 50,
            config: {},
            bioImpedance: Math.random() * 200,
            phaseAngle: Math.random() * 180
        }),
        validator: isValidBiosensorData
    },
    {
        sensorType: 'TEMPERATURE',
        generateData: () => ({
            timestamp: new Date().toISOString(),
            config: {},
            temperature: Math.random() * 10 + 30
        }),
        validator: isValidTemperatureData
    },
    {
        sensorType: 'GLUCOSE',
        generateData: () => ({
            timestamp: new Date().toISOString(),
            frequency: 50,
            config: {},
            glucose: Math.random() * 180 + 70
        }),
        validator: isValidGlucoseData
    },
    {
        sensorType: 'GSR',
        generateData: () => ({
            timestamp: new Date().toISOString(),
            frequency: 50,
            config: {},
            gsr: Math.random() * 10
        }),
        validator: isValidGsrData
    }
];
let sensorIndex = 0;
ws.on('open', () => {
    console.log('Connected to Server B');
    setInterval(() => {
        const currentSensor = sensorTypes[sensorIndex];
        const sensorDataId = generateId();
        const sensorData = {
            id: generateId(),
            visitId: "visit123",
            sensorType: currentSensor.sensorType,
            isSynced: false,
            createdAt: new Date().toISOString(),
            biosensorData: [],
            temperatureData: [],
            glucoseData: [],
            gsrData: []
        };
        const dataPoints = [];
        for (let i = 0; i < 100; i++) {
            const baseData = {
                ...currentSensor.generateData(),
                id: generateId(),
                sensorDataId
            };
            if (currentSensor.validator(baseData)) {
                dataPoints.push(baseData);
            }
            else {
                console.warn(`Invalid data point for ${currentSensor.sensorType}:`, baseData);
            }
        }
        switch (currentSensor.sensorType) {
            case 'BIOSENSOR':
                sensorData.biosensorData = dataPoints;
                break;
            case 'TEMPERATURE':
                sensorData.temperatureData = dataPoints;
                break;
            case 'GLUCOSE':
                sensorData.glucoseData = dataPoints;
                break;
            case 'GSR':
                sensorData.gsrData = dataPoints;
                break;
        }
        if (dataPoints.length > 0) {
            const message = {
                type: "sensorData",
                data: sensorData
            };
            ws.send(JSON.stringify(message));
            console.log(`Sent ${dataPoints.length} valid data points for ${currentSensor.sensorType} to Server B`);
        }
        else {
            console.log(`No valid data points to send for ${currentSensor.sensorType}`);
        }
        sensorIndex = (sensorIndex + 1) % sensorTypes.length;
    }, 10000);
});
ws.on('error', (error) => {
    console.error('WebSocket error:', error);
});
