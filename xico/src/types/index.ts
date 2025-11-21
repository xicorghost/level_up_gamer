//Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
// ===== PRODUCT =====
export interface Product {
  code: string;
  category: string;
  name: string;
  price: number;
  description: string;
  image: string;
  stock: number;
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
  name: string;
  email: string;
  age?: number;
  isDuoc: boolean;
  points: number;
  level: number;
  referralCode: string;
  isAdmin?: boolean;
}

// ===== CART =====
// Usaremos la versión que NO extiende Product,
// porque tu código necesita item.product.<campo>
export interface CartItem {
  product: Product;
  quantity: number;
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

// ===== SECTIONS =====
export type Section =
  | 'home'
  | 'products'
  | 'cart'
  | 'profile'
  | 'community';

export type AdminSection =
  | 'products'
  | 'users'
  | 'orders'
  | 'stats';
