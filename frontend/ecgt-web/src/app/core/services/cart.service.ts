import { Injectable, computed, signal, inject, Injector } from '@angular/core';
import { Product } from '../models/product';
import { HttpService } from './http.service';
import { AuthService } from './auth.service';

export interface CartItem {
  productId: string;
  product: Product;
  qty: number;
}

export interface CartResponse {
  cartId: string;
  items: {
    productId: string;
    productName: string;
    quantity: number;
    price: number;
  }[];
}

/**
 * CartService (v4)
 * ----------------
 * - Persiste el carrito en backend (tabla cart/cart_items).
 * - Sincroniza al iniciar sesión.
 * - Usa signals + lazy injection para evitar ciclos.
 */
@Injectable({ providedIn: 'root' })
export class CartService {
  private http = inject(HttpService);
  private injector = inject(Injector);

  private get auth(): AuthService {
    return this.injector.get(AuthService);
  }

  private _items = signal<CartItem[]>([]);
  items = this._items.asReadonly();

  total = computed(() =>
    this._items().reduce((sum, i) => sum + (i.product?.price ?? 0) * i.qty, 0)
  );

  /** 🔄 Cargar carrito desde backend */
  loadFromServer(): void {
    const user = this.auth.user();
    if (!user) return;

    this.http.get<CartResponse>(`/cart/${user.id}`).subscribe({
      next: res => {
        const mapped = res.items.map(i => ({
          productId: i.productId,
          product: {
            id: i.productId,
            name: i.productName,
            price: i.price,
            description: '',
            stock: 0,
            condition: 'NEW'
          } as Product,
          qty: i.quantity
        }));
        this._items.set(mapped);
      },
      error: () => this._items.set([])
    });
  }

  /** ➕ Agregar producto al carrito */
  add(product: Product, qty: number): void {
    const user = this.auth.user();
    if (!user) {
      alert('Debes iniciar sesión para agregar productos al carrito.');
      return;
    }

    this.http
      .post(`/cart/${user.id}`, {
        productId: product.id,
        quantity: qty
      })
      .subscribe({
        next: () => this.loadFromServer(),
        error: err => console.error('Error al agregar al carrito', err)
      });
  }

  /** 🔁 Actualizar cantidad de producto */
  update(productId: string, qty: number): void {
    const user = this.auth.user();
    if (!user) return;

    this.http
      .post(`/cart/${user.id}`, {
        productId,
        quantity: qty
      })
      .subscribe({
        next: () => this.loadFromServer(),
        error: err => console.error('Error al actualizar carrito', err)
      });
  }

  /** ❌ Eliminar producto */
  remove(productId: string): void {
    const user = this.auth.user();
    if (!user) return;

    this.http.delete(`/cart/${user.id}/item/${productId}`).subscribe({
      next: () => this.loadFromServer(),
      error: err => console.error('Error al eliminar producto', err)
    });
  }

  /** 🧹 Vaciar carrito */
  clear(): void {
    const user = this.auth.user();
    if (!user) return;

    this.http.delete(`/cart/${user.id}`).subscribe({
      next: () => this._items.set([]),
      error: err => console.error('Error al limpiar carrito', err)
    });
  }

  /** ⚙️ Sincronizar al iniciar sesión */
  syncFromBackend(): void {
    this.loadFromServer();
  }
}
