// Rol alineado a lo que usaremos en Spring
export type Role = 'ROLE_COMMON' | 'ROLE_MODERATOR' | 'ROLE_LOGISTICS' | 'ROLE_ADMIN';


export interface User {
  id: string;
  email: string;
  fullName: string;
  role: Role;
  token?: string; // JWT real después
}