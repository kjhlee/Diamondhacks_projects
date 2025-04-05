package bapp.budget_backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

import bapp.budget_backend.models.Budget;
import bapp.budget_backend.services.BudgetService;

@RestController
@RequestMapping("/budget")
public class BudgetController {
    @Autowired
    private final BudgetService budService;
    
    public BudgetController(BudgetService budService){
        this.budService = budService;
    }

    @GetMapping("/getall")
    public ResponseEntity<List<Budget>> getAllBudgets(){
        List<Budget> buds = budService.getAllBudgets();
        return new ResponseEntity<List<Budget>>(buds, HttpStatus.OK);
    }
    
    @PostMapping("/addbudget")
    public ResponseEntity<Budget> addBudget(@RequestBody Budget budget){
        Budget nBudget = budService.addNewBudget(budget);
        return new ResponseEntity<Budget>(nBudget, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getBudgetById(@PathVariable Long id){
        Optional<Budget> budget = budService.getBudgetById(id);
        return budget.isPresent()
                ? ResponseEntity.ok(budget.get())
                : ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateBudget(@PathVariable Long id, @RequestBody Budget updatedBudget){
        Optional<Budget> budOpt = budService.getBudgetById(id);
        if(budOpt.isEmpty()){
            return ResponseEntity.notFound().build();
        }
        updatedBudget.setId(id);
        return ResponseEntity.ok(budService.updateBudget(updatedBudget));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteBudget(@PathVariable Long id){
        budService.deleteBudget(id);
        return ResponseEntity.noContent().build();
    }

}
