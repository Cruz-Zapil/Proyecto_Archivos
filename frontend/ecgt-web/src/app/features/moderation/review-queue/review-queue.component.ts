import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../core/services/product.service';
import { Product } from '../../../core/models/product';

/**
 * ReviewQueueComponent
 
 * Pantalla para moderadores.
 * Muestra los productos en estado PENDING_REVIEW y permite aprobar o rechazar.
 * Temporalmente usa ProductService con MockApiService (sin backend).
 */

@Component({
  selector: 'app-review-queue',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './review-queue.component.html',
  styleUrls: ['./review-queue.component.scss'],
})
export class ReviewQueueComponent {
  private productService = inject(ProductService);

  pending: Product[] = [];
  loading = true;
  message = '';


    ngOnInit() {
    this.loadPending();
  }

    /**  Carga productos pendientes de revisión */
  loadPending() {
    this.loading = true;
    this.productService.getAll().subscribe(res => {
      this.pending = res.filter(p => p.status === 'PENDING_REVIEW');
      this.loading = false;
    });
  }

  /**  Aprueba producto */
  approve(p: Product) {
    p.status = 'APPROVED';
    this.productService.update(p).subscribe(() => {
      this.message = `✅ Producto "${p.name}" aprobado.`;
      this.pending = this.pending.filter(prod => prod.id !== p.id);
      setTimeout(() => (this.message = ''), 2500);
    });
  }

  /**  Rechaza producto */
  reject(p: Product) {
    const reason = prompt(`Motivo de rechazo para "${p.name}":`);
    if (!reason) return;

    p.status = 'REJECTED';
    this.productService.update(p).subscribe(() => {
      this.message = `❌ Producto "${p.name}" rechazado. Motivo: ${reason}`;
      this.pending = this.pending.filter(prod => prod.id !== p.id);
      setTimeout(() => (this.message = ''), 3000);
    });
  }


}
