import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { CartService } from '../../core/services/cart.service';
import {
  ProductService,
  ApiProductResp,
  PageResp,
} from '../../core/services/product.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, NgIf, RouterLink],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent {
  product?: ApiProductResp;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private products: ProductService,
    private cart: CartService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.params['id'];

    // ⚠️ Temporal: traer varios y filtrar en cliente
    this.products.listPublic(0, 200).subscribe({
      next: (page: PageResp<ApiProductResp>) => {
        this.product = page.content.find((p) => p.id === id);
        this.loading = false;
      },
      error: () => (this.loading = false),
    });
  }

  addToCart() {
    if (!this.product) return;

    if (this.product.stock <= 0) {
      alert(`❌ El producto "${this.product.name}" está agotado.`);
      return;
    }

    const p = this.product!;
    const productForCart = {
      ...p,
      description: p.description ?? '',
      imageUrl: p.imageUrl ?? undefined,
      image: p.image ?? undefined
    };
    this.cart.add(productForCart, 1);

    alert(`${this.product.name} agregado al carrito 🛒`);
  }

  /** ✅ Getter nuevo para mostrar la imagen del producto */
  get heroUrl(): string {
    const p: any = this.product;
    if (!p) return 'https://via.placeholder.com/640x640?text=Producto';

    const arr: string[] =
      (Array.isArray(p.imageUrls) && p.imageUrls) ||
      (Array.isArray(p.images) && p.images) ||
      [];

    return (
      (arr.length ? arr[0] : null) ||
      p.imageUrl ||
      p.image ||
      'https://via.placeholder.com/640x640?text=Producto'
    );
  }
}
