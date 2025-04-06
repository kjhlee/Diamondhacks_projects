package bapp.budget_backend.controller;

import bapp.budget_backend.models.Income;
import bapp.budget_backend.services.IncomeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/income")
public class IncomeController{
    
    @Autowired
    private IncomeService incomeService;

    public IncomeController(IncomeService incomeService){
        this.incomeService = incomeService;
    }

    @PostMapping("/add")
    public ResponseEntity<Income> addIncome(@RequestBody Income income, @RequestParam(defaultValue = "false") boolean routeToSavings){
        Income newIncome = incomeService.addNewIncome(income, routeToSavings);
        return new ResponseEntity<>(newIncome, HttpStatus.CREATED);
    }

    @DeleteMapping("/deleted/{id}")
    public ResponseEntity<String> deleteIncome(@PathVariable Long id){
        incomeService.deleteIncome(id);
        return new ResponseEntity<>("Income deleted successfully", HttpStatus.OK);
    }

    @GetMapping("/view/{userId}")
    public ResponseEntity<List<Income>> getCurrentIncomes(@PathVariable Long userId){
        List<Income> currentIncomes = incomeService.getIncomesById(userId);
        return new ResponseEntity<>(currentIncomes, HttpStatus.OK);
    }

}