// Validation functions for each sensor type
export const isValidBiosensorData = (data) => {
    return Boolean(data &&
        typeof data.timestamp === 'string' &&
        !isNaN(new Date(data.timestamp).getTime()) &&
        typeof data.frequency === 'number' &&
        typeof data.bioImpedance === 'number' &&
        typeof data.phaseAngle === 'number' &&
        typeof data.id === 'number' &&
        typeof data.sensorDataId === 'number');
};
export const isValidTemperatureData = (data) => {
    return Boolean(data &&
        typeof data.timestamp === 'string' &&
        !isNaN(new Date(data.timestamp).getTime()) &&
        typeof data.temperature === 'number' &&
        typeof data.id === 'number' &&
        typeof data.sensorDataId === 'number');
};
export const isValidGlucoseData = (data) => {
    return Boolean(data &&
        typeof data.timestamp === 'string' &&
        !isNaN(new Date(data.timestamp).getTime()) &&
        typeof data.frequency === 'number' &&
        typeof data.glucose === 'number' &&
        typeof data.id === 'number' &&
        typeof data.sensorDataId === 'number');
};
export const isValidGsrData = (data) => {
    return Boolean(data &&
        typeof data.timestamp === 'string' &&
        !isNaN(new Date(data.timestamp).getTime()) &&
        typeof data.frequency === 'number' &&
        typeof data.gsr === 'number' &&
        typeof data.id === 'number' &&
        typeof data.sensorDataId === 'number');
};
export const isValidSensorData = (data) => {
    if (!data || typeof data !== 'object')
        return false;
    const validateArrayData = (dataArray, validator) => {
        return Array.isArray(dataArray) && dataArray.every(item => validator(item));
    };
    switch (data.sensorType) {
        case 'BIOSENSOR':
            return validateArrayData(data.biosensorData, isValidBiosensorData);
        case 'TEMPERATURE':
            return validateArrayData(data.temperatureData, isValidTemperatureData);
        case 'GLUCOSE':
            return validateArrayData(data.glucoseData, isValidGlucoseData);
        case 'GSR':
            return validateArrayData(data.gsrData, isValidGsrData);
        default:
            return false;
    }
};
