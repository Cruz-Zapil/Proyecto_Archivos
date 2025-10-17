import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// imports

import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';

import { MockApiService } from '../../mocks/mock-api.service';
import { CartService } from '../../core/services/cart.service';

/**
 * Página de detalle de producto.
 * Obtiene el ID desde la ruta (/product/:id),
 * busca el producto en el MockApiService y permite agregarlo al carrito.
 */

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, NgIf, RouterLink],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
    product = this.api.getProduct(this.route.snapshot.params['id']);

  constructor(private route: ActivatedRoute, private api: MockApiService, private cart: CartService) {}

  addToCart() {
    if (this.product) {
      this.cart.add({
        id: crypto.randomUUID(),
        product: this.product,
        qty: 1
      });
      alert(`${this.product.nombre} agregado al carrito 🛒`);
    }
  }

}
