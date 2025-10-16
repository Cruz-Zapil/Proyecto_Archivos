import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';


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
  },

    //  protegido: para pagar necesitas estar logueado
  { path: 'checkout', canActivate: [authGuard], loadComponent: () => import('./features/checkout/checkout.component').then(m => m.CheckoutComponent) },
  { path: 'login', loadComponent: () => import('./features/auth/login.component').then(m => m.LoginComponent) },
  { path: 'register', loadComponent: () => import('./features/auth/register.component').then(m => m.RegisterComponent) }



];
