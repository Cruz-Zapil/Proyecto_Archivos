import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';



/**
 * GuestGuard
 * -----------
 * Evita acceso a pantallas de login/registro si ya hay sesión activa.
 * Permanente: mejora la UX.
 */


export const guestGuard: CanActivateFn = (): boolean | UrlTree => {
  const auth = inject(AuthService);
  const router = inject(Router);
  if (auth.isLoggedIn()) {
    return router.createUrlTree(['/']);
  }
  return true;
};
