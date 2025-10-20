import { Injectable, signal } from '@angular/core';
import { MOCK_PRODUCTS } from './mock-data';
import { Product } from '../core/models/product';
import { Order } from '../core/models/orden';
import { User } from '../core/models/user';

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
    return this.products().filter((p) => p.name.toLowerCase().includes(q));
  }

  /** Obtener un producto por id */
  getProduct(id: string): Product | undefined {
    return this.products().find((p) => p.id === id);
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
    this.products.update((list) => [...list, newProduct]);
    return newProduct;
  }

  /**
   * Actualiza un producto existente por id.
   * Simula que al modificar, vuelve a quedar en revisión.
   */
  updateProduct(product: Product): Product | null {
    const products = this.products();
    const index = products.findIndex((p) => p.id === product.id);
    if (index !== -1) {
      const updatedProduct: Product = {
        ...product,
        status: 'PENDING_REVIEW' as Product['status'],
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
    this.products.set(this.products().filter((p) => p.id !== id));
    return this.products().length < before;
  }

  // ---------- Pedidos (nuevo: logística)
  private orders: Order[] = [
    {
      id: 'o1',
      orderNumber: 'EC-2025-0001',
      customerName: 'María López',
      items: [
        {
          product: this.products()[0],
          qty: 1,
          price: this.products()[0].price,
        },
        {
          product: this.products()[2],
          qty: 2,
          price: this.products()[2].price,
        },
      ],
      total: this.products()[0].price * 1 + this.products()[2].price * 2,
      status: 'IN_PROGRESS',
      placedAt: new Date(Date.now() - 2 * 24 * 3600 * 1000).toISOString(), // hace 2 días
      deliveryDate: new Date(Date.now() + 3 * 24 * 3600 * 1000).toISOString(), // +3 días
      address: 'Zona 1, Quetzaltenango',
    },
    {
      id: 'o2',
      orderNumber: 'EC-2025-0002',
      customerName: 'José Pérez',
      items: [
        {
          product: this.products()[1],
          qty: 1,
          price: this.products()[1].price,
        },
      ],
      total: this.products()[1].price * 1,
      status: 'IN_PROGRESS',
      placedAt: new Date(Date.now() - 1 * 24 * 3600 * 1000).toISOString(), // hace 1 día
      deliveryDate: new Date(Date.now() + 2 * 24 * 3600 * 1000).toISOString(), // +2 días
      address: 'Zona 3, Quetzaltenango',
    },
  ];

  /** Lista pedidos en curso (logística) */
  listOrdersInProgress(): Order[] {
    return this.orders.filter((o) => o.status === 'IN_PROGRESS');
  }

  /** Cambia la fecha estimada de entrega (ISO) */
  updateOrderDeliveryDate(id: string, isoDate: string): Order | undefined {
    const idx = this.orders.findIndex((o) => o.id === id);
    if (idx === -1) return undefined;
    this.orders[idx] = { ...this.orders[idx], deliveryDate: isoDate };
    return this.orders[idx];
  }

  /** Marca un pedido como entregado (usa fecha actual) */
  markOrderDelivered(id: string): Order | undefined {
    const idx = this.orders.findIndex((o) => o.id === id);
    if (idx === -1) return undefined;
    const now = new Date().toISOString();
    this.orders[idx] = {
      ...this.orders[idx],
      status: 'DELIVERED',
      deliveredAt: now,
    };
    return this.orders[idx];
  }

  // ---------- Empleados (solo para admin)
  private employees: User[] = [
    {
      id: 'u-admin',
      name: 'Admin General',
      email: 'admin@demo.com',
      roles: ['ADMIN'],
      enabled: true,
    },
    {
      id: 'u-mod',
      name: 'Moderador 1',
      email: 'mod@demo.com',
      roles: ['MODERATOR'],
      enabled: true,
    },
    {
      id: 'u-log',
      name: 'Logística 1',
      email: 'log@demo.com',
      roles: ['LOGISTICS'],
      enabled: true,
    },
  ];

  /** Lista empleados (no incluye usuarios comunes) */
  listEmployees(): User[] {
    return this.employees;
  }

  /** Crea nuevo empleado */
  addEmployee(user: User): User {
    const newUser = { ...user, id: crypto.randomUUID(), activo: true };
    this.employees.push(newUser);
    return newUser;
  }

  /** Actualiza empleado existente */
  updateEmployee(user: User): User {
    const idx = this.employees.findIndex((u) => u.id === user.id);
    if (idx !== -1) this.employees[idx] = { ...user };
    return user;
  }

  /** Elimina (o desactiva) empleado */
  deleteEmployee(id: string): boolean {
    const before = this.employees.length;
    this.employees = this.employees.filter((u) => u.id !== id);
    return this.employees.length < before;
  }

  // ---------- Reportes del admin (mock con filtros por fecha)
  topProducts(range?: { start?: string; end?: string }) {
    // En mock, devolvemos datos estáticos (ignora rango por ahora)
    return [
      { productName: 'Auriculares Pro', totalSold: 45, totalRevenue: 27000 },
      { productName: 'Laptop 14"', totalSold: 30, totalRevenue: 120000 },
      { productName: 'Smartwatch', totalSold: 25, totalRevenue: 22475 },
      { productName: 'Monitor 27"', totalSold: 15, totalRevenue: 37500 },
      { productName: 'Teclado RGB', totalSold: 10, totalRevenue: 7500 },
    ];
  }

  topClientsByRevenue(range?: { start?: string; end?: string }) {
    return [
      { clientName: 'María López', value: 24000 },
      { clientName: 'José Pérez', value: 18000 },
      { clientName: 'Juan Gómez', value: 15000 },
      { clientName: 'Ana Morales', value: 13000 },
      { clientName: 'Luis Ramírez', value: 12000 },
    ];
  }

  topClientsBySales(range?: { start?: string; end?: string }) {
    return [
      { clientName: 'Carlos Soto', value: 40 },
      { clientName: 'Ana Morales', value: 35 },
      { clientName: 'Pablo Díaz', value: 28 },
      { clientName: 'Rosa López', value: 20 },
      { clientName: 'Juan Gómez', value: 18 },
    ];
  }

  topClientsByOrders(range?: { start?: string; end?: string }) {
    return [
      { clientName: 'María López', value: 25 },
      { clientName: 'José Pérez', value: 22 },
      { clientName: 'Carlos Soto', value: 18 },
    ];
  }

  topClientsByProducts(range?: { start?: string; end?: string }) {
    return [
      { clientName: 'Carlos Soto', value: 12 },
      { clientName: 'Ana Morales', value: 10 },
      { clientName: 'Pablo Díaz', value: 9 },
    ];
  }

  listSanctions(range?: { start?: string; end?: string }) {
    const data = [
      {
        user: 'Carlos Soto',
        reason: 'Incumplimiento de entrega',
        date: '2025-09-20T10:00:00Z',
        active: true,
      },
      {
        user: 'Ana Morales',
        reason: 'Producto prohibido',
        date: '2025-08-14T12:00:00Z',
        active: false,
      },
      {
        user: 'Juan Gómez',
        reason: 'Fraude',
        date: '2025-10-01T09:15:00Z',
        active: true,
      },
    ];
    return data.filter((s) => inRange(s.date, range?.start, range?.end));
  }

  listNotifications(range?: { start?: string; end?: string }) {
    const today = new Date();
    const days = (n: number) =>
      new Date(today.getTime() - n * 86400000).toISOString();
    const data = [
      {
        user: 'José Pérez',
        message: 'Tu pedido fue entregado.',
        sentAt: days(1),
      },
      {
        user: 'María López',
        message: 'Producto aprobado por moderador.',
        sentAt: days(2),
      },
      {
        user: 'Luis Ramírez',
        message: 'Tu pedido cambió a EN CURSO.',
        sentAt: days(4),
      },
      {
        user: 'Ana Morales',
        message: 'Tu pedido fue entregado.',
        sentAt: days(6),
      },
      {
        user: 'Pablo Díaz',
        message: 'Producto rechazado: información inválida',
        sentAt: days(10),
      },
    ];
    return data.filter((n) => inRange(n.sentAt, range?.start, range?.end));
  }

  


}

// Utilidad: ¿fecha ISO 'd' está dentro del rango?
function inRange(d: string, start?: string, end?: string): boolean {
  const t = new Date(d).getTime();
  if (start && t < new Date(start).getTime()) return false;
  if (end && t > new Date(end).getTime()) return false;
  return true;
}