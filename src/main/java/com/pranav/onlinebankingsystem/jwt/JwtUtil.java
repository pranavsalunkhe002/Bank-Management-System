package com.pranav.onlinebankingsystem.jwt;


import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Component;

import java.util.Date;
import io.jsonwebtoken.Claims;
@Component
public class JwtUtil {

    private final String SECRET_KEY =
            "mySecretKeyForOnlineBankingSystemProject123456";

    public String generateToken(String email) {

        return Jwts.builder()
                .subject(email)
                .issuedAt(new Date())
                .expiration(
                        new Date(System.currentTimeMillis()
                                + 1000 * 60 * 60)
                )
                .signWith(
                        SignatureAlgorithm.HS256,
                        SECRET_KEY
                )
                .compact();
    }
    public String extractUsername(String token) {

        return extractAllClaims(token).getSubject();
    }
    public Date extractExpiration(String token) {

        return extractAllClaims(token).getExpiration();
    }
    public boolean isTokenExpired(String token) {

        return extractExpiration(token)
                .before(new Date());
    }
    public boolean validateToken(
            String token,
            String email) {

        String username = extractUsername(token);

        return username.equals(email)
                && !isTokenExpired(token);
    }
    private Claims extractAllClaims(String token) {

        return Jwts.parser()
                .setSigningKey(SECRET_KEY)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}