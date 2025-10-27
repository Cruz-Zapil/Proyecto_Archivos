import { Injectable, inject, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from './http.service';
import { CartService } from './cart.service';
import {
  AuthResponse,
  LoginPayload,
  RegisterPayload,
  User,
  UserRole,
} from '../models/user';

const ACCESS_TOKEN_KEY = 'ecgt_token';
const USER_KEY = 'ecgt_user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpService);
  private router = inject(Router);
  private cart = inject(CartService);

  private _user = signal<User | null>(this.readUserFromStorage());
  user = computed(() => this._user());
  isLoggedIn = computed(() => !!this._user());
  roles = computed<UserRole[]>(() => this._user()?.roles ?? []);

  login(payload: LoginPayload) {
    return this.http.post<AuthResponse>('/auth/login', payload);
  }

  register(payload: RegisterPayload) {
    return this.http.post<AuthResponse>('/auth/register', payload);
  }

  completeLoginFlow(res: AuthResponse) {
    const token = (res as any).accessToken ?? (res as any).token;
    if (!token) return console.error('No token recibido del backend');

    const raw = res.user as any;
    const roles = Array.isArray(raw.roles)
      ? raw.roles
      : raw.role?.name
      ? [raw.role.name]
      : [];

    const { passwordHash, role, ...rest } = raw;
    const user: User = { ...rest, roles };

    localStorage.setItem(ACCESS_TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    this._user.set(user);

    // Cargar carrito persistente tras login
    setTimeout(() => {
      this.cart.syncOnLogin();
    }, 500);
  }

  get token(): string | null {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  }

  private readUserFromStorage(): User | null {
    const raw = localStorage.getItem(USER_KEY);
    try {
      return raw ? (JSON.parse(raw) as User) : null;
    } catch {
      return null;
    }
  }

  logout() {
    //  Guarda carrito antes de limpiar sesión
    this.cart.syncOnLogout();

    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    this._user.set(null);
    this.router.navigate(['/login']);
  }

  hasAnyRole(allowed: UserRole[]): boolean {
    const r = this.roles();
    return allowed.some((role) => r.includes(role));
  }
}
