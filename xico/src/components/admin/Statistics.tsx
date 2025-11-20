// src/components/admin/Statistics.tsx

import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon }) => (
  <div
    style={{
      backgroundColor: '#0f1f1f',
      border: '2px solid #00ff9f',
      padding: '30px',
      textAlign: 'center',
      transition: 'all 0.3s',
    }}
  >
    {icon && (
      <div style={{ fontSize: '48px', marginBottom: '15px' }}>{icon}</div>
    )}
    <h4 style={{ fontSize: '20px', marginBottom: '15px', color: '#00ff9f' }}>
      {title}
    </h4>
    <p
      style={{
        fontSize: '48px',
        color: '#00ff9f',
        textShadow: '0 0 15px #00ff9f',
        fontWeight: 'bold',
      }}
    >
      {value}
    </p>
  </div>
);

interface TopProduct {
  name: string;
  sales: number;
  revenue: number;
}

export const Statistics: React.FC = () => {
  // Datos simulados
  const stats = {
    totalSales: 2850550,
    productsSold: 47,
    activeUsers: 125,
    totalPoints: 8750,
    ordersCompleted: 23,
    ordersPending: 8,
  };

  const topProducts: TopProduct[] = [
    { name: 'PlayStation 5', sales: 8, revenue: 4399920 },
    { name: 'PC Gamer ASUS ROG Strix', sales: 5, revenue: 6499950 },
    { name: 'Auriculares HyperX Cloud II', sales: 12, revenue: 959880 },
    { name: 'Mouse Gamer Logitech G502', sales: 15, revenue: 749850 },
    { name: 'Código Steam Aleatorio', sales: 20, revenue: 599800 },
  ];

  const salesByCategory = [
    { category: 'Consolas', percentage: 35, sales: 997692 },
    { category: 'Computadores', percentage: 28, sales: 798154 },
    { category: 'Accesorios', percentage: 20, sales: 570110 },
    { category: 'Random', percentage: 12, sales: 342066 },
    { category: 'Otros', percentage: 5, sales: 142527 },
  ];

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
        <h3 style={{ fontSize: '28px', marginBottom: '10px' }}>
          &gt; ESTADÍSTICAS GENERALES
        </h3>
        <p style={{ opacity: 0.7 }}>
          Panel de control con métricas clave del negocio
        </p>
      </div>

      {/* Tarjetas de estadísticas principales */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px',
          marginBottom: '30px',
        }}
      >
        <StatCard
          title="VENTAS TOTALES"
          value={`$${stats.totalSales.toLocaleString('es-CL')}`}
          icon="💰"
        />
        <StatCard
          title="PRODUCTOS VENDIDOS"
          value={stats.productsSold}
          icon="📦"
        />
        <StatCard
          title="USUARIOS ACTIVOS"
          value={stats.activeUsers}
          icon="👥"
        />
        <StatCard
          title="PUNTOS OTORGADOS"
          value={stats.totalPoints.toLocaleString('es-CL')}
          icon="⭐"
        />
      </div>

      {/* Estadísticas de pedidos */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px',
          marginBottom: '30px',
        }}
      >
        <div
          style={{
            backgroundColor: '#0f1f1f',
            border: '2px solid #00ff9f',
            padding: '30px',
            textAlign: 'center',
          }}
        >
          <h4 style={{ fontSize: '20px', marginBottom: '15px' }}>
            PEDIDOS COMPLETADOS
          </h4>
          <p
            style={{
              fontSize: '48px',
              color: '#00ff9f',
              textShadow: '0 0 15px #00ff9f',
            }}
          >
            {stats.ordersCompleted}
          </p>
          <div
            style={{
              marginTop: '15px',
              padding: '10px',
              backgroundColor: '#0a0a0a',
              border: '1px solid #00ff9f',
            }}
          >
            <div style={{ fontSize: '14px', opacity: 0.7 }}>Tasa de éxito</div>
            <div style={{ fontSize: '24px', color: '#00ff9f' }}>
              {(
                (stats.ordersCompleted /
                  (stats.ordersCompleted + stats.ordersPending)) *
                100
              ).toFixed(1)}
              %
            </div>
          </div>
        </div>

        <div
          style={{
            backgroundColor: '#0f1f1f',
            border: '2px solid #ff9f00',
            padding: '30px',
            textAlign: 'center',
          }}
        >
          <h4 style={{ fontSize: '20px', marginBottom: '15px' }}>
            PEDIDOS PENDIENTES
          </h4>
          <p
            style={{
              fontSize: '48px',
              color: '#ff9f00',
              textShadow: '0 0 15px #ff9f00',
            }}
          >
            {stats.ordersPending}
          </p>
          <button
            style={{
              marginTop: '15px',
              backgroundColor: '#ff9f00',
              color: '#0a0a0a',
              border: '2px solid #ff9f00',
              padding: '10px 20px',
              fontFamily: 'monospace',
              fontSize: '18px',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
          >
            VER PEDIDOS
          </button>
        </div>
      </div>

      {/* Productos más vendidos */}
      <div
        style={{
          backgroundColor: '#0f1f1f',
          border: '2px solid #00ff9f',
          padding: '30px',
          marginBottom: '30px',
        }}
      >
        <h4
          style={{
            fontSize: '24px',
            marginBottom: '20px',
            textShadow: '0 0 8px #00ff9f',
          }}
        >
          &gt; PRODUCTOS MÁS VENDIDOS
        </h4>

        <div style={{ display: 'grid', gap: '15px' }}>
          {topProducts.map((product, index) => (
            <div
              key={index}
              style={{
                display: 'grid',
                gridTemplateColumns: '50px 2fr 1fr 1fr',
                gap: '15px',
                alignItems: 'center',
                padding: '15px',
                backgroundColor: '#0a0a0a',
                border: '2px solid #00ff9f',
              }}
            >
              <div
                style={{
                  width: '50px',
                  height: '50px',
                  backgroundColor: '#1a4d4d',
                  border: '2px solid #00ff9f',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px',
                  fontWeight: 'bold',
                }}
              >
                {index + 1}
              </div>
              <div>
                <div style={{ fontSize: '20px', fontWeight: 'bold' }}>
                  {product.name}
                </div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '14px', opacity: 0.7 }}>
                  Unidades vendidas
                </div>
                <div style={{ fontSize: '24px', color: '#00ff9f' }}>
                  {product.sales}
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '14px', opacity: 0.7 }}>
                  Ingresos generados
                </div>
                <div
                  style={{
                    fontSize: '24px',
                    color: '#00ff9f',
                    textShadow: '0 0 8px #00ff9f',
                  }}
                >
                  ${product.revenue.toLocaleString('es-CL')}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Ventas por categoría */}
      <div
        style={{
          backgroundColor: '#0f1f1f',
          border: '2px solid #00ff9f',
          padding: '30px',
        }}
      >
        <h4
          style={{
            fontSize: '24px',
            marginBottom: '20px',
            textShadow: '0 0 8px #00ff9f',
          }}
        >
          &gt; VENTAS POR CATEGORÍA
        </h4>

        <div style={{ display: 'grid', gap: '15px' }}>
          {salesByCategory.map((item, index) => (
            <div key={index}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '5px',
                }}
              >
                <span style={{ fontSize: '18px' }}>{item.category}</span>
                <span style={{ fontSize: '18px', color: '#00ff9f' }}>
                  {item.percentage}% - ${item.sales.toLocaleString('es-CL')}
                </span>
              </div>
              <div
                style={{
                  width: '100%',
                  height: '30px',
                  backgroundColor: '#0a0a0a',
                  border: '2px solid #00ff9f',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    width: `${item.percentage}%`,
                    height: '100%',
                    backgroundColor: '#00ff9f',
                    transition: 'width 1s ease-in-out',
                    boxShadow: '0 0 15px #00ff9f',
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Gráfico de crecimiento (simulado) */}
      <div
        style={{
          backgroundColor: '#0f1f1f',
          border: '2px solid #00ff9f',
          padding: '30px',
          marginTop: '30px',
        }}
      >
        <h4
          style={{
            fontSize: '24px',
            marginBottom: '20px',
            textShadow: '0 0 8px #00ff9f',
          }}
        >
          &gt; TENDENCIAS MENSUALES
        </h4>
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-around',
            height: '300px',
            padding: '20px',
            backgroundColor: '#0a0a0a',
            border: '2px solid #00ff9f',
          }}
        >
          {[65, 75, 85, 70, 90, 95].map((height, index) => (
            <div
              key={index}
              style={{
                flex: 1,
                margin: '0 10px',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  height: `${height}%`,
                  backgroundColor: '#00ff9f',
                  boxShadow: '0 0 15px #00ff9f',
                  transition: 'all 0.5s',
                  marginBottom: '10px',
                }}
              />
              <div style={{ fontSize: '14px', opacity: 0.7 }}>
                {['Oct', 'Nov', 'Dic', 'Ene', 'Feb', 'Mar'][index]}
              </div>
            </div>
          ))}
        </div>
        <div
          style={{
            textAlign: 'center',
            marginTop: '20px',
            padding: '15px',
            backgroundColor: '#0a0a0a',
            border: '2px solid #00ff9f',
          }}
        >
          <span style={{ color: '#00ff9f', fontSize: '18px' }}>
            📈 Crecimiento promedio: <strong>+15.3%</strong> mes a mes
          </span>
        </div>
      </div>
    </div>
  );
};