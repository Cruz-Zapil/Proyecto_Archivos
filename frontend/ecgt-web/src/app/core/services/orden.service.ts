import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpService } from './http.service';
import { MockApiService } from '../../mocks/mock-api.service';
import { Order } from '../models/orden';

/**
 * Orden Service
 
 * Servicio de logística: listar pedidos en curso, reprogramar entrega
 * y marcar un pedido como entregado. Temporalmente usa MockApiService.
 * Permanente: se conectará a endpoints de Spring Boot.
 */

@Injectable({
  providedIn: 'root',
})
export class OrdenService {

  private http = inject(HttpService);
  private mock = inject(MockApiService);


  constructor() {}

    /** Lista todos los pedidos en curso (logística) */
  getInProgress(): Observable<Order[]> {
    // return this.http.get<Order[]>('/orders/in-progress');
    return of(this.mock.listOrdersInProgress());
  }


  /** Cambia la fecha estimada de entrega de un pedido */
  updateDeliveryDate(id: string, isoDate: string): Observable<Order | undefined> {
    // return this.http.patch<Order>(`/orders/${id}/delivery-date`, { deliveryDate: isoDate });
    return of(this.mock.updateOrderDeliveryDate(id, isoDate));
  }

  /** Marca un pedido como entregado */
  markDelivered(id: string): Observable<Order | undefined> {
    // return this.http.patch<Order>(`/orders/${id}/mark-delivered`, {});
    return of(this.mock.markOrderDelivered(id));
  }
  


}
