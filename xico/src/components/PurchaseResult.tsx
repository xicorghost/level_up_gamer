import React from 'react';
// 🛑 Importación de tipos usando 'import type' (necesario por tu tsconfig)
import type { BoletaResult } from '../types'; 

/* -------------------- STYLES (Definiciones para funcionar sin importación externa) -------------------- */

// Colores basados en el tema 'hacker'
const successColor = '#00ff9f';
const failureColor = '#ff3333';
const primaryColor = '#0f1f1f'; // Fondo de las secciones
const containerColor = '#0a0a0a'; // Fondo principal

const sectionStyle: React.CSSProperties = {
    backgroundColor: containerColor,
    padding: '30px',
    boxShadow: '0 0 25px rgba(0,255,159,.35)',
    color: successColor, // Color de texto base
    fontFamily: 'monospace',
};

const buttonStyle: React.CSSProperties = { 
    padding: '12px 25px', 
    background: primaryColor, // Botón secundario
    border: `2px solid ${successColor}`, 
    color: successColor, 
    fontWeight: 'bold', 
    cursor: 'pointer',
    transition: 'background 0.3s',
};


/* -------------------- PROPIEDADES -------------------- */

interface PurchaseResultProps {
    purchase: BoletaResult; // La información que viene del backend
    isSuccess: boolean;
    onRetry: () => void;
    onGoHome: () => void;
}


/* -------------------- COMPONENTE -------------------- */

export const PurchaseResult: React.FC<PurchaseResultProps> = ({ purchase, isSuccess, onRetry, onGoHome }) => {
    
    const statusText = isSuccess ? '¡COMPRA REALIZADA CON ÉXITO!' : '¡ERROR EN EL PROCESO DE PAGO!';
    const statusColor = isSuccess ? successColor : failureColor;
    
    // Estilo del botón principal (éxito o reintento)
    const mainButtonStyle: React.CSSProperties = { 
        ...buttonStyle,
        background: statusColor, 
        color: primaryColor,
        border: 'none',
    };
    
    // Estilo del botón secundario (volver a inicio, usa el estilo base)
    const secondaryButtonStyle = { 
        ...buttonStyle,
        borderColor: successColor,
        color: successColor,
    };
    
    return (
        <div style={{ ...sectionStyle, border: `3px solid ${statusColor}`, maxWidth: '800px', margin: 'auto' }}>
            
            <h1 style={{ color: statusColor, textAlign: 'center', marginBottom: '40px', textShadow: `0 0 15px ${statusColor}` }}>
                {statusText}
            </h1>
            
            <div style={{ padding: '20px', backgroundColor: primaryColor, borderRadius: '5px' }}>
                
                <h3 style={{ color: successColor, borderBottom: `2px solid ${statusColor}`, paddingBottom: '10px', marginBottom: '20px' }}>
                    Detalle de la {isSuccess ? 'Boleta' : 'Transacción'}
                </h3>
                
                <p><strong>Boleta N°:</strong> {purchase.id}</p>
                <p><strong>Fecha:</strong> {new Date(purchase.fecha).toLocaleDateString('es-CL', { 
                    year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' 
                })}</p>
                
                <p style={{ fontSize: '1.4em', marginTop: '15px' }}>
                    <strong>Total pagado:</strong> <span style={{ color: statusColor }}>${purchase.total.toLocaleString('es-CL')}</span>
                </p>

                {/* INFORMACIÓN DE ENTREGA */}
                {isSuccess && (
                    <>
                        <h4 style={{ color: successColor, marginTop: '30px', borderTop: '1px solid #1a4d4d', paddingTop: '15px' }}>
                            Información de entrega
                        </h4>
                        <p><strong>Cliente:</strong> {purchase.nombreCompleto}</p>
                        <p><strong>Dirección:</strong> {purchase.direccionEntrega}</p>
                        <p style={{ marginTop: '15px', color: successColor }}>
                            ¡Revisa tu correo electrónico para seguir el estado de tu pedido!
                        </p>
                    </>
                )}
            </div>
            
            {/* ACCIONES */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '40px' }}>
                
                {isSuccess ? (
                    <button style={mainButtonStyle} onClick={onGoHome}>
                        Volver al inicio
                    </button>
                ) : (
                    <>
                        <button style={mainButtonStyle} onClick={onRetry}>
                            Intentar de nuevo
                        </button>
                        <button style={secondaryButtonStyle} onClick={onGoHome}>
                            Volver al inicio
                        </button>
                    </>
                )}
            </div>
            
        </div>
    );
};