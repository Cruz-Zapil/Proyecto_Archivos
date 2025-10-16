import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';


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


    fullName = '';
  email = '';
  password = '';

  constructor(private auth: AuthService, private router: Router) {}

  submit() {
    this.auth.register(this.fullName, this.email, this.password);
    this.router.navigateByUrl('/');
  }
}
