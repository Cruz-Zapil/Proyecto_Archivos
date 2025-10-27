package com.ecgt.api.dto.admin;

import lombok.*;
import java.util.UUID;

/**
 * UserResp
 * --------
 * DTO de salida para la tabla de empleados en el front.
 */
@Data @AllArgsConstructor
public class UserResp {
  private UUID id;
  private String name;
  private String email;
  private String role;     // un solo rol (por tu modelo)
  private boolean enabled;
}
