// Base interface for Sensor Data
export interface SensorData {
  id: number;
  visitId: string; 
  sensorType: 'BIOSENSOR' | 'TEMPERATURE' | 'GLUCOSE' | 'GSR'; 
  isSynced: boolean; 
  createdAt: string; 
  
  BiosensorData: BiosensorData[]; 
  TemperatureData: TemperatureData[]; 
  GlucoseData: GlucoseData[]; 
  GsrData: GsrData[]; 
}

// Interface for Biosensor Data
export interface BiosensorData {
  id: number; 
  sensorDataId: number; 
  timestamp: string; 
  frequency: number; 
  config: JSON; 
  bioImpedance: number;
  phaseAngle: number;
}

// Interface for Temperature Data
export interface TemperatureData {
  id: number; 
  sensorDataId: number; 
  timestamp: string; 
  config: JSON; 
  temperature: number; 
}

// Interface for Glucose Data
export interface GlucoseData {
  id: number; 
  sensorDataId: number; 
  timestamp: string; 
  frequency: number;
  config: JSON; 
  glucose: number; 
}

// Interface for GSR Data
export interface GsrData {
  id: number; 
  sensorDataId: number; 
  timestamp: string; 
  frequency: number; 
  config: JSON; 
  gsr: number; 
}
