package com.ecgt.api.service;

import com.ecgt.api.model.*;
import com.ecgt.api.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Optional;

/**
 * AuthService
 * -----------
 * Maneja login y registro de usuarios 
 */


@Service
@RequiredArgsConstructor
public class AuthService {


  private final UserRepository userRepo;
  private final RoleRepository roleRepo;
  private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

  public User register(String nombre, String email, String password) {
    if (userRepo.findByEmail(email).isPresent())
      throw new RuntimeException("El correo ya está registrado");

    Role roleCommon = roleRepo.findByNombre("COMMON")
        .orElseThrow(() -> new RuntimeException("Rol COMMON no existe"));

    User user = User.builder()
        .nombre(nombre)
        .email(email)
        .passwordHash(encoder.encode(password))
        .role(roleCommon)
        .enabled(true)
        .build();

    return userRepo.save(user);
  }

  public Optional<User> login(String email, String password) {
    return userRepo.findByEmail(email)
        .filter(u -> encoder.matches(password, u.getPasswordHash()));
  }
    
}
