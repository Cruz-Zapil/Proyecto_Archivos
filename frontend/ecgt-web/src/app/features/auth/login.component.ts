import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';


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

    email = '';
  password = '';

  constructor(private auth: AuthService, private router: Router) {}

  submit() {
    this.auth.login(this.email, this.password);
    this.router.navigateByUrl('/');
  }


}
