// src/pages/AdminDashboard.tsx

import React, { useState } from 'react';
import type { AdminSection } from '../types';
import { AdminLogin } from '../components/admin/AdminLogin';
import { ProductManagement } from '../components/admin/ProductManagement';
import { UserManagement } from '../components/admin/UserManagement';
import { OrderManagement } from '../components/admin/OrderManagement';
import { Statistics } from '../components/admin/Statistics';

export const AdminDashboard: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentSection, setCurrentSection] = useState<AdminSection>('products');

  // Si no está autenticado, mostrar login
  if (!isAuthenticated) {
    return <AdminLogin onLoginSuccess={() => setIsAuthenticated(true)} />;
  }

  const sections: { id: AdminSection; label: string }[] = [
    { id: 'products', label: 'PRODUCTOS' },
    { id: 'users', label: 'USUARIOS' },
    { id: 'orders', label: 'PEDIDOS' },
    { id: 'stats', label: 'ESTADÍSTICAS' },
  ];

  return (
    <div
      style={{
        background: 'repeating-conic-gradient(#0a0a0a 0% 25%, #0f1f1f 0% 50%) 0 0 / 30px 30px',
        minHeight: '100vh',
        color: '#00ff9f',
        fontFamily: 'monospace',
      }}
    >
      {/* Header */}
      <header
        style={{
          background: 'linear-gradient(180deg, #1a4d4d 0%, #0a0a0a 100%)',
          padding: '30px 0',
          textAlign: 'center',
          borderBottom: '2px solid #00ff9f',
        }}
      >
        <h1
          style={{
            fontSize: '48px',
            color: 'transparent',
            WebkitTextStroke: '3px #00ff9f',
            textShadow: '0 0 10px #00ff9f, 0 0 20px #00ff9f',
            marginBottom: '20px',
            letterSpacing: '5px',
          }}
        >
          ADMIN PANEL - LEVEL-UP GAMER
        </h1>

        <nav style={{ display: 'flex', justifyContent: 'center', gap: 0, flexWrap: 'wrap' }}>
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setCurrentSection(section.id)}
              style={{
                backgroundColor: currentSection === section.id ? '#00ff9f' : '#1a4d4d',
                color: currentSection === section.id ? '#0a0a0a' : '#00ff9f',
                border: '2px solid #00ff9f',
                padding: '12px 24px',
                fontSize: '20px',
                cursor: 'pointer',
                textTransform: 'uppercase',
                fontFamily: 'monospace',
              }}
            >
              {section.label}
            </button>
          ))}
          <button
            onClick={() => window.location.href = '/'}
            style={{
              backgroundColor: '#1a4d4d',
              color: '#00ff9f',
              border: '2px solid #00ff9f',
              padding: '12px 24px',
              fontSize: '20px',
              cursor: 'pointer',
              textTransform: 'uppercase',
              fontFamily: 'monospace',
            }}
          >
            VOLVER A TIENDA
          </button>
        </nav>
      </header>

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '20px' }}>
        {currentSection === 'products' && <ProductManagement />}
        {currentSection === 'users' && <UserManagement />}
        {currentSection === 'orders' && <OrderManagement />}
        {currentSection === 'stats' && <Statistics />}
      </div>
    </div>
  );
};