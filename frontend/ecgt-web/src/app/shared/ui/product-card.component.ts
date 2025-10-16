import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../core/models/product';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {

  /** Marcamos el input como REQUERIDO en Angular 16 */
  @Input({ required: true }) product!: Product;
}
