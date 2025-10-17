import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router, RouterLink } from '@angular/router';


/**
 * Registro simple (mock). En real: POST /auth/register.
 */

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

 private auth = inject(AuthService);
  private router = inject(Router);

  name = '';
  email = '';
  password = '';
  loading = false;
  error = '';

  submit(form: NgForm) {
    if (form.invalid) return;
    this.loading = true;
    this.error = '';

    this.auth.register({ name: this.name, email: this.email, password: this.password })
      .subscribe({
        next: (res) => {
          // El backend debe crear siempre usuarios COMMON
          this.auth.completeLoginFlow(res);
          this.router.navigateByUrl('/');
        },
        error: (e) => {
          this.error = e?.error?.message ?? 'No se pudo registrar';
          this.loading = false;
        },
        complete: () => this.loading = false
      });
  }


}
