import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Product } from '../../core/models/product';

/**
 * ProductCardComponent
 * ---------------------
 * Tarjeta para mostrar un producto en el catálogo.
 * Temporal/Permanente: UI estable; muestra imagen usando fallback (imageUrls[0] || imageUrl).
 */
@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
  @Input({ required: true }) product!: Product;

  /** Devuelve la miniatura elegida (imageUrls[0] si existe; si no, imageUrl). */
  get thumbUrl(): string | null {
    const arr = this.product?.imageUrls;
    if (arr && Array.isArray(arr) && arr.length > 0 && arr[0]) {
      return arr[0];
    }
    return this.product?.imageUrl ?? null;
  }
}
