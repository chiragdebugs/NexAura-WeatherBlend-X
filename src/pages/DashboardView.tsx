import type { LocationData } from '../types/weather';
import { HeroSection } from '../components/dashboard/HeroSection';
import { ForecastTrajectory } from '../components/dashboard/ForecastTrajectory';
import { RightRail } from '../components/dashboard/RightRail';
import { TrustExplanationPanel } from '../components/dashboard/TrustExplanationPanel';
import { ModelDisagreementPanel } from '../components/dashboard/ModelDisagreementPanel';

interface DashboardViewProps {
  location: LocationData;
  onSelectLeadTime: (leadTime: string) => void;
  onNavigateTab: (tab: 'trust' | 'intelligence' | 'map' | 'history' | 'pipeline') => void;
  onOpenDetailedExplanation: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  location,
  onSelectLeadTime,
  onNavigateTab,
  onOpenDetailedExplanation,
}) => {
  return (
    <>
      {/* Hero Narrative Area */}
      <HeroSection location={location} />

      {/* Central Complementary Intelligence Strip */}
      <div
        className="desktop-center-intelligence"
        style={{
          position: 'absolute',
          left: 'calc(126 * var(--u))',
          right: 'calc(370 * var(--u))',
          top: 'calc(326 * var(--u))',
          display: 'grid',
          gridTemplateColumns: '1.25fr 1fr',
          gap: 'calc(14 * var(--u))',
          zIndex: 32,
        }}
      >
        <TrustExplanationPanel
          explanations={location.trustExplanations}
          onOpenDetailedExplanation={onOpenDetailedExplanation}
        />
        <ModelDisagreementPanel
          models={location.models}
          blendedForecast={location.blendedForecast}
          disagreementLevel={location.uncertainty.disagreementLevel}
        />
      </div>

      {/* Main Forecast Trajectory Strip (Bottom) */}
      <ForecastTrajectory
        trajectory={location.trajectory}
        selectedLeadTime={location.leadTime}
        onSelectLeadTime={onSelectLeadTime}
      />

      {/* Right Operational Rail */}
      <RightRail
        location={location}
        onNavigateTrust={() => onNavigateTab('trust')}
      />
    </>
  );
};
