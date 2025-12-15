// src/components/CustomAlert.tsx

import React from 'react';
import type { AlertData } from '../types/index';

interface CustomAlertProps {
  alertData: AlertData | null;
  onClose: () => void;
}

const overlayStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.95)',
  zIndex: 3000,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const contentStyle: React.CSSProperties = {
  background: 'linear-gradient(180deg, #1a4d4d 0%, #0f1f1f 100%)',
  border: '3px solid #00ff9f',
  padding: '40px',
  maxWidth: '500px',
  width: '90%',
  boxShadow: '0 0 40px rgba(0, 255, 159, 0.6)',
  textAlign: 'center',
  animation: 'slideDown 0.3s',
};

const titleStyle: React.CSSProperties = {
  color: '#00ff9f',
  fontSize: '32px',
  marginBottom: '20px',
  textShadow: '0 0 15px #00ff9f',
  letterSpacing: '3px',
};

const messageStyle: React.CSSProperties = {
  color: '#00ff9f',
  fontSize: '20px',
  lineHeight: 1.6,
  marginBottom: '30px',
  whiteSpace: 'pre-line',
};

const buttonStyle: React.CSSProperties = {
  backgroundColor: '#1a4d4d',
  color: '#00ff9f',
  border: '2px solid #00ff9f',
  padding: '12px 30px',
  fontFamily: 'monospace',
  fontSize: '22px',
  cursor: 'pointer',
  minWidth: '200px',
  transition: 'all 0.3s',
};

export const CustomAlert: React.FC<CustomAlertProps> = ({ alertData, onClose }) => {
  if (!alertData) return null;

  return (
    <div style={overlayStyle} onClick={onClose}>
      <div style={contentStyle} onClick={(e) => e.stopPropagation()}>
        <h3 style={titleStyle}>{alertData.title}</h3>
        <p style={messageStyle}>{alertData.message}</p>
        <button onClick={onClose} style={buttonStyle}>
          ACEPTAR
        </button>
      </div>
    </div>
  );
};