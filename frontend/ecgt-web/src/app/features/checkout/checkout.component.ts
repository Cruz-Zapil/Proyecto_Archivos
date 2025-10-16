import { Component, computed } from '@angular/core';
import { CommonModule, NgFor,NgIf } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../../core/services/cart.service';


/**
 * Checkout :
 * - Muestra resumen del carrito.
 * - Formulario muy simple de pago (sin pasarela real).
 * - Al confirmar: "procesa", limpia carrito y navega a Home (o future: /orders).
 */


@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule, NgFor, NgIf],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {

   constructor(private cart: CartService, private router: Router) {}

  // signals del carrito
  items = this.cart.items;
  total = computed(() => this.cart.total());

  // estado del form (demo)
  name = '';
  card = '';
  exp = '';
  cvv = '';

  cardValid() {
    return /^\d{13,19}$/.test(this.card);
  }

  submit() {
    // Validación muy básica del demo
    if (!this.cardValid()) return;

    // Aquí en real: llamarías a POST /cart/checkout con token de tarjeta
    alert(`Pago simulado aprobado ✅\nTotal: Q${this.total()}`);

    // Vaciar carrito y volver a inicio (o a /orders en el futuro)
    this.cart.clear();
    this.router.navigateByUrl('/');
    

    }

}
