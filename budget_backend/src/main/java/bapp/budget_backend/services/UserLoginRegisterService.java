package bapp.budget_backend.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import bapp.budget_backend.DTO.LoginDTO;
import bapp.budget_backend.DTO.RegisterDTO;
import bapp.budget_backend.models.User;
import bapp.budget_backend.repository.UserRepo;
import bapp.budget_backend.securityUtil.JwtUtil;

@Service
public class UserLoginRegisterService {
    @Autowired
    private UserRepo userRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    public String registerUser(RegisterDTO request){
        if(userRepo.existsByEmail(request.getEmail())){
            throw new IllegalArgumentException("User already Exists");
        }
        if(!request.getPassword().equals(request.getConfirmPassword())){
            throw new IllegalArgumentException("Passwords do not match");
        }

        User nUser = new User();
        nUser.setEmail(request.getEmail());
        nUser.setPassword(passwordEncoder.encode(request.getPassword()));

        userRepo.save(nUser);
        return "User Successfully registered";
    }

    public String loginUser(LoginDTO request){
        Optional<User> userOpt = userRepo.findByEmail(request.getEmail());
        if(userOpt.isEmpty() || !passwordEncoder.matches(request.getPassword(), userOpt.get().getPassword())){
            throw new IllegalArgumentException("Invalid email or password");
        }
        return jwtUtil.generateToken(request.getEmail());
    }
    public User findUser(String email){
        return userRepo.findByEmail(email).orElseThrow(() -> new IllegalArgumentException("User does not exist"));
    }
}
