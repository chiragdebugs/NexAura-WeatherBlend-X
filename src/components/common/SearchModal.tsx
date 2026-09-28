import React, { useState, useEffect } from 'react';
import { SearchIcon, PinIcon } from './Icons';
import type { LocationData } from '../../types/weather';
import { ALTERNATE_LOCATIONS } from '../../data/weatherMock';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectLocation: (loc: LocationData) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectLocation,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filtered = ALTERNATE_LOCATIONS.filter(
    (l) =>
      l.name.toLowerCase().includes(query.toLowerCase()) ||
      l.state.toLowerCase().includes(query.toLowerCase()) ||
      l.atmosphericRegime.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(4, 16, 24, 0.75)',
        backdropFilter: 'blur(calc(8 * var(--u)))',
        WebkitBackdropFilter: 'blur(calc(8 * var(--u)))',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 200,
      }}
      onClick={onClose}
    >
      <div
        className="aurora-card-glass"
        style={{
          width: 'calc(480 * var(--u))',
          maxWidth: '90vw',
          padding: 'calc(20 * var(--u))',
          borderRadius: 'calc(20 * var(--u))',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 'calc(10 * var(--u))', borderBottom: '1px solid rgba(255,255,255,0.18)', paddingBottom: 'calc(12 * var(--u))' }}>
          <SearchIcon size="calc(20 * var(--u))" style={{ color: 'var(--accent-ice)' }} />
          <input
            autoFocus
            type="text"
            placeholder="Search meteorological station, state, or regime..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: '#ffffff',
              fontSize: 'calc(15 * var(--u))',
              fontFamily: 'inherit',
            }}
          />
          <button
            onClick={onClose}
            style={{ fontSize: 'calc(12 * var(--u))', color: 'rgba(255,255,255,0.55)', padding: 'calc(4 * var(--u))' }}
          >
            ESC
          </button>
        </div>

        <div style={{ marginTop: 'calc(14 * var(--u))', display: 'flex', flexDirection: 'column', gap: 'calc(6 * var(--u))' }}>
          <div style={{ fontSize: 'calc(11 * var(--u))', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>
            Available Operational Stations
          </div>
          {filtered.length === 0 ? (
            <div
              style={{
                padding: 'calc(24 * var(--u))',
                textAlign: 'center',
                color: 'rgba(255, 255, 255, 0.55)',
                fontSize: 'calc(13 * var(--u))',
              }}
            >
              No operational stations found matching "{query}"
            </div>
          ) : (
            filtered.map((loc) => (
              <button
                key={loc.id}
                onClick={() => {
                  onSelectLocation(loc);
                  onClose();
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: 'calc(10 * var(--u)) calc(12 * var(--u))',
                  borderRadius: 'calc(10 * var(--u))',
                  background: 'rgba(255, 255, 255, 0.08)',
                  color: '#ffffff',
                  textAlign: 'left',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.18)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)')}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 'calc(8 * var(--u))' }}>
                  <PinIcon size="calc(14 * var(--u))" style={{ color: 'var(--accent-ice)' }} />
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 'calc(13 * var(--u))' }}>{loc.name}</div>
                    <div style={{ fontSize: 'calc(11 * var(--u))', color: 'rgba(255, 255, 255, 0.6)' }}>
                      {loc.state} · {loc.atmosphericRegime}
                    </div>
                  </div>
                </div>
                <span className="font-mono" style={{ fontSize: 'calc(12 * var(--u))', color: 'var(--accent-ice)', fontWeight: 600 }}>
                  {loc.rainfall.value} mm
                </span>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
