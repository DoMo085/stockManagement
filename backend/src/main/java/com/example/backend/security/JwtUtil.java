package com.example.backend.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Base64;
import java.util.Date;

@Component
@Slf4j
public class JwtUtil {

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.access-expiration-ms:3600000}") // 1 hour default
    private long accessTokenExpiration;

    @Value("${jwt.refresh-expiration-ms:604800000}") // 7 days default
    private long refreshTokenExpiration;

    private Key secretKey;

    @PostConstruct
    public void init() {
        try {
            // Try to decode Base64 secret, fallback to raw bytes if invalid
            byte[] keyBytes;
            try {
                keyBytes = Base64.getDecoder().decode(secret);
                log.debug("JWT secret detected as Base64 encoded.");
            } catch (IllegalArgumentException e) {
                log.debug("JWT secret is not Base64 encoded, using raw bytes.");
                keyBytes = secret.getBytes();
            }

            if (keyBytes.length < 32) {  // 256 bits = 32 bytes
                throw new IllegalArgumentException("JWT secret key must be at least 256 bits (32 bytes)");
            }
            this.secretKey = Keys.hmacShaKeyFor(keyBytes);
        } catch (Exception e) {
            log.error("Error initializing JWT secret key: {}", e.getMessage());
            throw e;
        }
    }

    public String generateToken(String username, String role) {
        return Jwts.builder()
                .setSubject(username)
                .claim("role", role)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + accessTokenExpiration))
                .signWith(secretKey)
                .compact();
    }

    public String generateRefreshToken(String username) {
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + refreshTokenExpiration))
                .signWith(secretKey)
                .compact();
    }

    public String extractUsername(String token) {
        return getClaims(token).getSubject();
    }

    public String extractRole(String token) {
        Claims claims = getClaims(token);
        String role = claims.get("role", String.class);
        return role != null ? role : "";
    }

    public boolean isTokenValid(String token) {
        try {
            Claims claims = getClaims(token);
            boolean notExpired = !claims.getExpiration().before(new Date());
            log.debug("Token expiration check: notExpired={}", notExpired);
            return notExpired;
        } catch (ExpiredJwtException e) {
            log.debug("Token expired: {}", e.getMessage());
            return false;
        } catch (JwtException | IllegalArgumentException e) {
            log.debug("Invalid token: {}", e.getMessage());
            return false;
        }
    }

    private Claims getClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(secretKey)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    /*
    Optional:
    To support manual token invalidation (logout), you can implement a token blacklist or revocation list.
    This requires storing tokens server-side and checking against them in isTokenValid().
    */
}
