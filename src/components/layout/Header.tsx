import React, { useState } from 'react';
import { PlusIcon, SearchIcon, BellIcon, PinIcon } from '../common/Icons';
import type { LocationData } from '../../types/weather';
import { ALTERNATE_LOCATIONS } from '../../data/weatherMock';

interface HeaderProps {
  currentLocation: LocationData;
  onSelectLocation: (loc: LocationData) => void;
  onOpenSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentLocation,
  onSelectLocation,
  onOpenSearch,
}) => {
  const [showLocationMenu, setShowLocationMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header
      className="desktop-header"
      style={{
        position: 'absolute',
        top: 'calc(22 * var(--u))',
        left: 'calc(126 * var(--u))',
        right: 'calc(37 * var(--u))',
        height: 'calc(52 * var(--u))',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 40,
      }}
    >
      {/* Left Branding & Operational Status */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 'calc(18 * var(--u))' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 'calc(8 * var(--u))' }}>
            <span
              className="animate-header-title font-headline"
              style={{
                fontSize: 'calc(18 * var(--u))',
                fontWeight: 600,
                color: '#ffffff',
                letterSpacing: 'calc(-0.3 * var(--u))',
              }}
            >
              NexAura Intelligence
            </span>
            <span
              style={{
                fontSize: 'calc(18 * var(--u))',
                fontWeight: 400,
                color: 'rgba(255, 255, 255, 0.65)',
              }}
            >
              ·
            </span>
            <span
              className="animate-header-title font-headline"
              style={{
                fontSize: 'calc(18 * var(--u))',
                fontWeight: 500,
                color: 'var(--accent-ice)',
                letterSpacing: 'calc(-0.2 * var(--u))',
              }}
            >
              WeatherBlend-X
            </span>
          </div>

          <div
            className="animate-header-sub"
            style={{
              fontSize: 'calc(11.5 * var(--u))',
              color: 'rgba(255, 255, 255, 0.60)',
              marginTop: 'calc(1 * var(--u))',
              display: 'flex',
              alignItems: 'center',
              gap: 'calc(8 * var(--u))',
            }}
          >
            <span>Live Forecast Intelligence</span>
            <span>•</span>
            <span className="font-mono">Cycle: {currentLocation.cycle}</span>
            <span>•</span>
            <span className="font-mono">Lead: {currentLocation.leadTime}</span>
          </div>
        </div>

        {/* Operational Status Chip */}
        <div
          className="aurora-tool-glass"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'calc(6 * var(--u))',
            padding: 'calc(5 * var(--u)) calc(12 * var(--u))',
            borderRadius: 'calc(20 * var(--u))',
            marginLeft: 'calc(10 * var(--u))',
            cursor: 'default',
          }}
          title="NWP, Radar and Observation streams fully synchronized"
        >
          <div
            className="pulse-beacon"
            style={{
              width: 'calc(7 * var(--u))',
              height: 'calc(7 * var(--u))',
              borderRadius: '50%',
              backgroundColor: 'var(--status-green)',
            }}
          />
          <span
            style={{
              fontSize: 'calc(11 * var(--u))',
              fontWeight: 500,
              color: 'rgba(255, 255, 255, 0.95)',
              letterSpacing: 'calc(0.2 * var(--u))',
              textTransform: 'uppercase',
            }}
          >
            Operational
          </span>
        </div>
      </div>

      {/* Right Tools Group */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 'calc(10 * var(--u))', position: 'relative' }}>
        {/* Add / Switch Location Pill */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setShowLocationMenu(!showLocationMenu)}
            className="aurora-tool-glass"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'calc(6 * var(--u))',
              height: 'calc(38 * var(--u))',
              padding: '0 calc(14 * var(--u))',
              borderRadius: 'calc(12 * var(--u))',
              color: '#ffffff',
              fontSize: 'calc(13 * var(--u))',
              fontWeight: 500,
            }}
            aria-label="Select Forecast Location"
          >
            <PinIcon size="calc(14 * var(--u))" />
            <span>{currentLocation.name}</span>
            <PlusIcon size="calc(12 * var(--u))" style={{ opacity: 0.7 }} />
          </button>

          {showLocationMenu && (
            <div
              className="aurora-card-glass"
              style={{
                position: 'absolute',
                top: 'calc(44 * var(--u))',
                right: 0,
                width: 'calc(240 * var(--u))',
                padding: 'calc(8 * var(--u))',
                zIndex: 100,
                display: 'flex',
                flexDirection: 'column',
                gap: 'calc(4 * var(--u))',
              }}
            >
              <div
                style={{
                  fontSize: 'calc(11 * var(--u))',
                  color: 'rgba(255, 255, 255, 0.55)',
                  padding: 'calc(6 * var(--u)) calc(10 * var(--u))',
                  textTransform: 'uppercase',
                  letterSpacing: 'calc(0.5 * var(--u))',
                }}
              >
                Monitored Meteorological Corridors
              </div>
              {ALTERNATE_LOCATIONS.map((loc) => (
                <button
                  key={loc.id}
                  onClick={() => {
                    onSelectLocation(loc);
                    setShowLocationMenu(false);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: 'calc(8 * var(--u)) calc(10 * var(--u))',
                    borderRadius: 'calc(8 * var(--u))',
                    background: loc.id === currentLocation.id ? 'rgba(255, 255, 255, 0.22)' : 'transparent',
                    color: '#ffffff',
                    fontSize: 'calc(13 * var(--u))',
                    textAlign: 'left',
                    transition: 'background 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    if (loc.id !== currentLocation.id) e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)';
                  }}
                  onMouseLeave={(e) => {
                    if (loc.id !== currentLocation.id) e.currentTarget.style.background = 'transparent';
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 500 }}>{loc.name}</div>
                    <div style={{ fontSize: 'calc(10.5 * var(--u))', color: 'rgba(255, 255, 255, 0.6)' }}>
                      {loc.atmosphericRegime}
                    </div>
                  </div>
                  <span style={{ fontSize: 'calc(12 * var(--u))', fontWeight: 600, color: 'var(--accent-ice)' }}>
                    {loc.rainfall.value} mm
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Search tool */}
        <button
          onClick={onOpenSearch}
          className="aurora-tool-glass"
          style={{
            width: 'calc(38 * var(--u))',
            height: 'calc(38 * var(--u))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 'calc(12 * var(--u))',
            color: 'rgba(255, 255, 255, 0.85)',
          }}
          aria-label="Search meteorological stations and lead times"
          title="Search station / lead time"
        >
          <SearchIcon size="calc(17 * var(--u))" />
        </button>

        {/* Notifications tool */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="aurora-tool-glass"
            style={{
              width: 'calc(38 * var(--u))',
              height: 'calc(38 * var(--u))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 'calc(12 * var(--u))',
              color: 'rgba(255, 255, 255, 0.85)',
              position: 'relative',
            }}
            aria-label="Weather Advisories and Model Telemetry"
            title="System alerts & telemetry"
          >
            <BellIcon size="calc(17 * var(--u))" />
            <div
              style={{
                position: 'absolute',
                top: 'calc(8 * var(--u))',
                right: 'calc(8 * var(--u))',
                width: 'calc(6 * var(--u))',
                height: 'calc(6 * var(--u))',
                borderRadius: '50%',
                backgroundColor: 'var(--status-amber)',
              }}
            />
          </button>

          {showNotifications && (
            <div
              className="aurora-card-glass"
              style={{
                position: 'absolute',
                top: 'calc(44 * var(--u))',
                right: 0,
                width: 'calc(290 * var(--u))',
                padding: 'calc(12 * var(--u))',
                zIndex: 100,
                display: 'flex',
                flexDirection: 'column',
                gap: 'calc(8 * var(--u))',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 'calc(12 * var(--u))', fontWeight: 600 }}>Active Advisories (2)</span>
                <span className="font-mono" style={{ fontSize: 'calc(10 * var(--u))', color: 'rgba(255,255,255,0.6)' }}>
                  18:00 UTC
                </span>
              </div>
              <div
                style={{
                  padding: 'calc(8 * var(--u))',
                  borderRadius: 'calc(8 * var(--u))',
                  background: 'rgba(251, 191, 36, 0.12)',
                  border: '1px solid rgba(251, 191, 36, 0.3)',
                  fontSize: 'calc(11.5 * var(--u))',
                  lineHeight: '1.4',
                }}
              >
                <div style={{ fontWeight: 600, color: 'var(--status-amber)' }}>Heavy Convective Rain Alert</div>
                <div style={{ color: 'rgba(255,255,255,0.85)', marginTop: 'calc(2 * var(--u))' }}>
                  Western Ghats corridor: 73% probability of rainfall &gt; 65 mm in +06h cycle.
                </div>
              </div>
              <div
                style={{
                  padding: 'calc(8 * var(--u))',
                  borderRadius: 'calc(8 * var(--u))',
                  background: 'rgba(255, 255, 255, 0.08)',
                  fontSize: 'calc(11.5 * var(--u))',
                  lineHeight: '1.4',
                }}
              >
                <div style={{ fontWeight: 600, color: '#ffffff' }}>WRF Error Penalty Relaxed</div>
                <div style={{ color: 'rgba(255,255,255,0.75)', marginTop: 'calc(2 * var(--u))' }}>
                  Recent 3h Doppler telemetry shows WRF mesoscale convergence error dropped to 4.8 mm.
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User / Org Avatar */}
        <div
          className="aurora-tool-glass"
          style={{
            height: 'calc(38 * var(--u))',
            padding: '0 calc(8 * var(--u)) 0 calc(10 * var(--u))',
            display: 'flex',
            alignItems: 'center',
            gap: 'calc(8 * var(--u))',
            borderRadius: 'calc(20 * var(--u))',
            cursor: 'default',
          }}
          title="NCMRWF / IMD Lead Forecaster Station"
        >
          <div
            style={{
              width: 'calc(24 * var(--u))',
              height: 'calc(24 * var(--u))',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, rgba(255,255,255,0.85), rgba(158, 230, 255, 0.6))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 'calc(11 * var(--u))',
              fontWeight: 700,
              color: '#041018',
            }}
          >
            NX
          </div>
          <span
            style={{
              fontSize: 'calc(12 * var(--u))',
              fontWeight: 500,
              color: 'rgba(255, 255, 255, 0.9)',
            }}
          >
            Forecaster
          </span>
        </div>
      </div>
    </header>
  );
};
