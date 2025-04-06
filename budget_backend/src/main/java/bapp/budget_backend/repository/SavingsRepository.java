package bapp.budget_backend.repository;

import bapp.budget_backend.models.Savings;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SavingsRepository extends JpaRepository<Savings, Long> {
    // findAll(), save(), findById(), deleteById(), count()
    Savings findByUserId(Long userId);
}
