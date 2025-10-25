import { Component, inject } from '@angular/core';
import { CommonModule,  } from '@angular/common';
import { ProductService } from '../../../core/services/product.service';
import { Product } from '../../../core/models/product';
import { FormsModule } from '@angular/forms';
import { FilterByNamePipe } from 'src/app/shared/pipes/filter-by-name.pipe';



/**
 * ReviewQueueComponent
 
 * Pantalla para moderadores.
 * Muestra los productos en estado PENDING_REVIEW y permite aprobar o rechazar.
 * Temporalmente usa ProductService con MockApiService (sin backend).
 */

@Component({
  selector: 'app-review-queue',
  standalone: true,
  imports: [CommonModule, FilterByNamePipe, FormsModule],
  templateUrl: './review-queue.component.html',
  styleUrls: ['./review-queue.component.scss'],
})
export class ReviewQueueComponent {
  private productService = inject(ProductService);

  pending: Product[] = [];
  loading = true;
  message = '';
  filter = '';


    ngOnInit() {
    this.loadPending();
  }

/**  Carga productos pendientes de revisión */
  loadPending() {
    this.loading = true;
    this.productService.listPending().subscribe({
      next: (res) => {
        const items = (res as any).items ?? (res as any).content ?? [];
        // Tu API devuelve status: "PENDING" (no "PENDING_REVIEW")
        this.pending = (items as Product[]).filter(p => (p as any).status === 'PENDING');
        this.loading = false;
      },
      error: () => { this.loading = false; }
    });
  }

    /**  Aprueba producto — usa los endpoints de moderación del service */
  approve(p: Product) {
    this.productService.approve(p.id!).subscribe({
      next: () => {
        this.message = `✅ Producto "${p.name}" aprobado.`;
        this.pending = this.pending.filter(prod => prod.id !== p.id);
        setTimeout(() => (this.message = ''), 2500);
      }
    });
  }

  /**  Rechaza producto — usa los endpoints de moderación del service */
  reject(p: Product) {
    const reason = prompt(`Motivo de rechazo para "${p.name}":`);
    if (!reason) return;

    this.productService.reject(p.id!).subscribe({
      next: () => {
        this.message = `❌ Producto "${p.name}" rechazado. Motivo: ${reason}`;
        this.pending = this.pending.filter(prod => prod.id !== p.id);
        setTimeout(() => (this.message = ''), 3000);
      }
    });
  }


}
