package com.ecgt.api.controller;


import com.ecgt.api.model.User;
import com.ecgt.api.service.AuthService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * AuthController
 * --------------
 * Controlador REST para registro y login.
 * Temporal: devuelve el usuario sin token (luego implementamos JWT).
 */


@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    

  private final AuthService authService;

  @PostMapping("/register")
  public ResponseEntity<?> register(@RequestBody RegisterRequest req) {
    User u = authService.register(req.nombre, req.email, req.password);
    return ResponseEntity.ok(Map.of("message", "Usuario registrado", "user", u));
  }

  @PostMapping("/login")
  public ResponseEntity<?> login(@RequestBody LoginRequest req) {
    return authService.login(req.email, req.password)
        .<ResponseEntity<?>>map(u -> ResponseEntity.ok(Map.of("user", u)))
        .orElse(ResponseEntity.status(401).body(Map.of("error", "Credenciales inválidas")));
  }

  @Data static class RegisterRequest {
    String nombre;
    String email;
    String password;
  }

  @Data static class LoginRequest {
    String email;
    String password;
  }
}
