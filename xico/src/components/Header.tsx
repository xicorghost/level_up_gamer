// src/components/Header.tsx

import React from 'react';
//import type { Section } from '../types';
import type { Section } from '../types/index';


interface HeaderProps {
  currentSection: Section;
  onSectionChange: (section: Section) => void;
  cartCount?: number;
}

const headerStyle: React.CSSProperties = {
  background: 'linear-gradient(180deg, #1a4d4d 0%, #0a0a0a 100%)',
  padding: '30px 0',
  textAlign: 'center',
  borderBottom: '2px solid #00ff9f',
};

const logoStyle: React.CSSProperties = {
  fontSize: '48px',
  color: 'transparent',
  WebkitTextStroke: '3px #00ff9f',
  textShadow: '0 0 10px #00ff9f, 0 0 20px #00ff9f',
  marginBottom: '20px',
  letterSpacing: '5px',
  fontFamily: 'monospace',
};

const navStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  gap: 0,
  flexWrap: 'wrap',
};

const getButtonStyle = (isActive: boolean): React.CSSProperties => ({
  backgroundColor: isActive ? '#00ff9f' : '#1a4d4d',
  color: isActive ? '#0a0a0a' : '#00ff9f',
  border: '2px solid #00ff9f',
  padding: '12px 24px',
  fontSize: '20px',
  cursor: 'pointer',
  textTransform: 'uppercase',
  fontFamily: 'monospace',
  position: 'relative',
});

const cartBadgeStyle: React.CSSProperties = {
  position: 'absolute',
  top: '-8px',
  right: '-8px',
  backgroundColor: '#ff0000',
  color: '#fff',
  borderRadius: '50%',
  width: '24px',
  height: '24px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '14px',
  fontWeight: 'bold',
};

export const Header: React.FC<HeaderProps> = ({ 
  currentSection, 
  onSectionChange,
  cartCount = 0 
}) => {
  const sections: { id: Section; label: string }[] = [
    { id: 'home', label: 'HOME' },
    { id: 'products', label: 'CATÁLOGO' },
    { id: 'cart', label: 'CARRITO' },
    { id: 'profile', label: 'PERFIL' },
    { id: 'community', label: 'COMUNIDAD' },
  ];

  return (
    <header style={headerStyle}>
      <h1 style={logoStyle}>LEVEL-UP GAMER</h1>
      <nav style={navStyle}>
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => onSectionChange(section.id)}
            style={getButtonStyle(currentSection === section.id)}
          >
            {section.label}
            {section.id === 'cart' && cartCount > 0 && (
              <span style={cartBadgeStyle}>{cartCount}</span>
            )}
          </button>
        ))}
      </nav>
    </header>
  );
};