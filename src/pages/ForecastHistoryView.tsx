import React from 'react';
import { MOCK_HISTORY_EVENTS } from '../data/weatherMock';
import type { HistoryEvent } from '../types/weather';
import { CalendarIcon, CheckIcon } from '../components/common/Icons';

export const ForecastHistoryView: React.FC = () => {
  // Verification data points for Predicted vs Observed chart
  const verificationPoints = [
    { time: '00:00', predicted: 42, observed: 40 },
    { time: '03:00', predicted: 54, observed: 52 },
    { time: '06:00', predicted: 61, observed: 58 },
    { time: '09:00', predicted: 76, observed: 74 },
    { time: '12:00', predicted: 88, observed: 85 },
  ];

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
      {/* Page Header */}
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
            <CalendarIcon size="calc(20 * var(--u))" style={{ color: 'var(--accent-ice)' }} />
            <h1 className="font-headline" style={{ fontSize: 'calc(22 * var(--u))', fontWeight: 700, color: '#ffffff' }}>
              Forecast Learning History & Verification Feedback
            </h1>
          </div>
          <p style={{ fontSize: 'calc(12.5 * var(--u))', color: 'rgba(255, 255, 255, 0.7)', marginTop: 'calc(2 * var(--u))' }}>
            Continuous learning loop: Ground truth observations, residual calculation, and dynamic model reliability updating
          </p>
        </div>

        {/* Status Chip */}
        <div className="aurora-tool-glass" style={{ padding: 'calc(6 * var(--u)) calc(12 * var(--u))', borderRadius: 'calc(12 * var(--u))' }}>
          <span style={{ fontSize: 'calc(11.5 * var(--u))', color: 'var(--status-green)', fontWeight: 600 }}>
            ● Verification Cycle Active
          </span>
        </div>
      </div>

      {/* Grid: 2 Columns */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 'calc(16 * var(--u))' }}>
        {/* Left Column: Continuous Learning Timeline */}
        <div className="aurora-card-glass" style={{ padding: 'calc(20 * var(--u))', display: 'flex', flexDirection: 'column', gap: 'calc(14 * var(--u))' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="font-headline" style={{ fontSize: 'calc(15 * var(--u))', fontWeight: 600, color: '#ffffff' }}>
              Operational Feedback Timeline (Forecast → Observation → Adaptation)
            </span>
            <span className="font-mono" style={{ fontSize: 'calc(11 * var(--u))', color: 'rgba(255,255,255,0.6)' }}>
              Maharashtra Convective Zone
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'calc(12 * var(--u))', position: 'relative' }}>
            {/* Vertical timeline connector */}
            <div
              style={{
                position: 'absolute',
                left: 'calc(14 * var(--u))',
                top: 'calc(10 * var(--u))',
                bottom: 'calc(10 * var(--u))',
                width: 'calc(2 * var(--u))',
                background: 'rgba(255, 255, 255, 0.15)',
              }}
            />

            {MOCK_HISTORY_EVENTS.map((event: HistoryEvent) => (
              <div
                key={event.id}
                style={{
                  display: 'flex',
                  gap: 'calc(14 * var(--u))',
                  position: 'relative',
                  zIndex: 2,
                }}
              >
                {/* Node marker */}
                <div
                  style={{
                    width: 'calc(28 * var(--u))',
                    height: 'calc(28 * var(--u))',
                    borderRadius: '50%',
                    background: event.step === 'weights_adjusted'
                      ? 'var(--accent-ice)'
                      : event.step === 'residual_calculated'
                      ? 'var(--status-green)'
                      : 'rgba(255, 255, 255, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    color: event.step === 'weights_adjusted' ? '#041018' : '#ffffff',
                    border: '2px solid rgba(4, 16, 24, 0.8)',
                  }}
                >
                  <CheckIcon size="calc(13 * var(--u))" />
                </div>

                {/* Content card */}
                <div
                  style={{
                    flex: 1,
                    background: 'rgba(255, 255, 255, 0.08)',
                    padding: 'calc(10 * var(--u)) calc(14 * var(--u))',
                    borderRadius: 'calc(12 * var(--u))',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className="font-headline" style={{ fontSize: 'calc(13 * var(--u))', fontWeight: 600, color: '#ffffff' }}>
                      {event.title}
                    </span>
                    <span className="font-mono" style={{ fontSize: 'calc(11 * var(--u))', color: 'var(--accent-ice)' }}>
                      {event.timestamp}
                    </span>
                  </div>

                  <p style={{ fontSize: 'calc(11.5 * var(--u))', color: 'rgba(255, 255, 255, 0.85)', marginTop: 'calc(4 * var(--u))', lineHeight: 1.4 }}>
                    {event.detail}
                  </p>

                  {event.metrics && (
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'calc(14 * var(--u))',
                        marginTop: 'calc(6 * var(--u))',
                        paddingTop: 'calc(6 * var(--u))',
                        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                        fontSize: 'calc(11 * var(--u))',
                      }}
                    >
                      {event.metrics.residual !== undefined && (
                        <span style={{ color: 'var(--status-green)' }}>
                          Residual: +{event.metrics.residual} mm
                        </span>
                      )}
                      {event.metrics.wrfWeightDelta && (
                        <span style={{ color: 'var(--accent-ice)' }}>
                          WRF: {event.metrics.wrfWeightDelta} weight
                        </span>
                      )}
                      {event.metrics.gfsWeightDelta && (
                        <span style={{ color: 'rgba(255, 255, 255, 0.65)' }}>
                          GFS: {event.metrics.gfsWeightDelta} weight
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Compact Verification Graph */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'calc(16 * var(--u))' }}>
          <div className="aurora-card-glass" style={{ padding: 'calc(18 * var(--u)) calc(20 * var(--u))' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="font-headline" style={{ fontSize: 'calc(14 * var(--u))', fontWeight: 600, color: '#ffffff' }}>
                Predicted vs Observed Rainfall (Verification)
              </span>
              <span style={{ fontSize: 'calc(11 * var(--u))', color: 'rgba(255, 255, 255, 0.6)' }}>
                AWS Network Validation
              </span>
            </div>

            {/* SVG Verification Chart */}
            <div style={{ width: '100%', height: 'calc(180 * var(--u))', marginTop: 'calc(14 * var(--u))' }}>
              <svg viewBox="0 0 400 160" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
                {/* Horizontal grid lines */}
                <line x1="30" y1="30" x2="380" y2="30" stroke="rgba(255,255,255,0.08)" strokeDasharray="2 2" />
                <line x1="30" y1="80" x2="380" y2="80" stroke="rgba(255,255,255,0.08)" strokeDasharray="2 2" />
                <line x1="30" y1="130" x2="380" y2="130" stroke="rgba(255,255,255,0.08)" strokeDasharray="2 2" />

                {/* Predicted Path */}
                <polyline
                  points={verificationPoints.map((p, i) => `${45 + i * 80},${140 - (p.predicted / 100) * 110}`).join(' ')}
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="2"
                />

                {/* Observed Path */}
                <polyline
                  points={verificationPoints.map((p, i) => `${45 + i * 80},${140 - (p.observed / 100) * 110}`).join(' ')}
                  fill="none"
                  stroke="var(--accent-ice)"
                  strokeWidth="2"
                  strokeDasharray="4 3"
                />

                {/* Points */}
                {verificationPoints.map((p, i) => {
                  const x = 45 + i * 80;
                  const yPred = 140 - (p.predicted / 100) * 110;
                  const yObs = 140 - (p.observed / 100) * 110;
                  return (
                    <g key={i}>
                      <circle cx={x} cy={yPred} r="3.5" fill="#ffffff" />
                      <circle cx={x} cy={yObs} r="3.5" fill="var(--accent-ice)" />
                      <text x={x} y="152" fill="rgba(255,255,255,0.6)" fontSize="9" textAnchor="middle" fontFamily="Inter">
                        {p.time}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: 'calc(20 * var(--u))', marginTop: 'calc(6 * var(--u))', fontSize: 'calc(11 * var(--u))' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'calc(6 * var(--u))' }}>
                <div style={{ width: 'calc(12 * var(--u))', height: 'calc(2 * var(--u))', background: '#ffffff' }} />
                <span style={{ color: 'rgba(255,255,255,0.85)' }}>WeatherBlend-X Forecast</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'calc(6 * var(--u))' }}>
                <div style={{ width: 'calc(12 * var(--u))', height: 'calc(2 * var(--u))', background: 'var(--accent-ice)', borderTop: '1px dashed var(--accent-ice)' }} />
                <span style={{ color: 'var(--accent-ice)' }}>Ground Truth (AWS)</span>
              </div>
            </div>
          </div>

          {/* Continuous Adaptation Note */}
          <div className="aurora-tool-glass" style={{ padding: 'calc(14 * var(--u)) calc(18 * var(--u))', borderRadius: 'calc(16 * var(--u))' }}>
            <span className="font-headline" style={{ fontSize: 'calc(12.5 * var(--u))', fontWeight: 600, color: '#ffffff', textTransform: 'uppercase' }}>
              Autonomous Residual Feedback
            </span>
            <p style={{ fontSize: 'calc(11.5 * var(--u))', color: 'rgba(255,255,255,0.85)', marginTop: 'calc(6 * var(--u))', lineHeight: 1.45 }}>
              Ground truth observations from the IMD automatic weather station network are compared against valid forecast hours every 3 hours. Recent residuals dynamically recalibrate the conditional error meta-learner weights for subsequent forecast cycles.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
