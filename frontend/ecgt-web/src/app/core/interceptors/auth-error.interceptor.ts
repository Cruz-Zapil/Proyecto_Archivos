// src/app/core/interceptors/auth-error.interceptor.ts
import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { tap } from 'rxjs';

export const authErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const auth   = inject(AuthService);

  return next(req).pipe(
    tap({
      error: (err: HttpErrorResponse) => {
        if (err.status === 401) {
          auth.logout();
          router.navigate(['/login'], { queryParams: { redirect: location.pathname } });
        }
        if (err.status === 403) {
          console.warn('Acceso denegado (403) a', req.url);
        }
      }
    })
  );
};
