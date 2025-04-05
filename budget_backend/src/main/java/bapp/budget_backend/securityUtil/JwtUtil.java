package bapp.budget_backend.securityUtil;

import java.security.Key;
import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;


// generates the JWT tokens for authentication
@Component
public class JwtUtil {
    private final Key key;
    private final long expTime;

    public JwtUtil(@Value("${jwt.secret}") String secretKey, @Value("${jwt.expiration}") long expTime){
        this.key = Keys.hmacShaKeyFor(secretKey.getBytes());
        this.expTime = expTime;
    }

    public String generateToken(String email){
        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expTime))
                .signWith(key, SignatureAlgorithm.HS256)
            .compact();
    }

    public String extractEmail(String token){
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
            return true;
        } catch (JwtException e) {
            return false;
        }
    }
}
