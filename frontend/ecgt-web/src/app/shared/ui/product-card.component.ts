import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Importa ambos tipos (o usa `any` si prefieres)
import { Product } from '../../core/models/product';
import { ApiProductResp } from '../../core/services/product.service';

type AnyProduct = Product | ApiProductResp;

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
  @Input({ required: true }) product!: AnyProduct;

  /** Devuelve la miniatura principal robustamente */
  get thumbUrl(): string {
    const p: any = this.product;

    const arr: string[] =
      (Array.isArray(p.imageUrls) && p.imageUrls) ||
      (Array.isArray(p.images) && p.images) ||
      [];

    const first =
      (arr.length ? arr[0] : null) ||
      p.imageUrl ||
      p.image ||
      'https://placehold.co/400x300?text=Sin+imagen';

    return first;
  }

  onImgError(ev: Event) {
    const img = ev.target as HTMLImageElement | null;
    if (img) img.src = 'https://placehold.co/400x300?text=Sin+imagen';
  }
}
