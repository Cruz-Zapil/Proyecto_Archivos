import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';

/**
 * HttpService
 * -----------
 * Wrapper de HttpClient con:
 *  ✅ Base URL automática (usa environment.apiUrl)
 *  ✅ Soporte de { params } y { headers } como objetos planos
 *  ✅ Limpieza de params (omite undefined/null)
 *  ✅ URLs absolutas seguras
 */
@Injectable({ providedIn: 'root' })
export class HttpService {
  private http = inject(HttpClient);
  private base = environment.apiUrl ?? '/api';

  /** 🔗 Une base + path y acepta URLs absolutas */
  private url(path: string): string {
    if (/^https?:\/\//i.test(path)) return path; // ya es absoluta
    const base = this.base.endsWith('/') ? this.base.slice(0, -1) : this.base;
    const p = path.startsWith('/') ? path : `/${path}`;
    return `${base}${p}`;
  }

  /** 🧹 Limpia params y convierte a HttpParams */
  private toParams(obj?: Record<string, any>): HttpParams | undefined {
    if (!obj) return undefined;
    const clean: Record<string, string> = {};
    Object.entries(obj).forEach(([k, v]) => {
      if (v !== undefined && v !== null) clean[k] = String(v);
    });
    return new HttpParams({ fromObject: clean });
  }

  // ===================== MÉTODOS HTTP =====================

  get<T>(
    path: string,
    options?: { params?: Record<string, any>; headers?: HttpHeaders }
  ) {
    const full = this.url(path);
    const params = this.toParams(options?.params);
    const headers = options?.headers;

    console.log('🌐 GET →', full, { params: options?.params });
    return this.http.get<T>(full, { params, headers });
  }

  post<T>(
    path: string,
    body: any,
    options?: { params?: Record<string, any>; headers?: HttpHeaders }
  ) {
    const full = this.url(path);
    const params = this.toParams(options?.params);
    const headers = options?.headers;
    return this.http.post<T>(full, body, { params, headers });
  }

  put<T>(
    path: string,
    body: any,
    options?: { params?: Record<string, any>; headers?: HttpHeaders }
  ) {
    const full = this.url(path);
    const params = this.toParams(options?.params);
    const headers = options?.headers;
    return this.http.put<T>(full, body, { params, headers });
  }

  patch<T>(
    path: string,
    body: any,
    options?: { params?: Record<string, any>; headers?: HttpHeaders }
  ) {
    const full = this.url(path);
    const params = this.toParams(options?.params);
    const headers = options?.headers;
    return this.http.patch<T>(full, body, { params, headers });
  }

  delete<T>(
    path: string,
    options?: { params?: Record<string, any>; headers?: HttpHeaders }
  ) {
    const full = this.url(path);
    const params = this.toParams(options?.params);
    const headers = options?.headers;
    return this.http.delete<T>(full, { params, headers });
  }
}
