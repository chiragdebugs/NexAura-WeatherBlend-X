export type ForecastLeadTime = '+00h' | '+03h' | '+06h' | '+09h' | '+12h' | '+24h' | '+48h';

export type WeatherVariable = 'rainfall' | 'temperature' | 'wind';

export type AtmosphericRegime = 
  | 'Deep Convective Storm'
  | 'Monsoon Depression'
  | 'Orographic Uplift'
  | 'Western Disturbance'
  | 'Tropical Cyclone Outflow';

export interface ModelContribution {
  name: 'NCUM' | 'WRF' | 'GFS' | 'AIFS';
  fullName: string;
  sourceOrg: string;
  forecast: number; // e.g. 64 mm
  predictedError: number; // e.g. 6.2 mm
  uncertainty: number; // e.g. 3.1 mm
  weight: number; // 0.0 - 1.0 (sums to 1)
  historicalSkillScore: number; // CRPS-based skill 0-1
  temperatureForecast?: number;
  windForecast?: number;
  description: string;
}

export interface TrajectoryPoint {
  leadTime: ForecastLeadTime;
  timeLabel: string;
  temperature: number; // °C
  rainfall: number; // mm
  wind: number; // km/h
  baselineRainfall: number; // best single model baseline
  lowerBound: number;
  upperBound: number;
  dominantModel: string;
}

export interface LocationData {
  id: string;
  name: string;
  state: string;
  region: string;
  coordinates: [number, number]; // [lat, lng]
  leadTime: ForecastLeadTime;
  validTimeUTC: string;
  cycle: string;
  atmosphericRegime: AtmosphericRegime;
  
  // Current & Blended Core Metrics
  blendedForecast: number; // mm
  temperature: {
    value: number;
    unit: string;
    feelsLike: number;
  };
  rainfall: {
    value: number;
    unit: string;
    rateHourly: number;
    probabilityHeavyRain: number; // 0.0 - 1.0
  };
  wind: {
    value: number;
    unit: string;
    gusts: number;
    direction: string;
  };
  humidity: number; // %
  pressure: number; // hPa
  cape: number; // J/kg

  // Uncertainty & Disagreement
  uncertainty: {
    lower: number;
    upper: number;
    confidence: number; // 0.0 - 1.0
    disagreementLevel: 'Low' | 'Moderate' | 'High' | 'Severe';
    spreadMm: number;
  };

  // Extreme Weather Metrics
  extremeRisk: {
    heavyRainProb: number; // %
    highWindProb: number; // %
    floodRiskLevel: 'Normal' | 'Moderate' | 'High' | 'Severe';
    lightningRisk: 'Low' | 'Moderate' | 'Elevated' | 'High';
  };

  // Models & Blending Details
  models: ModelContribution[];

  // Trajectory sequence
  trajectory: TrajectoryPoint[];

  // Explainability
  trustExplanations: string[];
}

export interface HistoryEvent {
  id: string;
  timestamp: string;
  cycle: string;
  leadTime: string;
  step: 'forecast_issued' | 'observation_received' | 'residual_calculated' | 'skill_updated' | 'weights_adjusted';
  title: string;
  detail: string;
  metrics?: {
    predicted?: number;
    observed?: number;
    residual?: number;
    wrfWeightDelta?: string;
    gfsWeightDelta?: string;
    ncumWeightDelta?: string;
  };
}

export interface MapRegion {
  id: string;
  name: string;
  coords: { x: number; y: number }; // SVG canvas coordinates
  rainfall: number;
  dominantModel: 'NCUM' | 'WRF' | 'GFS' | 'AIFS';
  uncertaintyLevel: 'Low' | 'Moderate' | 'High';
  extremeRiskProb: number;
  temp: number;
}
