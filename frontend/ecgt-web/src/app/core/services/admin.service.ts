
import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../models/user';
import { HttpService } from './http.service';
import { MockApiService } from '../../mocks/mock-api.service';


/** * Admin Service
 * Servicio de administración: gestionar empleados (CRUD).
 * Temporalmente usa MockApiService.
 * Permanente: se conectará a endpoints de Spring Boot.
 */
@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor() { }


   private http = inject(HttpService);
  private mock = inject(MockApiService);

  /** Lista todos los empleados (ADMIN, MODERATOR, LOGISTICS) */
  list(): Observable<User[]> {
    // return this.http.get<User[]>('/admin/employees');
    return of(this.mock.listEmployees());
  }

  /** Crea nuevo empleado */
  create(payload: User): Observable<User> {
    // return this.http.post<User>('/admin/employees', payload);
    return of(this.mock.addEmployee(payload));
  }

  /** Actualiza empleado existente */
  update(payload: User): Observable<User> {
    // return this.http.put<User>(`/admin/employees/${payload.id}`, payload);
    return of(this.mock.updateEmployee(payload));
  }

  /** Elimina empleado */
  delete(id: string): Observable<boolean> {
    // return this.http.delete<boolean>(`/admin/employees/${id}`);
    return of(this.mock.deleteEmployee(id));
  }

}
