package bapp.budget_backend.repository;

import bapp.budget_backend.models.Income;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IncomeRepository extends JpaRepository<Income, Long> {
    // findAll(), save(), findById(), deleteById(), count()
    List<Income> findByUserId(Long userId);
}
