import React from 'react';
import type { LocationData } from '../../types/weather';
import { PinIcon, DropIcon, WindIcon, CloudIcon } from '../common/Icons';

interface CardMainForecastProps {
  location: LocationData;
}

export const CardMainForecast: React.FC<CardMainForecastProps> = ({ location }) => {
  return (
    <div
      className="aurora-card-glass aurora-sheen animate-right-1"
      style={{
        padding: 'calc(18 * var(--u)) calc(20 * var(--u))',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Location line */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'calc(6 * var(--u))' }}>
          <PinIcon size="calc(14 * var(--u))" style={{ color: 'var(--accent-ice)' }} />
          <span
            className="font-headline"
            style={{
              fontSize: 'calc(15 * var(--u))',
              fontWeight: 600,
              color: '#ffffff',
              letterSpacing: 'calc(-0.2 * var(--u))',
            }}
          >
            {location.name}
          </span>
        </div>
        <span
          className="font-mono"
          style={{
            fontSize: 'calc(11 * var(--u))',
            color: 'rgba(255, 255, 255, 0.65)',
            background: 'rgba(255, 255, 255, 0.10)',
            padding: 'calc(2 * var(--u)) calc(8 * var(--u))',
            borderRadius: 'calc(10 * var(--u))',
          }}
        >
          {location.leadTime} Forecast
        </span>
      </div>

      {/* Hero Temperature */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          marginTop: 'calc(8 * var(--u))',
          marginBottom: 'calc(10 * var(--u))',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start' }}>
          <span
            className="font-headline"
            style={{
              fontSize: 'calc(74 * var(--u))',
              fontWeight: 700,
              lineHeight: '0.95',
              letterSpacing: 'calc(-2.5 * var(--u))',
              color: '#ffffff',
            }}
          >
            {location.temperature.value}
          </span>
          <span
            style={{
              fontSize: 'calc(28 * var(--u))',
              fontWeight: 400,
              color: 'rgba(255, 255, 255, 0.75)',
              marginLeft: 'calc(4 * var(--u))',
            }}
          >
            °C
          </span>
        </div>

        {/* Small weather regime descriptor */}
        <div style={{ textAlign: 'right', marginTop: 'calc(6 * var(--u))' }}>
          <div
            style={{
              fontSize: 'calc(11.5 * var(--u))',
              fontWeight: 600,
              color: 'rgba(255, 255, 255, 0.95)',
            }}
          >
            High rainfall probability
          </div>
          <div
            style={{
              fontSize: 'calc(10.5 * var(--u))',
              color: 'var(--accent-ice)',
              marginTop: 'calc(2 * var(--u))',
              fontWeight: 500,
            }}
          >
            P(Heavy Rain): {Math.round(location.rainfall.probabilityHeavyRain * 100)}%
          </div>
        </div>
      </div>

      {/* Atmospheric Triple Metrics Strip */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 'calc(8 * var(--u))',
          paddingTop: 'calc(10 * var(--u))',
          borderTop: '1px solid rgba(255, 255, 255, 0.14)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 'calc(6 * var(--u))' }}>
          <DropIcon size="calc(14 * var(--u))" style={{ opacity: 0.75 }} />
          <div>
            <div style={{ fontSize: 'calc(9.5 * var(--u))', color: 'rgba(255, 255, 255, 0.55)', textTransform: 'uppercase' }}>
              Rainfall
            </div>
            <div style={{ fontSize: 'calc(12.5 * var(--u))', fontWeight: 600, color: '#ffffff' }}>
              {location.rainfall.value} {location.rainfall.unit}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 'calc(6 * var(--u))' }}>
          <WindIcon size="calc(14 * var(--u))" style={{ opacity: 0.75 }} />
          <div>
            <div style={{ fontSize: 'calc(9.5 * var(--u))', color: 'rgba(255, 255, 255, 0.55)', textTransform: 'uppercase' }}>
              Wind
            </div>
            <div style={{ fontSize: 'calc(12.5 * var(--u))', fontWeight: 600, color: '#ffffff' }}>
              {location.wind.value} {location.wind.unit}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 'calc(6 * var(--u))' }}>
          <CloudIcon size="calc(14 * var(--u))" style={{ opacity: 0.75 }} />
          <div>
            <div style={{ fontSize: 'calc(9.5 * var(--u))', color: 'rgba(255, 255, 255, 0.55)', textTransform: 'uppercase' }}>
              Humidity
            </div>
            <div style={{ fontSize: 'calc(12.5 * var(--u))', fontWeight: 600, color: '#ffffff' }}>
              {location.humidity}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
