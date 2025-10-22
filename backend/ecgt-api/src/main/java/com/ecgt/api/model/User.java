package com.ecgt.api.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.Instant;

/**
 * Entidad User
 * ------------
 * Representa un usuario del sistema.
 * Permanente: se vincula con la tabla "user" en PostgreSQL.
 */

 @Entity
@Table(name = "\"user\"") // "user" es palabra reservada en SQL
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class User {

  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private String id;

  private String nombre;

  @Column(unique = true, nullable = false)
  private String email;

  @Column(name = "password_hash", nullable = false)
  private String passwordHash;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "role_id")
  private Role role;

  private boolean enabled = true;

  private Instant createdAt = Instant.now();
  private Instant updatedAt = Instant.now();

}
