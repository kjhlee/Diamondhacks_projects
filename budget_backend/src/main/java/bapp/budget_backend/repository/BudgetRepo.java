package bapp.budget_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import bapp.budget_backend.models.Budget;

public interface BudgetRepo extends JpaRepository<Budget, Long>{
    
}
