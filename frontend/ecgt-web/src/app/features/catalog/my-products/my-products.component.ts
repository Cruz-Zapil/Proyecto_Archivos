import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../../core/services/product.service';
import { Product } from '../../../core/models/product';

/**
 * MyProductsComponent
 * --------------------
 * Muestra los productos creados por el usuario autenticado.
 * Temporalmente obtiene los productos del backend o mock.
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
        // Si el backend devuelve PageResp
        this.products = res.content ?? res;
        this.loading = false;
      },
      error: (err) => {
        this.message = '❌ Error al cargar tus productos.';
        this.loading = false;
      }
    });
  }

  /** Elimina un producto */
  deleteProduct(p: Product) {
    if (!confirm(`¿Seguro que deseas eliminar "${p.name}"?`)) return;

    this.productService.deleteMine(p.id!).subscribe({
      next: () => {
        this.products = this.products.filter(prod => prod.id !== p.id);
         this.message = '🗑️ Producto eliminado.';
         setTimeout(() => (this.message = ''), 2500);
      },
      error: (err) => {
        this.message = '❌ Error al eliminar producto.';
        setTimeout(() => (this.message = ''), 2500);
      }
    });
  }
}
