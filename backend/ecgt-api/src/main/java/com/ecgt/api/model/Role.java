package com.ecgt.api.model;


import jakarta.persistence.*;
import lombok.*;
/**
 * Entidad Role
 * ------------
 * Representa el rol asignado a un usuario.
 * Permanente: se vincula con la tabla role.
 */


@Entity
@Table(name = "role")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Role {
    
      @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private String id;

  @Column(unique = true, nullable = false)
  private String nombre;
}
