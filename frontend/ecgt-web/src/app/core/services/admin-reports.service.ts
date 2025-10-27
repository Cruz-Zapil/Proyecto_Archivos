import { Injectable, inject } from '@angular/core';
import { HttpService } from './http.service';
import { map, Observable } from 'rxjs';

// Rango de fechas (ISO)
export interface DateRange {
  start?: string;
  end?: string;
}

// Interfaces usadas por el componente
export interface TopProductItem { productName: string; totalSold: number; totalRevenue: number; }
export interface TopClientItem  { clientName: string; value: number; }
export interface SanctionItem   { user: string; reason: string; date: string; active: boolean; }
// De momento no activamos notifications en el front:
export interface NotificationItem { user: string; message: string; sentAt: string; }

@Injectable({ providedIn: 'root' })
export class AdminReportsService {
  private http = inject(HttpService);

  // Si tu HttpService ya antepone '/api', deja estas rutas así.
  // Si NO lo hace, cambia a '/api/admin/reports/...'
  private base = '/admin/reports';

  private q(range?: DateRange) {
    const qs: string[] = [];
    if (range?.start) qs.push(`start=${encodeURIComponent(range.start)}`);
    if (range?.end)   qs.push(`end=${encodeURIComponent(range.end)}`);
    return qs.length ? `?${qs.join('&')}` : '';
  }

  // --- Top products (agregamos totalRevenue = 0 por ahora)
getTopProducts(range?: DateRange): Observable<TopProductItem[]> {
  return this.http
    .get<Array<{ productId: string; productName: string; totalSold: number; totalRevenue: number }>>(
      `/admin/reports/top-products${this.q(range)}`
    )
    .pipe(
      map(rows => rows.map(r => ({
        productName: r.productName,
        totalSold: r.totalSold,
        totalRevenue: r.totalRevenue // ahora viene del backend
      })))
    );
}


  // --- Clientes por revenue/sales/orders/products (ya coincide el shape)
  getTopClientsByRevenue(range?: DateRange): Observable<TopClientItem[]> {
    return this.http
      .get<Array<{ clientId: string; clientName: string; value: number }>>(
        `${this.base}/top-clients/revenue${this.q(range)}`
      )
      .pipe(map(rows => rows.map(r => ({ clientName: r.clientName, value: r.value }))));
  }

  getTopClientsBySales(range?: DateRange): Observable<TopClientItem[]> {
    return this.http
      .get<Array<{ clientId: string; clientName: string; value: number }>>(
        `${this.base}/top-clients/sales${this.q(range)}`
      )
      .pipe(map(rows => rows.map(r => ({ clientName: r.clientName, value: r.value }))));
  }

  getTopClientsByOrders(range?: DateRange): Observable<TopClientItem[]> {
    return this.http
      .get<Array<{ clientId: string; clientName: string; value: number }>>(
        `${this.base}/top-clients/orders${this.q(range)}`
      )
      .pipe(map(rows => rows.map(r => ({ clientName: r.clientName, value: r.value }))));
  }

  getTopClientsByProducts(range?: DateRange): Observable<TopClientItem[]> {
    return this.http
      .get<Array<{ clientId: string; clientName: string; value: number }>>(
        `${this.base}/top-clients/products${this.q(range)}`
      )
      .pipe(map(rows => rows.map(r => ({ clientName: r.clientName, value: r.value }))));
  }

  // --- Sanciones: mapeamos createdAt -> date y ponemos user = '-' de momento
  getSanctions(range?: DateRange): Observable<SanctionItem[]> {
    return this.http
      .get<Array<{ id: string; active: boolean; reason: string; createdAt: string; resolvedAt: string | null }>>(
        `${this.base}/sanctions${this.q(range)}`
      )
      .pipe(
        map(rows => rows.map(r => ({
          user: '-',            // TODO: si luego el backend trae userName, lo usamos aquí
          reason: r.reason,
          date: r.createdAt,
          active: r.active
        })))
      );
  }

  // Dejamos notifications para el siguiente paso
  getNotifications(range?: DateRange): Observable<NotificationItem[]> {
    return this.http.get<NotificationItem[]>(`${this.base}/notifications${this.q(range)}`);
  }
}
