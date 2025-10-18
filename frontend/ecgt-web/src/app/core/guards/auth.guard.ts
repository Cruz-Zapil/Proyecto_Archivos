import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserRole } from '../models/user';


/**
 * auth.guard.ts
 * --------------
 * Protección de rutas.
 * Verifica si el usuario está logueado y si cumple con el rol necesario.
 * Temporalmente usa AuthService con mock de sesión.
 */


export const authGuard: CanActivateFn = (route, state): boolean | UrlTree => {
  const auth = inject(AuthService);
  const router = inject(Router);

  // Si no hay sesión → al login
  if (!auth.isLoggedIn()) {
    return router.createUrlTree(['/login'], { queryParams: { redirect: state.url }});
  }

  // Si la ruta define roles, validarlos
  const allowed = route.data?.['roles'] as UserRole[] | undefined;
  if (allowed?.length && !auth.hasAnyRole(allowed)) {
    // Si no tiene permiso, mandarlo al home/catalogo o a una página 403
    return router.createUrlTree(['/']);
  }
/// todo ok
  return true;
};
