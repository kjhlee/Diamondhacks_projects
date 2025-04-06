package bapp.budget_backend.models;

import jakarta.persistence.*;

@Entity
public class Savings {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Double totalSavings;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    public Savings() {}

    public Savings(User user) {
        this.user = user;
        this.totalSavings = 0.0;
    }

    public Long getId() {
        return id;
    }

    public Double getTotalSavings() {
        return totalSavings;
    }

    public void setTotalSavings(Double totalSavings) {
        this.totalSavings = totalSavings;
    }

    public void addToSavings(Double amount) {
        this.totalSavings += amount;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
