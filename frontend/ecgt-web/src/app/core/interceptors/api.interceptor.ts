import { inject } from '@angular/core';
import { HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { AuthService } from '../services/auth.service';

/**
 * Interceptor global:
 * - Prepend de la URL base de la API.
 * - Adjunta Authorization: Bearer <token> si existe en localStorage.
 * - Punto único para manejar errores globales (401, 403, etc.).
 */
export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const token = auth.token;

  // Adjunta Authorization si hay token
  let clone: HttpRequest<any> = req;
  if (token) {
    clone = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
  }

  return next(clone);
};
