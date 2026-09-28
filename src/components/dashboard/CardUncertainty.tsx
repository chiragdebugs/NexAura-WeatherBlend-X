import React from 'react';
import type { LocationData } from '../../types/weather';
import { UncertaintyIcon } from '../common/Icons';

interface CardUncertaintyProps {
  location: LocationData;
}

export const CardUncertainty: React.FC<CardUncertaintyProps> = ({ location }) => {
  const { lower, upper, confidence, disagreementLevel } = location.uncertainty;
  const central = location.blendedForecast;

  // Calculate percentage positions dynamically for visualization
  const minVal = Math.max(0, Math.floor(Math.min(lower, central) / 10) * 10 - 10);
  const maxVal = Math.max(minVal + 40, Math.ceil(Math.max(upper, central) / 10) * 10 + 10);
  const range = Math.max(1, maxVal - minVal);
  const leftPct = Math.max(0, Math.min(100, ((lower - minVal) / range) * 100));
  const rightPct = Math.max(0, Math.min(100, ((upper - minVal) / range) * 100));
  const centerPct = Math.max(0, Math.min(100, ((central - minVal) / range) * 100));
  const bandWidth = Math.max(2, rightPct - leftPct);

  return (
    <div
      className="aurora-card-glass aurora-sheen animate-right-3"
      style={{
        padding: 'calc(16 * var(--u)) calc(20 * var(--u))',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Title */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'calc(6 * var(--u))' }}>
          <UncertaintyIcon size="calc(14 * var(--u))" style={{ color: 'var(--accent-ice)' }} />
          <span
            className="font-headline"
            style={{
              fontSize: 'calc(14.5 * var(--u))',
              fontWeight: 600,
              color: '#ffffff',
              letterSpacing: 'calc(-0.2 * var(--u))',
            }}
          >
            Forecast Uncertainty
          </span>
        </div>
        <span
          className="font-mono"
          style={{
            fontSize: 'calc(11 * var(--u))',
            color: 'var(--accent-ice)',
            background: 'rgba(158, 230, 255, 0.12)',
            padding: 'calc(2 * var(--u)) calc(8 * var(--u))',
            borderRadius: 'calc(10 * var(--u))',
          }}
        >
          {Math.round(confidence * 100)}% Conf.
        </span>
      </div>

      {/* Main Metrics Overview */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          marginTop: 'calc(8 * var(--u))',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 'calc(4 * var(--u))' }}>
          <span
            className="font-headline"
            style={{
              fontSize: 'calc(26 * var(--u))',
              fontWeight: 700,
              color: '#ffffff',
            }}
          >
            {central}
          </span>
          <span style={{ fontSize: 'calc(12 * var(--u))', color: 'rgba(255, 255, 255, 0.7)' }}>
            mm blended
          </span>
        </div>

        <div style={{ textAlign: 'right' }}>
          <span style={{ fontSize: 'calc(10.5 * var(--u))', color: 'rgba(255, 255, 255, 0.55)' }}>
            Prediction Interval:
          </span>
          <span
            className="font-mono"
            style={{
              fontSize: 'calc(12.5 * var(--u))',
              fontWeight: 600,
              color: '#ffffff',
              marginLeft: 'calc(4 * var(--u))',
            }}
          >
            {lower}–{upper} mm
          </span>
        </div>
      </div>

      {/* Subtle Uncertainty Visualization: Central Point + Soft Translucent Interval Band */}
      <div
        style={{
          marginTop: 'calc(12 * var(--u))',
          marginBottom: 'calc(4 * var(--u))',
          position: 'relative',
          height: 'calc(26 * var(--u))',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {/* Baseline Axis */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            height: 'calc(1 * var(--u))',
            background: 'rgba(255, 255, 255, 0.15)',
          }}
        />

        {/* Soft Translucent Interval Band */}
        <div
          style={{
            position: 'absolute',
            left: `${leftPct}%`,
            width: `${bandWidth}%`,
            height: 'calc(14 * var(--u))',
            background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.08), rgba(158, 230, 255, 0.22), rgba(255, 255, 255, 0.08))',
            border: '1px solid rgba(255, 255, 255, 0.22)',
            borderRadius: 'calc(8 * var(--u))',
            boxShadow: '0 0 calc(10 * var(--u)) rgba(158, 230, 255, 0.15)',
          }}
        />

        {/* Central Forecast Point */}
        <div
          style={{
            position: 'absolute',
            left: `${centerPct}%`,
            transform: 'translateX(-50%)',
            width: 'calc(9 * var(--u))',
            height: 'calc(9 * var(--u))',
            borderRadius: '50%',
            background: '#ffffff',
            boxShadow: '0 0 calc(8 * var(--u)) rgba(255, 255, 255, 0.8)',
            border: '1.5px solid rgba(4, 16, 24, 0.9)',
            zIndex: 2,
          }}
        />
      </div>

      {/* Disagreement Label */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 'calc(6 * var(--u))',
          paddingTop: 'calc(6 * var(--u))',
          borderTop: '1px solid rgba(255, 255, 255, 0.10)',
          fontSize: 'calc(11 * var(--u))',
        }}
      >
        <span style={{ color: 'rgba(255, 255, 255, 0.60)' }}>Model Disagreement</span>
        <span
          style={{
            fontWeight: 600,
            color: disagreementLevel === 'Moderate' ? 'rgba(255, 255, 255, 0.95)' : 'var(--status-amber)',
          }}
        >
          {disagreementLevel} (±{location.uncertainty.spreadMm} mm spread)
        </span>
      </div>
    </div>
  );
};
