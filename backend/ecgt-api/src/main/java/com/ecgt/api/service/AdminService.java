package com.ecgt.api.service;

import com.ecgt.api.dto.admin.*;
import com.ecgt.api.model.Role;
import com.ecgt.api.model.User;
import com.ecgt.api.repository.RoleRepository;
import com.ecgt.api.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

/**
 * AdminService
 * ------------
 * Reglas de negocio para administrar empleados:
 * - Crea/actualiza/borrado
 * - Valida rol permitido (MODERATOR/LOGISTICS/ADMIN)
 */
@Service
@RequiredArgsConstructor
public class AdminService {

  private final UserRepository userRepo;
  private final RoleRepository roleRepo;
  private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

  private static final Set<String> ALLOWED_EMP_ROLES = Set.of("MODERATOR", "LOGISTICS", "ADMIN");

  /** Convierte entidad User a DTO de salida */
private UserResp toResp(User u) {
    return new UserResp(
        u.getId(),                   // ya es UUID
        u.getName(),
        u.getEmail(),
        u.getRole() != null ? u.getRole().getName() : null,
        Boolean.TRUE.equals(u.getEnabled())
    );
}

  /** Busca entidad Role por nombre (lanza si no existe o no permitido) */
  private Role findRoleEntityForEmployees(String roleName) {
    String r = Objects.requireNonNull(roleName, "role es requerido").toUpperCase(Locale.ROOT);
    if (!ALLOWED_EMP_ROLES.contains(r)) {
      throw new RuntimeException("Rol no permitido para empleados: " + r);
    }
    return roleRepo.findByName(r).orElseThrow(() -> new RuntimeException("Rol no encontrado: " + r));
  }

  /** Lista todos los usuarios (puedes filtrar sólo empleados si lo deseas) */
  public List<UserResp> listUsers() {
    return userRepo.findAll()
        .stream()
        .map(this::toResp)
        .collect(Collectors.toList());
  }

  /** Crea empleado */
  public UserResp createUser(CreateUserReq req) {
    if (userRepo.findByEmail(req.getEmail()).isPresent()) {
      throw new RuntimeException("El correo ya está registrado");
    }
    Role role = findRoleEntityForEmployees(req.getRole());

    User u = User.builder()
        .name(req.getName())
        .email(req.getEmail())
        .passwordHash(passwordEncoder.encode(req.getPassword()))
        .role(role)
        .enabled(true)
        .build();

    userRepo.save(u);
    return toResp(u);
  }

  /** Actualiza empleado */
public UserResp updateUser(UUID id, UpdateUserReq req) {
    User u = userRepo.findById(id).orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
    if (req.getName() != null) u.setName(req.getName());
    if (req.getEnabled() != null) u.setEnabled(req.getEnabled());
    if (req.getRole() != null) {
        Role role = findRoleEntityForEmployees(req.getRole());
        u.setRole(role);
    }
    userRepo.save(u);
    return toResp(u);
}

  /** Elimina empleado (opcional) */
 
public void deleteUser(UUID id) {
    if (!userRepo.existsById(id)) return;
    userRepo.deleteById(id);
}
}
