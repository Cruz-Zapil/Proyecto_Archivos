// src/app/core/services/product.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpService } from './http.service';
import { map, Observable } from 'rxjs';

/**
 * ProductService
 * ---------------
 * CRUD y listados de productos contra el backend (Spring Boot).
 * Permanente: NO usa mocks; todas las llamadas van por HttpClient.
 */

// Modelo UI que ya tienes
import { Product } from '../models/product';

// ====== DTOs del backend (UI) ======
export interface ApiProductResp {
  image: any;
  id: string;
  name: string;
  description?: string;
  price: number;
  stock: number;
  condition: 'NEW' | 'USED';
  reviewStatus: 'PENDING' | 'APPROVED' | 'REJECTED'; // UI espera reviewStatus
  categories: string[];
}

export interface ApiProductCreateReq {
  name: string;
  description?: string;
  price: number;
  stock: number;
  condition: 'NEW' | 'USED';
  categoryIds?: string[]; // opcional (máx 2)
  imageUrls?: string[]; // opcional
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

  // ---------- Helpers de normalización ----------

  /** Mapea el objeto crudo del backend (que trae `status`) al modelo UI (que usa `reviewStatus`). */
  private mapProduct = (raw: any): ApiProductResp => ({
    image: raw.image ?? null,
    id: String(raw.id),
    name: raw.name,
    description: raw.description ?? '',
    price: Number(raw.price),
    stock: Number(raw.stock),
    condition: (raw.condition ?? 'NEW') as 'NEW' | 'USED',
    reviewStatus: (raw.reviewStatus ?? raw.status ?? 'PENDING') as
      | 'PENDING'
      | 'APPROVED'
      | 'REJECTED',
    categories: Array.isArray(raw.categories) ? raw.categories : [],
  });

  /** Devuelve un PageResp<T> consistente, venga el backend como page o como array plano. */
  private toPage<T>(
    resp: any,
    mapper: (x: any) => T,
    pageDefault = 0,
    sizeDefault = 12
  ): PageResp<T> {
    // Caso 1: backend ya viene paginado al estilo Spring
    if (resp && Array.isArray(resp.content)) {
      const mapped = resp.content.map(mapper);
      return {
        content: mapped,
        totalElements: Number(resp.totalElements ?? mapped.length),
        totalPages: Number(resp.totalPages ?? 1),
        number: Number(resp.number ?? pageDefault),
        size: Number(resp.size ?? sizeDefault),
      };
    }
    // Caso 2: backend devolvió array plano
    if (Array.isArray(resp)) {
      const mapped = resp.map(mapper);
      return {
        content: mapped,
        totalElements: mapped.length,
        totalPages: 1,
        number: pageDefault,
        size: Math.max(sizeDefault, mapped.length),
      };
    }
    // Caso 3: nada/forma inesperada
    return {
      content: [],
      totalElements: 0,
      totalPages: 0,
      number: pageDefault,
      size: sizeDefault,
    };
  }

  // =============== CATÁLOGO PÚBLICO ===============

  /**
   * Productos aprobados y visibles para todos.
   * GET /api/products/approved?page=&size=
   */
  listPublic(page = 0, size = 12): Observable<PageResp<ApiProductResp>> {
    return this.http
      .get<any>('/products/approved', { page, size })
      .pipe(
        map((resp) =>
          this.toPage<ApiProductResp>(resp, this.mapProduct, page, size)
        )
      );
  }

  // =============== VENDEDOR (COMMON) ===============

  /**
   * Productos del vendedor autenticado.
   * GET /api/seller/products?page=&size=
   */
  listMine(page = 0, size = 12): Observable<PageResp<ApiProductResp>> {
    return this.http
      .get<any>('/seller/products', { page, size })
      .pipe(
        map((resp) =>
          this.toPage<ApiProductResp>(resp, this.mapProduct, page, size)
        )
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
    return this.http
      .post<any>('/seller/products', payload)
      .pipe(map(this.mapProduct));
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
    return this.http
      .put<any>(`/seller/products/${p.id}`, payload)
      .pipe(map(this.mapProduct));
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
  return this.http
    .get<any>('/moderation/products/pending', { params: { page, size } })
    .pipe(
      map((resp) =>
        this.toPage<ApiProductResp>(resp, this.mapProduct, page, size)
      )
    );
}


  /** Aprobar producto (POST por simplicidad). */
  approve(id: string) {
    return this.http
      .post<any>(`/moderation/products/${id}/approve`, {})
      .pipe(map(this.mapProduct));
  }

  /** Rechazar producto (POST por simplicidad). */
  reject(id: string) {
    return this.http
      .post<any>(`/moderation/products/${id}/reject`, {})
      .pipe(map(this.mapProduct));
  }

  // Obtiene un producto propio por id (con imágenes)
  getMineOne(id: string) {
    return this.http.get<ApiProductResp>(`/seller/products/${id}`);
  }
}
