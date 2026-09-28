import React from 'react';
import {
  NexAuraLogo,
  GridIcon,
  ActivityIcon,
  TargetIcon,
  MapIcon,
  CalendarIcon,
  LayersIcon,
  SettingsIcon,
  LogoutIcon,
} from '../common/Icons';

export type NavTab = 
  | 'dashboard'
  | 'intelligence'
  | 'trust'
  | 'map'
  | 'history'
  | 'pipeline'
  | 'settings';

interface SidebarProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, onSelectTab }) => {
  const navItems: { id: NavTab; label: string; icon: React.ReactNode; topU: number }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <GridIcon size="calc(23 * var(--u))" />, topU: 131 },
    { id: 'intelligence', label: 'Forecast Intelligence', icon: <ActivityIcon size="calc(23 * var(--u))" />, topU: 189 },
    { id: 'trust', label: 'Model Trust', icon: <TargetIcon size="calc(23 * var(--u))" />, topU: 247 },
    { id: 'map', label: 'Forecast Map', icon: <MapIcon size="calc(23 * var(--u))" />, topU: 305 },
    { id: 'history', label: 'Forecast History', icon: <CalendarIcon size="calc(23 * var(--u))" />, topU: 363 },
    { id: 'pipeline', label: 'Technical Pipeline', icon: <LayersIcon size="calc(23 * var(--u))" />, topU: 421 },
    { id: 'settings', label: 'Settings', icon: <SettingsIcon size="calc(23 * var(--u))" />, topU: 479 },
  ];

  const currentItem = navItems.find((item) => item.id === activeTab) || navItems[0];

  return (
    <aside
      className="aurora-sidebar-glass animate-sidebar desktop-sidebar"
      style={{
        position: 'absolute',
        left: 'calc(16 * var(--u))',
        top: 'calc(14 * var(--u))',
        bottom: 'calc(7 * var(--u))',
        width: 'calc(72 * var(--u))',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 'calc(20 * var(--u)) 0 calc(16 * var(--u)) 0',
        zIndex: 50,
      }}
      aria-label="Primary Navigation"
    >
      {/* Dynamic Active Pip */}
      <div
        className="sidebar-active-pip"
        style={{
          top: `calc(${currentItem.topU} * var(--u))`,
        }}
      />

      {/* NexAura Logo */}
      <div
        className="animate-logo"
        style={{
          marginBottom: 'calc(38 * var(--u))',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          cursor: 'pointer',
        }}
        onClick={() => onSelectTab('dashboard')}
        role="button"
        tabIndex={0}
        aria-label="NexAura Home"
        onKeyDown={(e) => e.key === 'Enter' && onSelectTab('dashboard')}
      >
        <NexAuraLogo size="calc(42 * var(--u))" />
      </div>

      {/* Navigation Group */}
      <nav
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 'calc(35 * var(--u))',
          width: '100%',
        }}
      >
        {navItems.map((item, index) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className="animate-nav"
              style={{
                animationDelay: `${0.1 + index * 0.05}s`,
                width: 'calc(44 * var(--u))',
                height: 'calc(23 * var(--u))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: isActive ? '#ffffff' : 'rgba(255, 255, 255, 0.55)',
                transition: 'color 0.25s var(--e-soft), transform 0.25s var(--e-soft), opacity 0.25s',
                opacity: isActive ? 1 : 0.65,
                position: 'relative',
              }}
              aria-label={item.label}
              title={item.label}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = '1';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = isActive ? '1' : '0.65';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {item.icon}
            </button>
          );
        })}
      </nav>

      {/* Bottom Signout */}
      <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <button
          onClick={() => onSelectTab('settings')}
          style={{
            width: 'calc(44 * var(--u))',
            height: 'calc(30 * var(--u))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: activeTab === 'settings' ? 'var(--accent-ice)' : 'rgba(255, 255, 255, 0.45)',
            transition: 'color 0.25s, opacity 0.25s',
          }}
          aria-label="Workstation Settings and Telemetry"
          title="Workstation Telemetry & Settings"
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = '0.9';
            e.currentTarget.style.color = '#ffffff';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = '0.5';
            e.currentTarget.style.color = 'rgba(255, 255, 255, 0.45)';
          }}
        >
          <LogoutIcon size="calc(21 * var(--u))" />
        </button>
      </div>
    </aside>
  );
};
