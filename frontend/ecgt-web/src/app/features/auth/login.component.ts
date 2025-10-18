import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';


/**
 * Login simple (mock). Enviar a / tras login.
 */

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})


export class LoginComponent {
 private auth = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  email = '';
  password = '';
  loading = false;
  error = '';

  submit(form: NgForm) {
    if (form.invalid || this.loading) return;
    this.loading = true;
    this.error = '';

    this.auth.login({ email: this.email, password: this.password }).subscribe({
      next: (res) => {
        this.auth.completeLoginFlow(res);

        // ✅ Lee ambos nombres para ser compatible con el guard
        const qp = this.route.snapshot.queryParamMap;
        const redirect =
          qp.get('redirectTo') ??   // el que te sugerí en el guard
          qp.get('redirect')   ??   // el que ya tenías en el login
          '/';

        this.router.navigateByUrl(redirect);
      },
      error: (e) => {
        this.error = e?.error?.message ?? 'Credenciales inválidas';
        this.loading = false;
      },
      complete: () => (this.loading = false),
    });
  }
}
