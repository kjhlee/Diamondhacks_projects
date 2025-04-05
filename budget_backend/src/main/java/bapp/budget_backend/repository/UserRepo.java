package bapp.budget_backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import bapp.budget_backend.models.User;

public interface UserRepo extends JpaRepository<User, Long>{
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);
}
