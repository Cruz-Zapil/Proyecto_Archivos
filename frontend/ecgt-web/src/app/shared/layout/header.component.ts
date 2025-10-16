import { Component, computed, inject } from '@angular/core';

import { CommonModule } from '@angular/common';
import { CartService } from '../../core/services/cart.service';

import { AuthService } from '../../core/services/auth.service';
import { RouterLink, RouterLinkActive } from '@angular/router';

/**
 * Header con links básicos y un badge que muestra
 * el total de unidades en el carrito (sumatoria de qty).
 */

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink,  RouterLinkActive,],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent {

   private cart = inject(CartService);
   private auth = inject(AuthService);

  // total de unidades (no de líneas)
  count = computed(() => this.cart.items().reduce((n, i) => n + i.qty, 0));
  user  = this.auth.user;

  logout() { this.auth.logout(); }
}
