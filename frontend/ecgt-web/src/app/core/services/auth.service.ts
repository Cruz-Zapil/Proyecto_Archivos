import { Injectable, inject, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from './http.service';
import {
  AuthResponse,
  LoginPayload,
  RegisterPayload,
  User,
  UserRole,
} from '../models/user';

/**
 * AuthService
 * ------------
 * Maneja login/registro y persistencia de sesión con JWT.
 * Permanente: se comunica con el backend Spring Boot real.
 */

const ACCESS_TOKEN_KEY = 'ecgt_token';
const USER_KEY = 'ecgt_user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpService);
  private router = inject(Router);

  // Estado reactivo de sesión
  private _user = signal<User | null>(this.readUserFromStorage());
  user = computed(() => this._user());
  isLoggedIn = computed(() => !!this._user());
  roles = computed<UserRole[]>(() => this._user()?.roles ?? []);

  /**  Login real contra Spring Boot */
  login(payload: LoginPayload) {
    // Llama a /api/auth/login del backend
    return this.http.post<AuthResponse>('/auth/login', payload);
  }

  /**  Registro real contra Spring Boot */
  register(payload: RegisterPayload) {
    return this.http.post<AuthResponse>('/auth/register', payload);
  }

  /**  Guarda sesión después del login/registro */

completeLoginFlow(res: AuthResponse) {
  const token = (res as any).accessToken ?? (res as any).token;
  if (!token) { console.error('No token'); return; }

  const raw = res.user as any;
  const roles = Array.isArray(raw.roles)
    ? raw.roles
    : (raw.role?.name ? [raw.role.name] : []);

  const { passwordHash, role, ...rest } = raw;
  const user: User = { ...rest, roles };

  localStorage.setItem('ecgt_token', token);
  localStorage.setItem('ecgt_user', JSON.stringify(user));
  this._user.set(user);
}


  
  /**  Obtiene el token actual */
  get token(): string | null {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  }

  /**  Lee usuario guardado (tras refresh) */
  private readUserFromStorage(): User | null {
    const raw = localStorage.getItem(USER_KEY);
    try {
      return raw ? (JSON.parse(raw) as User) : null;
    } catch {
      return null;
    }
  }

  /**  Cerrar sesión */
  logout() {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    this._user.set(null);
    this.router.navigate(['/login']);
  }

  /**  Verifica si el usuario tiene alguno de los roles permitidos */
  hasAnyRole(allowed: UserRole[]): boolean {
    const r = this.roles();
    return allowed.some((role) => r.includes(role));
  }
}
