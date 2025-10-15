import { Injectable, computed, signal } from '@angular/core';
import { Product } from '../models/product';

/**
 * CartService
 * -------------
 * Mantiene en memoria la lista de productos del carrito usando Signals.
 * Más adelante lo conectaremos con backend (Spring) o localStorage.
 */
@Injectable({ providedIn: 'root' })
export class CartService {

  // Estado reactivo: lista de ítems (producto + cantidad)
  private _items = signal<{ id: string; product: Product; qty: number }[]>([]);

  // Lectura pública (solo lectura)
  items = this._items.asReadonly();

  // Total calculado automáticamente cuando cambia items
  total = computed(() =>
    this._items().reduce((sum, i) => sum + i.product.price * i.qty, 0)
  );

  /** Agregar un producto al carrito */
  add(item: { id: string; product: Product; qty: number }) {
    const existing = this._items().find(i => i.product.id === item.product.id);

    if (existing) {
      // Si ya existe, actualizamos cantidad
      this._items.set(
        this._items().map(i =>
          i.product.id === item.product.id ? { ...i, qty: i.qty + item.qty } : i
        )
      );
    } else {
      // Si es nuevo, lo agregamos
      this._items.set([...this._items(), item]);
    }
  }

  /** Eliminar un ítem por ID */
  remove(id: string) {
    this._items.set(this._items().filter(i => i.id !== id));
  }

  /** Vaciar el carrito */
  clear() {
    this._items.set([]);
  }
}
