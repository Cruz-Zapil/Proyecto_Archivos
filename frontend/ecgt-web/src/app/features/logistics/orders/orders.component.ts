import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrdenService, Order } from '../../../core/services/orden.service';

/**
 * OrdersComponent (Logística)
 * ---------------------------
 * Lista pedidos EN_CURSO, permite reprogramar fecha estimada y marcar entregado.
 * Permanente: usa OrdenService (HTTP).
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

  /** Carga pedidos EN_CURSO desde backend */
  load() {
    this.loading = true;
    this.orderService.listOrdersInProgress().subscribe({
      next: (res) => { this.orders = res; this.loading = false; },
      error: () => { this.orders = []; this.loading = false; }
    });
  }

  /** yyyy-MM-dd (para <input type="date">) desde ISO */
  toDateInput(iso?: string): string {
    if (!iso) return '';
    const d = new Date(iso);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }

  /** yyyy-MM-dd -> ISO manteniendo 00:00 local */
  toISODate(dateStr: string): string {
    const [y, m, d] = dateStr.split('-').map(Number);
    const local = new Date(y, m - 1, d, 0, 0, 0);
    return local.toISOString();
  }

  /** Reprograma fecha estimada */
  changeDeliveryDate(o: Order, dateStr: string) {
    if (!dateStr) return;
    const iso = this.toISODate(dateStr);
    this.orderService.updateOrderDeliveryDate(o.id, iso).subscribe(updated => {
      if (updated) {
        // Campo de backend: estimatedDelivery
        o.estimatedDelivery = updated.estimatedDelivery;
        this.flash(`📅 Nueva fecha de entrega para pedido ${o.id}: ${dateStr}`);
      }
    });
  }

  /** Marca pedido como entregado */
  markDelivered(o: Order) {
    const ok = confirm(`¿Marcar el pedido ${o.id} como entregado?`);
    if (!ok) return;

    this.orderService.markOrderDelivered(o.id).subscribe(updated => {
      if (updated) {
        // Lo removemos de la lista
        this.orders = this.orders.filter(x => x.id !== o.id);
        this.flash(`✅ Pedido ${o.id} marcado como entregado.`);
      }
    });
  }

  /** Mensaje temporal */
  private flash(msg: string) {
    this.message = msg;
    setTimeout(() => (this.message = ''), 3000);
  }
}
