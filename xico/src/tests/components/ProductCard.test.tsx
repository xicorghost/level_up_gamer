// src/tests/components/ProductCard.test.tsx

import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ProductCard } from '../../components/ProductCard';
import type { Product, RatingData } from '../../types/index';

describe('ProductCard Component', () => {

  const baseProduct: Product = {
    code: 'P001',
    category: 'Teclados',
    name: 'HyperX Alloy Origins',
    price: 59990,
    description: 'Teclado mecánico profesional.',
    image: 'keyboard.png',
    stock: 10,
  };

  const ratingData: RatingData = {
    average: '4',
    count: 12,
  };

  const mockAddToCart = vi.fn();
  const mockViewReviews = vi.fn();

  // ----------------------------------------
  // 1) Renderización básica
  // ----------------------------------------
  it('Renderiza correctamente la información básica del producto', () => {
    render(
      <ProductCard
        product={baseProduct}
        price={59990}
        isDuocUser={false}
        ratingData={ratingData}
        onAddToCart={mockAddToCart}
        onViewReviews={mockViewReviews}
      />
    );

    expect(screen.getByText(baseProduct.name)).toBeInTheDocument();
    expect(screen.getByText(`[${baseProduct.category}]`)).toBeInTheDocument();
    expect(screen.getByText(baseProduct.description)).toBeInTheDocument();
    expect(screen.getByText('$59.990')).toBeInTheDocument();
  });

  // ----------------------------------------
  // 2) Llamada a onAddToCart
  // ----------------------------------------
  it('Ejecuta onAddToCart al presionar AGREGAR AL CARRITO', () => {
    render(
      <ProductCard
        product={baseProduct}
        price={59990}
        isDuocUser={false}
        ratingData={ratingData}
        onAddToCart={mockAddToCart}
        onViewReviews={mockViewReviews}
      />
    );

    const btn = screen.getByRole('button', { name: /AGREGAR AL CARRITO/i });
    fireEvent.click(btn);

    expect(mockAddToCart).toHaveBeenCalledWith(baseProduct.code);
  });

  // ----------------------------------------
  // 3) Llamada a onViewReviews
  // ----------------------------------------
  it('Ejecuta onViewReviews al presionar VER RESEÑAS', () => {
    render(
      <ProductCard
        product={baseProduct}
        price={59990}
        isDuocUser={false}
        ratingData={ratingData}
        onAddToCart={mockAddToCart}
        onViewReviews={mockViewReviews}
      />
    );

    const btn = screen.getByRole('button', { name: /VER RESEÑAS/i });
    fireEvent.click(btn);

    expect(mockViewReviews).toHaveBeenCalledWith(baseProduct.code);
  });

  // ----------------------------------------
  // 4) Detecta descuento DUOC
  // ----------------------------------------
  it('Muestra el texto de descuento DUOC cuando isDuocUser = true', () => {
    render(
      <ProductCard
        product={baseProduct}
        price={49990}
        isDuocUser={true}
        ratingData={ratingData}
        onAddToCart={mockAddToCart}
        onViewReviews={mockViewReviews}
      />
    );

    expect(
      screen.getByText(/PRECIO CON DESCUENTO DUOC/i)
    ).toBeInTheDocument();
  });

  // ----------------------------------------
  // 5) Muestra reseñas cuando existen
  // ----------------------------------------
  it('Muestra estrellas y cantidad de reseñas cuando ratingData.count > 0', () => {
    render(
      <ProductCard
        product={baseProduct}
        price={59990}
        isDuocUser={false}
        ratingData={{ average: '4', count: 12 }}
        onAddToCart={mockAddToCart}
        onViewReviews={mockViewReviews}
      />
    );

    expect(screen.getByText('(12 reseñas)')).toBeInTheDocument();
  });

  // ----------------------------------------
  // 6) Muestra mensaje "Sin reseñas" si count = 0
  // ----------------------------------------
  it('Muestra "Sin reseñas aún" cuando no hay reseñas', () => {
    render(
      <ProductCard
        product={baseProduct}
        price={59990}
        isDuocUser={false}
        ratingData={{ average: '0', count: 0 }}
        onAddToCart={mockAddToCart}
        onViewReviews={mockViewReviews}
      />
    );

    expect(screen.getByText(/Sin reseñas aún/i)).toBeInTheDocument();
  });

  // ----------------------------------------
  // 7) Si stock = 0, botón deshabilitado
  // ----------------------------------------
  it('Deshabilita el botón y muestra SIN STOCK cuando stock = 0', () => {
    const productWithoutStock = { ...baseProduct, stock: 0 };

    render(
      <ProductCard
        product={productWithoutStock}
        price={59990}
        isDuocUser={false}
        ratingData={ratingData}
        onAddToCart={mockAddToCart}
        onViewReviews={mockViewReviews}
      />
    );

    const btn = screen.getByRole('button', { name: /SIN STOCK/i });

    expect(btn).toBeDisabled();
  });
});
