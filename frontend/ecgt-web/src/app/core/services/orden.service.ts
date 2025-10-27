import { Injectable, inject } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';

/**
 * OrdenService (Logistics)
 * ------------------------
 * Gestiona pedidos EN_CURSO, cambio de fecha y marcar entregado.
 * Conecta con backend: /api/logistics/orders
 */

export interface OrderItem {
  quantity: number;                   // cantidad comprada
  priceAtPurchase: number;            // precio unitario en compra
  product?: { name: string };         // producto (nombre)
}

export interface Order {
  id: string;
  estado: 'EN_CURSO' | 'ENTREGADO';
  fechaCreacion: string;
  fechaEntregaEstimada?: string;
  fechaEntregado?: string;
  user?: { name: string };            // cliente (opcional)
  orderItems?: OrderItem[];           // ← ¡clave!
}

@Injectable({ providedIn: 'root' })
export class OrdenService {
  private http = inject(HttpService);

  /** Obtener todos los pedidos en curso */
  listOrdersInProgress(): Observable<Order[]> {
    return this.http.get<Order[]>('/logistics/orders/in-progress');
  }

  /** Cambiar la fecha estimada de entrega */
  updateOrderDeliveryDate(id: string, isoDate: string): Observable<Order> {
    return this.http.put<Order>(
      `/logistics/orders/${id}/update-delivery-date?date=${isoDate}`,
      {}
    );
  }

  /** Marcar un pedido como entregado */
  markOrderDelivered(id: string): Observable<Order> {
    return this.http.put<Order>(
      `/logistics/orders/${id}/mark-delivered`,
      {}
    );
  }
}
