import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../core/services/product.service';
import { Product } from '../../../core/models/product';

/**
 * SellProductComponent
 * --------------------
 * Crea o edita un producto (modo vendedor).
 * Permite agregar/eliminar URLs de imágenes (guardadas en DB).
 * Permanente: conectado al backend Spring Boot.
 */

@Component({
  selector: 'app-sell-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sell-product.component.html',
})
export class SellProductComponent {
  private productService = inject(ProductService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  product: Product = {
    id: crypto.randomUUID(),
    name: '',
    description: '',
    price: 0,
    stock: 1,
    condition: 'NEW',
    status: 'PENDING_REVIEW',
    category: 'TECHNOLOGY',
  };

  images: string[] = []; // URLs de imágenes
  newImageUrl = ''; // campo para nueva URL
  isEditMode = false;
  loading = false;
  message = '';

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.loadProduct(id);
    }
  }

  /** Cargar producto existente (modo edición) */
  loadProduct(id: string) {
    this.loading = true;
    this.productService.getMineOne(id).subscribe({
      next: (res: any) => {
        this.product = { ...res };
        this.images = res.images ?? [];
        this.loading = false;
      },
      error: () => {
        this.message = '❌ Error al cargar producto.';
        this.loading = false;
      },
    });
  }

  /** Agregar una nueva URL */
  addImage() {
    const url = this.newImageUrl.trim();
    if (!url) return;
    this.images.push(url);
    this.newImageUrl = '';
  }

  /** Eliminar una imagen existente */
  removeImage(idx: number) {
    this.images.splice(idx, 1);
  }

  /** Crear o actualizar producto */
  submit(form: NgForm) {
    if (form.invalid) return;
    this.loading = true;

    const obs = this.isEditMode
      ? this.productService.updateFromUiModel(this.product, [], this.images)
      : this.productService.createFromUiModel(this.product, [], this.images);

    obs.subscribe({
      next: () => {
        this.message = this.isEditMode
          ? '✅ Producto actualizado y enviado a revisión.'
          : '✅ Producto creado y enviado a revisión.';

        this.loading = false;
        setTimeout(() => this.router.navigate(['/my-products']), 1500);
      },
      error: () => {
        this.message = '❌ Ocurrió un error al guardar el producto.';
        this.loading = false;
      },
    });
  }
}
