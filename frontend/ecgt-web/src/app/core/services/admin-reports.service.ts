import { Injectable, inject } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';

/**
 * AdminReportsService
 * -------------------
 * Reportes administrativos (top ventas, clientes, sanciones, notificaciones).
 * Permanente: todas las llamadas van a Spring Boot.
 */

// Rango de fechas (ISO)
export interface DateRange {
  start?: string; // '2025-10-01'
  end?: string;   // '2025-10-31'
}

// Tipos de respuesta (ajústalos a tu backend)
export interface TopProductItem { productName: string; totalSold: number; totalRevenue: number; }
export interface TopClientItem { clientName: string; value: number; }
export interface SanctionItem { user: string; reason: string; date: string; active: boolean; }
export interface NotificationItem { user: string; message: string; sentAt: string; }

@Injectable({ providedIn: 'root' })
export class AdminReportsService {
  private http = inject(HttpService);

  private q(range?: DateRange) {
    const qs: string[] = [];
    if (range?.start) qs.push(`start=${encodeURIComponent(range.start)}`);
    if (range?.end) qs.push(`end=${encodeURIComponent(range.end)}`);
    return qs.length ? `?${qs.join('&')}` : '';
  }

  getTopProducts(range?: DateRange): Observable<TopProductItem[]> {
    return this.http.get<TopProductItem[]>(`/admin/reports/top-products${this.q(range)}`);
  }

  getTopClientsByRevenue(range?: DateRange): Observable<TopClientItem[]> {
    return this.http.get<TopClientItem[]>(`/admin/reports/top-clients/revenue${this.q(range)}`);
  }

  getTopClientsBySales(range?: DateRange): Observable<TopClientItem[]> {
    return this.http.get<TopClientItem[]>(`/admin/reports/top-clients/sales${this.q(range)}`);
  }

  getTopClientsByOrders(range?: DateRange): Observable<TopClientItem[]> {
    return this.http.get<TopClientItem[]>(`/admin/reports/top-clients/orders${this.q(range)}`);
  }

  getTopClientsByProducts(range?: DateRange): Observable<TopClientItem[]> {
    return this.http.get<TopClientItem[]>(`/admin/reports/top-clients/products${this.q(range)}`);
  }

  getSanctions(range?: DateRange): Observable<SanctionItem[]> {
    return this.http.get<SanctionItem[]>(`/admin/reports/sanctions${this.q(range)}`);
  }

  getNotifications(range?: DateRange): Observable<NotificationItem[]> {
    return this.http.get<NotificationItem[]>(`/admin/reports/notifications${this.q(range)}`);
  }
}
