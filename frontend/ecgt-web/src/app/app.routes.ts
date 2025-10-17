import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./features/catalog/home/home.component').then(m => m.HomeComponent) },
  // añadiremos más rutas luego (login, product/:id, etc.)

];
