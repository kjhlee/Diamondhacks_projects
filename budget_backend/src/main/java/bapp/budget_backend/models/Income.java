package bapp.budget_backend.models;

import bapp.budget_backend.models.enums.Frequency;
import jakarta.persistence.*;
import java.time.LocalDate;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class Income {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private double amount;

    private boolean isRecurring; // is the payment recurring or manual?

    @Enumerated(EnumType.STRING)
    private Frequency frequency;

    private LocalDate startDate;
    private LocalDate nextPaymentDate;

    @ManyToOne
    private User user;

    //getters and setters
    
}
