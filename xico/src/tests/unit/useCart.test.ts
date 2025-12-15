// src/tests/unit/useCart.test.ts

import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useCart } from '../../hooks/useCart'; // Ajusta la ruta si es necesario
import type { Product, UserData } from '../../types/index';

// --- Mocks de Datos ---
const mockProduct1: Product = {
    code: 'G001', category: 'Teclados', name: 'Teclado Mecánico RGB',
    price: 50000, description: 'Teclado rápido', image: 'img/g001.png', stock: 10,
};

const mockProduct2: Product = {
    code: 'M002', category: 'Mouse', name: 'Mouse Óptico Inalámbrico',
    price: 25000, description: 'Mouse ligero', image: 'img/m002.png', stock: 5,
};

const mockUserDuoc: UserData = {
    name: 'Juan Duoc', email: 'juan@duoc.cl', isDuoc: true, points: 100, level: 1, referralCode: 'DUOC',
};

const mockUserStandard: UserData = {
    name: 'Pedro Cliente', email: 'pedro@cliente.cl', isDuoc: false, points: 0, level: 0, referralCode: 'STD',
};

// ====================================================================
//                          PRUEBAS UNITARIAS
// ====================================================================

describe('useCart Unit Tests', () => {

    // ----------------------------------------
    // 1. Prueba de addToCart (NO FALLA, MANTENER)
    // ----------------------------------------
    it('1. Agrega un ítem al carrito o incrementa la cantidad si ya existe', () => {
        const { result } = renderHook(() => useCart());

        act(() => {
            result.current.addToCart(mockProduct1);
        });
        expect(result.current.cart.length).toBe(1);
        expect(result.current.cart[0].quantity).toBe(1);

        act(() => {
            result.current.addToCart(mockProduct1);
        });
        expect(result.current.cart.length).toBe(1);
        expect(result.current.cart[0].quantity).toBe(2);

        act(() => {
            result.current.addToCart(mockProduct2);
        });
        expect(result.current.cart.length).toBe(2);
    });

    // ----------------------------------------
    // 2. Prueba de removeFromCart y clearCart (CORRECCIÓN V3)
    // ----------------------------------------
    it('2. Remueve un ítem por índice y limpia todo el carrito', () => {
        const { result } = renderHook(() => useCart());

        // Inicializar el carrito: AGREGAR P1
        act(() => {
            result.current.addToCart(mockProduct1); // Index 0
        });
        // AGREGAR P2
        act(() => {
            result.current.addToCart(mockProduct2); // Index 1
        });

        // Ahora el estado DEBE ser 2
        expect(result.current.cart.length).toBe(2);

        // Remover el primer ítem (Index 0)
        act(() => {
            result.current.removeFromCart(0);
        });
        expect(result.current.cart.length).toBe(1);
        expect(result.current.cart[0].product.code).toBe(mockProduct2.code);

        // Limpiar todo el carrito
        act(() => {
            result.current.clearCart();
        });
        expect(result.current.cart.length).toBe(0);
    });

    // ----------------------------------------
    // 3. Prueba de updateQuantity (NO FALLA, MANTENER)
    // ----------------------------------------
    it('3. Actualiza la cantidad de un ítem o lo remueve si la cantidad es <= 0', () => {
        const { result } = renderHook(() => useCart());

        act(() => {
            result.current.addToCart(mockProduct1);
        });
        expect(result.current.cart[0].quantity).toBe(1);

        act(() => {
            result.current.updateQuantity(0, 5);
        });
        expect(result.current.cart[0].quantity).toBe(5);

        act(() => {
            result.current.updateQuantity(0, 0);
        });
        expect(result.current.cart.length).toBe(0);
    });

    // ----------------------------------------
    // 4. Prueba de getCartCount (CORRECCIÓN V3)
    // ----------------------------------------
    it('4. Calcula correctamente el número total de ítems (cantidad)', () => {
        const { result } = renderHook(() => useCart());

        // P1 x2
        act(() => { result.current.addToCart(mockProduct1); });
        act(() => { result.current.addToCart(mockProduct1); });

        // P2 x1
        act(() => { result.current.addToCart(mockProduct2); });

        // Total: 2 + 1 = 3
        expect(result.current.getCartCount()).toBe(3);
    });

    // ----------------------------------------
    // 5. Prueba de getCartTotal (CORRECCIÓN V3)
    // ----------------------------------------
    it('5. Calcula el total correctamente, aplicando 20% de descuento DUOC si aplica', () => {
        const { result } = renderHook(() => useCart());

        // Inicializar con (50k*2) + (25k*1). Total Base = $125.000
        // P1 x2
        act(() => { result.current.addToCart(mockProduct1); });
        act(() => { result.current.addToCart(mockProduct1); });
        // P2 x1
        act(() => { result.current.addToCart(mockProduct2); });

        // Caso A: Usuario Estándar (Total Base)
        const totalStandard = result.current.getCartTotal(mockUserStandard);
        expect(totalStandard).toBe(125000);

        // Caso B: Usuario DUOC (Total con DTO 20% = 100.000)
        const totalDuoc = result.current.getCartTotal(mockUserDuoc);
        expect(totalDuoc).toBe(100000);

        // Caso C: Usuario Nulo (Total Base)
        const totalNullUser = result.current.getCartTotal(null);
        expect(totalNullUser).toBe(125000);
    });
});