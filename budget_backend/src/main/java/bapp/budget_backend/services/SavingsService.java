package bapp.budget_backend.services;

import java.util.Optional;

import org.springframework.stereotype.Service;

import bapp.budget_backend.models.Savings;
import bapp.budget_backend.models.User;
import bapp.budget_backend.repository.SavingsRepository;
import bapp.budget_backend.repository.UserRepo;

@Service
public class SavingsService {
    private final SavingsRepository savingsRepository;
    private final UserRepo userRepo;
    public SavingsService(SavingsRepository savingsRepository, UserRepo userRepo){
        this.userRepo = userRepo;
        this.savingsRepository = savingsRepository;
    }

    public Savings addToUserSavings(Long userId, Double amount) {
        Optional<User> optionalUser = userRepo.findById(userId);
        if (optionalUser.isEmpty()) throw new RuntimeException("User not found");

        User user = optionalUser.get();
        Savings savings = savingsRepository.findByUser(user)
                .orElseGet(() -> new Savings(user));

        savings.addToSavings(amount);
        return savingsRepository.save(savings);
    }

    public Double getTotalSavingsForUser(Long userId) {
        return savingsRepository.findByUserId(userId)
                .map(Savings::getTotalSavings)
                .orElse(0.0);
    }

    public Savings getOrCreateGlobalSavings() {
        return savingsRepository.findAll().stream()
            .findFirst()
            .orElseGet(() -> savingsRepository.save(new Savings(null))); // or a static "admin" user if needed
    }
    
    public Savings addToGlobalSavings(Double amount) {
        Savings savings = getOrCreateGlobalSavings();
        savings.addToSavings(amount);
        return savingsRepository.save(savings);
    }
    

}
