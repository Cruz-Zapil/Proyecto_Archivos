import { Component, computed } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { CartService } from 'src/app/core/services/cart.service';
import { RouterLink } from '@angular/router';

import { Router } from '@angular/router';
/**
 * Página de carrito.
 * Muestra los productos agregados y el total.
 * Por ahora el checkout será simulado (alert).
 */


@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, NgFor, NgIf, RouterLink],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})

export class CartComponent {

   constructor(private cart: CartService, private router: Router) {}

  // Signals expuestos desde CartService
  items = this.cart.items;
  total = computed(() => this.cart.total());

  remove(id: string) {
    this.cart.remove(id);
  }

  clear() {
    this.cart.clear();
  }

  checkout() {
    // En lugar de alert: navegar a la página de checkout
    this.router.navigateByUrl('/checkout');
  }


}
