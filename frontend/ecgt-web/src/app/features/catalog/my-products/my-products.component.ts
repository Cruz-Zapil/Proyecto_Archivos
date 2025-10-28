import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../../core/services/product.service';
import { Product } from '../../../core/models/product';

/**
 * MyProductsComponent
 * --------------------
 * Lista, edita y elimina productos del usuario autenticado.
 * Temporal/Permanente: consume backend (o mock) y normaliza imágenes.
 */
@Component({
  selector: 'app-my-products',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './my-products.component.html',
  styleUrls: ['./my-products.component.scss']
})
export class MyProductsComponent implements OnInit {

  private productService = inject(ProductService);

  products: Product[] = [];
  loading = false;
  message = '';

  ngOnInit() {
    this.loadMyProducts();
  }

  /** Carga productos del usuario autenticado */
  loadMyProducts() {
    this.loading = true;
    this.productService.listMine().subscribe({
      next: (res: any) => {
        // Si el backend devuelve PageResp, viene en res.content. Si no, res es el array.
        const items: Product[] = (res?.content ?? res) as Product[];

        // Normaliza imágenes (si sólo hay imageUrl, lo “eleva” a imageUrls[0])
        this.products = (items || []).map(p => {
          if (!p.imageUrls || !p.imageUrls.length) {
            const single = p.imageUrl ? [p.imageUrl] : [];
            return { ...p, imageUrls: single };
          }
          return p;
        });

        this.loading = false;
      },
      error: () => {
        this.message = '❌ Error al cargar tus productos.';
        this.loading = false;
      }
    });
  }

  /** Elimina un producto */
  deleteProduct(p: Product) {
    if (!confirm(`¿Seguro que deseas eliminar "${p.name}"?`)) return;

    this.productService.deleteMine(p.id).subscribe({
      next: () => {
        this.products = this.products.filter(prod => prod.id !== p.id);
        this.message = '🗑️ Producto eliminado.';
        setTimeout(() => (this.message = ''), 2500);
      },
      error: () => {
        this.message = '❌ Error al eliminar producto.';
        setTimeout(() => (this.message = ''), 2500);
      }
    });
  }
}
