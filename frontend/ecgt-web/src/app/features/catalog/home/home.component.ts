import { Component, computed, signal } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';

import { MockApiService } from '../../../mocks/mock-api.service';
import { ProductCardComponent } from '../../../shared/ui/product-card.component';



/**
 * Home: renderiza un buscador simple y el grid de productos
 * usando el MockApiService. Más adelante cambiaremos este servicio
 * por llamadas reales a /products del backend.
 */


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NgFor, NgIf, ProductCardComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  // estado local del término de búsqueda
  q = signal('');

  constructor(private api: MockApiService) {}

  // lista filtrada reactiva
  filtered = computed(() => this.api.listProducts(this.q()));

}
