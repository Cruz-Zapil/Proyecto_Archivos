import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIf } from '@angular/common';
/**
 * PaginatorComponent
 * Props:
 *  - page: número (1-based)
 *  - pageSize: tamaño de página
 *  - total: total de elementos
 * Emite:
 *  - pageChange(nuevaPágina)
 */

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
})
export class PaginatorComponent {
  @Input() page = 1;
  @Input() pageSize = 8;
  @Input() total = 0;

  @Output() pageChange = new EventEmitter<number>();

  get pages() {
    return Math.max(1, Math.ceil(this.total / this.pageSize));
  }

  go(n: number) {
    if (n >= 1 && n <= this.pages) this.pageChange.emit(n);
  }
}
