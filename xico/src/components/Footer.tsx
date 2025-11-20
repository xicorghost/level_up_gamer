// src/components/Footer.tsx

import React from 'react';

const footerStyle: React.CSSProperties = {
  background: 'linear-gradient(180deg, #1a4d4d 0%, #0a0a0a 100%)',
  padding: '30px 0',
  textAlign: 'center',
  borderTop: '2px solid #00ff9f',
  marginTop: '50px',
};

const containerStyle: React.CSSProperties = {
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '20px',
};

const titleStyle: React.CSSProperties = {
  color: '#00ff9f',
  marginBottom: '15px',
  fontSize: '24px',
};

const listStyle: React.CSSProperties = {
  listStyle: 'none',
  padding: 0,
  margin: '15px 0',
};

const linkStyle: React.CSSProperties = {
  color: '#00ff9f',
  textDecoration: 'none',
};

const subtextStyle: React.CSSProperties = {
  fontSize: '14px',
  opacity: 0.7,
  margin: '15px 0',
};

const copyrightStyle: React.CSSProperties = {
  marginTop: '20px',
  color: '#00ff9f',
};

export const Footer: React.FC = () => {
  return (
    <footer style={footerStyle}>
      <div style={containerStyle}>
        <h3 style={titleStyle}>Acosadme</h3>
        <p>ehh, supongo que son enlaces.</p>
        
        <ul style={listStyle}>
          <li>
            <a href="https://x.com/?lang=es" style={linkStyle} target="_blank" rel="noopener noreferrer">
              Twitter (level.up)
            </a>
            {' '}- pensamientos y demás, tal vez
          </li>
          <li>
            <a href="https://github.com/xicorghost" style={linkStyle} target="_blank" rel="noopener noreferrer">
              GitHub (xicorghost)
            </a>
            {' '}- cosas que hago, supongo
          </li>
          <li>
            <a href="https://www.instagram.com/" style={linkStyle} target="_blank" rel="noopener noreferrer">
              Instagram (Level.Up)
            </a>
            {' '}- puede que suba fotos, no sé
          </li>
        </ul>
        
        <p style={subtextStyle}>
          [=◕ ‿◕ =]// Copiar es un acto de robo, mientras que inspirarse es el verdadero acto de amor. //
          Codificado a mano y probado en Chrome
        </p>
        
        <p style={copyrightStyle}>Xicor Level-Up 2025</p>
      </div>
    </footer>
  );
};