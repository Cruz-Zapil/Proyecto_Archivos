import { Injectable, signal } from '@angular/core';
import { MOCK_PRODUCTS } from './mock-data';
import { Product } from '../core/models/product';

/**
 * MockApiService emula respuestas de backend.
 * Más adelante lo sustituiremos por HttpService con endpoints reales.
 */
@Injectable({ providedIn: 'root' })
export class MockApiService {
  // Estado local con Signals para poder reaccionar a cambios fácilmente.
  private _products = signal<Product[]>(MOCK_PRODUCTS);

  /** Lista con filtro simple por nombre */
  listProducts(query = ''): Product[] {
    const q = query.toLowerCase().trim();
    if (!q) return this._products();
    return this._products().filter(p => p.name.toLowerCase().includes(q));
  }

  /** Obtener un producto por id */
  getProduct(id: string): Product | null {
    return this._products().find(p => p.id === id) ?? null;
  }
}
