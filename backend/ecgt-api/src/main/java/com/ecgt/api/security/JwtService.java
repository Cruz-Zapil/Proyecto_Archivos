package com.ecgt.api.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;
import java.security.Key;
import java.util.Date;
import java.util.Map;
import java.util.function.Function;


/**
 * JwtService
 * -----------
 * Genera y valida tokens JWT para autenticación.
 * Permanente: base para todo el flujo de seguridad.
 */


@Service
public class JwtService {

  // Clave secreta — en producción, usa una variable de entorno 🔒
  private static final String SECRET = "mi_clave_ultra_secreta_para_jwt_de_256_bits_demo_1234567890";

  private static final long EXPIRATION_MS = 1000 * 60 * 60 * 3; // 3 horas

  private Key getSignKey() {
    return Keys.hmacShaKeyFor(SECRET.getBytes());
  }

  /** Genera un JWT con claims personalizados */
  public String generateToken(String subject, Map<String, Object> extraClaims) {
    return Jwts.builder()
        .setClaims(extraClaims)
        .setSubject(subject)
        .setIssuedAt(new Date(System.currentTimeMillis()))
        .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_MS))
        .signWith(getSignKey(), SignatureAlgorithm.HS256)
        .compact();
  }

  /** Extrae el email (subject) */
  public String extractUsername(String token) {
    return extractClaim(token, Claims::getSubject);
  }

  /** Valida que el token sea válido y no esté expirado */
  public boolean isTokenValid(String token, String email) {
    final String username = extractUsername(token);
    return (username.equals(email)) && !isTokenExpired(token);
  }

  private boolean isTokenExpired(String token) {
    return extractExpiration(token).before(new Date());
  }

  private Date extractExpiration(String token) {
    return extractClaim(token, Claims::getExpiration);
  }

  private <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
    final Claims claims = extractAllClaims(token);
    return claimsResolver.apply(claims);
  }

  private Claims extractAllClaims(String token) {
    return Jwts.parserBuilder()
        .setSigningKey(getSignKey())
        .build()
        .parseClaimsJws(token)
        .getBody();
  }
}



