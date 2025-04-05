package bapp.budget_backend.repositories;

import bapp.budget_backend.models.Income;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IncomeRepository extends JpaRepository<Income, Long> {
    // findAll(), save(), findById(), deleteById(), count()
}
