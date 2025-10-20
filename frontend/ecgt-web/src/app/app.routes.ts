import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

//import { guestGuard } from './core/guards/guest.guard'; // si lo usas

//  Rutas principales envueltas por el Shell (header + footer)
export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./shared/layout/shell.component').then((m) => m.ShellComponent),
    children: [
      {
        path: '',
        pathMatch: 'full',
        title: 'Productos · ECGT',
        loadComponent: () =>
          import('./features/catalog/home/home.component').then(
            (m) => m.HomeComponent
          ),
      },
      {
        path: 'product/:id',
        title: 'Detalle de producto · ECGT',
        loadComponent: () =>
          import('./features/catalog/product.component').then(
            (m) => m.ProductComponent
          ),
      },
      {
        path: 'cart',
        title: 'Carrito · ECGT',
        loadComponent: () =>
          import('./features/cart/cart.component').then((m) => m.CartComponent),
      },
      /// Autenticación
      {
        path: 'login',
        title: 'Iniciar sesión · ECGT',
        // canActivate: [guestGuard], // opcional
        loadComponent: () =>
          import('./features/auth/login.component').then(
            (m) => m.LoginComponent
          ),
      },
      /// Registro
      {
        path: 'register',
        title: 'Crear cuenta · ECGT',
        // canActivate: [guestGuard], // opcional
        loadComponent: () =>
          import('./features/auth/register.component').then(
            (m) => m.RegisterComponent
          ),
      },
      {
        path: 'checkout',
        title: 'Checkout · ECGT',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./features/checkout/checkout.component').then(
            (m) => m.CheckoutComponent
          ),
      },

      //  Zona de vendedor
      {
        path: 'my-products',
        title: 'Mis productos · ECGT',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./features/catalog/my-products/my-products.component').then(
            (m) => m.MyProductsComponent
          ),
      },
      {
        path: 'sell',
        title: 'Vender producto · ECGT',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./features/catalog/sell-product/sell-product.component').then(
            (m) => m.SellProductComponent
          ),
      },
      {
        path: 'sell/:id', // modo edición
        loadComponent: () =>
          import('./features/catalog/sell-product/sell-product.component').then(
            (m) => m.SellProductComponent
          ),
      },
      //  Moderador - revisión de productos
      {
        path: 'moderation/review',
        title: 'Revisión de productos · ECGT',
        canActivate: [authGuard],
        loadComponent: () =>
          import(
            './features/moderation/review-queue/review-queue.component'
          ).then((m) => m.ReviewQueueComponent),
      },
      /// logistica
      {
        path: 'logistics/orders',
        title: 'Pedidos en curso · ECGT',
        canActivate: [authGuard],
        data: { roles: ['LOGISTICS'] },
        loadComponent: () =>
          import('./features/logistics/orders/orders.component').then(
            (m) => m.OrdersComponent
          ),
      },

      //  Admin
      {
        path: 'admin/users',
        title: 'Gestión de empleados · ECGT',
        canActivate: [authGuard],
        data: { roles: ['ADMIN'] },
        loadComponent: () =>
          import('./features/admin/users/users.component').then(
            (m) => m.UsersComponent
          ),
      },

      

      // 🧑‍💼 Administrador
      {
        path: 'admin/reports',
        title: 'Reportes · ECGT',
        canActivate: [authGuard],
        data: { roles: ['ADMIN'] },
        loadComponent: () =>
          import('./features/admin/reports/reports.component').then(
            (m) => m.AdminReportsComponent
          ),
          

          }
    ],
  },

  // 🔑 Auth (fuera del Shell si quisieras pantallas “limpias”)
  {
    path: 'login',
    title: 'Iniciar sesión · ECGT',
    loadComponent: () =>
      import('./features/auth/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'register',
    title: 'Crear cuenta · ECGT',
    loadComponent: () =>
      import('./features/auth/register.component').then(
        (m) => m.RegisterComponent
      ),
  },

  /* 🚫 404
  {
    path: '404',
    title: 'Página no encontrada · ECGT',
    loadComponent: () =>
      import('./shared/ui/not-found.component').then(m => m.NotFoundComponent),
  },
*/

  { path: '**', redirectTo: '404' },
];
