import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../core/services/product.service';
import { Product } from '../../../core/models/product';
import { RouterLink } from '@angular/router';

/**
 * MyProductsComponent
 * Muestra los productos creados por el usuario que vende. Usa ProductService
 * (mock) para listar los productos. Más adelante permitirá editar/eliminar.
 */


@Component({
  selector: 'app-my-products',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './my-products.component.html',
  styleUrls: ['./my-products.component.scss']
})
export class MyProductsComponent {


   private productService = inject(ProductService);

  products: Product[] = [];
  loading = true;
    message = '';

  ngOnInit() {
    // Simula obtener productos del usuario actual
    this.productService.getByUser('mock-user').subscribe(res => {
      this.products = res;
      this.loading = false;
    });
  }


  /** Recarga la lista */
  loadProducts() {
    this.loading = true;
    this.productService.getByUser('mock-user').subscribe(res => {
      this.products = res;
      this.loading = false;
    });
  }

  /**  Elimina un producto tras confirmación */
  deleteProduct(p: Product) {
    const confirmDelete = confirm(
      `¿Seguro que deseas eliminar "${p.name}"? Esta acción no se puede deshacer.`
    );
    if (!confirmDelete) return;

    this.productService.delete(p.id).subscribe(success => {
      if (success) {
        this.message = '✅ Producto eliminado correctamente.';
        // actualiza lista en memoria
        this.products = this.products.filter(prod => prod.id !== p.id);
      } else {
        this.message = '❌ No se pudo eliminar el producto.';
      }

      // limpiar mensaje tras 3s
      setTimeout(() => (this.message = ''), 3000);
    });
  }



}
