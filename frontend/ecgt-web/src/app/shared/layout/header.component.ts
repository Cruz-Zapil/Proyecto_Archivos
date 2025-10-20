import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

/**
 * Header con links básicos y un badge que muestra
 * el total de unidades en el carrito (sumatoria de qty).
 */

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent {

  private auth = inject(AuthService);

  user = this.auth.user;
  isLoggedIn = this.auth.isLoggedIn;
  isCommon = computed(() => this.auth.hasAnyRole(['COMMON']));
  isModerator = computed(() => this.auth.hasAnyRole(['MODERATOR']));
  isLogistics = computed(() => this.auth.hasAnyRole(['LOGISTICS']));
  isAdmin = computed(() => this.auth.hasAnyRole(['ADMIN']));

  logout() { this.auth.logout(); }
}
