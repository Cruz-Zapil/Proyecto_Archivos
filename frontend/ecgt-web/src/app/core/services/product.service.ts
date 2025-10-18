import { Injectable, inject } from '@angular/core';
import { HttpService } from './http.service';
import { MockApiService } from '../../mocks/mock-api.service';
import { Product } from '../models/product';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';

/**
 * Servicio de productos

 * Este servicio se encarga de realizar las operaciones CRUD (crear, listar, obtener, actualizar)
 * de los productos que vende un usuario. Actualmente usa MockApiService temporalmente,
 * pero se conectará al backend de Spring Boot más adelante.
 */

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  private http = inject(HttpService);
  private mock = inject(MockApiService);

  /** Lista pública de productos */
  getAll(): Observable<Product[]> {
    return of(this.mock.listProducts());
  }

  /** Productos creados por un usuario (simulado) */
  getByUser(userId: string): Observable<Product[]> {
    return of(this.mock.listProducts().filter(p => p.status === 'APPROVED'));
  }

  /** Obtiene un producto por ID */
  getById(id: string): Observable<Product | undefined> {
    return of(this.mock.getProduct(id));
  }

  /** Crea un nuevo producto */
  create(product: Product): Observable<Product> {
    return of(this.mock.addProduct(product));
  }

  /** Actualiza un producto existente */
  update(product: Product): Observable<Product | null> {
    return of(this.mock.updateProduct(product));
  }

    /** Elimina un producto por ID */
  delete(id: string): Observable<boolean> {
    return of(this.mock.deleteProduct(id));
  }


}
