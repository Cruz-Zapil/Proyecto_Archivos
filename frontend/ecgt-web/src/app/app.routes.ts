
import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { guestGuard } from './core/guards/guest.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./shared/layout/shell.component').then(m => m.ShellComponent),
    children: [
      { path: '', pathMatch: 'full', title: 'Productos · ECGT',
        loadComponent: () => import('./features/catalog/home/home.component').then(m => m.HomeComponent) },

      { path: 'product/:id', title: 'Detalle de producto · ECGT',
        loadComponent: () => import('./features/catalog/product.component').then(m => m.ProductComponent) },

      { path: 'cart', title: 'Carrito · ECGT',
        loadComponent: () => import('./features/cart/cart.component').then(m => m.CartComponent) },

      // Auth dentro del shell (si así lo quieres)
      { path: 'login', title: 'Iniciar sesión · ECGT', canActivate: [guestGuard],
        loadComponent: () => import('./features/auth/login.component').then(m => m.LoginComponent) },
      { path: 'register', title: 'Crear cuenta · ECGT', canActivate: [guestGuard],
        loadComponent: () => import('./features/auth/register.component').then(m => m.RegisterComponent) },

      { path: 'checkout', title: 'Checkout · ECGT', canActivate: [authGuard],
        loadComponent: () => import('./features/checkout/checkout.component').then(m => m.CheckoutComponent) },

      // Vendedor (COMMON o ADMIN)
      { path: 'my-products', title: 'Mis productos · ECGT',
        canActivate: [authGuard], data: { roles: ['COMMON','ADMIN'] },
        loadComponent: () => import('./features/catalog/my-products/my-products.component').then(m => m.MyProductsComponent) },

      { path: 'sell', title: 'Vender producto · ECGT',
        canActivate: [authGuard], data: { roles: ['COMMON','ADMIN'] },
        loadComponent: () => import('./features/catalog/sell-product/sell-product.component').then(m => m.SellProductComponent) },

      { path: 'sell/:id', title: 'Editar producto · ECGT',
        canActivate: [authGuard], data: { roles: ['COMMON','ADMIN'] },
        loadComponent: () => import('./features/catalog/sell-product/sell-product.component').then(m => m.SellProductComponent) },

      // Moderación
      { path: 'moderation/review', title: 'Revisión de productos · ECGT',
        canActivate: [authGuard], data: { roles: ['MODERATOR'] },
        loadComponent: () => import('./features/moderation/review-queue/review-queue.component').then(m => m.ReviewQueueComponent) },

      // Logística
      { path: 'logistics/orders', title: 'Pedidos en curso · ECGT',
        canActivate: [authGuard], data: { roles: ['LOGISTICS'] },
        loadComponent: () => import('./features/logistics/orders/orders.component').then(m => m.OrdersComponent) },

      // Admin
      { path: 'admin/users', title: 'Gestión de empleados · ECGT',
        canActivate: [authGuard], data: { roles: ['ADMIN'] },
        loadComponent: () => import('./features/admin/users/users.component').then(m => m.UsersComponent) },

      { path: 'admin/reports', title: 'Reportes · ECGT',
        canActivate: [authGuard], data: { roles: ['ADMIN'] },
        loadComponent: () => import('./features/admin/reports/reports.component').then(m => m.AdminReportsComponent) },
    ]
  },

  // (Opcional) auth fuera del shell: si no los quieres duplicados, elimina estos:
  // { path: 'login', ... }, { path: 'register', ... },

  // 404
  // { path: '404', ... },
  { path: '**', redirectTo: '' }, // redirige a home (o a 404 si la usas)
];
