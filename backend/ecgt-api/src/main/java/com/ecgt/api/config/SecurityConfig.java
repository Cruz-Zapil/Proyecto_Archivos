package com.ecgt.api.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

/**
 * SecurityConfig
 * ---------------
 * Configuración de seguridad inicial (sin JWT).
 * Permite acceso libre a /api/ping y /api/auth/**,
 * el resto requiere autenticación básica temporal.
 * Luego migraremos esto a JWT.
 */


 @Configuration
public class SecurityConfig {

     @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http
            // 🚫 Desactiva CSRF (no lo necesitamos aún)
            .csrf(csrf -> csrf.disable())

            // 🔓 Define reglas de acceso
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/ping", "/api/auth/**").permitAll()  // públicas
                .anyRequest().authenticated()  // todo lo demás requiere login (temporal)
            )

            // 🔐 Habilita autenticación básica temporal (solo mientras montamos JWT)
            .httpBasic(Customizer.withDefaults());

        return http.build();
    }
    
    
}
