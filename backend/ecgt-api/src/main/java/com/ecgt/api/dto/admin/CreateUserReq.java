package com.ecgt.api.dto.admin;

import lombok.*;

/**
 * CreateUserReq
 * --------------
 * Payload para crear empleado (MODERATOR / LOGISTICS / ADMIN).
 * Nota: COMMON NO se crea desde Admin.
 */
@Data @NoArgsConstructor @AllArgsConstructor
public class CreateUserReq {
  private String name;
  private String email;
  private String password; // llega plano; se cifra con BCrypt
  private String role;     // 'MODERATOR' | 'LOGISTICS' | 'ADMIN'
}
