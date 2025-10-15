import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/catalog/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'product/:id',
    loadComponent: () =>
      import('./features/catalog/product.component').then(m => m.ProductComponent)
  }
];
