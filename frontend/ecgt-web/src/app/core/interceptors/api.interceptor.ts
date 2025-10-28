// src/app/core/interceptors/api.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { environment } from '../../../environments/environment';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const token = auth.token;

  const isAbsolute = /^https?:\/\//i.test(req.url);
  const startsWithApi = req.url.startsWith('/api') || req.url.startsWith('api/');
  let url = req.url;

  if (!isAbsolute && !startsWithApi) {
    const base = (environment.apiUrl ?? '/api').replace(/\/+$/, '');
    const path = req.url.startsWith('/') ? req.url : `/${req.url}`;
    url = `${base}${path}`;
  }

  let cloned = req.clone({ url });
  if (token) cloned = cloned.clone({ setHeaders: { Authorization: `Bearer ${token}` } });

  // 👇 LOG CLAVE
  console.log('Interceptor →', cloned.method, cloned.url, '| hasToken:', !!token);

  return next(cloned);
};
