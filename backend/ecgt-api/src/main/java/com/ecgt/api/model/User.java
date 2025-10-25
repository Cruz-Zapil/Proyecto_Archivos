package com.ecgt.api.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.Instant;
import java.time.OffsetDateTime;
import java.util.UUID;

/**
 * Entidad User
 * ------------
 * Representa un usuario del sistema.
 * Permanente: se vincula con la tabla "user" en PostgreSQL.
 */

 @Entity
@Table(name = "\"users\"") // "user" es palabra reservada en SQL
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class User {

  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private UUID id;

  private String name;

  @Column(unique = true, nullable = false)
  private String email;

  @Column(name = "password_hash", nullable = false)
  private String passwordHash;

  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "role_id", nullable = false)
  private Role role;

 private Boolean enabled = true;

  @Column(name = "created_at")
  private OffsetDateTime createdAt;

  @Column(name = "updated_at")
  private OffsetDateTime updatedAt;
}
