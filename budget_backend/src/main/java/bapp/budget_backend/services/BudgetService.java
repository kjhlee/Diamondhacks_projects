package bapp.budget_backend.services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import bapp.budget_backend.models.Budget;
import bapp.budget_backend.repository.BudgetRepo;

@Service
public class BudgetService {
    private final BudgetRepo budgetRepo;

    public BudgetService(BudgetRepo budgetRepo){
        this.budgetRepo = budgetRepo;
    }

    //Creating a new Budget
    public Budget addNewBudget(Budget budget){
        return budgetRepo.save(budget);
    }

    public Optional<Budget> getBudgetById(Long id){
        Optional<Budget> bud = budgetRepo.findById(id);
        return bud;
    }

    public List<Budget> getAllBudgets(){
        return budgetRepo.findAll();
    }

    public Budget updateBudget(Budget budget){
        return budgetRepo.save(budget);
    }

    public void deleteBudget(Long id){
        budgetRepo.deleteById(id);
    }


}
