// src/types.ts
export interface Product {
  code: string;
  category: string;
  name: string;
  price: number;
  description: string;
  image: string;
}

export interface Review {
  userName: string;
  userEmail: string;
  rating: number;
  text: string;
  date: string;
}

export interface UserData {
  name: string;
  email: string;
  age?: number;
  isDuoc: boolean;
  points: number;
  level: number;
  referralCode: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface AlertData {
  title: string;
  message: string;
}