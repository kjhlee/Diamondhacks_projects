package bapp.controller;

import bapp.budget_backend.models.Income;
import bapp.budget_backend.services.IncomeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/income")
public class IncomeController{
    @Autowired
    private IncomeService incomeService;

    @PostMapping("/add")
    public ResponseEntity<String> addIncome(@RequestBody Income income){
        incomeService.addIncome(income);
        return ResponseEntity.ok("Income added successfully!");
    }

}