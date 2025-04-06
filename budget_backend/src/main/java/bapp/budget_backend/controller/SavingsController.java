package bapp.budget_backend.controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import bapp.budget_backend.models.Savings;
import bapp.budget_backend.services.SavingsService;

@RestController
@RequestMapping("/savings")
public class SavingsController {
    private final SavingsService savingsService;
    public SavingsController(SavingsService savingsService){
        this.savingsService = savingsService;
    }

    @PostMapping("/add")
    public ResponseEntity<Savings> addToSavings(@RequestBody Map<String, Double> body) {
        Double amount = body.get("amount");
        if (amount == null || amount <= 0) return ResponseEntity.badRequest().build();
        return ResponseEntity.ok(savingsService.addToGlobalSavings(amount));
    }


    @GetMapping("/total")
    public ResponseEntity<Double> getUserTotalSavings() {
        Double total = savingsService.getOrCreateGlobalSavings().getTotalSavings();
        return ResponseEntity.ok(total);
    }
}
