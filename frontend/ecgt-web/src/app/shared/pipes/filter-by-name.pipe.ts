import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../../core/models/product';

@Pipe({ name: 'filterByName', standalone: true })
export class FilterByNamePipe implements PipeTransform {
  transform(products: Product[], term: string): Product[] {
    if (!term) return products;
    const lower = term.toLowerCase();
    return products.filter(p => p.name?.toLowerCase().includes(lower));
  }
}
