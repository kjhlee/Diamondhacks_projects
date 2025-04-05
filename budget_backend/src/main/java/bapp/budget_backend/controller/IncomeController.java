package bapp.budget_backend.controller;

import bapp.budget_backend.models.Income;
import bapp.budget_backend.services.IncomeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/income")
public class IncomeController{
    
    @Autowired
    private IncomeService IncomeService;

    @PostMapping("/add")
    public ResponseEntity<String> addIncome(@RequestBody Income income){
        try{
            IncomeService.addIncome(income);
            return ResponseEntity.ok("Income added successfully!");
        } catch (Exception e){
            return ResponseEntity.badRequest().body("Failed to add income: " + e.getMessage());
        }
    }

    @GetMapping("/view")
    public ResponseEntity<List<Income>> viewIncomes(@PathVariable Long userId){
        List<Income> incomes = IncomeService.getIncomesById(userId);
        return ResponseEntity.ok(incomes);
    }
}