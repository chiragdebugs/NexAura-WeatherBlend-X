import React, { useState } from 'react';
import { INDIA_MAP_REGIONS } from '../data/weatherMock';
import type { MapRegion } from '../types/weather';
import { MapIcon, PinIcon } from '../components/common/Icons';

type MapLayer = 'forecast' | 'trust' | 'uncertainty' | 'extreme';

export const ForecastMapView: React.FC = () => {
  const [activeLayer, setActiveLayer] = useState<MapLayer>('forecast');
  const [selectedRegion, setSelectedRegion] = useState<MapRegion>(INDIA_MAP_REGIONS[0]);
  const [activeVariable, setActiveVariable] = useState<'rainfall' | 'temp' | 'wind'>('rainfall');
  const [leadTime, setLeadTime] = useState<string>('+06h');

  // SVG India outline simplified path coordinates
  const indiaOutline = `
    M 210 70
    Q 240 60 260 75
    L 280 110
    L 300 135
    L 330 135
    L 370 120
    L 410 130
    L 450 160
    L 455 190
    L 420 220
    L 375 220
    L 370 250
    L 350 280
    L 330 320
    L 300 370
    L 270 450
    L 240 490
    L 225 470
    L 200 420
    L 190 350
    L 150 280
    L 140 240
    L 165 210
    L 175 160
    L 195 120
    Z
  `;

  const getRegionFill = (region: MapRegion) => {
    if (activeLayer === 'forecast') {
      if (region.rainfall > 70) return 'rgba(158, 230, 255, 0.85)';
      if (region.rainfall > 45) return 'rgba(255, 255, 255, 0.75)';
      return 'rgba(255, 255, 255, 0.35)';
    }
    if (activeLayer === 'trust') {
      if (region.dominantModel === 'WRF') return 'rgba(158, 230, 255, 0.9)';
      if (region.dominantModel === 'NCUM') return 'rgba(255, 255, 255, 0.9)';
      if (region.dominantModel === 'GFS') return 'rgba(251, 191, 36, 0.85)';
      return 'rgba(74, 222, 128, 0.85)';
    }
    if (activeLayer === 'uncertainty') {
      if (region.uncertaintyLevel === 'High') return 'rgba(251, 191, 36, 0.9)';
      if (region.uncertaintyLevel === 'Moderate') return 'rgba(255, 255, 255, 0.75)';
      return 'rgba(74, 222, 128, 0.85)';
    }
    // Extreme
    if (region.extremeRiskProb >= 70) return 'rgba(248, 113, 113, 0.9)';
    if (region.extremeRiskProb >= 40) return 'rgba(251, 191, 36, 0.85)';
    return 'rgba(74, 222, 128, 0.75)';
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
        gap: 'calc(14 * var(--u))',
        paddingRight: 'calc(6 * var(--u))',
      }}
    >
      {/* Top Header & Layer Segmented Control */}
      <div
        className="aurora-card-glass aurora-sheen"
        style={{
          padding: 'calc(14 * var(--u)) calc(22 * var(--u))',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 'calc(10 * var(--u))',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'calc(8 * var(--u))' }}>
            <MapIcon size="calc(18 * var(--u))" style={{ color: 'var(--accent-ice)' }} />
            <h1 className="font-headline" style={{ fontSize: 'calc(20 * var(--u))', fontWeight: 700, color: '#ffffff' }}>
              India Forecast Intelligence & Spatial Blending
            </h1>
          </div>
          <p style={{ fontSize: 'calc(12 * var(--u))', color: 'rgba(255, 255, 255, 0.65)', marginTop: 'calc(2 * var(--u))' }}>
            High-resolution spatial synthesis across NCMRWF radar corridors and synoptic regimes
          </p>
        </div>

        {/* Layer Segmented Control */}
        <div
          className="aurora-tool-glass"
          style={{
            display: 'flex',
            padding: 'calc(3 * var(--u))',
            borderRadius: 'calc(12 * var(--u))',
            gap: 'calc(4 * var(--u))',
          }}
        >
          {(
            [
              { id: 'forecast', label: 'Forecast' },
              { id: 'trust', label: 'Model Trust' },
              { id: 'uncertainty', label: 'Uncertainty' },
              { id: 'extreme', label: 'Extreme Risk' },
            ] as const
          ).map((layer) => (
            <button
              key={layer.id}
              onClick={() => setActiveLayer(layer.id)}
              style={{
                padding: 'calc(6 * var(--u)) calc(14 * var(--u))',
                borderRadius: 'calc(9 * var(--u))',
                fontSize: 'calc(12 * var(--u))',
                fontWeight: 600,
                background: activeLayer === layer.id ? 'rgba(255, 255, 255, 0.95)' : 'transparent',
                color: activeLayer === layer.id ? '#041018' : 'rgba(255, 255, 255, 0.8)',
                transition: 'all 0.2s',
              }}
            >
              {layer.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Map Body: Interactive Visualizer + Region Detail Panel */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 'calc(16 * var(--u))', flex: 1, minHeight: 'calc(480 * var(--u))' }}>
        {/* SVG Interactive Map Canvas */}
        <div
          className="aurora-card-glass"
          style={{
            padding: 'calc(16 * var(--u))',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
          }}
        >
          {/* Controls Overlay on Map */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'calc(8 * var(--u))' }}>
            <div style={{ display: 'flex', gap: 'calc(6 * var(--u))' }}>
              {(['rainfall', 'temp', 'wind'] as const).map((v) => (
                <button
                  key={v}
                  onClick={() => setActiveVariable(v)}
                  style={{
                    padding: 'calc(4 * var(--u)) calc(10 * var(--u))',
                    borderRadius: 'calc(8 * var(--u))',
                    fontSize: 'calc(11 * var(--u))',
                    background: activeVariable === v ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.08)',
                    color: '#ffffff',
                    textTransform: 'capitalize',
                  }}
                >
                  {v}
                </button>
              ))}
            </div>

            <div style={{ display: 'flex', gap: 'calc(6 * var(--u))' }}>
              {['+03h', '+06h', '+12h', '+24h'].map((lt) => (
                <button
                  key={lt}
                  onClick={() => setLeadTime(lt)}
                  className="font-mono"
                  style={{
                    padding: 'calc(4 * var(--u)) calc(8 * var(--u))',
                    borderRadius: 'calc(6 * var(--u))',
                    fontSize: 'calc(11 * var(--u))',
                    background: leadTime === lt ? 'var(--accent-ice)' : 'rgba(255,255,255,0.08)',
                    color: leadTime === lt ? '#041018' : '#ffffff',
                  }}
                >
                  {lt}
                </button>
              ))}
            </div>
          </div>

          {/* SVG Map Canvas */}
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
            <svg viewBox="100 50 400 460" style={{ width: '100%', height: '100%', maxHeight: 'calc(440 * var(--u))' }}>
              <defs>
                <radialGradient id="mapVignette" cx="50%" cy="50%" r="60%">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.08)" />
                  <stop offset="100%" stopColor="rgba(0,0,0,0.4)" />
                </radialGradient>
              </defs>

              {/* Sub-continental boundary glow */}
              <path
                d={indiaOutline}
                fill="url(#mapVignette)"
                stroke="rgba(255, 255, 255, 0.45)"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />

              {/* Regional Radar Range Rings */}
              <circle cx="230" cy="310" r="45" fill="none" stroke="rgba(158, 230, 255, 0.2)" strokeWidth="1" strokeDasharray="3 3" />
              <circle cx="340" cy="280" r="50" fill="none" stroke="rgba(158, 230, 255, 0.2)" strokeWidth="1" strokeDasharray="3 3" />

              {/* Interactive Station Markers */}
              {INDIA_MAP_REGIONS.map((reg: MapRegion) => {
                const isSelected = reg.id === selectedRegion.id;
                const fillColor = getRegionFill(reg);
                return (
                  <g
                    key={reg.id}
                    onClick={() => setSelectedRegion(reg)}
                    style={{ cursor: 'pointer', transition: 'all 0.2s' }}
                  >
                    {/* Pulsing ring for selected station */}
                    {isSelected && (
                      <circle
                        cx={reg.coords.x}
                        cy={reg.coords.y}
                        r="16"
                        fill="none"
                        stroke="rgba(255, 255, 255, 0.6)"
                        strokeWidth="1.5"
                      />
                    )}
                    <circle
                      cx={reg.coords.x}
                      cy={reg.coords.y}
                      r={isSelected ? 8 : 6}
                      fill={fillColor}
                      stroke="#ffffff"
                      strokeWidth="1.6"
                    />
                    <text
                      x={reg.coords.x + 12}
                      y={reg.coords.y + 4}
                      fill="#ffffff"
                      fontSize="10"
                      fontFamily="Inter"
                      fontWeight={isSelected ? '600' : '400'}
                      opacity={isSelected ? 1 : 0.75}
                    >
                      {reg.name}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Bottom Floating Legend */}
            <div
              className="aurora-tool-glass"
              style={{
                position: 'absolute',
                bottom: 'calc(10 * var(--u))',
                left: 'calc(10 * var(--u))',
                padding: 'calc(6 * var(--u)) calc(12 * var(--u))',
                borderRadius: 'calc(10 * var(--u))',
                fontSize: 'calc(10.5 * var(--u))',
                color: 'rgba(255, 255, 255, 0.85)',
              }}
            >
              {activeLayer === 'forecast' && 'Rainfall: Cyan = High (>70mm) · White = Moderate · Dim = Low'}
              {activeLayer === 'trust' && 'Trust Leader: Cyan = WRF · White = NCUM · Amber = GFS'}
              {activeLayer === 'uncertainty' && 'Uncertainty: Green = Low · White = Mod · Amber = High Hotspot'}
              {activeLayer === 'extreme' && 'Extreme Risk: Red = >70% · Amber = 40-70% · Green = Normal'}
            </div>
          </div>
        </div>

        {/* Right Region Detail Glass Panel */}
        <div
          className="aurora-card-glass"
          style={{
            padding: 'calc(20 * var(--u))',
            display: 'flex',
            flexDirection: 'column',
            gap: 'calc(14 * var(--u))',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'calc(6 * var(--u))' }}>
              <PinIcon size="calc(16 * var(--u))" style={{ color: 'var(--accent-ice)' }} />
              <span className="font-headline" style={{ fontSize: 'calc(18 * var(--u))', fontWeight: 700, color: '#ffffff' }}>
                {selectedRegion.name}
              </span>
            </div>
            <div style={{ fontSize: 'calc(11.5 * var(--u))', color: 'rgba(255, 255, 255, 0.6)', marginTop: 'calc(2 * var(--u))' }}>
              Met Station ID: IMD-{selectedRegion.id.toUpperCase()} · Lead {leadTime}
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: 'calc(10 * var(--u))',
            }}
          >
            <div style={{ background: 'rgba(255,255,255,0.08)', padding: 'calc(10 * var(--u))', borderRadius: 'calc(10 * var(--u))' }}>
              <div style={{ fontSize: 'calc(10 * var(--u))', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase' }}>
                Rainfall Forecast
              </div>
              <div className="font-mono" style={{ fontSize: 'calc(20 * var(--u))', fontWeight: 700, color: '#ffffff', marginTop: 'calc(4 * var(--u))' }}>
                {selectedRegion.rainfall} mm
              </div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.08)', padding: 'calc(10 * var(--u))', borderRadius: 'calc(10 * var(--u))' }}>
              <div style={{ fontSize: 'calc(10 * var(--u))', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase' }}>
                Dominant Trust Model
              </div>
              <div className="font-mono" style={{ fontSize: 'calc(20 * var(--u))', fontWeight: 700, color: 'var(--accent-ice)', marginTop: 'calc(4 * var(--u))' }}>
                {selectedRegion.dominantModel}
              </div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.08)', padding: 'calc(10 * var(--u))', borderRadius: 'calc(10 * var(--u))' }}>
              <div style={{ fontSize: 'calc(10 * var(--u))', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase' }}>
                Uncertainty Spread
              </div>
              <div className="font-mono" style={{ fontSize: 'calc(18 * var(--u))', fontWeight: 600, color: '#ffffff', marginTop: 'calc(4 * var(--u))' }}>
                {selectedRegion.uncertaintyLevel}
              </div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.08)', padding: 'calc(10 * var(--u))', borderRadius: 'calc(10 * var(--u))' }}>
              <div style={{ fontSize: 'calc(10 * var(--u))', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase' }}>
                Extreme Event P(E)
              </div>
              <div
                className="font-mono"
                style={{
                  fontSize: 'calc(18 * var(--u))',
                  fontWeight: 700,
                  color: selectedRegion.extremeRiskProb >= 70 ? 'var(--status-amber)' : '#ffffff',
                  marginTop: 'calc(4 * var(--u))',
                }}
              >
                {selectedRegion.extremeRiskProb}%
              </div>
            </div>
          </div>

          <div
            style={{
              padding: 'calc(12 * var(--u))',
              background: 'rgba(255, 255, 255, 0.08)',
              borderRadius: 'calc(10 * var(--u))',
              fontSize: 'calc(11.5 * var(--u))',
              lineHeight: 1.45,
              color: 'rgba(255, 255, 255, 0.85)',
            }}
          >
            <strong>Spatial Reliability Diagnostic:</strong> {selectedRegion.name} grid point currently driven by {selectedRegion.dominantModel} due to lower convective boundary layer residual error. Doppler radar reflectivity matches simulated hydrometeor mass flux.
          </div>
        </div>
      </div>
    </div>
  );
};
