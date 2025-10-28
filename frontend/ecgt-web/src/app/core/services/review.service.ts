import { Injectable, inject } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ReviewService {
  private http = inject(HttpService);

  getReviews(productId: string): Observable<any[]> {
    return this.http.get<any[]>(`/reviews/${productId}`);
  }

  addReview(
    productId: string,
    payload: { userId: string; rating: number; comment: string }
  ): Observable<any> {
    return this.http.post(`/reviews/${productId}`, payload);
  }
}
