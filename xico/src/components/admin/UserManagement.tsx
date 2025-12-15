// src/components/admin/UserManagement.tsx

import React, { useState } from 'react';
import type { UserData } from '../../types';

const MOCK_USERS: UserData[] = [
  {
    nombre: 'Juan Pérez',
    email: 'juan.perez@duoc.cl',
    edad: 22,
    duoc: true,
    descuento: 0.2,
    puntos: 1500,
    nivel: 4,
    codigoReferido: 'LUGJP2025',
  },
  {
    nombre: 'María González',
    email: 'maria.gonzalez@gmail.com',
    edad: 28,
    duoc: false,
    descuento: 0,
    puntos: 750,
    nivel: 2,
    codigoReferido: 'LUGMG2025',
  },
  {
    nombre: 'Pedro Silva',
    email: 'pedro.silva@duoc.cl',
    edad: 20,
    duoc: true,
    descuento: 0.2,
    puntos: 2300,
    nivel: 5,
    codigoReferido: 'LUGPS2025',
  },
  {
    nombre: 'Ana López',
    email: 'ana.lopez@gmail.com',
    edad: 25,
    duoc: false,
    descuento: 0,
    puntos: 500,
    nivel: 1,
    codigoReferido: 'LUGAL2025',
  },
  {
    nombre: 'Carlos Rojas',
    email: 'carlos.rojas@duoc.cl',
    edad: 23,
    duoc: true,
    descuento: 0.2,
    puntos: 3100,
    nivel: 7,
    codigoReferido: 'LUGCR2025',
  },
];

export const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<UserData[]>(MOCK_USERS);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = users.filter(
    (user) =>
      user.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const tableHeaderStyle: React.CSSProperties = {
    padding: '10px',
    textAlign: 'left',
    borderBottom: '2px solid #00ff9f',
  };

  const tableCellStyle: React.CSSProperties = {
    padding: '15px 10px',
    borderBottom: '1px solid #00ff9f',
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px',
    backgroundColor: '#0a0a0a',
    border: '2px solid #00ff9f',
    color: '#00ff9f',
    fontFamily: 'monospace',
    fontSize: '18px',
  };

  return (
    <div>
      <div
        style={{
          backgroundColor: '#0f1f1f',
          border: '2px solid #00ff9f',
          padding: '30px',
          marginBottom: '30px',
        }}
      >
        <h3 style={{ fontSize: '28px', marginBottom: '20px' }}>&gt; GESTIÓN DE USUARIOS</h3>
        <p style={{ marginBottom: '20px' }}>
          Total de usuarios registrados: <strong>{users.length}</strong>
        </p>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>BUSCAR USUARIO:</label>
          <input
            type="text"
            placeholder="Buscar por nombre o email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={inputStyle}
          />
        </div>
      </div>

      <div
        style={{
          backgroundColor: '#0f1f1f',
          border: '2px solid #00ff9f',
          padding: '20px',
          overflowX: 'auto',
        }}
      >
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={tableHeaderStyle}>NOMBRE</th>
              <th style={tableHeaderStyle}>EMAIL</th>
              <th style={tableHeaderStyle}>EDAD</th>
              <th style={tableHeaderStyle}>PUNTOS</th>
              <th style={tableHeaderStyle}>NIVEL</th>
              <th style={tableHeaderStyle}>DESCUENTO DUOC</th>
              <th style={tableHeaderStyle}>CÓD. REFERIDO</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user, index) => (
                <tr key={index}>
                  <td style={tableCellStyle}>{user.nombre}</td>
                  <td style={tableCellStyle}>{user.email}</td>
                  <td style={tableCellStyle}>{user.edad || 'N/A'}</td>
                  <td style={tableCellStyle}>{user.puntos}</td>
                  <td style={tableCellStyle}>{user.nivel}</td>
                  <td style={tableCellStyle}>
                    {user.duoc ? (
                      <span
                        style={{
                          backgroundColor: '#00ff9f',
                          color: '#0a0a0a',
                          padding: '5px 10px',
                          borderRadius: '3px',
                          fontWeight: 'bold',
                        }}
                      >
                        SÍ
                      </span>
                    ) : (
                      <span style={{ opacity: 0.5 }}>NO</span>
                    )}
                  </td>
                  <td style={tableCellStyle}>{user.codigoReferido}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} style={{ ...tableCellStyle, textAlign: 'center', padding: '30px' }}>
                  {searchTerm
                    ? 'No se encontraron usuarios con ese criterio'
                    : 'No hay usuarios registrados'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Estadísticas de usuarios */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px',
          marginTop: '30px',
        }}
      >
        <div
          style={{
            backgroundColor: '#0f1f1f',
            border: '2px solid #00ff9f',
            padding: '20px',
            textAlign: 'center',
          }}
        >
          <h4 style={{ fontSize: '20px', marginBottom: '10px' }}>USUARIOS DUOC</h4>
          <p style={{ fontSize: '36px', color: '#00ff9f', textShadow: '0 0 10px #00ff9f' }}>
            {users.filter((u) => u.duoc).length}
          </p>
        </div>

        <div
          style={{
            backgroundColor: '#0f1f1f',
            border: '2px solid #00ff9f',
            padding: '20px',
            textAlign: 'center',
          }}
        >
          <h4 style={{ fontSize: '20px', marginBottom: '10px' }}>USUARIOS REGULARES</h4>
          <p style={{ fontSize: '36px', color: '#00ff9f', textShadow: '0 0 10px #00ff9f' }}>
            {users.filter((u) => !u.duoc).length}
          </p>
        </div>

        <div
          style={{
            backgroundColor: '#0f1f1f',
            border: '2px solid #00ff9f',
            padding: '20px',
            textAlign: 'center',
          }}
        >
          <h4 style={{ fontSize: '20px', marginBottom: '10px' }}>PUNTOS TOTALES</h4>
          <p style={{ fontSize: '36px', color: '#00ff9f', textShadow: '0 0 10px #00ff9f' }}>
            {users.reduce((sum, user) => sum + user.puntos, 0).toLocaleString('es-CL')}
          </p>
        </div>

        <div
          style={{
            backgroundColor: '#0f1f1f',
            border: '2px solid #00ff9f',
            padding: '20px',
            textAlign: 'center',
          }}
        >
          <h4 style={{ fontSize: '20px', marginBottom: '10px' }}>NIVEL PROMEDIO</h4>
          <p style={{ fontSize: '36px', color: '#00ff9f', textShadow: '0 0 10px #00ff9f' }}>
            {(users.reduce((sum, user) => sum + user.nivel, 0) / users.length).toFixed(1)}
          </p>
        </div>
      </div>
    </div>
  );
};