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
    return this.products.length < before;
  }

}
