package bapp.budget_backend.models;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;
import bapp.budget_backend.models.enums.Categories;

@Entity
@Getter
@Setter
public class BudgetAllocation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private Categories category;

    private Double amount;


    @ManyToOne
    @JoinColumn(name = "budget_id")
    @JsonBackReference
    private Budget budget;
}
