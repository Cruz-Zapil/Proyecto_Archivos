import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserRole } from '../models/user';

export const authGuard: CanActivateFn = (route, state): boolean | UrlTree => {
  const auth = inject(AuthService);
  const router = inject(Router);

  // Si no hay sesión → al login
  if (!auth.isLoggedIn()) {
    return router.createUrlTree(['/auth/login'], { queryParams: { redirect: state.url }});
  }

  // Si la ruta define roles, validarlos
  const allowed = route.data?.['roles'] as UserRole[] | undefined;
  if (allowed?.length && !auth.hasAnyRole(allowed)) {
    // Si no tiene permiso, mandarlo al home/catalogo o a una página 403
    return router.createUrlTree(['/']);
  }

  return true;
};
