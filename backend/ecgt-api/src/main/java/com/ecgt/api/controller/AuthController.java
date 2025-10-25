/**
 * AuthController
 * ---------------
 * Endpoints públicos de autenticación:
 * /api/auth/register  → registro de usuario común
 * /api/auth/login     → login
 */
package com.ecgt.api.controller;

import com.ecgt.api.dto.*;
import com.ecgt.api.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public AuthResponse register(@RequestBody RegisterRequest req) {
        return authService.register(req);
    }

    @PostMapping("/login")
    public AuthResponse login(@RequestBody AuthRequest req) {
        return authService.login(req);
    }
}
