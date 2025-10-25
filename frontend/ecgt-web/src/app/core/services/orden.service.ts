import { Injectable, inject } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';

/**
 * OrdenService (Logistics)
 * ------------------------
 * Pedidos en curso, cambio de fecha y marcar entregado.
 * Permanente: endpoints /api/logistics/orders.
 */

export interface OrderItem { productName: string; qty: number; price: number; }
export interface Order {
  id: string;
  userName: string;
  status: 'EN_CURSO' | 'ENTREGADO';
  createdAt: string;
  estimatedDelivery?: string;
  deliveredAt?: string;
  items: OrderItem[];
}

@Injectable({ providedIn: 'root' })
export class OrdenService {
  private http = inject(HttpService);

  listOrdersInProgress(): Observable<Order[]> {
    return this.http.get<Order[]>('/logistics/orders?status=EN_CURSO');
  }

  updateOrderDeliveryDate(id: string, isoDate: string): Observable<Order> {
    return this.http.put<Order>(`/logistics/orders/${id}/estimated-delivery`, { date: isoDate });
  }

  markOrderDelivered(id: string): Observable<Order> {
    return this.http.post<Order>(`/logistics/orders/${id}/deliver`, {});
  }
}
