import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environment';

/**
 * Interceptor global:
 * - Prepend de la URL base de la API.
 * - Adjunta Authorization: Bearer <token> si existe en localStorage.
 * - Punto único para manejar errores globales (401, 403, etc.).
 */
export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  // Si la URL ya es absoluta (http/https), la respetamos.
  const absolute = /^https?:\/\//i.test(req.url);
  const url = absolute ? req.url : `${environment.api}${req.url}`;

  // Token (luego lo pondremos desde AuthService)
  const token = localStorage.getItem('token');

  // Clonamos la request con la nueva URL y, si procede, el header Authorization
  const authReq = token
    ? req.clone({ url, setHeaders: { Authorization: `Bearer ${token}` } })
    : req.clone({ url });

  // Aquí podrías encadenar manejo de errores con .pipe(catchError(...))
  return next(authReq);
};
