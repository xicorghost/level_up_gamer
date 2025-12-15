// src/components/CheckoutForm.tsx

import React, { useState } from 'react';
import type { CheckoutData, CartItem } from '../types';

/* -------------------- STYLES (Ajustados para tu tema) -------------------- */
const sectionStyle: React.CSSProperties = {
    backgroundColor: '#0f1f1f',
    border: '2px solid #00ff9f',
    padding: '25px',
    boxShadow: '0 0 20px rgba(0,255,159,.25)',
};

const titleStyle: React.CSSProperties = {
    color: '#00ff9f',
    textShadow: '0 0 10px #00ff9f',
};

const formStyle: React.CSSProperties = { 
    display: 'grid', 
    gap: '15px', 
    gridTemplateColumns: '1fr 1fr',
};

const inputStyle: React.CSSProperties = { 
    width: '100%', 
    padding: '10px', 
    background: '#0a0a0a', 
    border: '2px solid #00ff9f', 
    color: '#00ff9f', 
    fontFamily: 'monospace',
};

const buttonStyle: React.CSSProperties = { 
    padding: '12px', 
    background: '#00ff9f', 
    border: 'none', 
    color: '#0a0a0a', 
    fontWeight: 'bold', 
    cursor: 'pointer',
    marginTop: '10px',
};

const tableStyle: React.CSSProperties = {
    width: '100%',
    borderCollapse: 'collapse',
    textAlign: 'left' as const,
};

/* -------------------- PROPIEDADES -------------------- */

interface CheckoutFormProps {
    initialData: CheckoutData;
    cart: CartItem[];
    total: number;
    // Esta función recibe los datos del formulario de dirección
    onSubmit: (data: CheckoutData) => Promise<void>; 
}


/* -------------------- COMPONENTE -------------------- */

export const CheckoutForm: React.FC<CheckoutFormProps> = ({ initialData, cart, total, onSubmit }) => {
    // Usamos CheckoutData para el estado del formulario de dirección
    const [formData, setFormData] = useState<CheckoutData>(initialData);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Llama a la función de envío que está en Home.tsx
        onSubmit(formData);
    };

    return (
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
            
            {/* 1. FORMULARIO DE PAGO Y ENVÍO */}
            <div style={sectionStyle}>
                <h3 style={titleStyle}>Dirección de entrega de los productos</h3>
                <form onSubmit={handleSubmit} style={formStyle}>
                    
                    {/* Información del Cliente */}
                    <div style={{ gridColumn: '1 / 3' }}>
                        <h4 style={{ color: '#00ff9f' }}>Información del cliente</h4>
                        <input name="nombre" value={formData.nombre} onChange={handleChange} placeholder="Nombre*" style={inputStyle} required />
                        <input name="apellido" value={formData.apellido} onChange={handleChange} placeholder="Apellidos*" style={inputStyle} required />
                        {/* El correo se prellena y es de solo lectura si el usuario está logueado */}
                        <input name="correo" value={formData.correo} onChange={handleChange} placeholder="Correo*" style={inputStyle} required readOnly /> 
                    </div>

                    {/* Dirección */}
                    <div style={{ gridColumn: '1 / 3' }}>
                        <h4 style={{ color: '#00ff9f' }}>Dirección de entrega</h4>
                        <input name="calle" value={formData.calle} onChange={handleChange} placeholder="Calle*" style={inputStyle} required />
                        <input name="departamento" value={formData.departamento} onChange={handleChange} placeholder="Departamento (opcional)" style={inputStyle} />
                    </div>

                    {/* Región y Comuna (DEBES SUSTITUIR ESTOS OPTIONS POR TUS DATOS REALES) */}
                    <select name="region" value={formData.region} onChange={handleChange} style={inputStyle}>
                        <option value="Región Metropolitana de Santiago">Región Metropolitana de Santiago</option>
                        {/* Añadir más regiones aquí */}
                    </select>
                    <select name="comuna" value={formData.comuna} onChange={handleChange} style={inputStyle}>
                        <option value="Cerrillos">Cerrillos</option>
                        {/* Añadir más comunas aquí */}
                    </select>

                    {/* Indicaciones */}
                    <div style={{ gridColumn: '1 / 3' }}>
                        <textarea 
                            name="indicaciones" 
                            value={formData.indicaciones} 
                            onChange={handleChange} 
                            placeholder="Indicaciones para la entrega (Ej: Entre calles, color del edificio, no tiene timbre.)" 
                            style={{ ...inputStyle, minHeight: '80px' }} 
                        />
                    </div>
                    
                    {/* Botón de Pago */}
                    <div style={{ gridColumn: '1 / 3' }}>
                        <button type="submit" style={buttonStyle}>Pagar ahora ${total.toLocaleString('es-CL')}</button>
                    </div>
                </form>
            </div>


            {/* 2. RESUMEN DEL CARRITO (A la derecha) */}
            <div style={sectionStyle}>
                <h3 style={{ ...titleStyle, marginBottom: '20px' }}>Resumen del Pedido</h3>
                
                <table style={tableStyle}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid #00ff9f' }}>
                            <th style={{ paddingBottom: '10px' }}>Nombre</th>
                            <th>Cant.</th>
                            <th>Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.map((item: CartItem, index: number) => (
                            <tr key={index} style={{ borderBottom: '1px dotted #1a4d4d' }}>
                                <td style={{ padding: '8px 0' }}>{item.product.name}</td>
                                <td>{item.quantity}</td>
                                <td>${(item.product.price * item.quantity).toLocaleString('es-CL')}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                
                <div style={{ textAlign: 'right', marginTop: '30px', borderTop: '2px solid #00ff9f', paddingTop: '15px' }}>
                    <h3 style={{ margin: 0 }}>
                        Total pagado: ${total.toLocaleString('es-CL')}
                    </h3>
                </div>
            </div>

        </div>
    );
};