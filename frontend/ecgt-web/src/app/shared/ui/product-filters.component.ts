import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

/**
 * ProductFiltersComponent
 * Emite un objeto con los filtros:
 *  - q:      texto
 *  - min:    precio mínimo
 *  - max:    precio máximo
 *  - cond:   'NEW' | 'USED' | ''
 *  - sort:   'priceAsc' | 'priceDesc' | 'nameAsc' | 'nameDesc'
 */

@Component({
  selector: 'app-product-filters',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-filters.component.html',
  styleUrls: ['./product-filters.component.scss']
})
export class ProductFiltersComponent {


   @Input() q = '';
  @Input() min: number | null = null;
  @Input() max: number | null = null;
  @Input() cond: '' | 'NEW' | 'USED' = '';
  @Input() sort: 'priceAsc' | 'priceDesc' | 'nameAsc' | 'nameDesc' = 'priceAsc';

  @Output() change = new EventEmitter<{q:string;min:number|null;max:number|null;cond:''|'NEW'|'USED';sort:'priceAsc'|'priceDesc'|'nameAsc'|'nameDesc'}>();

  emit(){ this.change.emit({ q: this.q, min: this.min, max: this.max, cond: this.cond, sort: this.sort }); }

  reset(){
    this.q=''; this.min=null; this.max=null; this.cond=''; this.sort='priceAsc';
    this.emit();
  }

}
