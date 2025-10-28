// src/app/core/services/upload.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UploadService {
  private http = inject(HttpService);

  /** Sube N imágenes y devuelve sus URLs públicas en el mismo orden. */
  uploadImages(files: File[]): Observable<string[]> {
    const form = new FormData();
    files.forEach(f => form.append('files', f, f.name));
    // Ajusta este endpoint a tu backend:
    return this.http.post<string[]>('/seller/uploads/images', form);
  }
}
