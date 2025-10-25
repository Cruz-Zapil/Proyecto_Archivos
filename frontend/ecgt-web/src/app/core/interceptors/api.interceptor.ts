// src/app/core/interceptors/api.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { environment } from '../../../environments/environment';



export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const token = auth.token;

  // no toques URLs absolutas
  const isAbsolute = /^https?:\/\//i.test(req.url);
  const isApiRelative = req.url.startsWith('/') || req.url.startsWith('api/');
  const fullUrl = isAbsolute ? req.url
    : isApiRelative
      ? `${environment.apiUrl}${req.url.startsWith('/') ? '' : '/'}${req.url}`
      : req.url;

  let cloned = req.clone({ url: fullUrl });

  console.log(
    'Interceptor →', cloned.method, cloned.url,
    '| hasToken:', !!token
  );

if (token) {
  cloned = cloned.clone({
    setHeaders: { Authorization: `Bearer ${token}` },
  });
  console.log('✅ Authorization agregado a', cloned.url);
} else {
  console.warn('⚠️ No hay token disponible');
}


  return next(cloned);
};
