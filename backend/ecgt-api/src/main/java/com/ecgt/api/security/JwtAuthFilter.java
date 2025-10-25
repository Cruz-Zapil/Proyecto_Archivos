package com.ecgt.api.security;

import com.ecgt.api.model.User;
import com.ecgt.api.repository.UserRepository;
import jakarta.servlet.*;
import jakarta.servlet.http.*;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

/**
 * JwtAuthFilter
 * --------------
 * Valida el JWT y agrega autenticación + roles al contexto de seguridad.
 */
@Component
@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {

  private final JwtService jwtService;
  private final UserRepository userRepository;

  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
      throws ServletException, IOException {

    final String method = request.getMethod();
    final String uri = request.getRequestURI();
    final String authHeader = request.getHeader("Authorization");

    System.out.println("➡️ " + method + " " + uri + " | Authorization? " + (authHeader != null));

    if (authHeader == null || !authHeader.startsWith("Bearer ")) {
      chain.doFilter(request, response);
      return;
    }

    final String jwt = authHeader.substring(7);

    try {
      final String userEmail = jwtService.extractUsername(jwt);
      System.out.println("🔐 JWT email: " + userEmail);

      if (userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null) {
        userRepository.findByEmail(userEmail).ifPresent(user -> {
          if (jwtService.isTokenValid(jwt, user.getEmail())) {

            var authorities = List.of(new SimpleGrantedAuthority("ROLE_" + user.getRole().getName()));
            var authToken = new UsernamePasswordAuthenticationToken(user, null, authorities);

            authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
            SecurityContextHolder.getContext().setAuthentication(authToken);
            
            System.out.println("Authorities = " + authToken.getAuthorities());

            System.out.println(" Auth user: " + user.getEmail() + " | role: " + user.getRole().getName());
          } else {
            System.out.println(" Token inválido para: " + userEmail);
          }
        });
      }
    } catch (Exception ex) {
      System.out.println("❗ Error procesando JWT: " + ex.getMessage());
      // no lanzamos, dejamos pasar a control de access rules (será 401/403 según
      // endpoint)
    }

    chain.doFilter(request, response);
  }

}
