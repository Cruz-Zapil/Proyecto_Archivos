import { Component } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { CartService } from '../../core/services/cart.service';
import {
  ProductService,
  ApiProductResp,
  PageResp,
} from '../../core/services/product.service';
import { ReviewService } from '../../core/services/review.service';
import { AuthService } from '../../core/services/auth.service';

/**
 * ProductComponent
 * ----------------
 * Página de detalle de producto.
 * Permite agregar al carrito y dejar reseñas (⭐ comentario + rating).
 * Temporal: usa mock en ProductService; reseñas conectadas al backend.
 */

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, NgIf, RouterLink, FormsModule],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent {
  product?: ApiProductResp;
  loading = true;

  // 💬 Reseñas
  reviews: any[] = [];
  newReview = { rating: 5, comment: '' };
  submitting = false;

  constructor(
    private route: ActivatedRoute,
    private products: ProductService,
    private cart: CartService,
    private reviewService: ReviewService,
    private auth: AuthService
  ) {}

  /** Al cargar: busca producto + reseñas */
  ngOnInit() {
    const id = this.route.snapshot.params['id'];

    //  Cargar producto (mock temporal)
    this.products.listPublic(0, 200).subscribe({
      next: (page: PageResp<ApiProductResp>) => {
        this.product = page.content.find((p) => p.id === id);
        this.loading = false;

        // Si encontró producto → carga reseñas
        if (this.product) this.loadReviews();
      },
      error: () => (this.loading = false),
    });
  }

  /** Agrega producto al carrito */
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
      image: p.image ?? undefined,
    };
    this.cart.add(productForCart, 1);

    alert(`${this.product.name} agregado al carrito 🛒`);
  }

  /** ✅ Devuelve la imagen principal del producto */
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


  // mdulo de reseñas
  // ==========================================================

  /** Cargar reseñas del producto */
  loadReviews() {
    if (!this.product) return;
    this.reviewService.getReviews(this.product.id).subscribe({
      next: (res) => (this.reviews = res),
      error: () => (this.reviews = []),
    });
  }

  /** Enviar nueva reseña */
  submitReview(form: NgForm) {
    if (!this.product || form.invalid) return;
    const userId = this.auth.user()?.id;
    if (!userId) {
      alert('⚠️ Debes iniciar sesión para dejar una reseña.');
      return;
    }

    this.submitting = true;

    this.reviewService
      .addReview(this.product.id, {
        userId,
        rating: this.newReview.rating,
        comment: this.newReview.comment,
      })
      .subscribe({
        next: () => {
          form.resetForm({ rating: 5, comment: '' });
          this.loadReviews(); // refrescar
          this.submitting = false;
        },
        error: () => {
          alert('❌ Error al enviar reseña.');
          this.submitting = false;
        },
      });
  }
}
