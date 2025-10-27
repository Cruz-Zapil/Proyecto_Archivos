package com.ecgt.api.dto.admin;

import lombok.*;

/**
 * UpdateUserReq
 * --------------
 * Payload para actualizar datos de empleado.
 */
@Data @NoArgsConstructor @AllArgsConstructor
public class UpdateUserReq {
  private String name;
  private String role; // opcional: 'MODERATOR' | 'LOGISTICS' | 'ADMIN'
  private Boolean enabled;
}
