// src/hooks/useReviews.ts

import { useState } from 'react';
import type { Review, RatingData } from '../types/index';

const INITIAL_REVIEWS: Record<string, Review[]> = {
  LL001: [
    {
      userName: 'GamerPro',
      userEmail: 'gamer@mail.com',
      rating: 5,
      text: 'Excelente código, obtuve un juego increíble. Totalmente recomendado.',
      date: '15/11/2025',
    },
    {
      userName: 'JugadorX',
      userEmail: 'jugador@mail.com',
      rating: 4,
      text: 'Buen servicio, llegó rápido el código.',
      date: '14/11/2025',
    },
  ],
  JM002: [
    {
      userName: 'BoardGamer',
      userEmail: 'board@mail.com',
      rating: 5,
      text: 'El clásico Monopoly, perfecto estado y llegó bien empaquetado.',
      date: '13/11/2025',
    },
  ],
  AC001: [
    {
      userName: 'XboxFan',
      userEmail: 'xbox@mail.com',
      rating: 5,
      text: 'Control original, funciona perfecto. La conectividad es excelente.',
      date: '14/11/2025',
    },
  ],
};

export const useReviews = () => {
  const [reviews, setReviews] = useState<Record<string, Review[]>>(INITIAL_REVIEWS);

  const addReview = (productCode: string, review: Review) => {
    setReviews({
      ...reviews,
      [productCode]: [...(reviews[productCode] || []), review],
    });
  };

  const getAverageRating = (productCode: string): RatingData => {
    const productReviews = reviews[productCode] || [];
    if (productReviews.length === 0) {
      return { average: '0', count: 0 };
    }

    const total = productReviews.reduce((sum, review) => sum + review.rating, 0);
    const average = total / productReviews.length;

    return {
      average: average.toFixed(1),
      count: productReviews.length,
    };
  };

  const hasUserReviewed = (productCode: string, userEmail: string): boolean => {
    const productReviews = reviews[productCode] || [];
    return productReviews.some((review) => review.userEmail === userEmail);
  };

  const getProductReviews = (productCode: string): Review[] => {
    return reviews[productCode] || [];
  };

  return {
    reviews,
    addReview,
    getAverageRating,
    hasUserReviewed,
    getProductReviews,
  };
};