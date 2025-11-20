// src/components/ReviewModal.tsx

import React, { useState } from 'react';
import type { Product, Review, RatingData, UserData } from '../types';

interface ReviewModalProps {
  isOpen: boolean;
  product: Product | null;
  currentUser: UserData | null;
  purchasedProducts: string[];
  reviews: Review[];
  ratingData: RatingData | null;
  hasUserReviewed: boolean;
  onClose: () => void;
  onSubmitReview: (rating: number, text: string) => void;
}

const getStarsHTML = (rating: number): string => {
  const fullStars = Math.floor(rating);
  return '★'.repeat(fullStars) + '☆'.repeat(5 - fullStars);
};

export const ReviewModal: React.FC<ReviewModalProps> = ({
  isOpen,
  product,
  currentUser,
  purchasedProducts,
  reviews,
  ratingData,
  hasUserReviewed,
  onClose,
  onSubmitReview,
}) => {
  const [selectedRating, setSelectedRating] = useState(0);
  const [reviewText, setReviewText] = useState('');

  if (!isOpen || !product) return null;

  const canReview =
    currentUser &&
    purchasedProducts.includes(product.code) &&
    !hasUserReviewed;

  const handleSubmit = () => {
    if (selectedRating === 0) {
      alert('Por favor selecciona una calificación de 1 a 5 estrellas.');
      return;
    }
    if (reviewText.trim().length < 10) {
      alert('Por favor escribe una reseña más detallada (mínimo 10 caracteres).');
      return;
    }
    onSubmitReview(selectedRating, reviewText);
    setSelectedRating(0);
    setReviewText('');
  };

  return (
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
        overflow: 'auto',
      }}
      onClick={onClose}
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
          boxShadow: '0 0 30px rgba(0, 255, 159, 0.5)',
          position: 'relative',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cerrar */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '10px',
            right: '15px',
            fontSize: '35px',
            color: '#00ff9f',
            cursor: 'pointer',
            border: 'none',
            background: 'none',
          }}
        >
          ×
        </button>

        {/* Título */}
        <h3
          style={{
            color: '#00ff9f',
            fontSize: '28px',
            marginBottom: '20px',
            textShadow: '0 0 8px #00ff9f',
          }}
        >
          RESEÑAS: {product.name}
        </h3>

        {/* Rating promedio */}
        {ratingData && ratingData.count > 0 ? (
          <div
            style={{
              textAlign: 'center',
              padding: '20px',
              backgroundColor: '#0a0a0a',
              border: '2px solid #00ff9f',
              marginBottom: '20px',
            }}
          >
            <div
              style={{
                fontSize: '48px',
                color: '#FFD700',
                textShadow: '0 0 15px #FFD700',
              }}
            >
              {getStarsHTML(Number(ratingData?.average ?? 0))}
            </div>

            <div
              style={{
                fontSize: '32px',
                color: '#00ff9f',
                marginTop: '10px',
              }}
            >
              {ratingData.average} / 5.0
            </div>

            <div
              style={{
                color: '#00ff9f',
                opacity: 0.7,
                marginTop: '5px',
              }}
            >
              Basado en {ratingData.count}{' '}
              {ratingData.count === 1 ? 'reseña' : 'reseñas'}
            </div>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '30px', opacity: 0.6 }}>
            <p>Este producto aún no tiene reseñas.</p>
            <p>¡Sé el primero en dejar una opinión!</p>
          </div>
        )}

        {/* Sección añadir reseña */}
        {canReview ? (
          <div>
            <h4 style={{ color: '#00ff9f', margin: '20px 0' }}>
              DEJA TU RESEÑA
            </h4>

            {/* Estrellas */}
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '10px', color: '#00ff9f' }}>
                CALIFICACIÓN:
              </label>
              <div style={{ display: 'flex', gap: '10px', fontSize: '40px' }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    onClick={() => setSelectedRating(star)}
                    style={{
                      cursor: 'pointer',
                      color: selectedRating >= star ? '#FFD700' : '#333',
                      textShadow:
                        selectedRating >= star
                          ? '0 0 15px #FFD700'
                          : '0 0 5px #00ff9f',
                      transition: 'all 0.3s',
                    }}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>

            {/* Texto */}
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              rows={4}
              style={{
                width: '100%',
                padding: '10px',
                backgroundColor: '#0a0a0a',
                border: '2px solid #00ff9f',
                color: '#00ff9f',
                fontFamily: 'monospace',
                fontSize: '18px',
              }}
              placeholder="Comparte tu experiencia con este producto..."
            />

            <button
              onClick={handleSubmit}
              style={{
                backgroundColor: '#1a4d4d',
                color: '#00ff9f',
                border: '2px solid #00ff9f',
                padding: '12px 30px',
                fontFamily: 'monospace',
                fontSize: '22px',
                cursor: 'pointer',
                width: '100%',
                marginTop: '10px',
              }}
            >
              PUBLICAR RESEÑA
            </button>
          </div>
        ) : (
          <div
            style={{
              color: '#00ff9f',
              opacity: 0.7,
              textAlign: 'center',
              margin: '20px 0',
            }}
          >
            <p>
              {!currentUser
                ? 'Debes iniciar sesión y comprar el producto para dejar una reseña.'
                : !purchasedProducts.includes(product.code)
                ? 'Debes comprar este producto para poder dejar una reseña.'
                : 'Ya has dejado una reseña para este producto.'}
            </p>
          </div>
        )}

        {/* Lista de reseñas */}
        <div style={{ marginTop: '30px' }}>
          <h4 style={{ color: '#00ff9f', marginBottom: '15px' }}>
            OPINIONES DE LA COMUNIDAD
          </h4>

          <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
            {reviews.length > 0 ? (
              reviews
                .slice()
                .reverse()
                .map((review, index) => (
                  <div
                    key={index}
                    style={{
                      backgroundColor: '#0a0a0a',
                      border: '2px solid #00ff9f',
                      padding: '15px',
                      marginBottom: '15px',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: '10px',
                        flexWrap: 'wrap',
                      }}
                    >
                      <div>
                        <div
                          style={{
                            color: '#00ff9f',
                            fontSize: '20px',
                            fontWeight: 'bold',
                          }}
                        >
                          {review.userName}
                        </div>
                        <div
                          style={{
                            color: '#FFD700',
                            fontSize: '20px',
                          }}
                        >
                          {getStarsHTML(review.rating)}
                        </div>
                      </div>
                      <div
                        style={{
                          color: '#00ff9f',
                          opacity: 0.6,
                          fontSize: '16px',
                        }}
                      >
                        {review.date}
                      </div>
                    </div>
                    <div style={{ color: '#00ff9f', marginTop: '10px' }}>
                      {review.text}
                    </div>
                  </div>
                ))
            ) : (
              <div style={{ textAlign: 'center', padding: '30px', opacity: 0.6 }}>
                <p>No hay reseñas todavía.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
