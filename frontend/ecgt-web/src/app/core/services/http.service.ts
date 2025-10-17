import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';

/**
 * Servicio de acceso a la API.
 * usarlo en lugar de HttpClient directo para centralizar la baseURL
 * (y futura lógica de cache, retrys, logging, etc.)
 */
@Injectable({ providedIn: 'root' })
export class HttpService {

  private http = inject(HttpClient);
  private base = environment.apiUrl;

  // Helper GET con query params
  get<T>(url: string, params?: Record<string, any>) {
    const httpParams = new HttpParams({ fromObject: params ?? {} });
    return this.http.get<T>(`${this.base}${url}`, { params: httpParams });
  }

  post<T>(url: string, body: any) {
    return this.http.post<T>(`${this.base}${url}`, body);
  }

  put<T>(url: string, body: any) {
    return this.http.put<T>(`${this.base}${url}`, body);
  }

  patch<T>(url: string, body: any) {
    return this.http.patch<T>(`${this.base}${url}`, body);
  }

  delete<T>(url: string) {
    return this.http.delete<T>(`${this.base}${url}`);
  }
}
