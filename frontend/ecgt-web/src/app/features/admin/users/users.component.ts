import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { AdminService, Employee, CreateEmployeePayload } from '../../../core/services/admin.service';

/**
 * UsersComponent (Admin)
 * ----------------------
 * Administra usuarios del sistema: listar, crear, actualizar y eliminar.
 * Usa AdminService real (HTTP a /api/admin/users).
 */

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  private adminService = inject(AdminService);

  users: Employee[] = [];
  loading = false;
  message = '';

  // Modelo del formulario
  form: Partial<CreateEmployeePayload & { id?: string }> = {
    name: '',
    email: '',
    password: '',
    role: 'MODERATOR'
  };

  ngOnInit() {
    this.load();
  }

  /** Carga todos los empleados */
  load() {
    this.loading = true;
    this.adminService.listEmployees().subscribe({
      next: (res) => {
        this.users = res;
        this.loading = false;
      },
      error: () => {
        this.users = [];
        this.loading = false;
      }
    });
  }

  /** Crear o actualizar usuario */
  save(form: NgForm) {
    if (form.invalid) return;

    this.loading = true;
    const payload: CreateEmployeePayload = {
      name: this.form.name ?? '',
      email: this.form.email ?? '',
      password: this.form.password ?? '',
      role: this.form.role ?? 'MODERATOR'
    };

    // Si hay id, actualiza; si no, crea
    const req$ = this.form.id
      ? this.adminService.updateEmployee({ ...payload, id: this.form.id })
      : this.adminService.createEmployee(payload);

    req$.subscribe({
      next: () => {
        this.flash(this.form.id ? '✅ Usuario actualizado.' : '✅ Usuario creado.');
        this.load();
        this.reset();
      },
      error: () => {
        this.flash('❌ Error al guardar usuario.');
        this.loading = false;
      }
    });
  }

  /** Selecciona un usuario para edición */
  edit(u: Employee) {
    this.form = {
      id: u.id,
      name: u.name,
      email: u.email,
      password: '',
      role: u.role
    };
  }

  /** Elimina un usuario */
  remove(u: Employee) {
    const ok = confirm(`¿Eliminar a ${u.name}?`);
    if (!ok) return;

    this.adminService.deleteEmployee(u.id).subscribe({
      next: () => {
        this.flash('🗑️ Usuario eliminado.');
        this.load();
      },
      error: () => this.flash('❌ Error al eliminar usuario.')
    });
  }

  /** Resetea el formulario */
  reset() {
    this.form = { name: '', email: '', password: '', role: 'MODERATOR' };
  }

  /** Mensaje temporal */
  private flash(msg: string) {
    this.message = msg;
    setTimeout(() => (this.message = ''), 2500);
  }
}
