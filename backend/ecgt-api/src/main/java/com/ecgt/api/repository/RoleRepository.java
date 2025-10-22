package com.ecgt.api.repository;

import com.ecgt.api.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, String> {
  Optional<Role> findByNombre(String nombre);
}