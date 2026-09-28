import React from 'react';
import type { LocationData } from '../../types/weather';

interface HeroSectionProps {
  location: LocationData;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ location }) => {
  return (
    <div
      className="desktop-hero dashboard-hero"
      style={{
        pointerEvents: 'auto',
      }}
    >
      {/* Category Chip */}
      <div
        className="animate-hero-chip aurora-subtle-glass aurora-sheen"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 'calc(6 * var(--u))',
          padding: 'calc(4 * var(--u)) calc(12 * var(--u))',
          borderRadius: 'calc(20 * var(--u))',
          marginBottom: 'calc(8 * var(--u))',
          alignSelf: 'flex-start',
        }}
      >
        <span
          style={{
            width: 'calc(5 * var(--u))',
            height: 'calc(5 * var(--u))',
            borderRadius: '50%',
            backgroundColor: 'var(--accent-ice)',
          }}
        />
        <span
          style={{
            fontSize: 'calc(11 * var(--u))',
            fontWeight: 500,
            color: 'rgba(255, 255, 255, 0.92)',
            letterSpacing: 'calc(0.3 * var(--u))',
            textTransform: 'uppercase',
          }}
        >
          AI Forecast Intelligence
        </span>
      </div>

      {/* Headline */}
      <h1
        className="animate-hero-h1 font-headline"
        style={{
          fontSize: 'clamp(28px, calc(38 * var(--u)), 48px)',
          lineHeight: '1.08',
          fontWeight: 700,
          color: '#ffffff',
          letterSpacing: 'calc(-1 * var(--u))',
          marginBottom: 'calc(8 * var(--u))',
        }}
      >
        <div>Predictive</div>
        <div style={{ color: 'rgba(255, 255, 255, 0.92)' }}>Weather Intelligence</div>
      </h1>

      {/* Blurb */}
      <p
        className="animate-hero-p"
        style={{
          maxWidth: 'calc(500 * var(--u))',
          width: '100%',
          fontSize: 'clamp(12px, calc(13.5 * var(--u)), 15px)',
          lineHeight: '1.4',
          fontWeight: 500,
          letterSpacing: 'calc(-0.2 * var(--u))',
          color: 'rgba(255, 255, 255, 0.92)',
          marginBottom: 'calc(12 * var(--u))',
        }}
      >
        Adaptive multi-model forecasting powered by predictive model reliability, dynamic spatial weighting and calibrated uncertainty.
      </p>

      {/* Hero KPI / Live Forecast Status Strip */}
      <div
        className="animate-hero-kpi aurora-tool-glass"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 'calc(20 * var(--u))',
          padding: 'calc(8 * var(--u)) calc(18 * var(--u))',
          borderRadius: 'calc(14 * var(--u))',
          alignSelf: 'flex-start',
          flexWrap: 'wrap',
        }}
      >
        <div>
          <div
            style={{
              fontSize: 'calc(10 * var(--u))',
              textTransform: 'uppercase',
              color: 'rgba(255, 255, 255, 0.55)',
              letterSpacing: 'calc(0.6 * var(--u))',
              fontWeight: 600,
            }}
          >
            Location
          </div>
          <div
            style={{
              fontSize: 'calc(14 * var(--u))',
              fontWeight: 600,
              color: '#ffffff',
              marginTop: 'calc(2 * var(--u))',
            }}
          >
            {location.name}
          </div>
        </div>

        <div style={{ width: 1, height: 'calc(24 * var(--u))', background: 'rgba(255,255,255,0.18)' }} />

        <div>
          <div
            style={{
              fontSize: 'calc(10 * var(--u))',
              textTransform: 'uppercase',
              color: 'rgba(255, 255, 255, 0.55)',
              letterSpacing: 'calc(0.6 * var(--u))',
              fontWeight: 600,
            }}
          >
            Forecast Lead
          </div>
          <div
            className="font-mono"
            style={{
              fontSize: 'calc(14 * var(--u))',
              fontWeight: 600,
              color: 'var(--accent-ice)',
              marginTop: 'calc(2 * var(--u))',
            }}
          >
            {location.leadTime}
          </div>
        </div>

        <div style={{ width: 1, height: 'calc(24 * var(--u))', background: 'rgba(255,255,255,0.18)' }} />

        <div>
          <div
            style={{
              fontSize: 'calc(10 * var(--u))',
              textTransform: 'uppercase',
              color: 'rgba(255, 255, 255, 0.55)',
              letterSpacing: 'calc(0.6 * var(--u))',
              fontWeight: 600,
            }}
          >
            Model Consensus
          </div>
          <div
            style={{
              fontSize: 'calc(14 * var(--u))',
              fontWeight: 600,
              color: '#ffffff',
              marginTop: 'calc(2 * var(--u))',
            }}
          >
            {Math.round(location.uncertainty.confidence * 100)}%
          </div>
        </div>

        <div style={{ width: 1, height: 'calc(24 * var(--u))', background: 'rgba(255,255,255,0.18)' }} />

        <div>
          <div
            style={{
              fontSize: 'calc(10 * var(--u))',
              textTransform: 'uppercase',
              color: 'rgba(255, 255, 255, 0.55)',
              letterSpacing: 'calc(0.6 * var(--u))',
              fontWeight: 600,
            }}
          >
            Model Conflict
          </div>
          <div
            style={{
              fontSize: 'calc(14 * var(--u))',
              fontWeight: 600,
              color: location.uncertainty.disagreementLevel === 'High' ? 'var(--status-amber)' : 'rgba(255, 255, 255, 0.95)',
              marginTop: 'calc(2 * var(--u))',
            }}
          >
            {location.uncertainty.disagreementLevel}
          </div>
        </div>
      </div>
    </div>
  );
};
