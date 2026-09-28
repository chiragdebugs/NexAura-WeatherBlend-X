import React, { useState } from 'react';
import type { LocationData, ModelContribution } from '../types/weather';
import { ActivityIcon, TargetIcon, StormIcon, CheckIcon } from '../components/common/Icons';

interface ForecastIntelligenceViewProps {
  location: LocationData;
}

export const ForecastIntelligenceView: React.FC<ForecastIntelligenceViewProps> = ({ location }) => {
  const [selectedLead, setSelectedLead] = useState(location.leadTime);
  const leads = ['+00h', '+03h', '+06h', '+09h', '+12h', '+24h'];

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
      {/* Page Title & Filter Bar */}
      <div
        className="aurora-card-glass aurora-sheen"
        style={{
          padding: 'calc(16 * var(--u)) calc(24 * var(--u))',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'calc(8 * var(--u))' }}>
            <ActivityIcon size="calc(18 * var(--u))" style={{ color: 'var(--accent-ice)' }} />
            <h1
              className="font-headline"
              style={{
                fontSize: 'calc(22 * var(--u))',
                fontWeight: 700,
                color: '#ffffff',
                letterSpacing: 'calc(-0.4 * var(--u))',
              }}
            >
              Forecast Intelligence & Error Distribution
            </h1>
          </div>
          <p style={{ fontSize: 'calc(12.5 * var(--u))', color: 'rgba(255, 255, 255, 0.7)', marginTop: 'calc(2 * var(--u))' }}>
            Conditional future error synthesis, dynamic spatio-temporal weighting, and conformal prediction interval for {location.name}
          </p>
        </div>

        {/* Lead time selector pills */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'calc(6 * var(--u))' }}>
          <span style={{ fontSize: 'calc(11 * var(--u))', color: 'rgba(255, 255, 255, 0.55)', marginRight: 'calc(4 * var(--u))' }}>
            Lead Time:
          </span>
          {leads.map((lt) => (
            <button
              key={lt}
              onClick={() => setSelectedLead(lt as any)}
              className="font-mono"
              style={{
                padding: 'calc(4 * var(--u)) calc(10 * var(--u))',
                borderRadius: 'calc(8 * var(--u))',
                fontSize: 'calc(11.5 * var(--u))',
                fontWeight: 500,
                background: selectedLead === lt ? 'var(--accent-ice)' : 'rgba(255, 255, 255, 0.12)',
                color: selectedLead === lt ? '#041018' : '#ffffff',
                transition: 'all 0.2s',
              }}
            >
              {lt}
            </button>
          ))}
        </div>
      </div>

      {/* Grid: 2 Columns */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 'calc(16 * var(--u))' }}>
        {/* Left Column: Atmospheric State + Model Reliability Breakdown */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'calc(16 * var(--u))' }}>
          {/* Current Atmospheric State Panel */}
          <div className="aurora-card-glass" style={{ padding: 'calc(16 * var(--u)) calc(20 * var(--u))' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'calc(12 * var(--u))' }}>
              <span className="font-headline" style={{ fontSize: 'calc(14 * var(--u))', fontWeight: 600, color: '#ffffff' }}>
                Current Atmospheric State & Regime
              </span>
              <span
                style={{
                  fontSize: 'calc(11 * var(--u))',
                  fontWeight: 600,
                  color: 'var(--accent-ice)',
                  background: 'rgba(158, 230, 255, 0.14)',
                  padding: 'calc(3 * var(--u)) calc(10 * var(--u))',
                  borderRadius: 'calc(12 * var(--u))',
                }}
              >
                {location.atmosphericRegime}
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'calc(10 * var(--u))' }}>
              <div style={{ background: 'rgba(255,255,255,0.08)', padding: 'calc(8 * var(--u))', borderRadius: 'calc(8 * var(--u))' }}>
                <div style={{ fontSize: 'calc(10 * var(--u))', color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase' }}>CAPE</div>
                <div className="font-mono" style={{ fontSize: 'calc(15 * var(--u))', fontWeight: 600, color: '#ffffff', marginTop: 'calc(2 * var(--u))' }}>
                  {location.cape} J/kg
                </div>
                <div style={{ fontSize: 'calc(9.5 * var(--u))', color: 'var(--status-amber)' }}>High convective</div>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.08)', padding: 'calc(8 * var(--u))', borderRadius: 'calc(8 * var(--u))' }}>
                <div style={{ fontSize: 'calc(10 * var(--u))', color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase' }}>Surface Pressure</div>
                <div className="font-mono" style={{ fontSize: 'calc(15 * var(--u))', fontWeight: 600, color: '#ffffff', marginTop: 'calc(2 * var(--u))' }}>
                  {location.pressure} hPa
                </div>
                <div style={{ fontSize: 'calc(9.5 * var(--u))', color: 'rgba(255,255,255,0.6)' }}>Trough anomaly</div>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.08)', padding: 'calc(8 * var(--u))', borderRadius: 'calc(8 * var(--u))' }}>
                <div style={{ fontSize: 'calc(10 * var(--u))', color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase' }}>Wind Vector</div>
                <div className="font-mono" style={{ fontSize: 'calc(15 * var(--u))', fontWeight: 600, color: '#ffffff', marginTop: 'calc(2 * var(--u))' }}>
                  {location.wind.value} km/h
                </div>
                <div style={{ fontSize: 'calc(9.5 * var(--u))', color: 'rgba(255,255,255,0.6)' }}>{location.wind.direction}</div>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.08)', padding: 'calc(8 * var(--u))', borderRadius: 'calc(8 * var(--u))' }}>
                <div style={{ fontSize: 'calc(10 * var(--u))', color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase' }}>Moisture (RH)</div>
                <div className="font-mono" style={{ fontSize: 'calc(15 * var(--u))', fontWeight: 600, color: '#ffffff', marginTop: 'calc(2 * var(--u))' }}>
                  {location.humidity}%
                </div>
                <div style={{ fontSize: 'calc(9.5 * var(--u))', color: 'rgba(255,255,255,0.6)' }}>Deep tropospheric</div>
              </div>
            </div>
          </div>

          {/* Model Forecasts & Predicted Future Error Matrix */}
          <div className="aurora-card-glass" style={{ padding: 'calc(16 * var(--u)) calc(20 * var(--u))' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'calc(12 * var(--u))' }}>
              <span className="font-headline" style={{ fontSize: 'calc(14 * var(--u))', fontWeight: 600, color: '#ffffff' }}>
                Model Contributions & Predicted Residual Errors
              </span>
              <span className="font-mono" style={{ fontSize: 'calc(11 * var(--u))', color: 'rgba(255, 255, 255, 0.6)' }}>
                Valid at {selectedLead}
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'calc(10 * var(--u))' }}>
              {location.models.map((model: ModelContribution) => (
                <div
                  key={model.name}
                  style={{
                    background: 'rgba(255, 255, 255, 0.07)',
                    borderRadius: 'calc(12 * var(--u))',
                    padding: 'calc(10 * var(--u)) calc(14 * var(--u))',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <span className="font-headline" style={{ fontSize: 'calc(13 * var(--u))', fontWeight: 700, color: '#ffffff' }}>
                        {model.name}
                      </span>
                      <span style={{ fontSize: 'calc(11 * var(--u))', color: 'rgba(255, 255, 255, 0.6)', marginLeft: 'calc(8 * var(--u))' }}>
                        {model.fullName}
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'calc(10 * var(--u))' }}>
                      <span className="font-mono" style={{ fontSize: 'calc(13 * var(--u))', fontWeight: 600, color: '#ffffff' }}>
                        Forecast: {model.forecast} mm
                      </span>
                      <span
                        className="font-mono"
                        style={{
                          fontSize: 'calc(11.5 * var(--u))',
                          fontWeight: 600,
                          color: 'var(--accent-ice)',
                          background: 'rgba(158, 230, 255, 0.15)',
                          padding: 'calc(2 * var(--u)) calc(8 * var(--u))',
                          borderRadius: 'calc(8 * var(--u))',
                        }}
                      >
                        Weight: {Math.round(model.weight * 100)}%
                      </span>
                    </div>
                  </div>

                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(3, 1fr)',
                      gap: 'calc(8 * var(--u))',
                      marginTop: 'calc(8 * var(--u))',
                      fontSize: 'calc(11 * var(--u))',
                      color: 'rgba(255, 255, 255, 0.75)',
                      borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                      paddingTop: 'calc(6 * var(--u))',
                    }}
                  >
                    <div>
                      Predicted Error: <strong style={{ color: '#ffffff' }}>{model.predictedError} mm</strong>
                    </div>
                    <div>
                      Uncertainty (σ): <strong style={{ color: '#ffffff' }}>{model.uncertainty} mm</strong>
                    </div>
                    <div>
                      Historical Skill: <strong style={{ color: 'var(--accent-ice)' }}>{model.historicalSkillScore}</strong>
                    </div>
                  </div>

                  <p style={{ fontSize: 'calc(10.5 * var(--u))', color: 'rgba(255, 255, 255, 0.6)', marginTop: 'calc(4 * var(--u))' }}>
                    {model.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Blended Synthesis + Prediction Interval + Extreme Probabilities */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'calc(16 * var(--u))' }}>
          {/* Final Blended Synthesis Card */}
          <div className="aurora-card-glass" style={{ padding: 'calc(18 * var(--u)) calc(20 * var(--u))' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'calc(6 * var(--u))', marginBottom: 'calc(8 * var(--u))' }}>
              <TargetIcon size="calc(15 * var(--u))" style={{ color: 'var(--accent-ice)' }} />
              <span className="font-headline" style={{ fontSize: 'calc(14 * var(--u))', fontWeight: 600, color: '#ffffff' }}>
                Probabilistic Blended Forecast
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: 'calc(8 * var(--u))', margin: 'calc(10 * var(--u)) 0' }}>
              <span
                className="font-headline"
                style={{
                  fontSize: 'calc(46 * var(--u))',
                  fontWeight: 700,
                  color: '#ffffff',
                  lineHeight: 1,
                }}
              >
                {location.blendedForecast}
              </span>
              <span style={{ fontSize: 'calc(16 * var(--u))', color: 'var(--accent-ice)', fontWeight: 500 }}>
                mm Rainfall
              </span>
              <span style={{ fontSize: 'calc(12 * var(--u))', color: 'rgba(255, 255, 255, 0.6)', marginLeft: 'auto' }}>
                Lead: {selectedLead}
              </span>
            </div>

            {/* Prediction Interval Strip */}
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                padding: 'calc(10 * var(--u)) calc(12 * var(--u))',
                borderRadius: 'calc(10 * var(--u))',
                border: '1px solid rgba(255, 255, 255, 0.14)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'calc(11.5 * var(--u))' }}>
                <span style={{ color: 'rgba(255, 255, 255, 0.65)' }}>Calibrated 90% Prediction Interval:</span>
                <span className="font-mono" style={{ fontWeight: 600, color: '#ffffff' }}>
                  {location.uncertainty.lower} mm – {location.uncertainty.upper} mm
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'calc(11.5 * var(--u))', marginTop: 'calc(4 * var(--u))' }}>
                <span style={{ color: 'rgba(255, 255, 255, 0.65)' }}>Conformal Coverage Confidence:</span>
                <span className="font-mono" style={{ fontWeight: 600, color: 'var(--status-green)' }}>
                  {Math.round(location.uncertainty.confidence * 100)}%
                </span>
              </div>
            </div>
          </div>

          {/* Extreme Event Probabilities */}
          <div className="aurora-card-glass" style={{ padding: 'calc(16 * var(--u)) calc(20 * var(--u))' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'calc(6 * var(--u))', marginBottom: 'calc(10 * var(--u))' }}>
              <StormIcon size="calc(15 * var(--u))" style={{ color: 'var(--accent-ice)' }} />
              <span className="font-headline" style={{ fontSize: 'calc(14 * var(--u))', fontWeight: 600, color: '#ffffff' }}>
                Extreme Event Risk Assessment
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'calc(8 * var(--u))' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 'calc(12 * var(--u))' }}>
                <span style={{ color: 'rgba(255,255,255,0.8)' }}>Probability of Heavy Rain (&gt;65 mm)</span>
                <span className="font-mono" style={{ fontWeight: 700, color: 'var(--status-amber)' }}>
                  {location.extremeRisk.heavyRainProb}%
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 'calc(12 * var(--u))' }}>
                <span style={{ color: 'rgba(255,255,255,0.8)' }}>Probability of Damaging Wind Gusts (&gt;40 km/h)</span>
                <span className="font-mono" style={{ fontWeight: 700, color: '#ffffff' }}>
                  {location.extremeRisk.highWindProb}%
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 'calc(12 * var(--u))' }}>
                <span style={{ color: 'rgba(255,255,255,0.8)' }}>Flood Inundation Vulnerability Index</span>
                <span className="font-mono" style={{ fontWeight: 700, color: 'var(--status-amber)' }}>
                  {location.extremeRisk.floodRiskLevel}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 'calc(12 * var(--u))' }}>
                <span style={{ color: 'rgba(255,255,255,0.8)' }}>Lightning Convective Flash Density</span>
                <span className="font-mono" style={{ fontWeight: 700, color: '#ffffff' }}>
                  {location.extremeRisk.lightningRisk}
                </span>
              </div>
            </div>
          </div>

          {/* Meteorological Trust Explanation */}
          <div className="aurora-tool-glass" style={{ padding: 'calc(14 * var(--u)) calc(18 * var(--u))', borderRadius: 'calc(16 * var(--u))' }}>
            <span className="font-headline" style={{ fontSize: 'calc(12.5 * var(--u))', fontWeight: 600, color: '#ffffff', textTransform: 'uppercase' }}>
              Meteorological Trust Explanation
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'calc(6 * var(--u))', marginTop: 'calc(8 * var(--u))' }}>
              {location.trustExplanations.map((text: string, idx: number) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: 'calc(6 * var(--u))' }}>
                  <div
                    style={{
                      width: 'calc(14 * var(--u))',
                      height: 'calc(14 * var(--u))',
                      borderRadius: '50%',
                      background: 'rgba(74, 222, 128, 0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--status-green)',
                      flexShrink: 0,
                      marginTop: 'calc(2 * var(--u))',
                    }}
                  >
                    <CheckIcon size="calc(9 * var(--u))" />
                  </div>
                  <span style={{ fontSize: 'calc(11.5 * var(--u))', color: 'rgba(255,255,255,0.88)', lineHeight: 1.35 }}>
                    {text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
