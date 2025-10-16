import { Injectable, signal } from '@angular/core';
import { User } from '../models/user';

/**
 * AuthService (mock)
 * - Guarda token/usuario en localStorage
 * - Cambiaremos login/register por llamadas HTTP al conectar con Spring.
 */


@Injectable({ providedIn: 'root' })
export class AuthService {

  
  private _user = signal<User | null>(this.load());
  user = this._user.asReadonly();

  /** ¿Hay sesión? */
  isLogged() { return !!this._user(); }

  /** Token (para interceptor) */
  token() { return localStorage.getItem('token'); }

  /** Login simulado */
  login(email: string, _password: string) {
    const fake: User = {
      id: crypto.randomUUID(),
      email,
      fullName: 'Demo User',
      role: 'ROLE_COMMON',
      token: 'demo-token' // sustituiremos por JWT real
    };
    this.persist(fake);
    this._user.set(fake);
  }

  /** Registro simulado */
  register(fullName: string, email: string, _password: string) {
    // En real: POST /auth/register y luego /auth/login
    this.login(email, _password);
  }

  /** Cerrar sesión */
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this._user.set(null);
  }

  /** Internos */
  private persist(u: User) {
    if (u.token) localStorage.setItem('token', u.token);
    localStorage.setItem('user', JSON.stringify(u));
  }
  private load(): User | null {
    const raw = localStorage.getItem('user');
    return raw ? JSON.parse(raw) as User : null;
  }
}
