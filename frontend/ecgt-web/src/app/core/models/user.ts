// Define los tipos de rol que existen en la plataforma
export type UserRole = 'COMUN' | 'MODERADOR' | 'LOGISTICA' | 'ADMIN';


// Usuario estándar que retorna el backend
export interface User {
  id: string;
  name: string;
  email: string;
  roles: UserRole[];        // un usuario puede tener más de un rol (admin, etc.)
  enabled: boolean;
  // datos opcionales que te servirán más adelante
  avatarUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Respuestas típicas de auth
export interface AuthResponse {
  accessToken: string;      // JWT
  refreshToken?: string;    // opcional si implementas refresh
  user: User;
}

//  para registro (sólo tipo COMÚN)
export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

//  para login
export interface LoginPayload {
  email: string;
  password: string;
}