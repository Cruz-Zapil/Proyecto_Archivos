import { Injectable, inject, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from './http.service';
import { AuthResponse, LoginPayload, RegisterPayload, User, UserRole } from '../models/user';

/**
 * AuthService (mock)
 * - Guarda token/usuario en localStorage
 * - Cambiaremos login/register por llamadas HTTP al conectar con Spring.
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

  // Lee usuario guardado (post-refresh)
  private readUserFromStorage(): User | null {
    const raw = localStorage.getItem(USER_KEY);
    try { return raw ? JSON.parse(raw) as User : null; } catch { return null; }
  }

  // Guarda tokens y usuario
  private persistSession(res: AuthResponse) {
    localStorage.setItem(ACCESS_TOKEN_KEY, res.accessToken);
    localStorage.setItem(USER_KEY, JSON.stringify(res.user));
    this._user.set(res.user);
  }

  get token(): string | null {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  }

  login(payload: LoginPayload) {
    // POST /auth/login -> { accessToken, user }
    return this.http.post<AuthResponse>('/auth/login', payload);
  }

  register(payload: RegisterPayload) {
    // POST /auth/register -> { accessToken, user }  (user.tipo debe ser COMMON por regla)
    return this.http.post<AuthResponse>('/auth/register', payload);
  }

  completeLoginFlow(res: AuthResponse) {
    // Llama esto desde el componente después del subscribe
    this.persistSession(res);
  }

  logout() {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    this._user.set(null);
    this.router.navigate(['/auth/login']);
  }

  // Utilidad para verificar rol
  hasAnyRole(allowed: UserRole[]): boolean {
    const r = this.roles();
    return allowed.some(role => r.includes(role));
  }
}
