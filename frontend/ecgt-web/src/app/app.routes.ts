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
  },
  {
    path: 'cart',
    loadComponent: () =>
      import('./features/cart/cart.component').then(m => m.CartComponent)
  },
  {
    path: 'checkout',
    loadComponent: () =>
      import('./features/checkout/checkout.component').then(m => m.CheckoutComponent)
  }
];
