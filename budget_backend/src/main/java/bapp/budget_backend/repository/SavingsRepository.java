package bapp.budget_backend.repository;

import bapp.budget_backend.models.Savings;
import bapp.budget_backend.models.User;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SavingsRepository extends JpaRepository<Savings, Long> {
    // findAll(), save(), findById(), deleteById(), count()
    Optional<Savings> findByUserId(Long userId);
    Optional<Savings> findByUser(User user);
}
