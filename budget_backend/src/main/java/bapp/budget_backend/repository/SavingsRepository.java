package bapp.budget_backend.repository;

import bapp.budget_backend.models.Savings;
import org.springframework.data.jpa.repository.JpaRepository;


public interface SavingsRepository extends JpaRepository<Savings, Long> {
    // findAll(), save(), findById(), deleteById(), count()
    Savings findByUserId(Long userId);
}
