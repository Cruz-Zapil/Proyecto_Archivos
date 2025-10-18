/**
 * Orden models
 
 * Define las entidades de un pedido (Order, OrderItem) y sus estados.
 * Permanente: estos modelos se usarán contra el backend Spring.
 */

import { Product } from './product';

export type OrderStatus = 'IN_PROGRESS' | 'DELIVERED';


export interface OrderItem {
  product: Product;
  qty: number;       // cantidad pedida
  price: number;     // precio unitario al momento de la compra
}



export interface Order {
  id: string;
  orderNumber: string;          // número visible para el cliente
  customerName: string;         // nombre del comprador (simplificado)
  items: OrderItem[];
  total: number;                // total calculado del pedido
  status: OrderStatus;          // IN_PROGRESS | DELIVERED
  placedAt: string;             // fecha/hora de compra (ISO)
  deliveryDate: string;         // fecha estimada de entrega (ISO)
  deliveredAt?: string;         // fecha real de entrega (si aplica)
  address?: string;             // dirección de entrega (si aplica)
}
