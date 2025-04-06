package bapp.budget_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import bapp.budget_backend.models.Budget;

@Repository
public interface BudgetRepo extends JpaRepository<Budget, Long>{
    
}
