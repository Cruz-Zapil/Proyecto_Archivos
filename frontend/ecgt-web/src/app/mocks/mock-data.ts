import { Product } from '../core/models/product';

/**
 * Dataset de prueba: pocos ítems para validar UI y flujo.
 * Puedes ajustar precios/stock a gusto.
 */

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Auriculares Pro',
    description: 'BT 5.3, ANC',
    price: 599.99,
    stock: 12,
    condition: 'NEW',              // <— ahora válido por el tipo
    status: 'APPROVED',
    imageUrl: ''
  },
  {
    id: 'p2',
    name: 'Laptop 14"',
    description: '8GB / 256GB SSD',
    price: 3999.0,
    stock: 5,
    condition: 'USED',
    status: 'APPROVED',
    imageUrl: ''
  },
  {
    id: 'p3',
    name: 'Smartwatch',
    description: 'Resistente al agua',
    price: 899.0,
    stock: 20,
    condition: 'NEW',
    status: 'APPROVED',
    imageUrl: ''
  }
];
