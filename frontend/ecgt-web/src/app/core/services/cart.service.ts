import { Injectable, computed, signal, inject, Injector } from '@angular/core';
import { Product } from '../models/product';
import { HttpService } from './http.service';
import { AuthService } from './auth.service';

/**
 * CartService (v5)
 * ----------------
 *  Mantiene el carrito en memoria.
 *  Carga desde BD al iniciar sesión.
 *  Guarda en BD al cerrar sesión o al finalizar checkout.
 */

export interface CartItemDTO {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
}

export interface CartResponse {
  cartId: string;
  items: CartItemDTO[];
}

export interface CartItem {
  product: Product;
  qty: number;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private http = inject(HttpService);
  private injector = inject(Injector);

  private get auth(): AuthService {
    return this.injector.get(AuthService);
  }

  /** Estado reactivo (solo memoria) */
  private _items = signal<CartItem[]>([]);
  items = this._items.asReadonly();

  total = computed(() =>
    this._items().reduce((sum, i) => sum + (i.product.price ?? 0) * i.qty, 0)
  );

  /**  Cargar carrito del backend (si existe) */
  loadFromServer(): void {
    const user = this.auth.user();
    if (!user) return;

    this.http.get<CartResponse>(`/cart/${user.id}`).subscribe({
      next: (res) => {
        const mapped = res.items.map((i) => ({
          product: {
            id: i.productId,
            name: i.productName,
            price: i.price,
            description: '',
            stock: 0,
            condition: 'NEW',
          } as Product,
          qty: i.quantity,
        }));
        this._items.set(mapped);
      },
      error: () => this._items.set([]),
    });
  }


  add(product: Product, qty: number): void {
  const user = this.auth.user();

  if (!user) {
    // --- sin sesión → agregar localmente ---
    const current = this._items();
    const existing = current.find(i => i.product.id === product.id);
    if (existing) existing.qty += qty;
    else current.push({ product, qty });
    this._items.set([...current]);
    return;
  }

  // --- con sesión → persistir en backend ---
  this.http
    .post<CartResponse>(`/cart/${user.id}`, { productId: product.id, quantity: qty })
    .subscribe({
      next: res => {
        // usar respuesta del backend en vez de forzar un GET inmediato
        const mapped = res.items.map(i => ({
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
      error: err => console.error('❌ Error al agregar al carrito', err)
    });
}





  /**  Actualizar cantidad (en memoria) */
  update(productId: string, qty: number): void {
    this._items.set(
      this._items().map((i) => (i.product.id === productId ? { ...i, qty } : i))
    );
  }

  /** ❌ Eliminar producto (en memoria) */
  remove(productId: string): void {
    this._items.set(this._items().filter((i) => i.product.id !== productId));
  }

  /** 🧹 Vaciar carrito (en memoria y backend) */
  clear(): void {
    const user = this.auth.user();
    if (user) {
      this.http.delete(`/cart/${user.id}`).subscribe();
    }
    this._items.set([]);
  }

  /**  Guardar carrito actual en backend (cuando cierre sesión o checkout) */
  saveToServer(): void {
    const user = this.auth.user();
    if (!user) return;

    const payload = {
      userId: user.id,
      items: this._items().map((i) => ({
        productId: i.product.id,
        quantity: i.qty,
      })),
    };

    this.http.post(`/cart/${user.id}/save`, payload).subscribe({
      next: () => console.log('🗂️ Carrito guardado en servidor'),
      error: (err) => console.error('Error guardando carrito', err),
    });
  }

  /**  Sincronizar al iniciar sesión */
  /**  Sincronizar al iniciar sesión */
  syncOnLogin(): void {
    const localItems = this._items();
    const user = this.auth.user();
    if (!user) return;

    if (localItems.length > 0) {
      //  Guardamos temporalmente los items locales en backend
      const payload = {
        userId: user.id,
        items: localItems.map((i) => ({
          productId: i.product.id,
          quantity: i.qty,
        })),
      };

      this.http.post(`/cart/${user.id}/save`, payload).subscribe({
        next: () => this.loadFromServer(),
        error: (err) => console.error('Error sincronizando carrito local', err),
      });
    } else {
      this.loadFromServer();
    }
  }

  /**  Guardar y limpiar al cerrar sesión */
  syncOnLogout(): void {
    this.saveToServer();
    this._items.set([]);
  }
}
