import { Component, computed, signal } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { ProductCardComponent } from '../../../shared/ui/product-card.component';
import { ProductFiltersComponent } from '../../../shared/ui/product-filters.component';
import { PaginatorComponent } from '../../../shared/ui/paginator.component';
import { Product, ProductCategory } from '../../../core/models/product';
import { ProductService, ApiProductResp, PageResp } from '../../../core/services/product.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NgFor, NgIf, ProductCardComponent, ProductFiltersComponent, PaginatorComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  // 🔎 Estado de búsqueda / orden
  q = signal('');
  sort = signal<'popular' | 'price_asc' | 'price_desc' | 'new'>('popular');

  // 📄 Paginación
  page = signal(1);
  readonly pageSize = 12;

  // ⚙️ Estado general
  loading = true;
  pageResp = signal<PageResp<ApiProductResp> | null>(null);

  constructor(private products: ProductService) {}

  ngOnInit() {
    this.load();
  }

  /** Carga productos desde backend */
  load() {
    this.loading = true;
    const page0 = this.page() - 1;

    console.log('📦 Cargando productos, página:', this.page(), `(page=${page0})`);

    this.products.listPublic(page0, this.pageSize).subscribe({
      next: (resp) => {
        console.log('✅ Página recibida:', resp.number, 'Total páginas:', resp.totalPages);
        this.pageResp.set(resp);
        this.loading = false;
      },
      error: (err) => {
        console.error('❌ Error al cargar productos:', err);
        this.pageResp.set({
          content: [],
          totalElements: 0,
          totalPages: 1,
          number: 0,
          size: this.pageSize
        });
        this.loading = false;
      }
    });
  }

  /** 🔍 Filtro de texto (local) */
  private byText = computed<ApiProductResp[]>(() => {
    const q = this.q().trim().toLowerCase();
    const data = this.pageResp()?.content ?? [];
    if (!q) return data;
    return data.filter(p =>
      (p.name ?? '').toLowerCase().includes(q) ||
      (p.description ?? '').toLowerCase().includes(q)
    );
  });

  /** ↕️ Orden local */
  private ordered = computed<ApiProductResp[]>(() => {
    const list = [...this.byText()];
    switch (this.sort()) {
      case 'price_asc': return list.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
      case 'price_desc': return list.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
      default: return list;
    }
  });

  /** 🧭 Conversión a modelo UI Product */
  paged = computed<Product[]>(() => {
    const items = this.ordered();
    if (!items.length) return [];
    return items.map(p => ({
      id: p.id,
      name: p.name ?? 'Sin nombre',
      description: p.description ?? '',
      price: p.price ?? 0,
      stock: p.stock ?? 0,
      condition: p.condition ?? 'NEW',
      status: p.reviewStatus === 'APPROVED' ? 'APPROVED' : 'PENDING_REVIEW',
      category: this.toCategory(p.categories?.[0]),
      imageUrl: (p as any).images?.[0] ?? 'https://placehold.co/400x300?text=Producto'
    }));
  });

  /** 📊 Cálculos derivados */
  total = computed(() => this.pageResp()?.totalElements ?? 0);
  pages = computed(() => this.pageResp()?.totalPages ?? 1);

  /** ✍️ Handlers UI */
  onSearch(value: string) {
    this.q.set(value);
    this.page.set(1);
  }

  onSort(value: string) {
    this.sort.set(value as any);
    this.page.set(1);
  }

  go(n: number) {
    if (n >= 1 && n <= this.pages()) {
      console.log('➡️ Cambiando a página', n);
      this.page.set(n);
      this.load();
    }
  }

  /** 🧩 Convierte string del backend a ProductCategory */
  private toCategory(name?: string): ProductCategory | undefined {
    if (!name) return undefined;
    const upper = name.toUpperCase();
    if (['TECHNOLOGY','HOME','ACADEMIC','PERSONAL','DECORATION','OTHER'].includes(upper))
      return upper as ProductCategory;
    return undefined;
  }
}
