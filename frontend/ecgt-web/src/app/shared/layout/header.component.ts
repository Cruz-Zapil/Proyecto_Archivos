import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { CommonModule } from '@angular/common';
import { CartService } from '../../core/services/cart.service';


/**
 * Header con links básicos y un badge que muestra
 * el total de unidades en el carrito (sumatoria de qty).
 */

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent {

   private cart = inject(CartService);

  // total de unidades (no de líneas)
  count = computed(() => this.cart.items().reduce((n, i) => n + i.qty, 0));

}
