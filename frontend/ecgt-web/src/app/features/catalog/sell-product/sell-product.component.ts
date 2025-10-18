import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ProductService } from '../../../core/services/product.service';
import { Product } from '../../../core/models/product';
import { Router } from '@angular/router';

/**
 * SellProductComponent
 * Permite al usuario común crear o actualizar un producto para ponerlo en venta.
 * Por ahora usa ProductService (mock). Más adelante se conectará a Spring Boot.
 */

@Component({
  selector: 'app-sell-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sell-product.component.html',
  styleUrls: ['./sell-product.component.scss'],
})
export class SellProductComponent {
  private productService = inject(ProductService);
  private router = inject(Router);

  // Producto a crear (modelo del formulario)
  product: Product = {
    id: crypto.randomUUID(),
    name: '',
    description: '',
    price: 0,
    stock: 1,
    condition: 'NEW',
    category: 'TECHNOLOGY',
    status: 'PENDING_REVIEW',
    imageUrl: '', /// guardar la imagen en base
  };

  loading = false;
  message = '';
  previewUrl: string | ArrayBuffer | null = null; // almacena la vista previa de imagen
  isEditMode = false; // indica si estamos editando / creando un producto

    /**
   * Maneja el evento de cambio del input de archivo.
   * Convierte la imagen a base64 para mostrar una vista previa.
   */
  onImageSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      this.previewUrl = reader.result;
      this.product.imageUrl = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

   /** Crea o actualiza el producto */
  submit(form: NgForm) {
    if (form.invalid) return;
    this.loading = true;

    const obs = this.isEditMode
      ? this.productService.update(this.product)
      : this.productService.create(this.product);

    obs.subscribe({
      next: () => {
        this.message = this.isEditMode
          ? '✅ Producto actualizado y enviado a revisión.'
          : '✅ Producto creado y enviado a revisión.';

        this.loading = false;
        setTimeout(() => this.router.navigate(['/my-products']), 1200);
      },
      error: () => {
        this.message = '❌ Ocurrió un error al guardar el producto.';
        this.loading = false;
      }
    });
  }
}
