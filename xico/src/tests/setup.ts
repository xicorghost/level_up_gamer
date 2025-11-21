import { expect, afterEach, vi } from 'vitest';
import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';

afterEach(() => {
  cleanup();
});

// Solo registra expect en el entorno Vitest
// Sin usar "global"
