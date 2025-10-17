import { Component, computed, signal } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';

import { MockApiService } from '../../../mocks/mock-api.service';
import { ProductCardComponent } from '../../../shared/ui/product-card.component';
import { ProductFiltersComponent } from '../../../shared/ui/product-filters.component';
import { PaginatorComponent } from '../../../shared/ui/paginator.component';
import { Product } from '../../../core/models/product';

/**
 * Home con:
 * - búsqueda por texto (q)
 * - orden (price_asc, price_desc, new, popular[placeholder])
 * - paginación simple (page/pageSize) en memoria
 *
 * NOTAS:
 * - Cuando conectemos al backend, enviaremos estos filtros como query params.
 * - Cada vez que cambie q o sort, reseteamos a page=1 para UX.
 */

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NgFor, NgIf, ProductCardComponent, ProductFiltersComponent, PaginatorComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {


  // Estado de filtros
  q = signal('');
  sort = signal<'popular'|'price_asc'|'price_desc'|'new'>('popular');

  // Paginación
  page = signal(1);
  readonly pageSize = 12;

  constructor(private api: MockApiService) {}

  // Lista filtrada por texto
  private byText = computed<Product[]>(() => this.api.listProducts(this.q()));

  // Orden aplicado sobre la lista filtrada
  private ordered = computed<Product[]>(() => {
    const list = [...this.byText()];
    switch (this.sort()) {
      case 'price_asc':  return list.sort((a,b) => a.price - b.price);
      case 'price_desc': return list.sort((a,b) => b.price - a.price);
      case 'new':        return list.sort((a,b) => (b.status === 'APPROVED' ? 1 : 0) - (a.status === 'APPROVED' ? 1 : 0)); // placeholder
      default:           return list; // 'popular' placeholder
    }
  });

  // Total y páginas
  total = computed(() => this.ordered().length);
  pages = computed(() => Math.max(1, Math.ceil(this.total() / this.pageSize)));

  // Slice paginado a mostrar
  paged = computed<Product[]>(() => {
    const start = (this.page() - 1) * this.pageSize;
    return this.ordered().slice(start, start + this.pageSize);
  });

  // Handlers
  onSearch(value: string) {
    this.q.set(value);
    this.page.set(1); // reset
  }

  onSort(value: string) {
    this.sort.set(value as any);
    this.page.set(1); // reset
  }

  go(n: number) {
    if (n >= 1 && n <= this.pages()) this.page.set(n);
  }
}
