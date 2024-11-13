export interface bioSensor {
  bioImpedance: number;
  phaseAngle: number;
  time: string;
}

export interface temSensor {
  temperature: number;
  time: string;
}

export interface gluSensor {
  humidity: number;
  time: string;
}

export interface gsrSensor {
  gsr: number;
  time: string;
}

export interface clientFormat {
  sensorType: 'bioSensor' | 'temSensor' | 'gluSensor' | 'gsrSensor';
  time: string;
  visit_id: string;
  config: string;
  frequency: number;
  createdAt: string;
  data: bioSensor[] | temSensor[] | gluSensor[] | gsrSensor[];
}

export interface response {
  type: string;
  Table: string;
  offset: number;
  data: clientFormat[];
}

