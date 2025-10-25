
package com.ecgt.api.service;

import com.ecgt.api.dto.AuthRequest;
import com.ecgt.api.dto.AuthResponse;
import com.ecgt.api.dto.RegisterRequest;
import com.ecgt.api.model.Role;
import com.ecgt.api.model.User;
import com.ecgt.api.repository.RoleRepository;
import com.ecgt.api.repository.UserRepository;
import com.ecgt.api.security.JwtService;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Optional;

/**
 * AuthService
 * ------------
 * Maneja el registro y login de usuarios.
 * Temporal (sin JWT aún): devuelve AuthResponse con usuario y token "fake".
 * Permanente: se extenderá para emitir tokens JWT.
 */

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    private final JwtService jwtService; // ✅ inyección nueva

    /// -- Registro ---

     public AuthResponse register(RegisterRequest req) {
        Role commonRole = roleRepository.findByName("COMMON")
                .orElseThrow(() -> new RuntimeException("Rol COMMON no existe"));

        if (userRepository.findByEmail(req.getEmail()).isPresent()) {
            throw new RuntimeException("El correo ya está registrado");
        }

        User user = User.builder()
                .name(req.getName())
                .email(req.getEmail())
                .passwordHash(passwordEncoder.encode(req.getPassword()))
                .role(commonRole)
                .enabled(true)
                .build();

        userRepository.save(user);

        // ✅ JWT real
        String token = jwtService.generateToken(
                user.getEmail(),
                Map.of("role", user.getRole().getName())
        );

        return AuthResponse.builder()
                .accessToken(token)
                .user(user)
                .build();
    }

    // --- Login ---
    public AuthResponse login(AuthRequest req) {
        User user = userRepository.findByEmail(req.getEmail())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        if (!passwordEncoder.matches(req.getPassword(), user.getPasswordHash())) {
            throw new RuntimeException("Contraseña incorrecta");
        }

        String token = jwtService.generateToken(
                user.getEmail(),
                Map.of("role", user.getRole().getName())
        );

        return AuthResponse.builder()
                .accessToken(token)
                .user(user)
                .build();
    }

}
