import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpService } from './http.service';
import { MockApiService } from '../../mocks/mock-api.service';

/**
 * AdminReportsService

 * Servicio de reportes del administrador (mock temporal).
 * Proporciona métricas y estadísticas en formato listo para usar en gráficos.
 * Luego se conectará al backend Spring Boot mediante HttpService.
 */

// Tipos base para los reportes
export interface ProductReport {
  productName: string;
  totalSold: number;
  totalRevenue: number;
}

export interface ClientReport {
  clientName: string;
  value: number;
}

export interface Sanction {
  user: string;
  reason: string;
  date: string;
  active: boolean;
}

export interface Notification {
  user: string;
  message: string;
  sentAt: string;
}

/** Parámetros de filtro por fecha (ISO) */
export interface ReportRange {
  start?: string; // ISO 8601 (inclusive)
  end?: string;   // ISO 8601 (inclusive)
}


@Injectable({
  providedIn: 'root',
})
export class AdminReportsService {
  constructor() {}

  private http = inject(HttpService);
  private mock = inject(MockApiService);

  /** Top 10 productos más vendidos */
  getTopProducts(range?: any): Observable<ProductReport[]> {
    // return this.http.get<ProductReport[]>('/admin/reports/top-products');
    return of(this.mock.topProducts());
  }

  /** Top 5 clientes con más ganancias generadas */
  getTopClientsByRevenue(range?: any): Observable<ClientReport[]> {
    // return this.http.get<ClientReport[]>('/admin/reports/top-clients-revenue');
    return of(this.mock.topClientsByRevenue());
  }

  /** Top 5 clientes con más productos vendidos */
  getTopClientsBySales(range?: any): Observable<ClientReport[]> {
    return of(this.mock.topClientsBySales());
  }

  /** Top 10 clientes con más pedidos */
  getTopClientsByOrders(range?: any): Observable<ClientReport[]> {
    return of(this.mock.topClientsByOrders());
  }

  /** Top 10 clientes con más productos en venta */
  getTopClientsByProducts(range?: any): Observable<ClientReport[]> {
    return of(this.mock.topClientsByProducts());
  }

  /** Historial de sanciones */
  getSanctions(range?: any): Observable<Sanction[]> {
    return of(this.mock.listSanctions());
  }

  /** Historial de notificaciones */
  getNotifications(range?: any): Observable<Notification[]> {
    return of(this.mock.listNotifications());
  }
}
