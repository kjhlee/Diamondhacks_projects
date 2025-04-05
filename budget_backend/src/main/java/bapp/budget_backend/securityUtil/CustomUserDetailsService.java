package bapp.budget_backend.securityUtil;

import java.util.List;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import bapp.budget_backend.repository.UserRepo;
import bapp.budget_backend.models.User;

@Service
public class CustomUserDetailsService implements UserDetailsService{
    private final UserRepo userRepo;

    public CustomUserDetailsService(UserRepo userRepo){
        this.userRepo = userRepo;
    }

    @Override 
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepo.findByEmail(email)
            .orElseThrow(() -> new UsernameNotFoundException("User not Found"));
        return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(), 
        List.of(new SimpleGrantedAuthority("ROLE_USER")));
    }

}
