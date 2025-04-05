package bapp.budget_backend.securityUtil;

import java.io.IOException;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class JwtAuthenticationFilter extends OncePerRequestFilter{
    private final JwtUtil jwtUtil;
    private final UserDetailsService userDetailsService;

    public JwtAuthenticationFilter(JwtUtil jwtUtil, UserDetailsService userDetailsService){
        this.jwtUtil = jwtUtil;
        this.userDetailsService = userDetailsService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain
    )throws ServletException, IOException{
        String authHeader = request.getHeader("Authorization");
        if(authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        } try {
            String token = authHeader.substring(7);
            String email = jwtUtil.extractEmail(token);
            if(email != null && SecurityContextHolder.getContext().getAuthentication() == null){
                UserDetails userdetails = userDetailsService.loadUserByUsername(email);
                if(jwtUtil.validateToken(token)){
                    UsernamePasswordAuthenticationToken authToken = 
                        new UsernamePasswordAuthenticationToken(userdetails, null, userdetails.getAuthorities());
                    authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                    SecurityContextHolder.getContext().setAuthentication(authToken);
                }
                filterChain.doFilter(request, response);
            }
        } catch (Exception exception) {
            return;
        }


    }
}
