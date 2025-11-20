// src/hooks/useAlert.ts
import { useState } from 'react';
import type { AlertData } from '../types';

export const useAlert = () => {
  const [alertData, setAlertData] = useState<AlertData | null>(null);

  const showAlert = (title: string, message: string) => {
    setAlertData({ title, message });
  };

  return { alertData, showAlert, setAlertData };
};
