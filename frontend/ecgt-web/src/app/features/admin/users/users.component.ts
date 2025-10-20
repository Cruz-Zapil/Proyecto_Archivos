import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User, UserRole } from 'src/app/core/models/user';
import { AdminService } from 'src/app/core/services/admin.service';


@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {


   private admin = inject(AdminService);

  employees: User[] = [];
  loading = true;
  editing: User | null = null;
  newUser: User = { id: '', name: '', email: '', roles: ['MODERATOR'], enabled: true };
  message = '';

  roles: UserRole[] = ['MODERATOR', 'LOGISTICS', 'ADMIN'];

  ngOnInit() {
    this.load();
  }

  /** Carga todos los empleados */
  load() {
    this.loading = true;
    this.admin.list().subscribe((res) => {
      this.employees = res;
      this.loading = false;
    });
  }

  /** Guardar nuevo o editado */
  save() {
    if (!this.newUser.nombre || !this.newUser.email) return;

    const obs = this.newUser.id
      ? this.admin.update(this.newUser)
      : this.admin.create(this.newUser);

    obs.subscribe(() => {
      this.flash('✅ Empleado guardado correctamente.');
      this.resetForm();
      this.load();
    });
  }

  /** Editar empleado */
  edit(u: User) {
    this.newUser = { ...u };
    this.editing = u;
  }

  /** Eliminar empleado */
  remove(u: User) {
    const ok = confirm(`¿Eliminar al empleado ${u.nombre}?`);
    if (!ok) return;
    this.admin.delete(u.id).subscribe(() => {
      this.flash('🗑️ Empleado eliminado.');
      this.load();
    });
  }

  /** Limpiar formulario */
  resetForm() {
    this.newUser = { id: '', name: '', email: '', roles: ['MODERATOR'], enabled: true };
    this.editing = null;
  }

  /** Mensaje temporal */
  flash(msg: string) {
    this.message = msg;
    setTimeout(() => (this.message = ''), 3000);
  }


}
