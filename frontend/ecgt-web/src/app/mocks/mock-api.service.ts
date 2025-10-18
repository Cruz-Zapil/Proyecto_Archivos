import { Injectable, signal } from '@angular/core';
import { MOCK_PRODUCTS } from './mock-data';
import { Product } from '../core/models/product';
import { Order } from '../core/models/orden';

/**
 * MockApiService emula respuestas de backend.
 * Más adelante lo sustituiremos por HttpService con endpoints reales.
 */
@Injectable({ providedIn: 'root' })
export class MockApiService {
  
  // Estado local con Signals para poder reaccionar a cambios fácilmente.
  private products = signal<Product[]>(MOCK_PRODUCTS);



  /** Lista con filtro simple por nombre */
  listProducts(query = ''): Product[] {
    const q = query.toLowerCase().trim();
    if (!q) return this.products();
    return this.products().filter(p => p.name.toLowerCase().includes(q));
  }

  /** Obtener un producto por id */
  getProduct(id: string): Product | undefined {
    return this.products().find(p => p.id === id);
  }

    /**
   * Agrega un nuevo producto.
   * Simula que el producto queda pendiente de revisión.
   */
  addProduct(product: Product): Product {
    const newProduct: Product = {
      ...product,
      id: crypto.randomUUID(),
      status: 'PENDING_REVIEW' as Product['status'], // al crear se manda a revisión
    };
    // Usar la API de Signals para actualizar el array
    this.products.update(list => [...list, newProduct]);
    return newProduct;
  }

  /**
   * Actualiza un producto existente por id.
   * Simula que al modificar, vuelve a quedar en revisión.
   */
  updateProduct(product: Product): Product | null {
    const products = this.products();
    const index = products.findIndex(p => p.id === product.id);
    if (index !== -1) {
      const updatedProduct: Product = {
        ...product,
        status: 'PENDING_REVIEW' as Product['status']
      };
      const next = products.slice();
      next[index] = updatedProduct;
      this.products.set(next);
      return updatedProduct;
    }
    return null;
  }

    /**  Elimina producto en memoria */
  deleteProduct(id: string): boolean {
    const before = this.products().length;
    this.products.set(this.products().filter(p => p.id !== id));
    return this.products().length < before;
  }


  // ---------- Pedidos (nuevo: logística)
  private orders: Order[] = [
    {
      id: 'o1',
      orderNumber: 'EC-2025-0001',
      customerName: 'María López',
      items: [
        { product: this.products()[0], qty: 1, price: this.products()[0].price },
        { product: this.products()[2], qty: 2, price: this.products()[2].price }
      ],
      total: this.products()[0].price * 1 + this.products()[2].price * 2,
      status: 'IN_PROGRESS',
      placedAt: new Date(Date.now() - 2 * 24 * 3600 * 1000).toISOString(), // hace 2 días
      deliveryDate: new Date(Date.now() + 3 * 24 * 3600 * 1000).toISOString(), // +3 días
      address: 'Zona 1, Quetzaltenango'
    },
    {
      id: 'o2',
      orderNumber: 'EC-2025-0002',
      customerName: 'José Pérez',
      items: [
        { product: this.products()[1], qty: 1, price: this.products()[1].price }
      ],
      total: this.products()[1].price * 1,
      status: 'IN_PROGRESS',
      placedAt: new Date(Date.now() - 1 * 24 * 3600 * 1000).toISOString(), // hace 1 día
      deliveryDate: new Date(Date.now() + 2 * 24 * 3600 * 1000).toISOString(), // +2 días
      address: 'Zona 3, Quetzaltenango'
    }
  ];

  /** Lista pedidos en curso (logística) */
  listOrdersInProgress(): Order[] {
    return this.orders.filter(o => o.status === 'IN_PROGRESS');
  }

  /** Cambia la fecha estimada de entrega (ISO) */
  updateOrderDeliveryDate(id: string, isoDate: string): Order | undefined {
    const idx = this.orders.findIndex(o => o.id === id);
    if (idx === -1) return undefined;
    this.orders[idx] = { ...this.orders[idx], deliveryDate: isoDate };
    return this.orders[idx];
  }

  /** Marca un pedido como entregado (usa fecha actual) */
  markOrderDelivered(id: string): Order | undefined {
    const idx = this.orders.findIndex(o => o.id === id);
    if (idx === -1) return undefined;
    const now = new Date().toISOString();
    this.orders[idx] = {
      ...this.orders[idx],
      status: 'DELIVERED',
      deliveredAt: now
    };
    return this.orders[idx];
  }

}
