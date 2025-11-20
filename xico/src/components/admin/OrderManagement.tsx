// src/components/admin/OrderManagement.tsx

import React, { useState } from 'react';
import type { Order } from '../../types';

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
          stock: 0
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
          stock: 0
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
          stock: 0
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
          stock: 0
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
          stock: 0
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
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'completed' | 'cancelled'>('all');

  const filteredOrders = orders.filter((order) =>
    filterStatus === 'all' ? true : order.status === filterStatus
  );

  const updateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    setOrders(
      orders.map((order) =>
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
      <div
        style={{
          backgroundColor: '#0f1f1f',
          border: '2px solid #00ff9f',
          padding: '30px',
          marginBottom: '30px',
        }}
      >
        <h3 style={{ fontSize: '28px', marginBottom: '20px' }}>&gt; GESTIÓN DE PEDIDOS</h3>
        <p style={{ marginBottom: '20px' }}>
          Total de pedidos: <strong>{orders.length}</strong>
        </p>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button
            onClick={() => setFilterStatus('all')}
            style={{
              ...buttonStyle,
              backgroundColor: filterStatus === 'all' ? '#00ff9f' : '#1a4d4d',
              color: filterStatus === 'all' ? '#0a0a0a' : '#00ff9f',
            }}
          >
            TODOS ({orders.length})
          </button>
          <button
            onClick={() => setFilterStatus('pending')}
            style={{
              ...buttonStyle,
              backgroundColor: filterStatus === 'pending' ? '#ff9f00' : '#1a4d4d',
              color: filterStatus === 'pending' ? '#0a0a0a' : '#00ff9f',
            }}
          >
            PENDIENTES ({orders.filter((o) => o.status === 'pending').length})
          </button>
          <button
            onClick={() => setFilterStatus('completed')}
            style={{
              ...buttonStyle,
              backgroundColor: filterStatus === 'completed' ? '#00ff9f' : '#1a4d4d',
              color: filterStatus === 'completed' ? '#0a0a0a' : '#00ff9f',
            }}
          >
            COMPLETADOS ({orders.filter((o) => o.status === 'completed').length})
          </button>
          <button
            onClick={() => setFilterStatus('cancelled')}
            style={{
              ...buttonStyle,
              backgroundColor: filterStatus === 'cancelled' ? '#ff0000' : '#1a4d4d',
              color: '#fff',
            }}
          >
            CANCELADOS ({orders.filter((o) => o.status === 'cancelled').length})
          </button>
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
              <th style={tableHeaderStyle}>ID PEDIDO</th>
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
                  <td style={tableCellStyle}>
                    <div>{order.userName}</div>
                    <div style={{ fontSize: '14px', opacity: 0.7 }}>{order.userEmail}</div>
                  </td>
                  <td style={tableCellStyle}>{order.date}</td>
                  <td style={tableCellStyle}>
                    ${order.total.toLocaleString('es-CL')}
                  </td>
                  <td style={tableCellStyle}>
                    <span
                      style={{
                        color: getStatusColor(order.status),
                        fontWeight: 'bold',
                        padding: '5px 10px',
                        border: `2px solid ${getStatusColor(order.status)}`,
                        borderRadius: '3px',
                      }}
                    >
                      {getStatusLabel(order.status)}
                    </span>
                  </td>
                  <td style={tableCellStyle}>
                    <button
                      onClick={() => setSelectedOrder(order)}
                      style={{ ...buttonStyle, marginRight: '5px' }}
                    >
                      VER
                    </button>
                    {order.status === 'pending' && (
                      <>
                        <button
                          onClick={() => updateOrderStatus(order.id, 'completed')}
                          style={{
                            ...buttonStyle,
                            backgroundColor: '#00ff9f',
                            color: '#0a0a0a',
                            marginRight: '5px',
                          }}
                        >
                          COMPLETAR
                        </button>
                        <button
                          onClick={() => updateOrderStatus(order.id, 'cancelled')}
                          style={{
                            ...buttonStyle,
                            backgroundColor: '#ff0000',
                            color: '#fff',
                          }}
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
                <td colSpan={6} style={{ ...tableCellStyle, textAlign: 'center', padding: '30px' }}>
                  No hay pedidos con ese estado
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal de detalle del pedido */}
      {selectedOrder && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.95)',
            zIndex: 2000,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px',
          }}
        >
          <div
            style={{
              backgroundColor: '#0f1f1f',
              border: '3px solid #00ff9f',
              padding: '30px',
              maxWidth: '800px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '28px' }}>DETALLE DEL PEDIDO #{selectedOrder.id}</h3>
              <button
                onClick={() => setSelectedOrder(null)}
                style={{
                  fontSize: '35px',
                  color: '#00ff9f',
                  cursor: 'pointer',
                  border: 'none',
                  background: 'none',
                }}
              >
                ×
              </button>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <p><strong>Cliente:</strong> {selectedOrder.userName}</p>
              <p><strong>Email:</strong> {selectedOrder.userEmail}</p>
              <p><strong>Fecha:</strong> {selectedOrder.date}</p>
              <p>
                <strong>Estado:</strong>{' '}
                <span style={{ color: getStatusColor(selectedOrder.status) }}>
                  {getStatusLabel(selectedOrder.status)}
                </span>
              </p>
            </div>

            {selectedOrder.address && (
              <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#0a0a0a', border: '2px solid #00ff9f' }}>
                <h4 style={{ marginBottom: '10px' }}>DIRECCIÓN DE ENTREGA:</h4>
                <p>{selectedOrder.address}</p>
                <p>{selectedOrder.commune}, {selectedOrder.region}</p>
              </div>
            )}

            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ marginBottom: '15px' }}>PRODUCTOS:</h4>
              {selectedOrder.items.map((item, index) => (
                <div
                  key={index}
                  style={{
                    padding: '15px',
                    backgroundColor: '#0a0a0a',
                    border: '2px solid #00ff9f',
                    marginBottom: '10px',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                      <strong>{item.product.name}</strong>
                      <div>Cantidad: {item.quantity}</div>
                      ${(item.product.price * item.quantity).toLocaleString('es-CL')}

                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div
              style={{
                fontSize: '28px',
                padding: '20px',
                backgroundColor: '#0a0a0a',
                border: '2px solid #00ff9f',
                textAlign: 'right',
              }}
            >
              TOTAL: ${selectedOrder.total.toLocaleString('es-CL')}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};