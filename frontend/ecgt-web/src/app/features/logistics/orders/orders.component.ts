
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Order } from '../../../core/models/orden';
import { OrdenService } from '../../../core/services/orden.service';
import { FormsModule } from '@angular/forms';

/**
 * LogisticsOrdersComponent

 * Panel de logística: muestra pedidos en curso, permite reprogramar
 * la fecha de entrega y marcar pedidos como entregados. Temporal (mock).
 */


@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent {

   private orderService = inject(OrdenService);

  loading = true;
  message = '';
  orders: Order[] = [];

  ngOnInit() { this.load(); }

  /** Carga pedidos "IN_PROGRESS" */
  load() {
    this.loading = true;
    this.orderService.getInProgress().subscribe(res => {
      this.orders = res;
      this.loading = false;
    });
  }

  /** Formatea ISO a yyyy-MM-dd para <input type="date"> */
  toDateInput(iso: string): string {
    const d = new Date(iso);
    // Corrige huso horario al generar la fecha (solo fecha)
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }

  /** Convierte yyyy-MM-dd a ISO conservando las 00:00 local */
  toISODate(dateStr: string): string {
    const [y, m, d] = dateStr.split('-').map(Number);
    const local = new Date(y, m - 1, d, 0, 0, 0);
    return local.toISOString();
  }

  /** Reprograma fecha de entrega */
  changeDeliveryDate(o: Order, dateStr: string) {
    const iso = this.toISODate(dateStr);
    this.orderService.updateDeliveryDate(o.id, iso).subscribe(updated => {
      if (updated) {
        o.deliveryDate = updated.deliveryDate;
        this.flash(`📅 Nueva fecha de entrega para ${o.orderNumber}: ${dateStr}`);
      }
    });
  }

  /** Marca como entregado */
  markDelivered(o: Order) {
    const ok = confirm(`¿Marcar el pedido ${o.orderNumber} como entregado?`);
    if (!ok) return;

    this.orderService.markDelivered(o.id).subscribe(updated => {
      if (updated) {
        // Lo removemos de la lista local para que desaparezca
        this.orders = this.orders.filter(x => x.id !== o.id);
        this.flash(`✅ Pedido ${o.orderNumber} marcado como entregado.`);
      }
    });
  }

  /** Mensaje temporal */
  private flash(msg: string) {
    this.message = msg;
    setTimeout(() => (this.message = ''), 3000);
  }

}
