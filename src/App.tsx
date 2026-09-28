import React, { useState } from 'react';
import { PRIMARY_LOCATION_MAHARASHTRA } from './data/weatherMock';
import type { LocationData } from './types/weather';
import { Sidebar, type NavTab } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { DashboardView } from './pages/DashboardView';
import { ForecastIntelligenceView } from './pages/ForecastIntelligenceView';
import { ModelTrustView } from './pages/ModelTrustView';
import { ForecastMapView } from './pages/ForecastMapView';
import { ForecastHistoryView } from './pages/ForecastHistoryView';
import { PipelineView } from './pages/PipelineView';
import { SettingsView } from './pages/SettingsView';
import { SearchModal } from './components/common/SearchModal';
import { TrustDetailModal } from './components/common/TrustDetailModal';
import {
  GridIcon,
  ActivityIcon,
  TargetIcon,
  MapIcon,
  CalendarIcon,
  LayersIcon,
} from './components/common/Icons';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<NavTab>('dashboard');
  const [currentLocation, setCurrentLocation] = useState<LocationData>(PRIMARY_LOCATION_MAHARASHTRA);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isTrustDetailOpen, setIsTrustDetailOpen] = useState(false);

  const handleSelectLeadTime = (leadTime: string) => {
    // If the lead time exists in trajectory, update the active state
    const point = currentLocation.trajectory.find((t) => t.leadTime === leadTime);
    if (point) {
      setCurrentLocation((prev) => ({
        ...prev,
        leadTime: point.leadTime,
        blendedForecast: point.rainfall,
        rainfall: {
          ...prev.rainfall,
          value: point.rainfall,
        },
        temperature: {
          ...prev.temperature,
          value: point.temperature,
        },
        wind: {
          ...prev.wind,
          value: point.wind,
        },
        uncertainty: {
          ...prev.uncertainty,
          lower: point.lowerBound,
          upper: point.upperBound,
        },
      }));
    }
  };

  return (
    <div className="aurora-stage">
      {/* Desktop Persistent Sidebar */}
      <Sidebar
        activeTab={activeTab}
        onSelectTab={(tab) => setActiveTab(tab)}
      />

      {/* Persistent Global Header */}
      <Header
        currentLocation={currentLocation}
        onSelectLocation={(loc) => setCurrentLocation(loc)}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Main View Router */}
      <main style={{ position: 'relative', width: '100%', height: '100%' }}>
        {activeTab === 'dashboard' && (
          <DashboardView
            location={currentLocation}
            onSelectLeadTime={handleSelectLeadTime}
            onNavigateTab={(tab) => setActiveTab(tab)}
            onOpenDetailedExplanation={() => setIsTrustDetailOpen(true)}
          />
        )}

        {activeTab === 'intelligence' && (
          <ForecastIntelligenceView location={currentLocation} />
        )}

        {activeTab === 'trust' && (
          <ModelTrustView location={currentLocation} />
        )}

        {activeTab === 'map' && (
          <ForecastMapView />
        )}

        {activeTab === 'history' && (
          <ForecastHistoryView />
        )}

        {activeTab === 'pipeline' && (
          <PipelineView />
        )}

        {activeTab === 'settings' && (
          <SettingsView />
        )}
      </main>

      {/* Mobile Floating Bottom Navigation Dock (≤860px) */}
      <nav className="mobile-sidebar-dock aurora-sidebar-glass" aria-label="Mobile Navigation">
        <button
          onClick={() => setActiveTab('dashboard')}
          style={{ color: activeTab === 'dashboard' ? 'var(--accent-ice)' : 'rgba(255,255,255,0.7)' }}
          aria-label="Dashboard"
        >
          <GridIcon size={22} />
        </button>
        <button
          onClick={() => setActiveTab('intelligence')}
          style={{ color: activeTab === 'intelligence' ? 'var(--accent-ice)' : 'rgba(255,255,255,0.7)' }}
          aria-label="Intelligence"
        >
          <ActivityIcon size={22} />
        </button>
        <button
          onClick={() => setActiveTab('trust')}
          style={{ color: activeTab === 'trust' ? 'var(--accent-ice)' : 'rgba(255,255,255,0.7)' }}
          aria-label="Model Trust"
        >
          <TargetIcon size={22} />
        </button>
        <button
          onClick={() => setActiveTab('map')}
          style={{ color: activeTab === 'map' ? 'var(--accent-ice)' : 'rgba(255,255,255,0.7)' }}
          aria-label="Forecast Map"
        >
          <MapIcon size={22} />
        </button>
        <button
          onClick={() => setActiveTab('history')}
          style={{ color: activeTab === 'history' ? 'var(--accent-ice)' : 'rgba(255,255,255,0.7)' }}
          aria-label="History"
        >
          <CalendarIcon size={22} />
        </button>
        <button
          onClick={() => setActiveTab('pipeline')}
          style={{ color: activeTab === 'pipeline' ? 'var(--accent-ice)' : 'rgba(255,255,255,0.7)' }}
          aria-label="Pipeline"
        >
          <LayersIcon size={22} />
        </button>
      </nav>

      {/* Modals */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectLocation={(loc) => setCurrentLocation(loc)}
      />

      <TrustDetailModal
        isOpen={isTrustDetailOpen}
        onClose={() => setIsTrustDetailOpen(false)}
        location={currentLocation}
      />
    </div>
  );
};

export default App;
