import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../core/services/product.service';
import { Product } from '../../../core/models/product';

/**
 * SellProductComponent
 * ---------------------
 * Permite a un usuario (COMMON o ADMIN) crear o editar productos.
 * Si hay un :id en la ruta => modo edición.
 * Si no hay :id => modo creación.
 */

@Component({
  selector: 'app-sell-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sell-product.component.html',
  styleUrls: ['./sell-product.component.scss']
})
export class SellProductComponent {
  private productService = inject(ProductService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  // Modelo del producto
  product: Product = {
    id: crypto.randomUUID(),
    name: '',
    description: '',
    price: 0,
    stock: 1,
    condition: 'NEW',
    category: 'TECHNOLOGY',
    status: 'PENDING_REVIEW',
    imageUrl: '',
  };

  isEditMode = false;
  loading = false;
  message = '';
  previewUrl: string | ArrayBuffer | null = null;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.loadProduct(id);
    }
  }

  /** Carga el producto existente en modo edición */
  private loadProduct(id: string) {
    this.loading = true;
    this.productService.listMine().subscribe({
      next: (res: any) => {
        const found = res.content?.find((p: Product) => p.id === id);
        if (found) {
          this.product = found;
          this.previewUrl = found.imageUrl;
        } else {
          this.message = '❌ Producto no encontrado.';
        }
        this.loading = false;
      },
      error: () => {
        this.message = '❌ Error al cargar el producto.';
        this.loading = false;
      }
    });
  }

  /** Maneja la imagen seleccionada */
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

  /** Crea o actualiza el producto (submit del formulario) */
  submit(form: NgForm) {
    if (form.invalid) return;
    this.loading = true;

    const obs = this.isEditMode
      ? this.productService.updateFromUiModel(this.product)
      : this.productService.createFromUiModel(this.product);

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
      }
    });
  }
}
