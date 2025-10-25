import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserRole } from '../models/user';

/**
 * AuthGuard
 * ----------
 * Protege rutas que requieren sesión (JWT) y, opcionalmente, roles.
 * Permanente: usa AuthService para validar token y roles.
 */


export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot): boolean | UrlTree => {
  const auth = inject(AuthService);
  const router = inject(Router);

  // 1) Sesión
  if (!auth.isLoggedIn()) {
    // Usa la URL actual completa para redirect (incluye hijos)
    const redirect = window.location.pathname + window.location.search;
    return router.createUrlTree(['/login'], { queryParams: { redirect } });
  }

  // 2) Roles (si la ruta los define)
  const allowed: UserRole[] | undefined = route.data?.['roles'];
  if (allowed?.length && !auth.hasAnyRole(allowed)) {
    // sin permiso
    return router.createUrlTree(['/']);
  }

  return true;
};
