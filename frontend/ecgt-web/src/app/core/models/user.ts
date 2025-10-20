// ============================================================
// user.ts
// ------------------------------------------------------------
// Modelos de usuario y autenticación de ECGT.
// Incluye definición de roles, estructura del usuario,
// payloads de autenticación y respuesta del backend.
// Permanente: se conectará con las entidades User/Auth en Spring Boot.
// ============================================================

// 🧩 Tipos de rol disponibles en la plataforma
export type UserRole = 'COMMON' | 'MODERATOR' | 'LOGISTICS' | 'ADMIN';

/**
 * Interface User
 * ---------------
 * Representa a cualquier usuario del sistema.
 * Se usa tanto para clientes (COMMON) como empleados (otros roles).
 */
export interface User {
  
  id: string;

  /** Nombre visible del usuario */
  name: string;

  // Correo electrónico
  email: string;

  // Roles asignados (puede tener varios)
  roles: UserRole[];

  // Indica si la cuenta está habilitada (activo en sistema)
  enabled: boolean;

  // Datos opcionales
  avatarUrl?: string;
  createdAt?: string;
  updatedAt?: string;

  //  Campos opcionales de compatibilidad (para los módulos de empleados)
  /** Alias opcional para 'name', usado en módulos admin */
  nombre?: string;

  /** Alias opcional para 'enabled', usado en módulos admin */
  activo?: boolean;
}

/**
 * AuthResponse
 * Respuesta estándar del backend al iniciar sesión o registrarse.
 */
export interface AuthResponse {
  accessToken: string;       // JWT principal
  refreshToken?: string;     // opcional si implementas refresh
  user: User;
}

/**
 * RegisterPayload
 * Estructura para registro (sólo usuarios de tipo COMMON).
 */
export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

/**
 * LoginPayload
 * Estructura para autenticación básica.
 */
export interface LoginPayload {
  email: string;
  password: string;
}
