import { Injectable, inject } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';

/**
 * ProductService
 * ---------------
 * CRUD y listados de productos contra el backend (Spring Boot).
 * Permanente: NO usa mocks; todas las llamadas van por HttpClient.
 */

// Modelo UI que ya tienes
import { Product } from '../models/product';

// ====== DTOs del backend ======
export interface ApiProductResp {
image: any;
  id: string;
  name: string;
  description?: string;
  price: number;
  stock: number;
  condition: 'NEW' | 'USED';
  reviewStatus: 'PENDING' | 'APPROVED' | 'REJECTED';
  categories: string[];
}

export interface ApiProductCreateReq {
  name: string;
  description?: string;
  price: number;
  stock: number;
  condition: 'NEW' | 'USED';
  categoryIds?: string[];   // opcional (máx 2)
  imageUrls?: string[];     // opcional
}
export interface ApiProductUpdateReq extends Partial<ApiProductCreateReq> {}

export interface PageResp<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number; // página actual
  size: number;
}

@Injectable({ providedIn: 'root' })
export class ProductService {

  
  private http = inject(HttpService);

  // =============== CATÁLOGO PÚBLICO ===============

  /**
   * Productos aprobados y visibles para todos.
   * GET /api/products/approved?page=&size=
   */
  listPublic(page = 0, size = 12): Observable<PageResp<ApiProductResp>> {
    return this.http.get<PageResp<ApiProductResp>>(
      `/products/approved?page=${page}&size=${size}`
    );
  }

  // =============== VENDEDOR (COMMON) ===============

  /**
   * Productos del vendedor autenticado.
   * GET /api/seller/products?page=&size=
   */
  listMine(page = 0, size = 12): Observable<PageResp<ApiProductResp>> {
    return this.http.get<PageResp<ApiProductResp>>(
      `/seller/products?page=${page}&size=${size}`
    );
  }

  /**
   * Crear producto (queda en PENDING).
   * POST /api/seller/products
   */
  createFromUiModel(
    p: Product,
    categoryIds?: string[],
    imageUrls?: string[]
  ): Observable<ApiProductResp> {
    const payload: ApiProductCreateReq = {
      name: p.name,
      description: p.description,
      price: p.price,
      stock: p.stock,
      condition: (p as any).condition ?? (p as any).estadoProducto ?? 'NEW',
      categoryIds,
      imageUrls,
    };
    return this.http.post<ApiProductResp>(`/seller/products`, payload);
  }

  /**
   * Actualizar producto (vuelve a PENDING).
   * PUT /api/seller/products/{id}
   */
  updateFromUiModel(
    p: Product,
    categoryIds?: string[],
    imageUrls?: string[]
  ): Observable<ApiProductResp> {
    const payload: ApiProductUpdateReq = {
      name: p.name,
      description: p.description,
      price: p.price,
      stock: p.stock,
      condition: (p as any).condition ?? (p as any).estadoProducto,
      categoryIds,
      imageUrls,
    };
    return this.http.put<ApiProductResp>(`/seller/products/${p.id}`, payload);
  }

  /**
   * Eliminar producto propio (si lo soportas en backend).
   * DELETE /api/seller/products/{id}
   */
  deleteMine(id: string): Observable<boolean> {
    return this.http.delete<boolean>(`/seller/products/${id}`);
  }

  // =============== MODERACIÓN (MODERATOR) ===============

  /**
   * Productos pendientes de aprobación.
   * GET /api/moderation/products/pending?page=&size=
   */
  listPending(page = 0, size = 12): Observable<PageResp<ApiProductResp>> {
    return this.http.get<PageResp<ApiProductResp>>(
      `/moderation/products/pending?page=${page}&size=${size}`
    );
  }

  /** Aprobar producto (POST por simplicidad). */
  approve(id: string) {
    return this.http.post<ApiProductResp>(`/moderation/products/${id}/approve`, {});
  }

  /** Rechazar producto (POST por simplicidad). */
  reject(id: string) {
    return this.http.post<ApiProductResp>(`/moderation/products/${id}/reject`, {});
  }
}
