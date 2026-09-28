import React from 'react';
import type { LocationData } from '../../types/weather';
import { StormIcon, RainIcon, WindIcon } from '../common/Icons';

interface CardExtremeRiskProps {
  location: LocationData;
}

export const CardExtremeRisk: React.FC<CardExtremeRiskProps> = ({ location }) => {
  const { heavyRainProb, highWindProb, floodRiskLevel } = location.extremeRisk;

  // Status color logic (sparingly applied)
  const getRiskColor = (level: string) => {
    switch (level) {
      case 'Normal':
        return 'var(--status-green)';
      case 'Moderate':
        return 'var(--status-amber)';
      case 'High':
      case 'Severe':
        return 'var(--status-red)';
      default:
        return '#ffffff';
    }
  };

  return (
    <div
      className="aurora-card-glass aurora-sheen animate-right-4"
      style={{
        padding: 'calc(16 * var(--u)) calc(20 * var(--u))',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Title */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'calc(6 * var(--u))' }}>
          <StormIcon size="calc(14 * var(--u))" style={{ color: 'var(--accent-ice)' }} />
          <span
            className="font-headline"
            style={{
              fontSize: 'calc(14.5 * var(--u))',
              fontWeight: 600,
              color: '#ffffff',
              letterSpacing: 'calc(-0.2 * var(--u))',
            }}
          >
            Extreme Weather Risk
          </span>
        </div>
        <span
          style={{
            fontSize: 'calc(10 * var(--u))',
            color: 'rgba(255, 255, 255, 0.60)',
            textTransform: 'uppercase',
          }}
        >
          Probabilistic Alert
        </span>
      </div>

      {/* Grid of Extreme Risks */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 'calc(8 * var(--u))',
          marginTop: 'calc(10 * var(--u))',
        }}
      >
        {/* Heavy Rain Risk */}
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.08)',
            padding: 'calc(8 * var(--u)) calc(8 * var(--u))',
            borderRadius: 'calc(10 * var(--u))',
            display: 'flex',
            flexDirection: 'column',
            gap: 'calc(2 * var(--u))',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 'calc(4 * var(--u))', color: 'rgba(255, 255, 255, 0.65)' }}>
            <RainIcon size="calc(11 * var(--u))" />
            <span style={{ fontSize: 'calc(9.5 * var(--u))', textTransform: 'uppercase' }}>Heavy Rain</span>
          </div>
          <div
            className="font-mono"
            style={{
              fontSize: 'calc(17 * var(--u))',
              fontWeight: 700,
              color: heavyRainProb >= 70 ? 'var(--status-amber)' : '#ffffff',
            }}
          >
            {heavyRainProb}%
          </div>
        </div>

        {/* High Wind Risk */}
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.08)',
            padding: 'calc(8 * var(--u)) calc(8 * var(--u))',
            borderRadius: 'calc(10 * var(--u))',
            display: 'flex',
            flexDirection: 'column',
            gap: 'calc(2 * var(--u))',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 'calc(4 * var(--u))', color: 'rgba(255, 255, 255, 0.65)' }}>
            <WindIcon size="calc(11 * var(--u))" />
            <span style={{ fontSize: 'calc(9.5 * var(--u))', textTransform: 'uppercase' }}>&gt;40 km/h</span>
          </div>
          <div
            className="font-mono"
            style={{
              fontSize: 'calc(17 * var(--u))',
              fontWeight: 700,
              color: '#ffffff',
            }}
          >
            {highWindProb}%
          </div>
        </div>

        {/* Flood Risk Indicator */}
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.08)',
            padding: 'calc(8 * var(--u)) calc(8 * var(--u))',
            borderRadius: 'calc(10 * var(--u))',
            display: 'flex',
            flexDirection: 'column',
            gap: 'calc(2 * var(--u))',
          }}
        >
          <div style={{ fontSize: 'calc(9.5 * var(--u))', textTransform: 'uppercase', color: 'rgba(255, 255, 255, 0.65)' }}>
            Flood Risk
          </div>
          <div
            style={{
              fontSize: 'calc(14 * var(--u))',
              fontWeight: 600,
              color: getRiskColor(floodRiskLevel),
              marginTop: 'calc(2 * var(--u))',
            }}
          >
            {floodRiskLevel}
          </div>
        </div>
      </div>
    </div>
  );
};
