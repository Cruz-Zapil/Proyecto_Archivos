package com.ecgt.api.model;


import java.util.UUID;

import jakarta.persistence.*;
import lombok.*;
/**
 * Entidad Role
 * ------------
 * Representa el rol asignado a un usuario.
 * Permanente: se vincula con la tabla role.
 */


@Entity
@Table(name = "roles")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Role {
    
    @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private UUID id;

  @Column(unique = true, nullable = false)
  private String name;

  private String description;
}
