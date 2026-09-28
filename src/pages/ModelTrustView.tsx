import React, { useState } from 'react';
import type { LocationData, ForecastLeadTime, WeatherVariable, ModelContribution } from '../types/weather';
import { TargetIcon } from '../components/common/Icons';

interface ModelTrustViewProps {
  location: LocationData;
}

export const ModelTrustView: React.FC<ModelTrustViewProps> = ({ location }) => {
  const [selectedModel, setSelectedModel] = useState<'NCUM' | 'WRF' | 'GFS' | 'AIFS'>('WRF');
  const [selectedLead, setSelectedLead] = useState<ForecastLeadTime>('+06h');
  const [selectedVariable, setSelectedVariable] = useState<WeatherVariable>('rainfall');

  const models: ('NCUM' | 'WRF' | 'GFS' | 'AIFS')[] = ['NCUM', 'WRF', 'GFS', 'AIFS'];
  const leadTimes: ForecastLeadTime[] = ['+03h', '+06h', '+12h', '+24h', '+48h'];
  const variables: { id: WeatherVariable; label: string; unit: string }[] = [
    { id: 'rainfall', label: 'Rainfall', unit: 'mm' },
    { id: 'temperature', label: 'Temperature', unit: '°C' },
    { id: 'wind', label: 'Wind Speed', unit: 'km/h' },
  ];

  // Specific data for active model
  const activeModelData = location.models.find((m: ModelContribution) => m.name === selectedModel) || {
    name: 'AIFS',
    fullName: 'ECMWF AI Integrated Forecasting System (AIFS)',
    sourceOrg: 'ECMWF Operational Machine Learning Suite',
    forecast: 58,
    predictedError: 7.4,
    uncertainty: 4.1,
    weight: 0.18,
    historicalSkillScore: 0.79,
    description: 'Data-driven neural weather prediction model; fast synoptic inference but smooths extreme convective peaks.',
  };

  return (
    <div
      className="desktop-page-container"
      style={{
        position: 'absolute',
        left: 'calc(126 * var(--u))',
        right: 'calc(38 * var(--u))',
        top: 'calc(94 * var(--u))',
        bottom: 'calc(24 * var(--u))',
        overflowY: 'auto',
        overflowX: 'hidden',
        zIndex: 35,
        display: 'flex',
        flexDirection: 'column',
        gap: 'calc(16 * var(--u))',
        paddingRight: 'calc(6 * var(--u))',
      }}
    >
      {/* Header Banner */}
      <div
        className="aurora-card-glass aurora-sheen"
        style={{
          padding: 'calc(18 * var(--u)) calc(24 * var(--u))',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'calc(8 * var(--u))' }}>
            <TargetIcon size="calc(20 * var(--u))" style={{ color: 'var(--accent-ice)' }} />
            <h1
              className="font-headline"
              style={{
                fontSize: 'calc(22 * var(--u))',
                fontWeight: 700,
                color: '#ffffff',
                letterSpacing: 'calc(-0.4 * var(--u))',
              }}
            >
              Predictive Model Trust Matrix
            </h1>
          </div>
          <p style={{ fontSize: 'calc(13 * var(--u))', color: 'rgba(255, 255, 255, 0.7)', marginTop: 'calc(2 * var(--u))' }}>
            Which forecast source is expected to perform best under the current atmospheric state?
          </p>
        </div>

        {/* Region Chip */}
        <div className="aurora-tool-glass" style={{ padding: 'calc(6 * var(--u)) calc(14 * var(--u))', borderRadius: 'calc(14 * var(--u))' }}>
          <span style={{ fontSize: 'calc(12 * var(--u))', fontWeight: 600, color: '#ffffff' }}>
            {location.name} · {location.atmosphericRegime}
          </span>
        </div>
      </div>

      {/* Selectors Bar */}
      <div
        className="aurora-tool-glass"
        style={{
          padding: 'calc(12 * var(--u)) calc(20 * var(--u))',
          borderRadius: 'calc(16 * var(--u))',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 'calc(12 * var(--u))',
        }}
      >
        {/* Model Selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'calc(8 * var(--u))' }}>
          <span style={{ fontSize: 'calc(11.5 * var(--u))', color: 'rgba(255, 255, 255, 0.6)' }}>Model:</span>
          {models.map((mod) => (
            <button
              key={mod}
              onClick={() => setSelectedModel(mod)}
              className="font-mono"
              style={{
                padding: 'calc(4 * var(--u)) calc(12 * var(--u))',
                borderRadius: 'calc(8 * var(--u))',
                fontSize: 'calc(12 * var(--u))',
                fontWeight: 600,
                background: selectedModel === mod ? '#ffffff' : 'rgba(255, 255, 255, 0.12)',
                color: selectedModel === mod ? '#041018' : '#ffffff',
                transition: 'all 0.2s',
              }}
            >
              {mod}
            </button>
          ))}
        </div>

        {/* Lead-time Selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'calc(6 * var(--u))' }}>
          <span style={{ fontSize: 'calc(11.5 * var(--u))', color: 'rgba(255, 255, 255, 0.6)' }}>Lead:</span>
          {leadTimes.map((lt) => (
            <button
              key={lt}
              onClick={() => setSelectedLead(lt)}
              className="font-mono"
              style={{
                padding: 'calc(4 * var(--u)) calc(10 * var(--u))',
                borderRadius: 'calc(8 * var(--u))',
                fontSize: 'calc(11.5 * var(--u))',
                fontWeight: 500,
                background: selectedLead === lt ? 'var(--accent-ice)' : 'rgba(255, 255, 255, 0.10)',
                color: selectedLead === lt ? '#041018' : '#ffffff',
                transition: 'all 0.2s',
              }}
            >
              {lt}
            </button>
          ))}
        </div>

        {/* Variable Selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'calc(6 * var(--u))' }}>
          <span style={{ fontSize: 'calc(11.5 * var(--u))', color: 'rgba(255, 255, 255, 0.6)' }}>Variable:</span>
          {variables.map((v) => (
            <button
              key={v.id}
              onClick={() => setSelectedVariable(v.id)}
              style={{
                padding: 'calc(4 * var(--u)) calc(10 * var(--u))',
                borderRadius: 'calc(8 * var(--u))',
                fontSize: 'calc(11.5 * var(--u))',
                fontWeight: 500,
                background: selectedVariable === v.id ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.10)',
                color: '#ffffff',
                transition: 'all 0.2s',
              }}
            >
              {v.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Analysis Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 'calc(16 * var(--u))' }}>
        {/* Left: Active Model Deep Dive */}
        <div className="aurora-card-glass" style={{ padding: 'calc(20 * var(--u)) calc(22 * var(--u))', display: 'flex', flexDirection: 'column', gap: 'calc(14 * var(--u))' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span className="font-headline" style={{ fontSize: 'calc(18 * var(--u))', fontWeight: 700, color: '#ffffff' }}>
                {activeModelData.fullName}
              </span>
              <span className="font-mono" style={{ fontSize: 'calc(12 * var(--u))', color: 'var(--accent-ice)' }}>
                {selectedModel} · {selectedLead}
              </span>
            </div>
            <div style={{ fontSize: 'calc(12 * var(--u))', color: 'rgba(255, 255, 255, 0.6)', marginTop: 'calc(2 * var(--u))' }}>
              Source Agency: {activeModelData.sourceOrg}
            </div>
          </div>

          {/* Core Reliability Quad Metrics */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'calc(10 * var(--u))' }}>
            <div style={{ background: 'rgba(255,255,255,0.08)', padding: 'calc(10 * var(--u))', borderRadius: 'calc(10 * var(--u))' }}>
              <div style={{ fontSize: 'calc(10 * var(--u))', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase' }}>
                Predicted Error (ε̂)
              </div>
              <div className="font-mono" style={{ fontSize: 'calc(18 * var(--u))', fontWeight: 700, color: '#ffffff', marginTop: 'calc(4 * var(--u))' }}>
                {activeModelData.predictedError} mm
              </div>
              <div style={{ fontSize: 'calc(9.5 * var(--u))', color: activeModelData.predictedError < 6 ? 'var(--status-green)' : 'var(--status-amber)' }}>
                {activeModelData.predictedError < 6 ? 'Low Error Regime' : 'Elevated Bias'}
              </div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.08)', padding: 'calc(10 * var(--u))', borderRadius: 'calc(10 * var(--u))' }}>
              <div style={{ fontSize: 'calc(10 * var(--u))', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase' }}>
                Uncertainty (σ̂)
              </div>
              <div className="font-mono" style={{ fontSize: 'calc(18 * var(--u))', fontWeight: 700, color: '#ffffff', marginTop: 'calc(4 * var(--u))' }}>
                ±{activeModelData.uncertainty} mm
              </div>
              <div style={{ fontSize: 'calc(9.5 * var(--u))', color: 'rgba(255,255,255,0.6)' }}>
                Posterior Std. Dev
              </div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.08)', padding: 'calc(10 * var(--u))', borderRadius: 'calc(10 * var(--u))' }}>
              <div style={{ fontSize: 'calc(10 * var(--u))', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase' }}>
                Dynamic Weight (w)
              </div>
              <div className="font-mono" style={{ fontSize: 'calc(18 * var(--u))', fontWeight: 700, color: 'var(--accent-ice)', marginTop: 'calc(4 * var(--u))' }}>
                {Math.round(activeModelData.weight * 100)}%
              </div>
              <div style={{ fontSize: 'calc(9.5 * var(--u))', color: 'rgba(255,255,255,0.6)' }}>
                Softmax Allocation
              </div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.08)', padding: 'calc(10 * var(--u))', borderRadius: 'calc(10 * var(--u))' }}>
              <div style={{ fontSize: 'calc(10 * var(--u))', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase' }}>
                Historical Skill
              </div>
              <div className="font-mono" style={{ fontSize: 'calc(18 * var(--u))', fontWeight: 700, color: '#ffffff', marginTop: 'calc(4 * var(--u))' }}>
                {activeModelData.historicalSkillScore}
              </div>
              <div style={{ fontSize: 'calc(9.5 * var(--u))', color: 'rgba(255,255,255,0.6)' }}>
                Continuous CRPS
              </div>
            </div>
          </div>

          {/* Why this weight? Meteorological Explanation */}
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              borderRadius: 'calc(12 * var(--u))',
              padding: 'calc(14 * var(--u)) calc(16 * var(--u))',
              border: '1px solid rgba(255, 255, 255, 0.14)',
            }}
          >
            <div style={{ fontSize: 'calc(13 * var(--u))', fontWeight: 600, color: '#ffffff', marginBottom: 'calc(6 * var(--u))' }}>
              Why this weight allocation?
            </div>
            <p style={{ fontSize: 'calc(12 * var(--u))', lineHeight: 1.5, color: 'rgba(255, 255, 255, 0.85)' }}>
              {activeModelData.description} Under the prevailing {location.atmosphericRegime} regime (CAPE: {location.cape} J/kg, moisture convergence: 1.1 g/kg/s), the predictive meta-learner penalised models with high synoptic smoothing while rewarding boundary-layer convection resolving models.
            </p>
          </div>
        </div>

        {/* Right: Mathematical Formulation & Blending Rigor */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'calc(16 * var(--u))' }}>
          <div className="aurora-card-glass" style={{ padding: 'calc(18 * var(--u)) calc(20 * var(--u))' }}>
            <span className="font-headline" style={{ fontSize: 'calc(14 * var(--u))', fontWeight: 600, color: '#ffffff' }}>
              Mathematical Foundation of WeatherBlend-X
            </span>

            {/* Formula Block */}
            <div
              style={{
                marginTop: 'calc(12 * var(--u))',
                background: 'rgba(0, 0, 0, 0.25)',
                padding: 'calc(12 * var(--u)) calc(16 * var(--u))',
                borderRadius: 'calc(10 * var(--u))',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                display: 'flex',
                flexDirection: 'column',
                gap: 'calc(10 * var(--u))',
              }}
            >
              <div>
                <div style={{ fontSize: 'calc(10.5 * var(--u))', color: 'rgba(255, 255, 255, 0.6)', textTransform: 'uppercase' }}>
                  1. Predicted Model Risk Formulation
                </div>
                <div className="font-mono" style={{ fontSize: 'calc(13 * var(--u))', color: 'var(--accent-ice)', marginTop: 'calc(2 * var(--u))' }}>
                  R_i = |ε̂_i| + λ · σ̂_i
                </div>
              </div>

              <div>
                <div style={{ fontSize: 'calc(10.5 * var(--u))', color: 'rgba(255, 255, 255, 0.6)', textTransform: 'uppercase' }}>
                  2. Temperature-Scaled Dynamic Weights
                </div>
                <div className="font-mono" style={{ fontSize: 'calc(13 * var(--u))', color: 'var(--accent-ice)', marginTop: 'calc(2 * var(--u))' }}>
                  w_i = exp(-R_i / τ) / ∑ exp(-R_j / τ)
                </div>
              </div>

              <div>
                <div style={{ fontSize: 'calc(10.5 * var(--u))', color: 'rgba(255, 255, 255, 0.6)', textTransform: 'uppercase' }}>
                  3. Calibrated Probabilistic Blended Forecast
                </div>
                <div className="font-mono" style={{ fontSize: 'calc(13 * var(--u))', color: '#ffffff', marginTop: 'calc(2 * var(--u))' }}>
                  Y_blended = ∑ (w_i · Y_i)
                </div>
              </div>
            </div>

            <div style={{ marginTop: 'calc(12 * var(--u))', fontSize: 'calc(11.5 * var(--u))', color: 'rgba(255, 255, 255, 0.72)', lineHeight: 1.45 }}>
              Hyperparameters: Risk penalty coefficient λ = 0.35, Softmax temperature τ = 0.45, Conformal calibration target coverage 1 - α = 90%.
            </div>
          </div>

          {/* Validation Target Status */}
          <div className="aurora-tool-glass" style={{ padding: 'calc(14 * var(--u)) calc(18 * var(--u))', borderRadius: 'calc(16 * var(--u))' }}>
            <div style={{ fontSize: 'calc(12 * var(--u))', fontWeight: 600, color: '#ffffff' }}>
              Validation Target & Experimental Protocol
            </div>
            <div style={{ fontSize: 'calc(11 * var(--u))', color: 'rgba(255, 255, 255, 0.8)', marginTop: 'calc(4 * var(--u))' }}>
              Target: Lower Continuous Ranked Probability Score (CRPS) and Brier Score relative to equal-weight ensemble (MME) benchmark across Indian monsoon regimes.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
