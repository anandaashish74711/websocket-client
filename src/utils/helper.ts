import {
  bioSensor,
  temSensor,
  gluSensor,
  gsrSensor,
  clientFormat,
} from './types';

function generateRandomDate(): Date {
  const randomMilliseconds = Math.floor(Math.random() * 1000000000); // Random number of milliseconds
  const generatedDate = new Date(Date.now() - randomMilliseconds);

  if (isNaN(generatedDate.getTime())) {
    console.error("Generated an invalid date, using the current date instead.");
    return new Date(); // Default to current date if invalid
  }

  return generatedDate;
}

function generateBioSensorData(): bioSensor[] {
  return Array.from({ length: 100 }, () => ({
    bioImpedance: parseFloat((Math.random() * 100).toFixed(2)),
    phaseAngle: parseFloat((Math.random() * 90).toFixed(2)),
    time: generateRandomDate(),
  }));
}

function generateTemSensorData(): temSensor[] {
  return Array.from({ length: 100 }, () => ({
    temperature: parseFloat((Math.random() * 40).toFixed(2)),
    time: generateRandomDate(),
  }));
}

function generateGluSensorData(): gluSensor[] {
  return Array.from({ length: 100 }, () => ({
    glucose: parseFloat((Math.random() * 100).toFixed(2)),
    time: generateRandomDate(),
  }));
}

function generateGsrSensorData(): gsrSensor[] {
  return Array.from({ length: 100 }, () => ({
    gsr: parseFloat((Math.random() * 200).toFixed(2)),
    time: generateRandomDate(),
  }));
}

export function generateRandomData(
  sensorType: string,
  batch: number
): clientFormat[] {
  const data: clientFormat[] = [];

  for (let i = 0; i < batch; i++) {
    const baseData = {
      sensorType: sensorType as
        | 'bioSensor'
        | 'temSensor'
        | 'gluSensor'
        | 'gsrSensor',
      time: new Date(),
      visit_id: '1234',
      config: 'default',
      frequency: 100,
      createdAt: new Date(), // Use current date and time
    };

    let sensorData;

    switch (sensorType) {
      case 'bioSensor':
        sensorData = generateBioSensorData();
        break;
      case 'temSensor':
        sensorData = generateTemSensorData();
        break;
      case 'gluSensor':
        sensorData = generateGluSensorData();
        break;
      case 'gsrSensor':
        sensorData = generateGsrSensorData();
        break;
      default:
        throw new Error('Invalid sensor type');
    }

    data.push({ ...baseData, data: sensorData });
  }

  return data;
}




export const sensorTypes = ['bioSensor', 'temSensor', 'gluSensor', 'gsrSensor'];
export const Tables = [
  'biosensor_data',
  'temperature_data',
  'glucose_data',
  'gsr_data',
];
