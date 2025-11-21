// src/components/admin/AdminLogin.tsx
/*
import React, { useState } from 'react';
//import { ADMIN_CREDENTIALS } from '../../types';
import { ADMIN_CREDENTIALS } from '../../types/index';


interface AdminLoginProps {
  onLoginSuccess: () => void;
}

const containerStyle: React.CSSProperties = {
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: 'repeating-conic-gradient(#0a0a0a 0% 25%, #0f1f1f 0% 50%) 0 0 / 30px 30px',
  fontFamily: 'monospace',
  color: '#00ff9f',
};

const formContainerStyle: React.CSSProperties = {
  backgroundColor: '#0f1f1f',
  border: '3px solid #00ff9f',
  padding: '40px',
  maxWidth: '450px',
  width: '90%',
  boxShadow: '0 0 40px rgba(0, 255, 159, 0.6)',
};

const titleStyle: React.CSSProperties = {
  fontSize: '36px',
  color: 'transparent',
  WebkitTextStroke: '3px #00ff9f',
  textShadow: '0 0 10px #00ff9f, 0 0 20px #00ff9f',
  marginBottom: '30px',
  textAlign: 'center',
  letterSpacing: '3px',
};

const subtitleStyle: React.CSSProperties = {
  fontSize: '24px',
  color: '#00ff9f',
  marginBottom: '30px',
  textAlign: 'center',
  textShadow: '0 0 8px #00ff9f',
};

const formGroupStyle: React.CSSProperties = {
  marginBottom: '20px',
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  marginBottom: '8px',
  fontSize: '20px',
  color: '#00ff9f',
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '12px',
  backgroundColor: '#0a0a0a',
  border: '2px solid #00ff9f',
  color: '#00ff9f',
  fontFamily: 'monospace',
  fontSize: '18px',
  outline: 'none',
};

const buttonStyle: React.CSSProperties = {
  width: '100%',
  padding: '15px',
  backgroundColor: '#1a4d4d',
  color: '#00ff9f',
  border: '2px solid #00ff9f',
  fontSize: '22px',
  fontFamily: 'monospace',
  cursor: 'pointer',
  marginTop: '10px',
  transition: 'all 0.3s',
};

const errorStyle: React.CSSProperties = {
  color: '#ff0000',
  backgroundColor: '#0a0a0a',
  border: '2px solid #ff0000',
  padding: '10px',
  marginBottom: '20px',
  textAlign: 'center',
  fontSize: '18px',
};

const infoBoxStyle: React.CSSProperties = {
  backgroundColor: '#0a0a0a',
  border: '2px solid #00ff9f',
  padding: '15px',
  marginTop: '20px',
  fontSize: '16px',
  opacity: 0.8,
};

const backButtonStyle: React.CSSProperties = {
  width: '100%',
  padding: '12px',
  backgroundColor: 'transparent',
  color: '#00ff9f',
  border: '2px solid #00ff9f',
  fontSize: '18px',
  fontFamily: 'monospace',
  cursor: 'pointer',
  marginTop: '15px',
  transition: 'all 0.3s',
};

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
      onLoginSuccess();
    } else {
      setError('❌ Credenciales incorrectas. Acceso denegado.');
      setPassword('');
    }
  };

  const handleBackToStore = () => {
    window.location.href = '/';
  };

  return (
    <div style={containerStyle}>
      <div style={formContainerStyle}>
        <h1 style={titleStyle}>ADMIN PANEL</h1>
        <h3 style={subtitleStyle}>&gt; ACCESO RESTRINGIDO</h3>

        {error && <div style={errorStyle}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div style={formGroupStyle}>
            <label style={labelStyle}>EMAIL ADMINISTRADOR:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={inputStyle}
              placeholder="admin@levelupgamer.cl"
            />
          </div>

          <div style={formGroupStyle}>
            <label style={labelStyle}>CONTRASEÑA:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={inputStyle}
              placeholder="••••••••"
            />
          </div>

          <button type="submit" style={buttonStyle}>
            INICIAR SESIÓN
          </button>

          <button type="button" onClick={handleBackToStore} style={backButtonStyle}>
            VOLVER A LA TIENDA
          </button>
        </form>

        <div style={infoBoxStyle}>
          <p style={{ marginBottom: '10px' }}>🔐 <strong>CREDENCIALES DE ACCESO:</strong></p>
          <p style={{ fontSize: '14px', lineHeight: 1.6 }}>
            <strong>Email:</strong> {ADMIN_CREDENTIALS.email}<br />
            <strong>Password:</strong> {ADMIN_CREDENTIALS.password}
          </p>
          <p style={{ fontSize: '12px', marginTop: '10px', opacity: 0.6 }}>
            * Solo para demostración. En producción estas credenciales estarían encriptadas.
          </p>
        </div>
      </div>
    </div>
  );
};*/
// src/components/admin/AdminLogin.tsx

import React, { useState } from 'react';
import { ADMIN_CREDENTIALS } from '../../types/index';

interface AdminLoginProps {
  onLoginSuccess: () => void;
}

const containerStyle: React.CSSProperties = {
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: 'repeating-conic-gradient(#0a0a0a 0% 25%, #0f1f1f 0% 50%) 0 0 / 30px 30px',
  fontFamily: 'monospace',
  color: '#00ff9f',
};

const formContainerStyle: React.CSSProperties = {
  backgroundColor: '#0f1f1f',
  border: '3px solid #00ff9f',
  padding: '40px',
  maxWidth: '450px',
  width: '90%',
  boxShadow: '0 0 40px rgba(0, 255, 159, 0.6)',
};

const titleStyle: React.CSSProperties = {
  fontSize: '36px',
  color: 'transparent',
  WebkitTextStroke: '3px #00ff9f',
  textShadow: '0 0 10px #00ff9f, 0 0 20px #00ff9f',
  marginBottom: '30px',
  textAlign: 'center',
  letterSpacing: '3px',
};

const subtitleStyle: React.CSSProperties = {
  fontSize: '24px',
  color: '#00ff9f',
  marginBottom: '30px',
  textAlign: 'center',
  textShadow: '0 0 8px #00ff9f',
};

const formGroupStyle: React.CSSProperties = {
  marginBottom: '20px',
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  marginBottom: '8px',
  fontSize: '20px',
  color: '#00ff9f',
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '12px',
  backgroundColor: '#0a0a0a',
  border: '2px solid #00ff9f',
  color: '#00ff9f',
  fontFamily: 'monospace',
  fontSize: '18px',
  outline: 'none',
};

const buttonStyle: React.CSSProperties = {
  width: '100%',
  padding: '15px',
  backgroundColor: '#1a4d4d',
  color: '#00ff9f',
  border: '2px solid #00ff9f',
  fontSize: '22px',
  fontFamily: 'monospace',
  cursor: 'pointer',
  marginTop: '10px',
  transition: 'all 0.3s',
};

const errorStyle: React.CSSProperties = {
  color: '#ff0000',
  backgroundColor: '#0a0a0a',
  border: '2px solid #ff0000',
  padding: '10px',
  marginBottom: '20px',
  textAlign: 'center',
  fontSize: '18px',
};

const infoBoxStyle: React.CSSProperties = {
  backgroundColor: '#0a0a0a',
  border: '2px solid #00ff9f',
  padding: '15px',
  marginTop: '20px',
  fontSize: '16px',
  opacity: 0.8,
};

const backButtonStyle: React.CSSProperties = {
  width: '100%',
  padding: '12px',
  backgroundColor: 'transparent',
  color: '#00ff9f',
  border: '2px solid #00ff9f',
  fontSize: '18px',
  fontFamily: 'monospace',
  cursor: 'pointer',
  marginTop: '15px',
  transition: 'all 0.3s',
};

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
      onLoginSuccess();
    } else {
      setError('❌ Credenciales incorrectas. Acceso denegado.');
      setPassword('');
    }
  };

  const handleBackToStore = () => {
    window.location.href = '/';
  };

  return (
    <div style={containerStyle}>
      <div style={formContainerStyle}>
        <h1 style={titleStyle}>ADMIN PANEL</h1>
        <h3 style={subtitleStyle}>&gt; ACCESO RESTRINGIDO</h3>

        {error && <div style={errorStyle}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div style={formGroupStyle}>
            <label htmlFor="admin-email" style={labelStyle}>
              EMAIL ADMINISTRADOR:
            </label>
            <input
              id="admin-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={inputStyle}
              placeholder="admin@levelupgamer.cl"
            />
          </div>

          <div style={formGroupStyle}>
            <label htmlFor="admin-password" style={labelStyle}>
              CONTRASEÑA:
            </label>
            <input
              id="admin-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={inputStyle}
              placeholder="••••••••"
            />
          </div>

          <button type="submit" style={buttonStyle}>
            INICIAR SESIÓN
          </button>

          <button type="button" onClick={handleBackToStore} style={backButtonStyle}>
            VOLVER A LA TIENDA
          </button>
        </form>

        <div style={infoBoxStyle}>
          <p style={{ marginBottom: '10px' }}>
            🔐 <strong>CREDENCIALES DE ACCESO:</strong>
          </p>
          <p style={{ fontSize: '14px', lineHeight: 1.6 }}>
            <strong>Email:</strong> {ADMIN_CREDENTIALS.email}<br />
            <strong>Password:</strong> {ADMIN_CREDENTIALS.password}
          </p>
          <p style={{ fontSize: '12px', marginTop: '10px', opacity: 0.6 }}>
            * Solo para demostración. En producción estas credenciales estarían encriptadas.
          </p>
        </div>
      </div>
    </div>
  );
};
