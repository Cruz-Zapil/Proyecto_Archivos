import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class HttpService {
  private http = inject(HttpClient);
  private base = environment.apiUrl ?? '/api';

  /** Une base + path con 1 sola / y acepta URLs absolutas */
  private url(path: string) {
    if (/^https?:\/\//i.test(path)) return path; // ya es absoluta
    const base = this.base.endsWith('/') ? this.base.slice(0, -1) : this.base;
    const p = path.startsWith('/') ? path : `/${path}`;
    return `${base}${p}`;
  }

  /** Limpia params: descarta undefined/null para no mandar "start=undefined" */
  private toParams(obj?: Record<string, any>) {
    const clean: Record<string, string> = {};
    Object.entries(obj ?? {}).forEach(([k, v]) => {
      if (v !== undefined && v !== null) clean[k] = String(v);
    });
    return new HttpParams({ fromObject: clean });
  }

  get<T>(path: string, params?: Record<string, any>) {
    return this.http.get<T>(this.url(path), { params: this.toParams(params) });
  }
  post<T>(path: string, body: any)  { return this.http.post<T>(this.url(path), body); }
  put<T>(path: string, body: any)   { return this.http.put<T>(this.url(path), body); }
  patch<T>(path: string, body: any) { return this.http.patch<T>(this.url(path), body); }
  delete<T>(path: string)           { return this.http.delete<T>(this.url(path)); }
}
