//Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass

// src/types/admin/index.ts

export type Section = 'home' | 'products' | 'cart' | 'profile' | 'community' | 'checkout' | 'result';

// ===== PRODUCT =====
export interface Product {
  id?: number;
  code: string;
  category: string;
  name: string;
  price: number;
  description: string;
  image: string;
  stock: number;
}

export interface CartItem {
    product: Product;
    quantity: number;
}

// ===== REVIEWS =====
export interface Review {
  userName: string;
  userEmail: string;
  rating: number;
  text: string;
  date: string;
}

// ===== USER =====
export interface UserData {
  /*name: string;
  email: string;
  age?: number;
  isDuoc: boolean;
  points: number;
  level: number;
  referralCode: string;
  isAdmin?: boolean;*/
  nombre: string;
  apellido?: string;
  email: string;
  edad: number;

  calle?: string;
  region?: string;
  comuna?: string;
  departamento?: string;

  duoc?: boolean;
  descuento: number;
  puntos?: number;

  nivel: 'BRONZE' | 'SILVER' | 'GOLD';
  codigoReferido: string;

  purchasedProducts: string[];
}

export interface PurchaseItemDTO {
  productId: number; 
  quantity: number;
  price: number; // Precio unitario en el momento de la compra
}

// ===== CHECKOUT/DIRECCIÓN =====
export interface CheckoutData {
  nombre: string;
  apellido: string;
  correo: string;
  calle: string;
  departamento?: string;
  region: string;
  comuna: string;
  indicaciones?: string;
}

export interface CompraRequestDTO extends CheckoutData {
  // ID del usuario para buscar en Spring
  userEmail: string; 

  // Totales calculados en el frontend (o backend)
  subtotal: number;
  descuento: number; 
  total: number;

  // Detalles del pedido
  items: PurchaseItemDTO[]; 
}

// ===== CART =====
// Usaremos la versión que NO extiende Product,
// porque tu código necesita item.product.<campo>
export interface CartItem {
  product: Product;
  quantity: number;
}

export interface BoletaResult {
    id: number | string; // ID de la boleta
    fecha: string;
    usuarioEmail: string; // Para mostrar
    total: number;
    subtotal: number;
    descuento: number;
    estado: 'COMPLETADO' | 'FALLIDO' | string;
    
    // Datos de entrega para el resumen
    nombreCompleto: string;
    direccionEntrega: string; // Ej: Calle 123, Depto 4B, Comuna, Región
    
    // Detalle de los ítems comprados
    detalles: {
        productoNombre: string;
        cantidad: number;
        precioUnitario: number;
    }[];
}

// ===== ORDER =====
export interface Order {
  id: string;
  userEmail: string;
  userName?: string;   // <-- AGREGAR ESTO
  items: CartItem[];
  total: number;
  date: string;
  status?: 'pending' | 'completed' | 'cancelled';
  address?: string;
  region?: string;
  commune?: string;
}


// ===== ALERTS =====
export interface AlertData {
  title: string;
  message: string;
}

// ===== RATINGS =====
// Datos agregados de calificación por producto
export interface RatingData {
  average: string;   // Promedio ejemplo: 4.5
  count: number;     // Cantidad de reseñas
}


// ===== ADMIN =====
export interface AdminCredentials {
  email: string;
  password: string;
}

export const ADMIN_CREDENTIALS: AdminCredentials = {
  email: 'admin@levelupgamer.cl',
  password: 'Admin2025!',
};


export type AdminSection =
  | 'products'
  | 'users'
  | 'orders'
  | 'stats';
