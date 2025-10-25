import { Injectable, inject } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';

/**
 * AdminService
 * ------------
 * Gestión de empleados (MODERATOR, LOGISTICS, ADMIN).
 * Permanente: conecta con endpoints /api/admin/users.
 */

export type EmployeeRole = 'MODERATOR' | 'LOGISTICS' | 'ADMIN';

export interface Employee {
  id: string;
  name: string;
  email: string;
  role: EmployeeRole;
  enabled: boolean;
}

export interface CreateEmployeePayload {
  name: string;
  email: string;
  password: string;
  role: EmployeeRole;
}

@Injectable({ providedIn: 'root' })
export class AdminService {
  list() {
    throw new Error('Method not implemented.');
  }
  private http = inject(HttpService);

  listEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>('/admin/users');
  }

  createEmployee(payload: CreateEmployeePayload): Observable<Employee> {
    return this.http.post<Employee>('/admin/users', payload);
  }

  updateEmployee(employee: Partial<Employee> & { id: string }): Observable<Employee> {
    return this.http.put<Employee>(`/admin/users/${employee.id}`, employee);
  }

  deleteEmployee(id: string): Observable<boolean> {
    return this.http.delete<boolean>(`/admin/users/${id}`);
  }
}
