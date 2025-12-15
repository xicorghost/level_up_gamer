// src/components/admin/OrderManagement.tsx

import React, { useState } from 'react';
import type { Order } from '../../types/index';

const MOCK_ORDERS: Order[] = [
  {
    id: '20240001',
    userEmail: 'juan.perez@duoc.cl',
    userName: 'Juan Pérez',
    items: [
      {
        product: {
          code: 'CO001',
          name: 'PlayStation 5',
          category: 'Consolas',
          price: 549990,
          description: '',
          image: '',
          stock: 0,
        },
        quantity: 1,
      },
    ],
    total: 439992,
    date: '15/11/2025',
    status: 'completed',
    address: 'Los Cisnereos, Edificio Norte',
    region: 'Región Metropolitana',
    commune: 'Cerrillos',
  },
  {
    id: '20240002',
    userEmail: 'maria.gonzalez@gmail.com',
    userName: 'María González',
    items: [
      {
        product: {
          code: 'AC002',
          name: 'Auriculares Gamer HyperX Cloud II',
          category: 'Accesorios',
          price: 79990,
          description: '',
          image: '',
          stock: 0,
        },
        quantity: 1,
      },
      {
        product: {
          code: 'MS001',
          name: 'Mouse Gamer Logitech G502 HERO',
          category: 'Mouse',
          price: 49990,
          description: '',
          image: '',
          stock: 0,
        },
        quantity: 1,
      },
    ],
    total: 129980,
    date: '16/11/2025',
    status: 'pending',
    address: 'Av. Principal 123',
    region: 'Región Metropolitana',
    commune: 'Santiago',
  },
  {
    id: '20240003',
    userEmail: 'pedro.silva@duoc.cl',
    userName: 'Pedro Silva',
    items: [
      {
        product: {
          code: 'CG001',
          name: 'PC Gamer ASUS ROG Strix',
          category: 'Computadores Gamers',
          price: 1299990,
          description: '',
          image: '',
          stock: 0,
        },
        quantity: 1,
      },
    ],
    total: 1039992,
    date: '17/11/2025',
    status: 'completed',
    address: 'Depto 603',
    region: 'Región Metropolitana',
    commune: 'Cerrillos',
  },
  {
    id: '20240004',
    userEmail: 'ana.lopez@gmail.com',
    userName: 'Ana López',
    items: [
      {
        product: {
          code: 'LL001',
          name: 'Código Aleatorio De Steam',
          category: 'Random',
          price: 29990,
          description: '',
          image: '',
          stock: 0,
        },
        quantity: 2,
      },
    ],
    total: 59980,
    date: '18/11/2025',
    status: 'pending',
  },
];

export const OrderManagement: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [filterStatus, setFilterStatus] =
    useState<'all' | 'pending' | 'completed' | 'cancelled'>('all');

  const filteredOrders = orders.filter((order) =>
    filterStatus === 'all' ? true : order.status === filterStatus
  );

  /** 🔥 FIX PARA LOS TESTS: usamos función en setOrders */
  const updateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );

    if (selectedOrder?.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'completed':
        return '#00ff9f';
      case 'pending':
        return '#ff9f00';
      case 'cancelled':
        return '#ff0000';
      default:
        return '#00ff9f';
    }
  };

  const getStatusLabel = (status: Order['status']) => {
    switch (status) {
      case 'completed':
        return 'COMPLETADO';
      case 'pending':
        return 'PENDIENTE';
      case 'cancelled':
        return 'CANCELADO';
      default:
        return status;
    }
  };

  const tableHeaderStyle: React.CSSProperties = {
    padding: '10px',
    textAlign: 'left',
    borderBottom: '2px solid #00ff9f',
  };

  const tableCellStyle: React.CSSProperties = {
    padding: '15px 10px',
    borderBottom: '1px solid #00ff9f',
  };

  const buttonStyle: React.CSSProperties = {
    backgroundColor: '#1a4d4d',
    color: '#00ff9f',
    border: '2px solid #00ff9f',
    padding: '8px 15px',
    fontFamily: 'monospace',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'all 0.3s',
  };

  return (
    <div>
      <h3 style={{ fontSize: '28px', marginBottom: '20px' }}>
        &gt; GESTIÓN DE PEDIDOS
      </h3>

      <div style={{ marginBottom: '20px' }}>
        Total de pedidos: <strong>{orders.length}</strong>
      </div>

      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <button
          onClick={() => setFilterStatus('all')}
          style={buttonStyle}
        >
          TODOS ({orders.length})
        </button>

        <button
          onClick={() => setFilterStatus('pending')}
          style={buttonStyle}
        >
          PENDIENTES ({orders.filter((o) => o.status === 'pending').length})
        </button>

        <button
          onClick={() => setFilterStatus('completed')}
          style={buttonStyle}
        >
          COMPLETADOS ({orders.filter((o) => o.status === 'completed').length})
        </button>

        <button
          onClick={() => setFilterStatus('cancelled')}
          style={buttonStyle}
        >
          CANCELADOS ({orders.filter((o) => o.status === 'cancelled').length})
        </button>
      </div>

      <table style={{ width: '100%', marginTop: '25px', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={tableHeaderStyle}>ID</th>
            <th style={tableHeaderStyle}>USUARIO</th>
            <th style={tableHeaderStyle}>FECHA</th>
            <th style={tableHeaderStyle}>TOTAL</th>
            <th style={tableHeaderStyle}>ESTADO</th>
            <th style={tableHeaderStyle}>ACCIONES</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <tr key={order.id}>
                <td style={tableCellStyle}>#{order.id}</td>
                <td style={tableCellStyle}>{order.userName}</td>
                <td style={tableCellStyle}>{order.date}</td>
                <td style={tableCellStyle}>
                  ${order.total.toLocaleString('es-CL')}
                </td>
                <td style={tableCellStyle}>
                  <strong style={{ color: getStatusColor(order.status) }}>
                    {getStatusLabel(order.status)}
                  </strong>
                </td>
                <td style={tableCellStyle}>
                  <button
                    style={{ ...buttonStyle, marginRight: '5px' }}
                    onClick={() => setSelectedOrder(order)}
                  >
                    VER
                  </button>

                  {order.status === 'pending' && (
                    <>
                      <button
                        style={{
                          ...buttonStyle,
                          backgroundColor: '#00ff9f',
                          color: '#000',
                          marginRight: '5px',
                        }}
                        onClick={() => updateOrderStatus(order.id, 'completed')}
                      >
                        COMPLETAR
                      </button>

                      <button
                        style={{
                          ...buttonStyle,
                          backgroundColor: '#ff0000',
                          color: '#fff',
                        }}
                        onClick={() => updateOrderStatus(order.id, 'cancelled')}
                      >
                        CANCELAR
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={6}
                style={{
                  ...tableCellStyle,
                  textAlign: 'center',
                  padding: '20px',
                }}
              >
                No hay pedidos con ese estado
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {selectedOrder && (
        <div
          data-testid="modal"
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,.9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            zIndex: 2000,
          }}
        >
          <div
            style={{
              backgroundColor: '#0f1f1f',
              border: '2px solid #00ff9f',
              padding: '20px',
              maxWidth: '800px',
              width: '100%',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h3>DETALLE DEL PEDIDO #{selectedOrder.id}</h3>
              <button
                onClick={() => setSelectedOrder(null)}
                style={{
                  border: 'none',
                  fontSize: '30px',
                  color: '#00ff9f',
                  background: 'transparent',
                  cursor: 'pointer',
                }}
              >
                ×
              </button>
            </div>

            <p>
              <strong>Cliente:</strong> {selectedOrder.userName}
            </p>
            <p>
              <strong>Email:</strong> {selectedOrder.userEmail}
            </p>
            <p>
              <strong>Fecha:</strong> {selectedOrder.date}
            </p>

            <h4>PRODUCTOS</h4>
            {selectedOrder.items.map((item, i) => (
              <div key={i}>
                {item.product.name} × {item.quantity}
              </div>
            ))}

            <h2 style={{ textAlign: 'right' }}>
              TOTAL: ${selectedOrder.total.toLocaleString('es-CL')}
            </h2>
          </div>
        </div>
      )}
    </div>
  );
};
