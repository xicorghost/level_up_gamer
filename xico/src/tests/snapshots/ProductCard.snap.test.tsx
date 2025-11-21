// tests/snapshots/ProductCard.snap.test.tsx

import React from 'react';
import renderer from 'react-test-renderer';
import { describe, it, expect, vi } from 'vitest';

// Ajusta la ruta a tu componente ProductCard y types
import { ProductCard } from '../../components/ProductCard'; 
import type { Product, RatingData } from '../../types/index';

// Mocks de datos del componente
const baseProduct: Product = {
  code: 'P001',
  category: 'Teclados',
  name: 'HyperX Alloy Origins',
  price: 59990,
  description: 'Teclado mecánico profesional.',
  image: 'keyboard.png',
  stock: 10,
};
const ratingData: RatingData = { average: '4', count: 12 };
const mockFn = vi.fn(); // Mock para las funciones que no usamos en snapshot

const defaultProps = {
  product: baseProduct,
  price: 59990,
  isDuocUser: false,
  ratingData: ratingData,
  onAddToCart: mockFn,
  onViewReviews: mockFn,
};

// ====================================================================
//                        PRUEBAS DE SNAPSHOT DEDICADAS
// ====================================================================

describe('ProductCard Snapshot Tests', () => {

  it('1. Snapshot: Renderizado estándar con stock y reseñas', () => {
    const tree = renderer
      .create(<ProductCard {...defaultProps} />)
      .toJSON();
      
    // Cuando ejecutes Vitest, el archivo .snap se guardará en 
    // `tests/snapshots/__snapshots__/ProductCard.snap.test.tsx.snap`
    expect(tree).toMatchSnapshot();
  });

  it('2. Snapshot: Renderizado con descuento Duoc activo', () => {
    const duocProps = { ...defaultProps, price: 47992, isDuocUser: true };
    
    const tree = renderer
      .create(<ProductCard {...duocProps} />)
      .toJSON();
      
    expect(tree).toMatchSnapshot();
  });

  it('3. Snapshot: Renderizado sin stock', () => {
    const noStockProduct = { ...baseProduct, stock: 0 };
    const noStockProps = { ...defaultProps, product: noStockProduct };

    const tree = renderer
      .create(<ProductCard {...noStockProps} />)
      .toJSON();
      
    expect(tree).toMatchSnapshot();
  });
});