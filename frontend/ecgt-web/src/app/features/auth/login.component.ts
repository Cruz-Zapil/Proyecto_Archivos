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
    if (form.invalid) return;
    this.loading = true;
    this.error = '';

    this.auth.login({ email: this.email, password: this.password })
      .subscribe({
        next: (res) => {
          // Persistimos sesión y redirigimos
          this.auth.completeLoginFlow(res);
          const redirect = this.route.snapshot.queryParamMap.get('redirect') ?? '/';
          this.router.navigateByUrl(redirect);
        },
        error: (e) => {
          this.error = e?.error?.message ?? 'Credenciales inválidas';
          this.loading = false;
        },
        complete: () => this.loading = false
      });
  }

}
