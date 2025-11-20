// src/hooks/useAuth.ts

import { useState } from 'react';
import type { UserData } from '../types';

export const useAuth = () => {
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);

  const register = (
    name: string,
    email: string,
    age: number,
    referralCode?: string
  ): { success: boolean; message: string } => {
    if (age < 18) {
      return { success: false, message: 'Debes ser mayor de 18 años para registrarte.' };
    }

    const isDuoc = email.toLowerCase().includes('duoc');
    const newUser: UserData = {
      name,
      email,
      age,
      isDuoc,
      points: referralCode ? 100 : 0,
      level: 1,
      referralCode: 'LUG' + Math.random().toString(36).substr(2, 6).toUpperCase(),
    };

    setCurrentUser(newUser);

    return {
      success: true,
      message: referralCode
        ? '¡Código de referido aplicado!\nHas ganado 100 puntos LevelUp.'
        : isDuoc
        ? '¡Registro exitoso!\n¡Tienes un 20% de descuento de por vida!'
        : '¡Registro exitoso!\n¡Bienvenido a Level-Up Gamer!',
    };
  };

  const login = (email: string): { success: boolean; message: string } => {
    const demoUser: UserData = {
      name: 'Usuario Demo',
      email,
      isDuoc: email.toLowerCase().includes('duoc'),
      points: 500,
      level: 3,
      referralCode: 'LUGDEMO1',
    };

    setCurrentUser(demoUser);

    return {
      success: true,
      message: '¡Sesión iniciada correctamente!\nAhora puedes dejar reseñas en todos los productos.',
    };
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const updateUser = (updates: Partial<UserData>) => {
    if (currentUser) {
      setCurrentUser({ ...currentUser, ...updates });
    }
  };

  return {
    currentUser,
    register,
    login,
    logout,
    updateUser,
  };
};