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

/**
 * ProductComponent
 * ----------------
 * Vista de detalle. Temporalmente obtiene el producto buscando
 * dentro de una página "amplia" del catálogo público.
 * Permanente en cuanto exista GET /products/{id} en backend.
 */

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

    // ⚠️ Temporal: traemos muchos y buscamos el id en cliente.
    // Reemplaza por: this.products.getPublicById(id).subscribe(...)
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

    //  Evita agregar productos sin stock
    if (this.product.stock <= 0) {
      alert(`❌ El producto "${this.product.name}" está agotado.`);
      return;
    }

    // Mapeo mínimo del modelo
    const uiProduct: any = {
      id: this.product.id,
      name: this.product.name,
      description: this.product.description,
      price: this.product.price,
      imageUrl: '',
      status: 'APPROVED',
      stock: this.product.stock,
      condition: this.product.condition,
      category: this.product.categories?.[0] ?? 'OTHER',
    };

    //  Agregar al carrito
    this.cart.add(
      { ...this.product!, description: this.product!.description ?? '' },
      1
    );

    alert(`${this.product.name} agregado al carrito 🛒`);
  }
}
