import { Injectable, inject } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';

export interface LogisticsOrder {
  id: string;
  estado: string;
  fechaEntregaEstimada: string;
  fechaEntregado?: string;
  user?: { fullName: string };
}

@Injectable({ providedIn: 'root' })
export class LogisticsService {
  private http = inject(HttpService);

  listInProgress(): Observable<LogisticsOrder[]> {
    return this.http.get<LogisticsOrder[]>('/logistics/orders/in-progress');
  }

  updateDeliveryDate(id: string, dateIso: string) {
    return this.http.put<LogisticsOrder>(
      `/logistics/orders/${id}/update-delivery-date?date=${dateIso}`, {}
    );
  }

  markDelivered(id: string) {
    return this.http.put<LogisticsOrder>(
      `/logistics/orders/${id}/mark-delivered`, {}
    );
  }
}
