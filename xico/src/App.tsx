// src/App.tsx

import React from 'react';
import { Home } from './pages/Home';
import { AdminDashboard } from './pages/AdminDashboard';

function App() {
  // Simple routing basado en pathname
  // Para producción, usa react-router-dom
  const path = window.location.pathname;
  const isAdminPath = path === '/admin' || path.startsWith('/admin');

  // Listener para cambios de ruta (navegación manual)
  React.useEffect(() => {
    const handlePopState = () => {
      window.location.reload();
    };
    
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return (
    <>
      {isAdminPath ? <AdminDashboard /> : <Home />}
    </>
  );
}

export default App;