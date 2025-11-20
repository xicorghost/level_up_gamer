// src/services/products.service.ts

import type { Product } from '../types';


export const PRODUCTS: Product[] = [
  {
    code: 'LL001',
    category: 'Random',
    name: 'Código Aleatorio De Steam',
    price: 29990,
    description: 'Un código único con una combinación de letras y números que sirve para activar y desbloquear un juego o software en tu cuenta de Steam.',
    image: '/assets/cat_weed.png',
    stock: 50,
  },
  {
    code: 'JM002',
    category: 'Juegos de Mesa',
    name: 'Monopoly',
    price: 24990,
    description: 'Un juego de mesa en el que los jugadores compran, venden e intercambian propiedades inmobiliarias.',
    image: '/assets/monopoly.png',
    stock: 30,
  },
  {
    code: 'AC001',
    category: 'Accesorios',
    name: 'Controlador Inalámbrico Xbox Series X',
    price: 59990,
    description: 'Ofrece una experiencia de juego cómoda con botones mapeables y respuesta táctil mejorada.',
    image: '/assets/control.png',
    stock: 25,
  },
  {
    code: 'AC002',
    category: 'Accesorios',
    name: 'Auriculares Gamer HyperX Cloud II',
    price: 79990,
    description: 'Sonido envolvente de calidad con micrófono desmontable y almohadillas de espuma viscoelástica.',
    image: '/assets/audifonos.png',
    stock: 20,
  },
  {
    code: 'CO001',
    category: 'Consolas',
    name: 'PlayStation 5',
    price: 549990,
    description: 'Consola de última generación de Sony con gráficos impresionantes y tiempos de carga ultrarrápidos.',
    image: '/assets/play.png',
    stock: 10,
  },
  {
    code: 'CG001',
    category: 'Computadores Gamers',
    name: 'PC Gamer ASUS ROG Strix',
    price: 1299990,
    description: 'Potente equipo diseñado para gamers exigentes con los últimos componentes.',
    image: '/assets/pc_gamer.png',
    stock: 5,
  },
  {
    code: 'SG001',
    category: 'Sillas Gamers',
    name: 'Silla Gamer Secretlab Titan',
    price: 349990,
    description: 'Diseñada para el máximo confort con soporte ergonómico y personalización ajustable.',
    image: '/assets/silla_gamer.png',
    stock: 15,
  },
  {
    code: 'MS001',
    category: 'Mouse',
    name: 'Mouse Gamer Logitech G502 HERO',
    price: 49990,
    description: 'Sensor de alta precisión y botones personalizables para control preciso.',
    image: '/assets/mauu.png',
    stock: 40,
  },
];

export const CATEGORIES = [
  'Todas',
  'Juegos de Mesa',
  'Random',
  'Accesorios',
  'Consolas',
  'Computadores Gamers',
  'Sillas Gamers',
  'Mouse',
  'Mousepad',
  'Poleras Personalizadas',
];

export const productService = {
  getAllProducts: (): Product[] => {
    return PRODUCTS;
  },

  getProductByCode: (code: string): Product | undefined => {
    return PRODUCTS.find((p) => p.code === code);
  },

  getProductsByCategory: (category: string): Product[] => {
    if (category === 'Todas' || category === 'all') {
      return PRODUCTS;
    }
    return PRODUCTS.filter((p) => p.category === category);
  },

  searchProducts: (query: string): Product[] => {
    const lowerQuery = query.toLowerCase();
    return PRODUCTS.filter((p) =>
      p.name.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery)
    );
  },

  filterProducts: (category: string, searchQuery: string): Product[] => {
    let filtered = PRODUCTS;

    if (category !== 'all' && category !== 'Todas') {
      filtered = filtered.filter((p) => p.category === category);
    }

    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(lowerQuery) ||
        p.description.toLowerCase().includes(lowerQuery)
      );
    }

    return filtered;
  },
};