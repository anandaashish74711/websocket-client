import { 
  SensorData, 
  BiosensorData, 
  TemperatureData, 
  GlucoseData, 
  GsrData 
} from './types';

// Validation functions for each sensor type
export const isValidBiosensorData = (data: Partial<SensorData> & BiosensorData): boolean => {
  return Boolean(
    data &&
    typeof data.timestamp === 'string' &&
    !isNaN(new Date(data.timestamp).getTime()) &&
    typeof data.frequency === 'number' &&
    typeof data.bioImpedance === 'number' &&
    typeof data.phaseAngle === 'number' &&
    typeof data.id === 'number' &&
    typeof data.sensorDataId === 'number'
  );
};

export const isValidTemperatureData = (data: Partial<SensorData> & TemperatureData): boolean => {
  return Boolean(
    data &&
    typeof data.timestamp === 'string' &&
    !isNaN(new Date(data.timestamp).getTime()) &&
    typeof data.temperature === 'number' &&
    typeof data.id === 'number' &&
    typeof data.sensorDataId === 'number'
  );
};

export const isValidGlucoseData = (data: Partial<SensorData> & GlucoseData): boolean => {
  return Boolean(
    data &&
    typeof data.timestamp === 'string' &&
    !isNaN(new Date(data.timestamp).getTime()) &&
    typeof data.frequency === 'number' &&
    typeof data.glucose === 'number' &&
    typeof data.id === 'number' &&
    typeof data.sensorDataId === 'number'
  );
};

export const isValidGsrData = (data: Partial<SensorData> & GsrData): boolean => {
  return Boolean(
    data &&
    typeof data.timestamp === 'string' &&
    !isNaN(new Date(data.timestamp).getTime()) &&
    typeof data.frequency === 'number' &&
    typeof data.gsr === 'number' &&
    typeof data.id === 'number' &&
    typeof data.sensorDataId === 'number'
  );
};

export const isValidSensorData = (data: SensorData): boolean => {
  if (!data || typeof data !== 'object') return false;

  const validateArrayData = <T>(
    dataArray: T[], 
    validator: (item: T) => boolean
  ): boolean => {
    return Array.isArray(dataArray) && dataArray.every(item => validator(item));
  };

  switch (data.sensorType) {
    case 'BIOSENSOR':
      return validateArrayData(data.BiosensorData, isValidBiosensorData);
    case 'TEMPERATURE':
      return validateArrayData(data.TemperatureData, isValidTemperatureData);
    case 'GLUCOSE':
      return validateArrayData(data.GlucoseData, isValidGlucoseData);
    case 'GSR':
      return validateArrayData(data.GsrData, isValidGsrData);
    default:
      return false;
  }
};