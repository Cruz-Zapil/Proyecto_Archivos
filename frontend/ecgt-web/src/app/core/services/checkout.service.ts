import { Injectable, inject } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';

export interface CheckoutItem {
  productId: string;
  qty: number;
}

export interface CheckoutRequest {
  userId: string;
  metodoPago: string;
  items: CheckoutItem[];
}

export interface OrderResponse {
  id: string;
  total: number;
  fechaEntregaEstimada: string;
}

@Injectable({ providedIn: 'root' })
export class CheckoutService {
  private http = inject(HttpService);

  checkout(payload: CheckoutRequest): Observable<OrderResponse> {
    return this.http.post<OrderResponse>('/orders/checkout', payload);
  }
}
