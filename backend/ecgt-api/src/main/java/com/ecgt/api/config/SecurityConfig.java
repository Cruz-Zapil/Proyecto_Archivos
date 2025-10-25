package com.ecgt.api.config;

import com.ecgt.api.security.JwtAuthFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.*;

import java.util.List;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

  private final JwtAuthFilter jwtAuthFilter;

  @Bean
  SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http
        .csrf(csrf -> csrf.disable())
        .cors(cors -> cors.configurationSource(corsConfigurationSource()))
        .sessionManagement(sm -> sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
        .authorizeHttpRequests(auth -> auth

            // Preflight CORS
            .requestMatchers(org.springframework.http.HttpMethod.OPTIONS, "/**").permitAll()
            // Rutas públicas
            .requestMatchers(
                "/api/auth/**",
                "/api/products/public/**",
                "/api/products/approved/**",
                "/api/categories/**",
                "/v3/api-docs/**",
                "/swagger-ui/**")
            .permitAll()

            // Por rol (usa hasRole = espera ROLE_*)
            
            .requestMatchers("/api/seller/**").hasAnyRole("COMMON", "ADMIN")
            .requestMatchers("/api/moderation/**").hasRole("MODERATOR")
            .requestMatchers("/api/logistics/**").hasRole("LOGISTICS")
            .requestMatchers("/api/admin/**").hasRole("ADMIN")

            // Demás
            .anyRequest().authenticated())
        .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

    return http.build();
  }

  @Bean
  CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration config = new CorsConfiguration();
    config.setAllowedOrigins(java.util.List.of(
        "http://localhost:4200",
        "http://127.0.0.1:4200" // por si cambias
    // "https://tu-sitio.netlify.app" // en producción
    ));
    config.setAllowedMethods(java.util.List.of("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
    config.setAllowedHeaders(java.util.List.of("Authorization", "Content-Type", "X-Requested-With"));
    config.setExposedHeaders(java.util.List.of("Authorization"));
    config.setAllowCredentials(true);

    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", config);
    return source;
  }

  @Bean
  public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
    return config.getAuthenticationManager();
  }
}
