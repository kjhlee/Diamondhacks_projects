package bapp.budget_backend.models;
import jakarta.persistence.*;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

@Getter
@Setter
@NoArgsConstructor
@Entity

public class BudgetCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String categoryName;
    private double percentage;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

}
