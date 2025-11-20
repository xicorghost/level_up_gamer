// src/components/ProductCard.tsx

import React from 'react';
import type { Product, RatingData } from '../types/index';

interface ProductCardProps {
  product: Product;
  price: number;
  isDuocUser: boolean;
  ratingData: RatingData;
  onAddToCart: (productCode: string) => void;
  onViewReviews: (productCode: string) => void;
}

const getStarsHTML = (rating: number): string => {
  const fullStars = Math.floor(rating);
  return '★'.repeat(fullStars) + '☆'.repeat(5 - fullStars);
};

const cardStyle: React.CSSProperties = {
  backgroundColor: '#0f1f1f',
  border: '2px solid #00ff9f',
  padding: '20px',
  transition: 'all 0.3s',
};

const categoryStyle: React.CSSProperties = {
  opacity: 0.7,
  fontSize: '16px',
  marginBottom: '10px',
};

const imageStyle: React.CSSProperties = {
  width: '100%',
  maxWidth: '180px',
  height: 'auto',
  maxHeight: '150px',
  objectFit: 'contain',
  margin: '10px 0 20px',
  border: '1px solid #00ff9f',
  padding: '5px',
  backgroundColor: '#0a0a0a',
};

const titleStyle: React.CSSProperties = {
  color: '#00ff9f',
  fontSize: '24px',
  marginBottom: '10px',
  textShadow: '0 0 8px #00ff9f',
};

const ratingContainerStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  margin: '10px 0',
};

const starsStyle: React.CSSProperties = {
  color: '#FFD700',
  fontSize: '20px',
  textShadow: '0 0 8px #FFD700',
};

const descriptionStyle: React.CSSProperties = {
  color: '#00ff9f',
  opacity: 0.8,
  marginBottom: '15px',
  fontSize: '16px',
};

const priceStyle: React.CSSProperties = {
  color: '#00ff9f',
  fontSize: '28px',
  margin: '15px 0',
  textShadow: '0 0 10px #00ff9f',
};

const getButtonStyle = (disabled: boolean): React.CSSProperties => ({
  backgroundColor: disabled ? '#666' : '#1a4d4d',
  color: '#00ff9f',
  border: '2px solid #00ff9f',
  padding: '12px 30px',
  fontFamily: 'monospace',
  fontSize: '22px',
  cursor: disabled ? 'not-allowed' : 'pointer',
  width: '100%',
  marginTop: '10px',
  transition: 'all 0.3s',
});

const reviewButtonStyle: React.CSSProperties = {
  backgroundColor: 'transparent',
  color: '#00ff9f',
  border: '2px solid #00ff9f',
  padding: '8px 15px',
  fontFamily: 'monospace',
  fontSize: '18px',
  cursor: 'pointer',
  marginTop: '10px',
  width: '100%',
  transition: 'all 0.3s',
};

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  price,
  isDuocUser,
  ratingData,
  onAddToCart,
  onViewReviews,
}) => {
  return (
    <div style={cardStyle}>
      <div style={categoryStyle}>[{product.category}]</div>

      <img src={product.image} alt={product.name} style={imageStyle} />

      <h4 style={titleStyle}>{product.name}</h4>

      {ratingData && ratingData.count > 0 ? (
        <div style={ratingContainerStyle}>
          <span style={starsStyle}>
          {getStarsHTML(parseFloat(ratingData.average))}
          </span>
          <span style={{ color: '#00ff9f', opacity: 0.7 }}>
            ({ratingData.count} reseñas)
          </span>
        </div>
      ) : (
        <div style={{ color: '#00ff9f', opacity: 0.7, margin: '10px 0' }}>
          Sin reseñas aún
        </div>
      )}


      <p style={descriptionStyle}>{product.description}</p>

      <div style={priceStyle}>${price.toLocaleString('es-CL')}</div>

      {isDuocUser && (
        <span style={{ color: '#00ff9f', fontSize: '14px' }}>
          PRECIO CON DESCUENTO DUOC
        </span>
      )}

      {product.stock < 10 && (
        <div style={{ color: '#ff9f00', fontSize: '14px', marginTop: '5px' }}>
          ¡Solo quedan {product.stock} unidades!
        </div>
      )}

      <button
        onClick={() => onAddToCart(product.code)}
        disabled={product.stock === 0}
        style={getButtonStyle(product.stock === 0)}
      >
        {product.stock === 0 ? 'SIN STOCK' : 'AGREGAR AL CARRITO'}
      </button>

      <button onClick={() => onViewReviews(product.code)} style={reviewButtonStyle}>
        VER RESEÑAS ({ratingData.count})
      </button>
    </div>
  );
};