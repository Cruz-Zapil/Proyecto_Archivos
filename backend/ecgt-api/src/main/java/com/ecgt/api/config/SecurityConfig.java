package com.ecgt.api.config;

import com.ecgt.api.security.JwtAuthFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
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

// @Configuration
@EnableMethodSecurity(prePostEnabled = true, securedEnabled = true)

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

            // Reviews: GET público, POST requiere login
            .requestMatchers(HttpMethod.GET, "/api/reviews/**").permitAll()
            .requestMatchers(HttpMethod.POST, "/api/reviews/**").hasRole("COMMON")

            // Rutas por rol
            .requestMatchers("/api/admin/**").hasRole("ADMIN")
            .requestMatchers("/api/moderation/**").hasRole("MODERATOR")
            .requestMatchers("/api/logistics/**").hasRole("LOGISTICS")
            .requestMatchers("/api/seller/**").hasAnyRole("COMMON", "ADMIN")

            // Demás
            .anyRequest().authenticated())
        .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

    return http.build();
  }

  @Bean
  CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration config = new CorsConfiguration();

    // Durante la U, simplifica con patrón comodín
    config.addAllowedOriginPattern("*"); // acepta Netlify y ngrok sin pelearse

    config.setAllowedMethods(List.of("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
    config.setAllowedHeaders(List.of("Authorization", "Content-Type", "X-Requested-With"));
    config.setExposedHeaders(List.of("Authorization"));
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
